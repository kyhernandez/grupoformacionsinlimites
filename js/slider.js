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

// --- SLIDER DE CARTAS (BACHILLER) ---
const cards = document.querySelectorAll('.card-bachiller');
const sliderContainerBachiller = document.querySelector('.slider-container-bachiller');
let currentIndex = 0;
let isPaused = false;

if (cards.length > 0) {
    const updateClasses = () => {
        cards.forEach((card, index) => {
            card.classList.remove('active', 'prev', 'next', 'hidden');
            if (index === currentIndex) card.classList.add('active');
            else if (index === (currentIndex - 1 + cards.length) % cards.length) card.classList.add('prev');
            else if (index === (currentIndex + 1) % cards.length) card.classList.add('next');
            else card.classList.add('hidden');
        });
    }

    const slideNext = () => {
        if (!isPaused) {
            currentIndex = (currentIndex + 1) % cards.length;
            updateClasses();
        }
    }

    setInterval(slideNext, 4000);
    updateClasses();

    // Solo si existe el contenedor, asignamos el mouseleave
    if (sliderContainerBachiller) {
        sliderContainerBachiller.onmouseleave = () => { isPaused = false; };
        sliderContainerBachiller.onmouseenter = () => { isPaused = true; };
    }
}

// --- ANIMACIÓN DEL CONTADOR UNIVERSAL ---
const animarContador = (element) => {
    const valorFinal = parseInt(element.getAttribute('data-target'));
    let valorActual = 0;
    const pasos = 60; // Cuántos frames durará la animación
    const incremento = valorFinal / pasos; //16.66666
    let pasoActual = 0;

    const actualizar = () => {
        if (pasoActual < pasos) {
            valorActual += incremento;
            // Formateamos según el idioma (puntos para miles)
            element.innerText = Math.floor(valorActual).toLocaleString('es-ES');
            pasoActual++;
            requestAnimationFrame(actualizar);
        } else {
            element.innerText = valorFinal.toLocaleString('es-ES');
        }
    };
    
    actualizar();
};

// Buscamos TODOS los elementos con la clase .counter
const contadores = document.querySelectorAll('.counter');

if (contadores.length > 0) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Mandamos a animar el elemento específico que entró a la vista
                animarContador(entry.target);
                // Dejamos de observarlo para que no se repita la animación
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    // Le decimos al observador que vigile cada uno de los contadores encontrados
    contadores.forEach(contador => observer.observe(contador));
}