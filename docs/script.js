// Animation for headers
document.addEventListener('DOMContentLoaded', function() {
    const headers = document.querySelectorAll('.animate-header');
    headers.forEach(header => {
        header.style.opacity = '0';
        header.style.transform = 'translateY(20px)';
        setTimeout(() => {
            header.style.transition = 'all 0.8s ease-out';
            header.style.opacity = '1';
            header.style.transform = 'translateY(0)';
        }, 100);
    });

    // Animate features on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < window.innerHeight - 100) {
                element.classList.add('animate-active');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
});

// Roadmap animations
document.addEventListener('DOMContentLoaded', function() {
    const roadmapItems = document.querySelectorAll('.roadmap-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate list items
                const listItems = entry.target.querySelectorAll('.fade-in-item');
                listItems.forEach((item, index) => {
                    item.style.animationDelay = `${index * 0.2}s`;
                });
            }
        });
    }, {
        threshold: 0.3
    });

    roadmapItems.forEach(item => observer.observe(item));
});
