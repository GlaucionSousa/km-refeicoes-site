document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelector('.slider-wrapper');
    const images = document.querySelectorAll('.slider-wrapper img');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.slider-dots');

    let currentIndex = 0;
    const totalImages = images.length;
    let autoSlideInterval;

    // Cria os indicadores (bolinhas)
    for (let i = 0; i < totalImages; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
    const dots = document.querySelectorAll('.dot');

    const updateSlider = () => {
        wrapper.style.transform = `translateX(${-currentIndex * 100}%)`;
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    };

    const goToSlide = (index) => {
        currentIndex = index;
        updateSlider();
    };

    const nextSlide = () => {
        currentIndex = (currentIndex + 1) % totalImages;
        updateSlider();
    };

    const prevSlide = () => {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        updateSlider();
    };

    const startAutoSlide = () => {
        autoSlideInterval = setInterval(nextSlide, 5000); // Muda a cada 5 segundos
    };

    const stopAutoSlide = () => {
        clearInterval(autoSlideInterval);
    };

    // Eventos de clique para os botões de navegação
    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoSlide();
        startAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoSlide();
        startAutoSlide();
    });
    
    // Inicia o carrossel
    updateSlider();
    startAutoSlide();
});