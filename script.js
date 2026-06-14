document.addEventListener("DOMContentLoaded", function() {
    
    // --- 1. MOBILE NAVIGATION MENU ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const links = document.querySelectorAll('.nav-links li a');

    // Toggle menu on click
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Transform hamburger to 'X'
        hamburger.classList.toggle('toggle');
    });

    // Close menu when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // --- 2. STICKY NAVBAR EFFECT ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 20px';
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.padding = '15px 20px';
            navbar.style.boxShadow = 'none';
        }
    });

    // --- 3. MODAL (POPUP) LOGIC ---
    const modal = document.getElementById("enrollModal");
    const openBtns = [document.getElementById("openModalBtn"), document.getElementById("navEnrollBtn")];
    const closeBtn = document.querySelector(".close-btn");
    const form = document.getElementById("enrollmentForm");
    const successMsg = document.getElementById("successMessage");

    // Open Modal (From Hero or Nav)
    openBtns.forEach(btn => {
        if(btn) {
            btn.addEventListener("click", () => {
                modal.style.display = "block";
                navLinks.classList.remove('active'); // Close mobile menu if open
            });
        }
    });

    // Close Modal
    const closeModal = () => {
        modal.style.display = "none";
        form.style.display = "block"; 
        successMsg.classList.add("hidden");
        form.reset();
    };

    if(closeBtn) closeBtn.addEventListener("click", closeModal);

    window.addEventListener("click", (event) => {
        if (event.target == modal) closeModal();
    });

    // Form Submit Simulation
    if(form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault(); 
            form.style.display = "none";
            successMsg.classList.remove("hidden");
            setTimeout(closeModal, 3500); // Auto close after 3.5s
        });
    }

    // --- 4. SCROLL ANIMATIONS ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));
});