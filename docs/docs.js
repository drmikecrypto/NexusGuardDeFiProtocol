// docs.js

const documentationContent = {
    'introduction': {
        title: 'Introduction',
        content: `
            <h2 class="text-3xl font-bold mb-6">Introduction to NexusGuard</h2>
            <div class="space-y-6">
                <div class="bg-white p-6 rounded-lg shadow-sm">
                    <p class="text-gray-600 mb-4">
                        NexusGuard introduces a pioneering decentralized insurance protocol 
                        specifically engineered for DeFi projects on the Sonic blockchain. By
                        implementing advanced risk assessment models, dynamic premium
                        calculations, and decentralized governance, the protocol provides
                        comprehensive coverage against smart contract vulnerabilities, technical
                        failures, and other DeFi-specific risks.
                    </p>
                </div>

                <div class="bg-white p-6 rounded-lg shadow-sm">
                    <h3 class="text-2xl font-bold mb-4">The DeFi Insurance Challenge</h3>
                    <p class="text-gray-600 mb-4">
                        The exponential growth of decentralized finance has created an urgent
                        need for robust insurance solutions. Current challenges include:
                    </p>
                    <ul class="list-disc pl-6 text-gray-600">
                        <li>Smart contract vulnerabilities</li>
                        <li>Oracle failures</li>
                        <li>Governance attacks</li>
                        <li>Flash loan exploits</li>
                        <li>Cross-chain bridge failures</li>
                        <li>Protocol-specific risks</li>
                    </ul>
                </div>
            </div>
        `
    },
    'protocol-overview': {
        title: 'Protocol Architecture',
        content: `
            <h2 class="text-3xl font-bold mb-6">Protocol Architecture</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="bg-white p-6 rounded-lg shadow-sm">
                    <h3 class="text-xl font-bold mb-4">Core Components</h3>
                    <div class="space-y-4">
                        <div>
                            <h4 class="font-semibold">Storage Layer</h4>
                            <p class="text-gray-600">State management and persistence</p>
                        </div>
                        <div>
                            <h4 class="font-semibold">Insurance Layer</h4>
                            <p class="text-gray-600">Coverage and claims processing</p>
                        </div>
                        <div>
                            <h4 class="font-semibold">Governance Layer</h4>
                            <p class="text-gray-600">Protocol management and voting</p>
                        </div>
                    </div>
                </div>
                <div class="bg-white p-6 rounded-lg shadow-sm">
                    <h3 class="text-xl font-bold mb-4">Technical Features</h3>
                    <ul class="space-y-2 text-gray-600">
                        <li>• Proxy-based upgradeability</li>
                        <li>• Role-based access control</li>
                        <li>• Comprehensive reentrancy protection</li>
                        <li>• Emergency pause functionality</li>
                        <li>• Optimized gas consumption</li>
                    </ul>
                </div>
            </div>
        `
    },
    // Add more sections following the same pattern
};

// Initialize Documentation
document.addEventListener('DOMContentLoaded', function() {
    // Load default content
    loadContent('#introduction');
    
    // Add click handlers to navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = e.currentTarget.getAttribute('href');
            loadContent(section);
            
            // Update active state
            document.querySelectorAll('.nav-link').forEach(navLink => {
                navLink.classList.remove('active', 'text-blue-600');
            });
            e.currentTarget.classList.add('active', 'text-blue-600');
        });
    });

    // FAQ Toggle
    const faqToggle = document.querySelector('.faq-toggle');
    const faqQuestions = document.querySelector('.faq-questions');
    const faqArrow = faqToggle.querySelector('svg');

    faqToggle.addEventListener('click', () => {
        faqQuestions.classList.toggle('hidden');
        faqArrow.classList.toggle('rotate-180');
    });
});

// Load Content Function
function loadContent(section) {
    const sectionId = section.replace('#', '');
    const content = documentationContent[sectionId];
    if (content) {
        const mainContent = document.getElementById('mainContent');
        
        // Add loading animation
        mainContent.classList.add('loading');
        
        setTimeout(() => {
            mainContent.innerHTML = content.content;
            mainContent.classList.remove('loading');
            
            // Scroll to top of content
            mainContent.scrollIntoView({ behavior: 'smooth' });
        }, 200);
    }
}
