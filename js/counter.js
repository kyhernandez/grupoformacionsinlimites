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