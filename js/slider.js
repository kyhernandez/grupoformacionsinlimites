// --- LÓGICA DEL SLIDER (Solo si los elementos existen) ---
const slider = document.querySelector(".slider-big");
const nextBtn = document.querySelector("#nextBtn");
const prevBtn = document.querySelector("#prevBtn");
const points = document.querySelectorAll(".points");

// Verificamos si el slider existe en esta página
if (slider && nextBtn && prevBtn) {
    let indiceActual = 0;
    let autoPlayInterval;

    function moverA(indice) {
        if (indice >= points.length) indice = 0;
        if (indice < 0) indice = points.length - 1;

        indiceActual = indice;
        let result = indiceActual * -25;
        slider.style.transform = `translateX(${result}%)`;

        points.forEach(p => p.classList.remove("active"));
        if (points[indiceActual]) points[indiceActual].classList.add("active");
    }

    nextBtn.addEventListener("click", () => {
        detenerAutoPlay();
        moverA(indiceActual + 1);
        iniciarAutoPlay();
    });

    prevBtn.addEventListener("click", () => {
        detenerAutoPlay();
        moverA(indiceActual - 1);
        iniciarAutoPlay();
    });

    points.forEach((point, i) => {
        point.addEventListener("click", () => {
            detenerAutoPlay();
            moverA(i);
            iniciarAutoPlay();
        });
    });

    const iniciarAutoPlay = () => {
        autoPlayInterval = setInterval(() => {
            moverA(indiceActual + 1);
        }, 4000);
    };

    const detenerAutoPlay = () => clearInterval(autoPlayInterval);
    
    iniciarAutoPlay();

    // Eventos Touch para mobile
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});

    slider.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchEndX < touchStartX - 50) nextBtn.click();
        if (touchEndX > touchStartX + 50) prevBtn.click();
    }, {passive: true});
}
