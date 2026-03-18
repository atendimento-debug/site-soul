/* --- script.js - Lógica Completa e Dinâmica para o Efeito de Scroll --- */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. SELEÇÃO DE ELEMENTOS PARA O EFEITO DO TOPO (HERO) ---
    const hero = document.querySelector('.hero');
    const heroBg = document.querySelector('.hero-bg');
    const heroContent = document.querySelector('.hero-content');

    // Se os elementos não existirem, encerra para evitar erros
    if (!hero || !heroBg || !heroContent) return; 

    // Define os fatores de velocidade da animação (ajuste aqui!)
    const imageZoomSpeed = 0.001; // Velocidade com que a imagem aumenta
    const textScaleSpeed = 0.005; // Velocidade com que o texto aumenta
    const heroHeight = hero.offsetHeight; // Altura fixa do container (300px)

    // --- 2. FUNÇÃO QUE APLICA OS EFEITOS BASEADO NO SCROLL ---
    window.addEventListener('scroll', () => {
        // Quantos pixels a página rolou para baixo
        const scrollPosition = window.scrollY;

        // Se o scroll estiver dentro ou próximo da área do hero
        if (scrollPosition < heroHeight + 100) { 
            
            // --- A) EFEITO DA IMAGEM: Aumentar / Zoom-in ---
            // Como funciona e diminui o zoom inicialmente: 
            // Começamos o scale em 1 (tamanho real). 
            // Conforme o scrollPosition aumenta, o scale aumenta suavemente.
            const imageScale = 1 + scrollPosition * imageZoomSpeed;
            heroBg.style.transform = `scale(${imageScale})`;

            // --- B) EFEITO DO TEXTO: Aumentar e Desaparecer ---
            // O nome "GRUPO SOUL..." deve aumentar até sumir:
            // O scale do texto aumenta mais rápido que o da imagem.
            const textScale = 1 + scrollPosition * textScaleSpeed;
            
            // A opacidade diminui (fade-out) conforme o texto aumenta.
            // Quando scrollPosition atingir heroHeight, a opacidade vira 0.
            let textOpacity = 1 - (scrollPosition / heroHeight);

            // Garante que a opacidade não fique negativa
            textOpacity = textOpacity < 0 ? 0 : textOpacity;

            // Aplica as transformações no texto
            heroContent.style.transform = `scale(${textScale})`;
            heroContent.style.transform += `translateY(${-scrollPosition / 2}px)`; // Move o texto para cima suavemente
            heroContent.style.opacity = textOpacity;

            // Para quando sumir na tela, garantir que não seja clicável
            if (textOpacity === 0) {
                heroContent.style.visibility = 'hidden';
                heroContent.style.pointerEvents = 'none';
            } else {
                heroContent.style.visibility = 'visible';
                heroContent.style.pointerEvents = 'auto';
            }
        }
    });

    // --- 3. SELEÇÃO DE ELEMENTOS PARA ANIMAÇÕES DE ENTRADA (FADE-IN) ---
    const fadeElements = document.querySelectorAll('.fade-in, .fade-in-up');

    // Configuração do Intersection Observer (não mude!)
    const observerOptions = {
        threshold: 0.1 // Ativa quando 10% do elemento está visível
    };

    // Callback para quando os elementos entram na tela
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // Ativa animação do hero logo de cara (caso não esteja no topo)
    if (heroContent && window.scrollY < heroHeight) {
        heroContent.classList.add('is-visible');
    }
});
