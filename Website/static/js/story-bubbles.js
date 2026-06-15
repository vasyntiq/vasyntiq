const canvas =
    document.getElementById("story-bubbles");

if (canvas) {

    const ctx =
        canvas.getContext("2d");

    let bubbles = [];

    let particles = [];

    const mouse = {

        x: null,

        y: null,

        active: false
    };

    function resizeCanvas() {

        canvas.width =
            canvas.offsetWidth;

        canvas.height =
            canvas.offsetHeight;
    }

    resizeCanvas();

    window.addEventListener(

        "resize",

        resizeCanvas
    );

    class Bubble {

        constructor() {

            this.reset();
        }

        reset() {

            this.x =
                Math.random() * canvas.width;

            this.y =
                Math.random() * canvas.height;

            this.radius =
                Math.random() * 15 + 10;

            this.speed =
                Math.random() * 0.4 + 0.1;

            this.opacity =
                Math.random() * 0.15 + 0.05;
        }

        update() {

            this.y -= this.speed;

            if (this.y < -50) {

                this.y =
                    canvas.height + 50;

                this.x =
                    Math.random() * canvas.width;
            }

            if (mouse.active) {

                const dx =
                    this.x - mouse.x;

                const dy =
                    this.y - mouse.y;

                const distance =
                    Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {

                    const force =

                        (150 - distance) / 150;

                    this.x += dx * force * 0.08;

                    this.y += dy * force * 0.08;
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
                `rgba(50,214,200,${this.opacity})`;

            ctx.shadowColor =
                "#32D6C8";

            ctx.shadowBlur = 12;

            ctx.fill();

            ctx.shadowBlur = 0;

            ctx.strokeStyle =
                `rgba(255,255,255,0.08)`;

            ctx.stroke();
        }
    }

    class Particle {

        constructor(x, y) {

            this.x = x;

            this.y = y;

            this.size =
                Math.random() * 4 + 2;

            this.vx =
                (Math.random() - 0.5) * 6;

            this.vy =
                (Math.random() - 0.5) * 6;

            this.life = 50;
        }

        update() {

            this.x += this.vx;

            this.y += this.vy;

            this.life--;
        }

        draw() {

            ctx.beginPath();

            ctx.arc(

                this.x,

                this.y,

                this.size,

                0,

                Math.PI * 2
            );

            ctx.fillStyle =
                `rgba(50,214,200,${
                    this.life / 50
                })`;

            ctx.fill();
        }
    }

    for (let i = 0; i < 40; i++) {

        bubbles.push(

            new Bubble()
        );
    }

    function burst(x, y) {

        for (let i = 0; i < 50; i++) {

            particles.push(

                new Particle(x, y)
            );
        }

        bubbles.push(

            new Bubble()
        );
    }

    window.addEventListener(

        "mousemove",

        e => {

            const rect = canvas.getBoundingClientRect();

            mouse.x = e.clientX - rect.left;

            mouse.y = e.clientY - rect.top;

            mouse.active = true;
        }
    );

    

    window.addEventListener(

        "touchmove",

        e => {

            const rect = canvas.getBoundingClientRect();

            mouse.x =

                e.touches[0].clientX - rect.left;

            mouse.y =

                e.touches[0].clientY - rect.top;

            mouse.active = true;
        }
    );

    canvas.addEventListener("click", e => {

        const rect = canvas.getBoundingClientRect();

        const clickX = e.clientX - rect.left;

        const clickY = e.clientY - rect.top;

            bubbles.forEach(

                bubble => {

                    const dx =
                        bubble.x - clickX;

                    const dy =
                        bubble.y - clickY;

                    const distance =
                        Math.sqrt(dx * dx + dy * dy);

                    if (distance < 80) {

                        burst(

                            bubble.x,

                            bubble.y
                        );

                        bubble.reset();
                    }
                }
            );
        }
    );

    canvas.addEventListener("touchstart", e => {

            const rect = canvas.getBoundingClientRect();

            const touchX =

                e.touches[0].clientX - rect.left;

            const touchY =

                e.touches[0].clientY - rect.top;

            const touch =
                e.touches[0];

            bubbles.forEach(

                bubble => {

                    const dx =
                        bubble.x - touchX;

                    const dy =
                        bubble.y - touchY;

                    const distance =
                        Math.sqrt(dx * dx + dy * dy);

                    if (distance < 80) {

                        burst(

                            bubble.x,

                            bubble.y
                        );

                        bubble.reset();
                    }
                }
            );
        }
    );

    function animate() {

        ctx.clearRect(

            0,

            0,

            canvas.width,

            canvas.height
        );

        bubbles.forEach(

            bubble => {

                bubble.update();

                bubble.draw();
            }
        );

        particles =

            particles.filter(

                particle => {

                    particle.update();

                    particle.draw();

                    return particle.life > 0;
                }
            );

        requestAnimationFrame(

            animate
        );
    }

    animate();
}   
