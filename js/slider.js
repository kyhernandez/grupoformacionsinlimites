let points = document.querySelectorAll(".points");
let slider = document.querySelector(".slider-big");

points.forEach((point, i) => 
    point.addEventListener("click", () => {
        let result = i * -50;
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