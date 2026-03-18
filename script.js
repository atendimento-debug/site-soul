// Ativa animações de fade-in ao rolar a página
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in, .fade-in-up');

    // Opções do Intersection Observer
    const observerOptions = {
        threshold: 0.1 // Ativa quando 10% do elemento está visível
    };

    // Callback para quando os elementos cruzam o threshold
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Pára de observar depois que fica visível para não repetir
                observer.unobserve(entry.target);
            }
        });
    };

    // Cria o observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Começa a observar cada elemento de fade
    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // Ativa animação do hero logo de cara
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('is-visible');
    }
});
