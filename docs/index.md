<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NexusGuard Protocol - Enterprise DeFi Insurance</title>
    <style>
        :root {
            --primary: #2D3436;
            --secondary: #0984E3;
            --accent: #00B894;
            --background: #F8F9FA;
            --text: #2D3436;
            --card-bg: #FFFFFF;
            --border-radius: 12px;
            --transition: all 0.3s ease;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        body {
            background: var(--background);
            color: var(--text);
            line-height: 1.6;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }

        .hero {
            padding: 80px 0;
            text-align: center;
            background: linear-gradient(135deg, var(--primary) 0%, #4A90E2 100%);
            color: white;
        }

        .hero h1 {
            font-size: 3.5rem;
            margin-bottom: 20px;
            background: linear-gradient(45deg, #FFF 30%, #E0E0E0 90%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .hero p {
            font-size: 1.2rem;
            max-width: 600px;
            margin: 0 auto 40px;
            opacity: 0.9;
        }

        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            padding: 60px 0;
        }

        .feature-card {
            background: var(--card-bg);
            border-radius: var(--border-radius);
            padding: 30px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: var(--transition);
        }

        .feature-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
        }

        .feature-icon {
            font-size: 2.5rem;
            margin-bottom: 20px;
        }

        .feature-title {
            font-size: 1.5rem;
            margin-bottom: 15px;
            color: var(--primary);
        }

        .stats-section {
            background: var(--primary);
            color: white;
            padding: 60px 0;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 30px;
            text-align: center;
        }

        .stat-item h3 {
            font-size: 2.5rem;
            margin-bottom: 10px;
            color: var(--accent);
        }

        .cta-section {
            text-align: center;
            padding: 80px 0;
            background: var(--card-bg);
        }

        .button {
            display: inline-block;
            padding: 15px 30px;
            border-radius: var(--border-radius);
            text-decoration: none;
            transition: var(--transition);
            font-weight: 600;
            margin: 10px;
        }

        .button-primary {
            background: var(--secondary);
            color: white;
        }

        .button-secondary {
            background: transparent;
            color: var(--secondary);
            border: 2px solid var(--secondary);
        }

        .button:hover {
            transform: translateY(-2px);
            opacity: 0.9;
        }

        .roadmap-section {
            padding: 80px 0;
            background: var(--background);
        }

        .section-title {
            text-align: center;
            font-size: 2.5rem;
            margin-bottom: 60px;
            color: var(--primary);
        }

        .roadmap {
            position: relative;
            overflow: hidden;
        }

        .roadmap-container {
            position: relative;
            padding: 40px 0;
        }

        .roadmap-container::before {
            content: '';
            position: absolute;
            width: 4px;
            height: 100%;
            background: var(--secondary);
            left: 50%;
            transform: translateX(-50%);
            opacity: 0.3;
        }

        .roadmap-item {
            position: relative;
            margin-bottom: 60px;
            width: calc(50% - 30px);
            opacity: 0.7;
            transition: var(--transition);
        }

        .roadmap-item:hover {
            opacity: 1;
        }

        .roadmap-item:nth-child(odd) {
            margin-left: auto;
            padding-left: 40px;
        }

        .roadmap-item:nth-child(even) {
            padding-right: 40px;
        }

        .roadmap-item::before {
            content: '';
            position: absolute;
            width: 20px;
            height: 20px;
            background: var(--secondary);
            border-radius: 50%;
            top: 0;
        }

        .roadmap-item:nth-child(odd)::before {
            left: -10px;
        }

        .roadmap-item:nth-child(even)::before {
            right: -10px;
        }

        .roadmap-content {
            background: var(--card-bg);
            padding: 25px;
            border-radius: var(--border-radius);
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: var(--transition);
        }

        .roadmap-content:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
        }

        .roadmap-date {
            display: inline-block;
            padding: 5px 15px;
            background: var(--secondary);
            color: white;
            border-radius: 20px;
            font-size: 0.9rem;
            margin-bottom: 15px;
        }

        .roadmap-content h3 {
            margin-bottom: 15px;
            color: var(--primary);
        }

        .roadmap-content ul {
            list-style: none;
            padding: 0;
        }

        .roadmap-content li {
            margin-bottom: 8px;
            padding-left: 20px;
            position: relative;
        }

        .roadmap-content li::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: var(--secondary);
        }

        .roadmap-item.completed {
            opacity: 1;
        }

        .roadmap-item.completed .roadmap-content {
            border-left: 4px solid var(--accent);
        }

        .roadmap-item.active {
            opacity: 1;
        }

        .roadmap-item.active .roadmap-content {
            border-left: 4px solid var(--secondary);
        }

        @media (max-width: 768px) {
            .hero h1 {
                font-size: 2.5rem;
            }

            .features-grid {
                grid-template-columns: 1fr;
            }

            .stats-grid {
                grid-template-columns: 1fr;
            }

            .roadmap-container::before {
                left: 20px;
            }

            .roadmap-item {
                width: calc(100% - 50px);
                margin-left: 50px !important;
                padding-left: 30px !important;
                padding-right: 0 !important;
            }

            .roadmap-item::before {
                left: -40px !important;
            }

            .roadmap-content {
                padding: 15px;
            }
        }
    </style>
</head>
<body>
    <div id="app">
        <section class="hero">
            <div class="container">
                <h1>NexusGuard Protocol</h1>
                <p>Enterprise-Grade DeFi Insurance Protocol</p>
                <div class="hero-buttons">
                    <a href="#" class="button button-primary">Get Started</a>
                    <a href="#" class="button button-secondary">Documentation</a>
                </div>
            </div>
        </section>

        <section class="features">
            <div class="container">
                <div class="features-grid">
                    <div class="feature-card">
                        <div class="feature-icon">🛡️</div>
                        <h3 class="feature-title">Smart Contract Coverage</h3>
                        <p>Military-grade protection against vulnerabilities and exploits with real-time monitoring.</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">🤖</div>
                        <h3 class="feature-title">AI-Powered Risk Assessment</h3>
                        <p>Advanced machine learning models for real-time risk analysis and threat detection.</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">💎</div>
                        <h3 class="feature-title">Optimized Yield Generation</h3>
                        <p>Sophisticated yield strategies using ERC4626 vaults with dynamic rebalancing.</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="stats-section">
            <div class="container">
                <div class="stats-grid">
                    <div class="stat-item">
                        <h3>$50M+</h3>
                        <p>Total Value Locked</p>
                    </div>
                    <div class="stat-item">
                        <h3>99.99%</h3>
                        <p>System Uptime</p>
                    </div>
                    <div class="stat-item">
                        <h3>150%+</h3>
                        <p>Coverage Ratio</p>
                    </div>
                    <div class="stat-item">
                        <h3><2min</h3>
                        <p>Claim Processing</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="roadmap-section">
            <div class="container">
                <h2 class="section-title">Development Roadmap</h2>
                <div class="roadmap">
                    <div class="roadmap-container">
                        <!-- Q4 2023 -->
                        <div class="roadmap-item completed">
                            <div class="roadmap-content">
                                <div class="roadmap-date">Q4 2023</div>
                                <h3>Protocol Foundation</h3>
                                <ul>
                                    <li>✓ Core smart contract architecture</li>
                                    <li>✓ Risk assessment engine development</li>
                                    <li>✓ Basic coverage mechanisms</li>
                                    <li>✓ Initial security audits</li>
                                </ul>
                            </div>
                        </div>

                        <!-- Q1 2024 -->
                        <div class="roadmap-item active">
                            <div class="roadmap-content">
                                <div class="roadmap-date">Q1 2024</div>
                                <h3>Enhanced Features</h3>
                                <ul>
                                    <li>✓ AI-powered risk models</li>
                                    <li>✓ Advanced claim processing</li>
                                    <li>⟳ Cross-chain integration</li>
                                    <li>⟳ Governance framework</li>
                                </ul>
                            </div>
                        </div>

                        <!-- Q2 2024 -->
                        <div class="roadmap-item">
                            <div class="roadmap-content">
                                <div class="roadmap-date">Q2 2024</div>
                                <h3>Ecosystem Expansion</h3>
                                <ul>
                                    <li>Layer 2 deployment</li>
                                    <li>Partner integrations</li>
                                    <li>Advanced yield strategies</li>
                                    <li>DAO governance launch</li>
                                </ul>
                            </div>
                        </div>

                        <!-- Q3 2024 -->
                        <div class="roadmap-item">
                            <div class="roadmap-content">
                                <div class="roadmap-date">Q3 2024</div>
                                <h3>Protocol Optimization</h3>
                                <ul>
                                    <li>ZK-proof implementation</li>
                                    <li>Advanced risk models</li>
                                    <li>Institutional features</li>
                                    <li>Performance optimization</li>
                                </ul>
                            </div>
                        </div>

                        <!-- Q4 2024 -->
                        <div class="roadmap-item">
                            <div class="roadmap-content">
                                <div class="roadmap-date">Q4 2024</div>
                                <h3>Enterprise Scale</h3>
                                <ul>
                                    <li>Enterprise partnerships</li>
                                    <li>Advanced analytics</li>
                                    <li>Global expansion</li>
                                    <li>Additional chain support</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="cta-section">
            <div class="container">
                <h2>Ready to Secure Your DeFi Protocol?</h2>
                <p>Get started with NexusGuard Protocol today</p>
                <div class="cta-buttons">
                    <a href="#" class="button button-primary">Start Integration</a>
                    <a href="#" class="button button-secondary">Contact Team</a>
                </div>
            </div>
        </section>
    </div>
</body>
</html>
