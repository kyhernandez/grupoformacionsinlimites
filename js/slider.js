// Seleccionamos los elementos necesarios
const points = document.querySelectorAll(".points");
const slider = document.querySelector(".slider-big");
const nextBtn = document.querySelector("#nextBtn");
const prevBtn = document.querySelector("#prevBtn");

let indiceActual = 0;
let autoPlayInterval;

// Función central para mover el slider
function moverA(indice) {
    // Validar límites
    if (indice >= points.length) indice = 0;
    if (indice < 0) indice = points.length - 1;

    indiceActual = indice;

    // Mover slider (multiplicamos el índice por -25% ya que son 4 fotos)
    let result = indiceActual * -25;
    slider.style.transform = `translateX(${result}%)`;

    // Actualizar puntos
    points.forEach(p => p.classList.remove("active"));
    points[indiceActual].classList.add("active");
}

// Eventos para las Flechas
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

// Eventos para los Puntos
points.forEach((point, i) => {
    point.addEventListener("click", () => {
        detenerAutoPlay();
        moverA(i);
        iniciarAutoPlay();
    });
});

// --- Lógica de AutoPlay ---
const iniciarAutoPlay = () => {
    autoPlayInterval = setInterval(() => {
        moverA(indiceActual + 1);
    }, 4000);
};

const detenerAutoPlay = () => clearInterval(autoPlayInterval);

// Iniciar al cargar
iniciarAutoPlay();

//FLECHAS EN MOVILES SLIDER

let touchStartX = 0;
let touchEndX = 0;

slider.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

slider.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleGesture();
}, false);

function handleGesture() {
    if (touchEndX < touchStartX - 50) {
        // Deslizó a la izquierda -> Siguiente
        nextBtn.click();
    }
    if (touchEndX > touchStartX + 50) {
        // Deslizó a la derecha -> Anterior
        prevBtn.click();
    }
}

// --- MENÚ HAMBURGUESA --- 

const menu = document.querySelector("#menu");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

abrir.addEventListener("click", () => {
    menu.classList.add("visible");
})

cerrar.addEventListener("click", () => {
    menu.classList.remove("visible");
})