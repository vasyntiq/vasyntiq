const reveals = document.querySelectorAll(".reveal");

function revealElements() {

    reveals.forEach((element) => {

        const windowHeight = window.innerHeight;

        const elementTop = element.getBoundingClientRect().top;

        const revealPoint = 150;

        if (elementTop < windowHeight - revealPoint) {

            element.classList.add("active");

        }

    });

}

window.addEventListener("scroll", revealElements);

revealElements();