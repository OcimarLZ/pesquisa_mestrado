// Sistema de carregamento modular de seções
class SectionLoader {
    constructor() {
        this.sections = {
            'introducao': 'sections/introducao.html',
            'metodologia': 'sections/metodologia.html',
            'fundamentacao': 'sections/fundamentacao.html',
            'desenvolvimento': 'sections/desenvolvimento.html',
            'consideracoes': 'sections/consideracoes.html',
            'referencias': 'sections/referencias.html'
        };
        this.loadedSections = new Set();
        this.init();
    }

    init() {
        // Carrega a seção de introdução por padrão
        this.loadSection('introducao');
        
        // Configura os event listeners para navegação
        this.setupNavigation();
    }

    async loadSection(sectionName) {
        if (this.loadedSections.has(sectionName)) {
            this.showSection(sectionName);
            return Promise.resolve();
        }

        try {
            const response = await fetch(this.sections[sectionName]);
            if (!response.ok) {
                throw new Error(`Erro ao carregar seção: ${response.status}`);
            }
            
            const html = await response.text();
            const container = document.getElementById('dynamic-content');
            
            // Adiciona o conteúdo da seção
            container.insertAdjacentHTML('beforeend', html);
            
            // Marca como carregada
            this.loadedSections.add(sectionName);
            
            // Mostra apenas esta seção
            this.showSection(sectionName);
            
            // Reinicializa os scripts necessários para a seção
            this.reinitializeScripts(sectionName);
            
        } catch (error) {
            console.error('Erro ao carregar seção:', error);
            this.showError(sectionName);
        }
    }

    showSection(sectionName) {
        // Esconde todas as seções
        const allSections = document.querySelectorAll('#dynamic-content .section');
        allSections.forEach(section => {
            section.style.display = 'none';
        });
        
        // Mostra apenas a seção solicitada
        const targetSection = document.getElementById(sectionName);
        if (targetSection) {
            targetSection.style.display = 'block';
        }
    }

    setupNavigation() {
        // Event listeners para links do menu principal
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (link) {
                e.preventDefault();
                const sectionId = link.getAttribute('href').substring(1);
                
                if (this.sections[sectionId]) {
                    this.loadSection(sectionId);
                    
                    // Atualiza a URL sem recarregar a página
                    history.pushState(null, null, `#${sectionId}`);
                    
                    // Rola para o topo da seção
                    setTimeout(() => {
                        const section = document.getElementById(sectionId);
                        if (section) {
                            section.scrollIntoView({ behavior: 'smooth' });
                        }
                    }, 100);
                }
            }
        });
        
        // Gerencia navegação do browser (botões voltar/avançar)
        window.addEventListener('popstate', () => {
            const hash = window.location.hash.substring(1);
            if (hash && this.sections[hash]) {
                this.loadSection(hash);
            }
        });
        
        // Carrega seção baseada na URL inicial
        const initialHash = window.location.hash.substring(1);
        if (initialHash && this.sections[initialHash]) {
            this.loadSection(initialHash);
        }
    }

    reinitializeScripts(sectionName) {
        // Reinicializa funcionalidades específicas baseadas na seção carregada
        switch (sectionName) {
            case 'introducao':
                // Reinicializa navegação de subseções
                if (window.initSubsectionNavigation) {
                    window.initSubsectionNavigation();
                }
                if (window.initBackToIntroButtons) {
                    window.initBackToIntroButtons();
                }
                if (window.initDropdownLinks) {
                    window.initDropdownLinks();
                }
                break;
            case 'desenvolvimento':
                // Reinicializa navegação de desenvolvimento
                console.log('Reinitializing development navigation...');
                if (window.initDevelopmentNavigation) {
                    setTimeout(() => {
                        window.initDevelopmentNavigation();
                    }, 100);
                }
                break;
            case 'metodologia':
                // Adicionar inicializações específicas para metodologia se necessário
                break;
            case 'referencias':
                // Adicionar inicializações específicas para referências se necessário
                break;
        }
    }

    showError(sectionName) {
        const container = document.getElementById('dynamic-content');
        const errorHtml = `
            <section id="${sectionName}" class="section">
                <div class="container">
                    <div class="section-header">
                        <h2 class="section-title">Erro ao Carregar Seção</h2>
                        <div class="section-divider"></div>
                    </div>
                    <div class="content-grid">
                        <div class="content-text">
                            <div class="error-card">
                                <h4><i class="fas fa-exclamation-triangle"></i> Seção Temporariamente Indisponível</h4>
                                <p>Não foi possível carregar o conteúdo desta seção. Tente novamente mais tarde.</p>
                                <button onclick="location.reload()" class="btn btn-primary">
                                    <i class="fas fa-refresh"></i> Recarregar Página
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
        container.insertAdjacentHTML('beforeend', errorHtml);
        this.loadedSections.add(sectionName);
        this.showSection(sectionName);
    }
}

// Inicializa o carregador de seções quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.sectionLoader = new SectionLoader();
});