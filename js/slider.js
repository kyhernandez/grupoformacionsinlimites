// --- CONFIGURACIÓN DEL SLIDER DE PUNTOS ---
const points = document.querySelectorAll(".points");
const slider = document.querySelector(".slider-big");

if (points.length > 0 && slider) {
    points.forEach((point, i) => 
        point.addEventListener("click", () => {
            let result = i * -25;
            slider.style.transform = `translateX(${result}%)`;
            points.forEach(p => p.classList.remove("active"));
            point.classList.add("active");
        })
    );
}

// --- SLIDER AUTOMÁTICO (PUNTOS) ---
const sliderAutomatico = () => {
    const puntos = document.querySelectorAll(".points");
    if (puntos.length === 0) return;

    let indiceActual = 0;
    let autoPlayInterval;

    const simularClic = () => {
        indiceActual = (indiceActual + 1) % puntos.length;
        puntos[indiceActual].click();
    }

    const iniciarAutoPlay = () => autoPlayInterval = setInterval(simularClic, 4000);
    const detenerAutoPlay = () => clearInterval(autoPlayInterval);

    iniciarAutoPlay();

    puntos.forEach(punto => {
        punto.addEventListener('click', () => {
            detenerAutoPlay();
            indiceActual = Array.from(puntos).indexOf(punto);
            iniciarAutoPlay();
        });
    });
}
sliderAutomatico();