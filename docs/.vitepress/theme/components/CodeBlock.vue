<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { PropType } from 'vue'

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
    type: Array as PropType<number[]>,
    default: () => []
  }
})

const codeContainer = ref<HTMLElement | null>(null)
const copied = ref(false)

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

onMounted(() => {
  if (typeof window !== 'undefined' && window.Prism) {
    if (codeContainer.value) {
      window.Prism.highlightElement(codeContainer.value)
    }
  }
})
</script>

<template>
  <div class="code-block">
    <div v-if="filename" class="code-header">
      <span class="filename">{{ filename }}</span>
      <button 
        class="copy-button"
        @click="copyCode"
        :class="{ copied }"
      >
        {{ copied ? 'Copied!' : 'Copy' }}
      </button>
    </div>
    
    <pre :class="`language-${language}`"><code
      ref="codeContainer"
      :class="`language-${language}`"
    >{{ code }}</code></pre>
    
    <div 
      v-if="highlightLines.length"
      class="highlight-lines"
      :style="{ '--highlight-lines': highlightLines.join(',') }"
    />
  </div>
</template>

<style scoped>
.code-block {
  position: relative;
  margin: 1rem 0;
  background: var(--vp-code-block-bg);
  border-radius: 8px;
  overflow: hidden;
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background: var(--vp-code-block-bg);
  border-bottom: 1px solid var(--vp-c-divider);
}

.filename {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  font-family: var(--vp-font-family-mono);
}

.copy-button {
  background: transparent;
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.25s;
}

.copy-button:hover {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.copy-button.copied {
  background: var(--vp-c-tip);
  border-color: var(--vp-c-tip);
  color: white;
}

pre {
  margin: 0;
  padding: 1.25rem;
  overflow-x: auto;
}

code {
  font-family: var(--vp-font-family-mono);
  font-size: 0.9rem;
  line-height: 1.5;
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
</style>
