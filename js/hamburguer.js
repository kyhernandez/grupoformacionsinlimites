// --- LÓGICA DEL MENÚ HAMBURGUESA (Siempre debe ejecutarse) --- 
const menu = document.querySelector("#menu");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

if (abrir && cerrar && menu) {
    abrir.addEventListener("click", () => {
        menu.classList.add("visible");
    });

    cerrar.addEventListener("click", () => {
        menu.classList.remove("visible");
    });
}