// docs.js

// Documentation Content Data
const documentationContent = {
    'introduction': {
        title: 'Introduction',
        content: `
            <h2 class="text-3xl font-bold mb-6">Introduction to NexusGuard</h2>
            <p class="text-gray-600 mb-4">
                NexusGuard introduces a pioneering decentralized insurance protocol 
                specifically engineered for DeFi projects on the Sonic blockchain.
            </p>
            <div class="mt-6 space-y-4">
                <h3 class="text-2xl font-bold">The DeFi Insurance Challenge</h3>
                <p class="text-gray-600">
                    The exponential growth of decentralized finance has created an urgent
                    need for robust insurance solutions. As the DeFi ecosystem expands,
                    traditional insurance models have proven inadequate in addressing the
                    unique challenges posed by blockchain-based financial protocols.
                </p>
                <ul class="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Smart contract vulnerabilities</li>
                    <li>Oracle failures</li>
                    <li>Governance attacks</li>
                    <li>Flash loan exploits</li>
                    <li>Cross-chain bridge failures</li>
                </ul>
            </div>
        `
    },
    'protocol-overview': {
        title: 'Protocol Overview',
        content: `
            <h2 class="text-3xl font-bold mb-6">Protocol Overview</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="bg-white p-6 rounded-lg shadow-sm">
                    <h3 class="text-xl font-bold mb-4">Core Components</h3>
                    <ul class="space-y-2 text-gray-600">
                        <li>• Storage Layer</li>
                        <li>• Insurance Layer</li>
                        <li>• Governance Layer</li>
                        <li>• Core Protocol</li>
                    </ul>
                </div>
                <div class="bg-white p-6 rounded-lg shadow-sm">
                    <h3 class="text-xl font-bold mb-4">Key Features</h3>
                    <ul class="space-y-2 text-gray-600">
                        <li>• Dynamic Risk Assessment</li>
                        <li>• Automated Claims</li>
                        <li>• Yield Generation</li>
                        <li>• Decentralized Governance</li>
                    </ul>
                </div>
            </div>
        `
    },
    'architecture': {
        title: 'Technical Architecture',
        content: `
            <h2 class="text-3xl font-bold mb-6">Technical Architecture</h2>
            <div class="space-y-6">
                <div class="bg-white p-6 rounded-lg shadow-sm">
                    <h3 class="text-xl font-bold mb-4">Smart Contract Architecture</h3>
                    <pre class="bg-gray-100 p-4 rounded overflow-x-auto">
<code>contract NexusGuardDeFiProtocolV1 {
    using SafeERC20Upgradeable for IERC20Upgradeable;
    
    struct ProtocolState {
        bool isActive;
        uint256 lastUpdateBlock;
        uint256 totalValueLocked;
        uint256 totalCoverage;
        uint256 healthFactor;
    }
    
    // Contract implementation...
}</code></pre>
                </div>
            </div>
        `
    },
    // Add more sections as needed
};

// Load Content Function
function loadContent(section) {
    const sectionId = section.replace('#', '');
    const content = documentationContent[sectionId];
    if (content) {
        const mainContent = document.getElementById('mainContent');
        mainContent.innerHTML = content.content;
    }
}

// Initialize Documentation
document.addEventListener('DOMContentLoaded', function() {
    // Load default content (introduction)
    loadContent('#introduction');

    // Add click handlers to navigation links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = e.currentTarget.getAttribute('href');
            loadContent(section);
            
            // Update active state
            document.querySelectorAll('.nav-link').forEach(navLink => {
                navLink.classList.remove('text-blue-600');
            });
            e.currentTarget.classList.add('text-blue-600');
        });
    });
});
