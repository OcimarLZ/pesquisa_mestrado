// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    }
});

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Logo click to return to top
document.addEventListener('DOMContentLoaded', function() {
    const logoHome = document.getElementById('logo-home');
    if (logoHome) {
        logoHome.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToTop();
        });
    }
});

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    const scrollBtn = document.querySelector('.scroll-to-top');
    if (scrollBtn) {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    }
});

// Main initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing navigation...');
    
    // Initialize subsection navigation
    initSubsectionNavigation();
    
    // Initialize back to intro buttons
    initBackToIntroButtons();
    
    // Initialize dropdown links
    initDropdownLinks();
    
    // Initialize development navigation with delay
    setTimeout(() => {
        console.log('Initializing development navigation after delay...');
        initDevelopmentNavigation();
    }, 500);
});

// Also try to initialize when window loads
window.addEventListener('load', function() {
    console.log('Window loaded, re-initializing development navigation...');
    setTimeout(() => {
        initDevelopmentNavigation();
    }, 100);
});

// Function for development section navigation
function initDevelopmentNavigation() {
    // Torna a função disponível globalmente
    window.initDevelopmentNavigation = initDevelopmentNavigation;
    
    const devBtns = document.querySelectorAll('.dev-nav-btn');
    const devSections = document.querySelectorAll('.dev-section');
    
    console.log('Development navigation initialized - Buttons:', devBtns.length, 'Sections:', devSections.length);
    
    devBtns.forEach((btn) => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.dataset.section;
            const targetElement = document.getElementById(section);
            
            console.log('Button clicked for section:', section, 'Found:', !!targetElement);
            
            if (targetElement) {
                // Remove active class from all buttons and sections
                devBtns.forEach(b => b.classList.remove('active'));
                devSections.forEach(s => s.classList.remove('active'));
                
                // Add active class to clicked button and corresponding section
                this.classList.add('active');
                targetElement.classList.add('active');
                
                console.log('Activated development section:', section);
                
                // Scroll to the development content area
                setTimeout(() => {
                    const developmentContent = document.querySelector('.development-content');
                    if (developmentContent) {
                        developmentContent.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }, 100);
            } else {
                console.error('Development target element not found:', section);
            }
        });
    });
}

// Function for subsection navigation
function initSubsectionNavigation() {
    const subsectionBtns = document.querySelectorAll('.subsection-btn');
    const subsectionContents = document.querySelectorAll('.subsection-content');
    
    console.log('Found', subsectionBtns.length, 'subsection buttons');
    console.log('Found', subsectionContents.length, 'subsection contents');
    
    subsectionBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const target = btn.getAttribute('data-target');
            const targetElement = document.getElementById(target);
            
            console.log('Clicked button for:', target);
            
            if (targetElement) {
                // Remove active class from all buttons and contents
                subsectionBtns.forEach(b => b.classList.remove('active'));
                subsectionContents.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked button and corresponding content
                btn.classList.add('active');
                targetElement.classList.add('active');
                
                console.log('Activated:', target);
                
                // Scroll to the section
                setTimeout(() => {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 100);
            } else {
                console.error('Target element not found:', target);
            }
        });
    });
}

// Function for back to intro buttons
function initBackToIntroButtons() {
    const backButtons = document.querySelectorAll('.back-to-intro');
    
    console.log('Found', backButtons.length, 'back buttons');
    
    backButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Activate the first button (A Pesquisa)
            const firstBtn = document.querySelector('.subsection-btn[data-target="a-pesquisa"]');
            const firstContent = document.getElementById('a-pesquisa');
            
            if (firstBtn && firstContent) {
                // Remove active from all
                document.querySelectorAll('.subsection-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.subsection-content').forEach(c => c.classList.remove('active'));
                
                // Activate the first
                firstBtn.classList.add('active');
                firstContent.classList.add('active');
                
                // Scroll to introduction section
                const introSection = document.getElementById('introducao');
                if (introSection) {
                    introSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Function for dropdown links
function initDropdownLinks() {
    const dropdownLinks = document.querySelectorAll('.dropdown-link');
    
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Special case for introduction - activate the first subsection
                if (targetId === 'introducao') {
                    const firstSubsectionBtn = document.querySelector('[data-target="a-pesquisa"]');
                    if (firstSubsectionBtn) {
                        firstSubsectionBtn.click();
                    }
                } else {
                    // For other sections, activate the corresponding subsection
                    const subsectionBtn = document.querySelector(`[data-target="${targetId}"]`);
                    if (subsectionBtn) {
                        subsectionBtn.click();
                    }
                }
                
                // Then scroll smoothly
                setTimeout(() => {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 100);
            }
        });
    });
}