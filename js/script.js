/**
 * Portfolio Website Script
 * Dewi Naziyah - Mahasiswa Informatika
 */

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // 1. MOBILE MENU TOGGLE
    // ==========================================================================
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('show');
        });

        // Close menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('show');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove('show');
            }
        });
    }

    // ==========================================================================
    // 2. STICKY HEADER & BACK TO TOP BUTTON
    // ==========================================================================
    const header = document.getElementById('header');
    const backToTopBtn = document.getElementById('back-to-top');

    const handleScroll = () => {
        const scrollY = window.scrollY;

        // Sticky Header
        if (scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }

        // Back to top visibility
        if (scrollY > 400) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    };

    window.addEventListener('scroll', handleScroll);

    // Scroll to Top action
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==========================================================================
    // 3. DARK MODE TOGGLE (WITH LOCALSTORAGE PERSISTENCE)
    // ==========================================================================
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check if dark theme preference exists in localStorage
    const savedTheme = localStorage.getItem('theme');
    const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && userPrefersDark)) {
        body.classList.add('dark-theme');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-theme');
            
            // Save preference
            if (body.classList.contains('dark-theme')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // ==========================================================================
    // 4. TYPING EFFECT (HERO SECTION)
    // ==========================================================================
    const typingTextEl = document.getElementById('typing-text');
    if (typingTextEl) {
        const words = [
            "Mahasiswa Informatika",
            "Web Developer",
            "Database Enthusiast"
        ];
        let wordIdx = 0;
        let charIdx = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        const type = () => {
            const currentWord = words[wordIdx];
            
            if (isDeleting) {
                // Remove character
                typingTextEl.textContent = currentWord.substring(0, charIdx - 1);
                charIdx--;
                typingSpeed = 50; // Faster deleting speed
            } else {
                // Add character
                typingTextEl.textContent = currentWord.substring(0, charIdx + 1);
                charIdx++;
                typingSpeed = 120; // Natural typing speed
            }

            // Word completed typing
            if (!isDeleting && charIdx === currentWord.length) {
                isDeleting = true;
                typingSpeed = 2000; // Pause at end of word
            } 
            // Word completely deleted
            else if (isDeleting && charIdx === 0) {
                isDeleting = false;
                wordIdx = (wordIdx + 1) % words.length;
                typingSpeed = 500; // Pause before typing next word
            }

            setTimeout(type, typingSpeed);
        };

        // Start typing loop
        setTimeout(type, 1000);
    }

    // ==========================================================================
    // 5. SCROLL REVEAL & SKILLS PROGRESS ANIMATION
    // ==========================================================================
    const revealElements = document.querySelectorAll('.reveal');
    const skillProgressBars = document.querySelectorAll('.skill-progress');

    // Create an Intersection Observer
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // If it is the skills section, animate the progress bars
                if (entry.target.id === 'skills' || entry.target.contains(document.querySelector('.skill-card'))) {
                    animateSkillBars();
                }
            }
        });
    }, {
        threshold: 0.15, // Trigger when 15% of element is visible
        rootMargin: '0px 0px -50px 0px' // Offset trigger point slightly
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    const animateSkillBars = () => {
        skillProgressBars.forEach(bar => {
            // Read target width from CSS custom variable
            const targetWidth = bar.style.getPropertyValue('--width').trim();
            if (targetWidth) {
                bar.style.width = targetWidth;
            }
        });
    };

    // ==========================================================================
    // 6. ACTIVE NAVBAR LINK ON SCROLL
    // ==========================================================================
    const sections = document.querySelectorAll('section[id]');
    
    const highlightActiveSection = () => {
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 120; // Adjustment for navbar offset
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active-link');
                } else {
                    navLink.classList.remove('active-link');
                }
            }
        });
    };

    window.addEventListener('scroll', highlightActiveSection);

    // ==========================================================================
    // 7. CONTACT FORM VALIDATION & FEEDBACK
    // ==========================================================================
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm && formFeedback) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Clear previous feedback states
            formFeedback.textContent = '';
            formFeedback.className = 'form-feedback';

            // Extract input values safely
            const nameVal = contactForm.elements['name'].value.trim();
            const emailVal = contactForm.elements['email'].value.trim();
            const messageVal = contactForm.elements['message'].value.trim();

            // 1. Mandatory Fields Validation
            if (!nameVal || !emailVal || !messageVal) {
                showFeedback("Semua field wajib diisi!", "error");
                return;
            }

            // 2. Email Format Validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailVal)) {
                showFeedback("Masukkan alamat email yang valid!", "error");
                return;
            }

            // 3. Message character limit (defense against flood/extremely large payloads)
            if (messageVal.length > 2000) {
                showFeedback("Pesan terlalu panjang (maksimum 2000 karakter).", "error");
                return;
            }

            // Mock success submission (in real app this sends to backend/BFF endpoint)
            showFeedback(`Terima kasih, ${nameVal}! Pesan Anda telah berhasil dikirim.`, "success");
            
            // Clear the form fields upon success
            contactForm.reset();
        });

        // Safe helper to show feedback without vulnerability of DOM insertion (anti-XSS)
        const showFeedback = (message, type) => {
            formFeedback.textContent = message; // Safe injection as plain text
            formFeedback.classList.add(type);
        };
    }

    // ==========================================================================
    // 8. FOOTER DYNAMIC YEAR & DOWNLOAD CV TRIGGER
    // ==========================================================================
    const footerYearEl = document.getElementById('footer-year');
    if (footerYearEl) {
        footerYearEl.textContent = new Date().getFullYear();
    }

    // Interactive CV download notification
    const downloadCvBtn = document.getElementById('download-cv-btn');
    if (downloadCvBtn) {
        downloadCvBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Secure Modal Alternative to native alert() which blocks browser thread
            const modalContainer = document.createElement('div');
            modalContainer.style.position = 'fixed';
            modalContainer.style.top = '0';
            modalContainer.style.left = '0';
            modalContainer.style.width = '100vw';
            modalContainer.style.height = '100vh';
            modalContainer.style.backgroundColor = 'rgba(15, 23, 42, 0.6)';
            modalContainer.style.display = 'flex';
            modalContainer.style.justifyContent = 'center';
            modalContainer.style.alignItems = 'center';
            modalContainer.style.zIndex = '9999';
            
            const modalBox = document.createElement('div');
            modalBox.style.backgroundColor = 'var(--bg-container)';
            modalBox.style.color = 'var(--text-title)';
            modalBox.style.padding = '2rem';
            modalBox.style.borderRadius = 'var(--border-radius-md)';
            modalBox.style.maxWidth = '400px';
            modalBox.style.width = '90%';
            modalBox.style.boxShadow = 'var(--shadow-lg)';
            modalBox.style.border = '1px solid var(--border-color)';
            modalBox.style.textAlign = 'center';
            
            const title = document.createElement('h3');
            title.textContent = "Unduh CV";
            title.style.marginBottom = '1rem';
            
            const desc = document.createElement('p');
            desc.textContent = "File CV Anda akan diunduh secara otomatis. (Ini adalah simulasi mockup CV Dewi Naziyah).";
            desc.style.marginBottom = '1.5rem';
            desc.style.fontSize = '0.95rem';
            desc.style.color = 'var(--text-body)';
            
            const closeBtn = document.createElement('button');
            closeBtn.className = 'btn btn-primary';
            closeBtn.textContent = 'Tutup';
            closeBtn.style.padding = '0.5rem 1.5rem';
            
            closeBtn.addEventListener('click', () => {
                document.body.removeChild(modalContainer);
            });
            
            modalBox.appendChild(title);
            modalBox.appendChild(desc);
            modalBox.appendChild(closeBtn);
            modalContainer.appendChild(modalBox);
            document.body.appendChild(modalContainer);
        });
    }
});
