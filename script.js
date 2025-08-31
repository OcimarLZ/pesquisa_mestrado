// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
    // Inicialização dos componentes
    initializeNavigation();
    initializeScrollEffects();
    initializeModals();
    initializeCharts();
    initializeAnimations();
    
    // O sistema modular é inicializado automaticamente pelo section-loader.js
    
    // Disponibiliza funções globalmente para o sistema modular
    window.initSubsectionNavigation = initSubsectionNavigation;
    window.initBackToIntroButtons = initBackToIntroButtons;
    window.initDropdownLinks = initDropdownLinks;
});

// Função para navegação de subseções
function initSubsectionNavigation() {
    const subsectionBtns = document.querySelectorAll('.subsection-btn');
    const subsectionContents = document.querySelectorAll('.subsection-content');
    
    subsectionBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const target = btn.getAttribute('data-target');
            const targetElement = document.getElementById(target);
            
            if (targetElement) {
                // Remove active class from all buttons and contents
                subsectionBtns.forEach(b => b.classList.remove('active'));
                subsectionContents.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked button and corresponding content
                btn.classList.add('active');
                targetElement.classList.add('active');
                
                // Scroll to the section
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

// Função para botões de voltar à introdução
function initBackToIntroButtons() {
    const backButtons = document.querySelectorAll('.back-to-intro');
    
    backButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            if (window.sectionLoader) {
                window.sectionLoader.loadSection('introducao');
            }
        });
    });
}

// Função para links dropdown
function initDropdownLinks() {
    const dropdownLinks = document.querySelectorAll('.dropdown-link');
    
    dropdownLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            
            if (href.startsWith('#')) {
                const sectionId = href.substring(1);
                
                // Se for uma subseção da introdução
                if (['a-pesquisa', 'motivacao', 'relevancia', 'questoes', 'objetivos'].includes(sectionId)) {
                    if (window.sectionLoader) {
                        window.sectionLoader.loadSection('introducao').then(() => {
                            setTimeout(() => {
                                const element = document.getElementById(sectionId);
                                if (element) {
                                    element.scrollIntoView({ behavior: 'smooth' });
                                }
                            }, 200);
                        });
                    }
                } else {
                    // Para outras seções
                    if (window.sectionLoader) {
                        window.sectionLoader.loadSection(sectionId);
                    }
                }
            }
        });
    });
}

// Navegação e Menu
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    // Toggle do menu mobile
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Dropdown menus
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdown = this.parentElement;
            dropdown.classList.toggle('active');
        });
    });
    
    // Fechar dropdown ao clicar fora
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
    
    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Efeitos de Scroll
function initializeScrollEffects() {
    const header = document.querySelector('.header');
    const backToTopBtn = document.getElementById('back-to-top');
    
    // Header fixo com efeito de transparência
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header?.classList.add('scrolled');
            backToTopBtn?.classList.add('visible');
        } else {
            header?.classList.remove('scrolled');
            backToTopBtn?.classList.remove('visible');
        }
    });
    
    // Botão voltar ao topo
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Animações de entrada
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    document.querySelectorAll('.section, .card, .hero-card').forEach(el => {
        observer.observe(el);
    });
}

// Modais
function initializeModals() {
    const imageModal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const modalCaption = document.getElementById('modal-caption');
    const closeButtons = document.querySelectorAll('.modal .close');
    
    // Abrir modal de imagem
    document.querySelectorAll('img[data-modal]').forEach(img => {
        img.addEventListener('click', function() {
            if (imageModal && modalImage && modalCaption) {
                modalImage.src = this.src;
                modalCaption.textContent = this.alt;
                imageModal.style.display = 'block';
            }
        });
    });
    
    // Fechar modais
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });
    
    // Fechar modal ao clicar fora
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
}

// Gráficos (Chart.js)
function initializeCharts() {
    // Verificar se Chart.js está disponível
    if (typeof Chart === 'undefined') {
        return;
    }
    
    // Configurações padrão para todos os gráficos
    Chart.defaults.font.family = 'Inter, sans-serif';
    Chart.defaults.color = '#64748b';
    
    // Inicializar gráficos específicos quando necessário
    initializeSpecificCharts();
}

function initializeSpecificCharts() {
    // Gráfico de evolução de matrículas
    const matriculasCtx = document.getElementById('matriculasChart');
    if (matriculasCtx) {
        new Chart(matriculasCtx, {
            type: 'line',
            data: {
                labels: ['2005', '2010', '2015', '2020', '2024'],
                datasets: [{
                    label: 'EaD',
                    data: [25000, 150000, 450000, 850000, 1200000],
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.4
                }, {
                    label: 'Presencial',
                    data: [800000, 950000, 1100000, 1050000, 980000],
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Evolução das Matrículas em Licenciaturas'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Gráfico de distribuição por região
    const regiaoCtx = document.getElementById('regiaoChart');
    if (regiaoCtx) {
        new Chart(regiaoCtx, {
            type: 'doughnut',
            data: {
                labels: ['Sudeste', 'Nordeste', 'Sul', 'Centro-Oeste', 'Norte'],
                datasets: [{
                    data: [45, 25, 15, 10, 5],
                    backgroundColor: [
                        '#3b82f6',
                        '#10b981',
                        '#f59e0b',
                        '#ef4444',
                        '#8b5cf6'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Distribuição de Matrículas EaD por Região (%)'
                    }
                }
            }
        });
    }
}

// Animações
function initializeAnimations() {
    // Contador animado
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString();
            }
        }
        
        updateCounter();
    }
    
    // Observar contadores
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.target);
                animateCounter(counter, target);
                counterObserver.unobserve(counter);
            }
        });
    });
    
    document.querySelectorAll('[data-target]').forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Utilitários
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Função para mostrar detalhes dos capítulos (se necessário)
function showChapterDetails(chapterNumber) {
    const modal = document.getElementById('chapterModal');
    const modalBody = document.getElementById('modalBody');
    
    if (modal && modalBody) {
        // Conteúdo específico para cada capítulo
        const chapterContent = {
            1: '<h3>Capítulo 1: Fundamentação Conceitual</h3><p>Detalhes sobre a fundamentação conceitual...</p>',
            2: '<h3>Capítulo 2: Análise Metodológica</h3><p>Detalhes sobre a metodologia...</p>',
            3: '<h3>Capítulo 3: Resultados e Discussão</h3><p>Detalhes sobre os resultados...</p>',
            4: '<h3>Capítulo 4: Implicações Práticas</h3><p>Detalhes sobre as implicações...</p>'
        };
        
        modalBody.innerHTML = chapterContent[chapterNumber] || '<p>Conteúdo não encontrado.</p>';
        modal.style.display = 'block';
    }
}

// Exportar funções para uso global
window.showChapterDetails = showChapterDetails;
window.showNotification = showNotification;