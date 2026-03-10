let points = document.querySelectorAll(".points");
let slider = document.querySelector(".slider-big");

points.forEach((point, i) => 
    point.addEventListener("click", () => {
        //-50% por cada foto (Cuando son 2 fotos), para mas fotos hacer la operacion: # de fotos / 100%
        let result = i * -25;
        //primer pasada i = 0
        //entonces: 0 * -50 = 0%

        //segunda pasada i = 1
        //entonces: 1 * -50 = -50%

        slider.style.transform = `translateX(${result}%)`;

        points.forEach(point => {
            point.classList.remove("active");
        });

        point.classList.add("active");
    })
);

//Función que vuelve el slider automático
const sliderAutomatico = () => {
    const puntos = document.querySelectorAll(".points");
    
    // Si no hay puntos, no hacemos nada
    if (puntos.length === 0) return;

    let indiceActual = 0;
    let autoPlayInterval;

    // Función que simula el clic
    const simularClic = () => {
        indiceActual++;
        
        // Si llega al final de los puntos, vuelve al primero
        if (indiceActual >= puntos.length) {
            indiceActual = 0;
        }
        
        // Ejecuta el evento 'click' en cada punto
        puntos[indiceActual].click();
    }

    // Inicia el temporizador
    const iniciarAutoPlay = () => {
        autoPlayInterval = setInterval(simularClic, 4000); // 4 segundos
    }

    // Detiene el temporizador
    const detenerAutoPlay = () => {
        clearInterval(autoPlayInterval);
    }

    // 1. Arrancar el autoplay
    iniciarAutoPlay();

    // 2. Si el usuario hace clic, detenemos y reiniciamos el autoplay
    // para evitar que el cambio automático ocurra justo después del clic manual.
    puntos.forEach(punto => {
        punto.addEventListener('click', () => {
            detenerAutoPlay();
            
            // Necesitamos actualizar nuestro índiceActual al índice del punto cliqueado
            // para que la secuencia automática siga correctamente desde el punto cliqueado.
            indiceActual = Array.from(puntos).indexOf(punto);
        
            iniciarAutoPlay();
        });
    });
}

sliderAutomatico();

let currentIndex = 0;
let isPaused = false;
const cards = document.querySelectorAll('.card-bachiller');
let autoSlider = setInterval(slideNext, 4000);

function updateClasses() {
    cards.forEach((card, index) => {
        card.classList.remove('active', 'prev', 'next', 'hidden');
        
        if (index === currentIndex) {
            card.classList.add('active');
        } else if (index === (currentIndex - 1 + cards.length) % cards.length) {
            card.classList.add('prev');
        } else if (index === (currentIndex + 1) % cards.length) {
            card.classList.add('next');
        } else {
            card.classList.add('hidden');
        }
    });
}

function slideNext() {
    if (!isPaused) {
        currentIndex = (currentIndex + 1) % cards.length;
        updateClasses();
    }
}

// Función para cuando el usuario pasa el mouse
function pauseAndFocus(index) {
    isPaused = true;
    currentIndex = index;
    updateClasses();
}

// Reanudar cuando el mouse sale
document.querySelector('.slider-container-bachiller').onmouseleave = () => {
    isPaused = false;
};

// Inicializar
updateClasses();