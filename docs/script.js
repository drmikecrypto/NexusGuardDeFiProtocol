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
