<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import type { PropType } from 'vue'

interface LineHighlight {
  start: number
  end: number
  color?: string
}

const props = defineProps({
  code: {
    type: String as PropType<string>,
    required: true
  },
  language: {
    type: String as PropType<string>,
    default: 'typescript'
  },
  filename: {
    type: String as PropType<string>,
    default: ''
  },
  highlightLines: {
    type: Array as PropType<number[] | LineHighlight[]>,
    default: () => []
  },
  showLineNumbers: {
    type: Boolean,
    default: false
  },
  maxHeight: {
    type: String,
    default: 'none'
  }
})

const codeContainer = ref<HTMLElement | null>(null)
const copied = ref(false)
const expanded = ref(false)
const isOverflowing = ref(false)

const formattedCode = computed(() => {
  return props.code.trim()
})

const lineCount = computed(() => {
  return formattedCode.value.split('\n').length
})

const copyCode = async () => {
  if (!props.code) return
  
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy code:', err)
  }
}

const toggleExpand = () => {
  expanded.value = !expanded.value
}

const checkOverflow = () => {
  if (codeContainer.value) {
    const { scrollHeight, clientHeight } = codeContainer.value
    isOverflowing.value = scrollHeight > clientHeight
  }
}

watch(() => props.code, checkOverflow)

onMounted(() => {
  if (typeof window !== 'undefined' && window.Prism) {
    if (codeContainer.value) {
      window.Prism.highlightElement(codeContainer.value)
      checkOverflow()
    }
  }

  window.addEventListener('resize', checkOverflow)
})

const codeStyle = computed(() => ({
  maxHeight: expanded.value ? 'none' : props.maxHeight
}))
</script>

<template>
  <div class="code-block" :class="{ expanded }">
    <div class="code-header">
      <div class="header-left">
        <span v-if="filename" class="filename">{{ filename }}</span>
        <span class="language-tag">{{ language }}</span>
        <span v-if="showLineNumbers" class="line-count">{{ lineCount }} lines</span>
      </div>

      <div class="header-right">
        <button v-if="isOverflowing" class="expand-button" @click="toggleExpand"
          :title="expanded ? 'Collapse' : 'Expand'">
          {{ expanded ? 'Collapse' : 'Expand' }}
        </button>
        <button class="copy-button" @click="copyCode" :class="{ copied }" :title="copied ? 'Copied!' : 'Copy code'">
          <span class="copy-icon">{{ copied ? '✓' : '📋' }}</span>
          <span class="copy-text">{{ copied ? 'Copied!' : 'Copy' }}</span>
        </button>
      </div>
    </div>

    <div class="code-content" :style="codeStyle">
      <pre :class="[
        `language-${language}`,
        { 'line-numbers': showLineNumbers }
      ]">
    <code
      ref="codeContainer"
      :class="`language-${language}`"
    >{{ formattedCode }}</code>
  </pre>

      <div v-if="highlightLines.length" class="highlight-lines"
        :style="{ '--highlight-lines': highlightLines.join(',') }" />
    </div>
  </div>
</template>

<style scoped>
.code-block {
  position: relative;
  margin: 1rem 0;
  background: var(--vp-code-block-bg);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

.code-block:hover {
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: var(--vp-code-block-bg);
  border-bottom: 1px solid var(--vp-c-divider);
}

.header-left, .header-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.filename {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  font-family: var(--vp-font-family-mono);
}

.language-tag {
  padding: 0.2rem 0.5rem;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 4px;
  font-size: 0.8rem;
  text-transform: uppercase;
}

.line-count {
  color: var(--vp-c-text-3);
  font-size: 0.8rem;
}

.copy-button, .expand-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.25s;
}

.copy-button:hover, .expand-button:hover {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.copy-button.copied {
  background: var(--vp-c-tip);
  border-color: var(--vp-c-tip);
  color: white;
}

.code-content {
  position: relative;
  transition: max-height 0.3s ease;
}

pre {
  margin: 0;
  padding: 1.25rem;
  overflow-x: auto;
}

pre.line-numbers {
  padding-left: 3.5rem;
  counter-reset: line;
}

pre.line-numbers code {
  position: relative;
}

pre.line-numbers code::before {
  content: counter(line);
  counter-increment: line;
  position: absolute;
  left: -3rem;
  width: 2.5rem;
  text-align: right;
  color: var(--vp-c-text-3);
}

code {
  font-family: var(--vp-font-family-mono);
  font-size: 0.9rem;
  line-height: 1.5;
  tab-size: 2;
}

.highlight-lines {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  pointer-events: none;
}

.highlight-lines::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--vp-code-line-highlight-color);
  opacity: 0.1;
  mask-image: linear-gradient(
    transparent,
    transparent var(--highlight-lines)
  );
}

@media (max-width: 640px) {
  .copy-text {
    display: none;
  }
  
  .header-left {
    flex-wrap: wrap;
  }
}
</style>
