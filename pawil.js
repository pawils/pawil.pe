document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");
    const header = document.querySelector(".sticky-header");
    const sections = document.querySelectorAll("section[id]");

    // Toggle mobile menu
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }));

    // Sticky header background on scroll
    window.addEventListener("scroll", () => {
        if (window.scrollY > 80) { // Adjust this value as needed
            header.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
            header.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
        } else {
            header.style.backgroundColor = "#fff"; // Initial background
            header.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)"; // Mantener sombra inicial o quitarla
        }
    });

    // Scrollspy for navigation links
    function activateNavLink() {
        let currentSectionId = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                currentSectionId = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active-spy");
            if (link.getAttribute("href").includes(currentSectionId) && currentSectionId !== "") {
                link.classList.add("active-spy");
            }
        });
        // Special case for hero section or top of page
        if (currentSectionId === "hero" || window.pageYOffset < sections[0].offsetTop - sections[0].clientHeight / 3) {
            const homeLink = document.querySelector('.nav-link[href="#hero"]');
            if(homeLink) homeLink.classList.add("active-spy");
        }

    }
    window.addEventListener("scroll", activateNavLink);
    activateNavLink(); // Call on load

    // Simple form submission alert (replace with actual form handling)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('¡Gracias por tu mensaje! (Funcionalidad de envío no implementada en este demo).');
            contactForm.reset();
        });
    }

    // Add subtle scroll animations to sections (optional)
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of the item is visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                // observer.unobserve(entry.target); // Optional: stop observing after animation
            }
        });
    };

    const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);

    document.querySelectorAll('.section').forEach(section => {
        // Exclude hero for this type of animation, as it has its own
        if (section.id !== 'hero') {
            section.style.opacity = 0;
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            scrollObserver.observe(section);
        }
    });

});