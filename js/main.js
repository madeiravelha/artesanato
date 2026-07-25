/**
 * SCRIPT PRINCIPAL - MADEIRA VELHA ARTESANATO E SOUVENIRS
 * Implementação limpa de Menu Responsivo, Sanfona de FAQ, Lightbox Nativo e Utilitários.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. GERENCIADOR DO MENU RESPONSIVO (HAMBURGUER)
    // ==========================================
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('open');
            
            // Mudança visual no botão hamburguer ao abrir
            const spans = menuToggle.querySelectorAll('span');
            if (mainNav.classList.contains('open')) {
                spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(6px, -7px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Fecha o menu automaticamente se clicar em alguma opção interna
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('open');
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // ==========================================
    // 2. SISTEMA ACCORDION PARA O FAQ (20 PERGUNTAS)
    // ==========================================
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(button => {
        button.addEventListener('click', () => {
            const currentItem = button.parentElement;
            const isAlreadyActive = currentItem.classList.contains('active');
            
            // Fecha todas as outras respostas abertas para manter a organização limpa
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Se não estava ativo, abre o atual
            if (!isAlreadyActive) {
                currentItem.classList.add('active');
            }
        });
    });

    // ==========================================
    // 3. GALERIA LIGHTBOX NATIVO E DE ALTO DESEMPENHO
    // ==========================================
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');

    if (galleryItems.length > 0 && lightboxModal && lightboxImg && lightboxClose) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const targetImage = item.querySelector('img');
                if (targetImage) {
                    // Carrega a imagem original em alta resolução no modal
                    lightboxImg.src = targetImage.src;
                    lightboxImg.alt = targetImage.alt;
                    lightboxModal.style.display = 'flex';
                }
            });
        });

        // Evento para fechar clicando no botão X
        lightboxClose.addEventListener('click', () => {
            lightboxModal.style.display = 'none';
            lightboxImg.src = ''; // Limpa para liberar memória do navegador
        });

        // Evento para fechar clicando fora da imagem (no fundo preto)
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                lightboxModal.style.display = 'none';
                lightboxImg.src = '';
            }
        });
    }
    
    // ==========================================
    // 4. TRATAMENTO ADICIONAL PARA ROLAGEM SUAVE
    // ==========================================
    // O navegador já processa via CSS (scroll-behavior: smooth), 
    // mas garantimos suporte a links de âncoras locais.
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});