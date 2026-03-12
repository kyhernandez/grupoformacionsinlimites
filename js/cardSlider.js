// // --- SLIDER DE CARTAS (BACHILLER) ---
// const cards = document.querySelectorAll('.card-bachiller');
// const sliderContainerBachiller = document.querySelector('.slider-container-bachiller');
// let currentIndex = 0;
// let isPaused = false;

// if (cards.length > 0) {
//     const updateClasses = () => {
//         cards.forEach((card, index) => {
//             card.classList.remove('active', 'prev', 'next', 'hidden');
//             if (index === currentIndex) card.classList.add('active');
//             else if (index === (currentIndex - 1 + cards.length) % cards.length) card.classList.add('prev');
//             else if (index === (currentIndex + 1) % cards.length) card.classList.add('next');
//             else card.classList.add('hidden');
//         });
//     }

//     const slideNext = () => {
//         if (!isPaused) {
//             currentIndex = (currentIndex + 1) % cards.length;
//             updateClasses();
//         }
//     }

//     setInterval(slideNext, 4000);
//     updateClasses();

//     // Solo si existe el contenedor, asignamos el mouseleave
//     if (sliderContainerBachiller) {
//         sliderContainerBachiller.onmouseleave = () => { 
//             isPaused = false; 
//         };
//         sliderContainerBachiller.onmouseenter = () => { 
//             isPaused = true; 
//         };
//     }
// }

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