// FAQ Data Structure
const faqData = [
    {
        id: 'general-1',
        question: 'What is NexusGuard Protocol?',
        answer: 'NexusGuard is a decentralized insurance protocol built on Sonic blockchain that provides comprehensive coverage against smart contract vulnerabilities, technical failures, and other DeFi-specific risks.'
    },
    {
        id: 'coverage-1',
        question: 'What types of coverage are available?',
        answer: 'We offer coverage for smart contract vulnerabilities, oracle failures, governance attacks, bridge failures, and impermanent loss protection.'
    },
    {
        id: 'token-1',
        question: 'How does the GUARD token work?',
        answer: 'The GUARD token is the governance and utility token of the protocol, used for staking, voting, and receiving protocol rewards.'
    },
    // Add more FAQ items here
];

// Initialize Documentation
document.addEventListener('DOMContentLoaded', function() {
    initializeFAQ();
    setupEventListeners();
});

// Initialize FAQ Section
function initializeFAQ() {
    const faqContainer = document.querySelector('.faq-questions');
    
    faqData.forEach(faq => {
        const faqElement = createFAQElement(faq);
        faqContainer.appendChild(faqElement);
    });
}

// Create FAQ Element
function createFAQElement(faq) {
    const div = document.createElement('div');
    div.className = 'faq-item';
    div.innerHTML = `
        <button class="faq-question w-full text-left" data-id="${faq.id}">
            ${faq.question}
        </button>
    `;
    return div;
}

// Setup Event Listeners
function setupEventListeners() {
    // FAQ Toggle
    const faqToggle = document.querySelector('.faq-toggle');
    const faqQuestions = document.querySelector('.faq-questions');
    const faqArrow = faqToggle.querySelector('svg');

    faqToggle.addEventListener('click', () => {
        faqQuestions.classList.toggle('hidden');
        faqArrow.classList.toggle('rotate-arrow');
    });

    // FAQ Questions
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', (e) => {
            const faqId = e.currentTarget.dataset.id;
            const faq = faqData.find(f => f.id === faqId);
            if (faq) {
                displayAnswer(faq);
            }
        });
    });
}

// Display Answer in Main Content
function displayAnswer(faq) {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
        <section class="content-section">
            <h2 class="text-2xl font-bold mb-4">FAQ</h2>
            <div class="faq-content">
                <h3 class="text-xl font-semibold mb-3">${faq.question}</h3>
                <div class="answer-section">
                    ${faq.answer}
                </div>
            </div>
        </section>
    `;
}

// Navigation Handler
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        // Handle navigation content loading here
        loadContent(e.currentTarget.getAttribute('href'));
    });
});

// Load Content Function
function loadContent(section) {
    // Add your content loading logic here
    console.log(`Loading content for section: ${section}`);
}
