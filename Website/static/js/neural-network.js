const canvas =
document.getElementById("network");

const ctx =
canvas.getContext("2d");

function resizeCanvas() {

    canvas.width =
    window.innerWidth;

    canvas.height =
    window.innerHeight;
}

resizeCanvas();

window.addEventListener(
    "resize",
    resizeCanvas
);

const mouse = {

    x: undefined,

    y: undefined,

    radius: 150
};

window.addEventListener(

    "mousemove",

    (event) => {

        mouse.x =
        event.x;

        mouse.y =
        event.y;
    }
);

window.addEventListener(

    "touchmove",

    (event) => {

        mouse.x =
        event.touches[0].clientX;

        mouse.y =
        event.touches[0].clientY;
    }
);

window.addEventListener(

    "scroll",

    () => {

        document
        .querySelector("header")
        .classList.toggle(

            "scrolled",

            window.scrollY > 50
        );
    }
);

window.addEventListener(

    "mouseout",

    () => {

        mouse.x =
        undefined;

        mouse.y =
        undefined;
    }
);

class Particle {

    constructor() {

        this.x =
        Math.random() * canvas.width;

        this.y =
        Math.random() * canvas.height;

        this.radius =
        2;

        this.vx =
        (Math.random() - 0.5) * 0.8;

        this.vy =
        (Math.random() - 0.5) * 0.8;
    }

    update() {

        if (

            this.x < 0 ||

            this.x > canvas.width

        ) {

            this.vx *= -1;
        }

        if (

            this.y < 0 ||

            this.y > canvas.height

        ) {

            this.vy *= -1;
        }

        this.x += this.vx;

        this.y += this.vy;

        if (

            mouse.x !== undefined

        ) {

            const dx =
            this.x - mouse.x;

            const dy =
            this.y - mouse.y;

            const distance =
            Math.sqrt(

                dx * dx +

                dy * dy
            );

            if (

                distance < mouse.radius

            ) {

                this.x += dx / 20;

                this.y += dy / 20;
            }
        }
    }

    draw() {

        ctx.beginPath();

        ctx.arc(

            this.x,

            this.y,

            this.radius,

            0,

            Math.PI * 2
        );

        ctx.fillStyle =
        "#32D6C8";

        ctx.fill();
    }
}

const particles = [];

const particleCount =

    window.innerWidth < 768

    ? 60

    : 120;

for (

    let i = 0;

    i < particleCount;

    i++

) {

    particles.push(

        new Particle()
    );
}

function connect() {

    for (

        let a = 0;

        a < particles.length;

        a++

    ) {

        for (

            let b = a + 1;

            b < particles.length;

            b++

        ) {

            const dx =

                particles[a].x -

                particles[b].x;

            const dy =

                particles[a].y -

                particles[b].y;

            const distance =

                Math.sqrt(

                    dx * dx +

                    dy * dy
                );

            if (

                distance < 120

            ) {

                ctx.strokeStyle =

                    `rgba(50,214,200,${
                        1 -
                        distance / 120
                    })`;

                ctx.lineWidth = 1;

                ctx.beginPath();

                ctx.moveTo(

                    particles[a].x,

                    particles[a].y
                );

                ctx.lineTo(

                    particles[b].x,

                    particles[b].y
                );

                ctx.stroke();
            }
        }
    }
}

function animate() {

    ctx.clearRect(

        0,

        0,

        canvas.width,

        canvas.height
    );

    particles.forEach(

        particle => {

            particle.update();

            particle.draw();
        }
    );

    connect();

    requestAnimationFrame(

        animate
    );
}

animate();