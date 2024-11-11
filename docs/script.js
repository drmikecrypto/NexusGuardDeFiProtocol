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
// Modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('solutionsModal');
    const closeModal = document.getElementById('closeModal');
    const learnMoreButtons = document.querySelectorAll('a[href="#learn-more"]');

    function openModal() {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        modal.querySelector('.fixed').classList.add('modal-open');
    }

    function closeModalFunc() {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
        modal.querySelector('.fixed').classList.remove('modal-open');
    }

    // Open modal on Learn More click
    learnMoreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            openModal();
        });
    });

    // Close modal on close button click
    closeModal.addEventListener('click', closeModalFunc);

    // Close modal on backdrop click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModalFunc();
        }
    });

    // Close modal on ESC key press
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModalFunc();
        }
    });
});
