window.addEventListener('load', () => {
    const aboutMeTexts = [
        "Hi, I am mslx. My real name is Amin ",
        "I am active on social media platforms like YouTube and Instagram ",
        "In my free time, I develop Minecraft and work on websites ",
        "You can make me happy ",
        "by joining my Discord channel : https://discord.gg/T2tmqURad6 :) "

    ];
    
    const aboutMeElement = document.getElementById('aboutMe');
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = aboutMeTexts[textIndex];
        if (isDeleting) {
            aboutMeElement.textContent = currentText.substring(0, charIndex--);
            if (charIndex < 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % aboutMeTexts.length;
                charIndex = 0;
            }
        } else {
            aboutMeElement.textContent = currentText.substring(0, charIndex++);
            if (charIndex === currentText.length) {
                isDeleting = true;
                setTimeout(type, 2000); 
                return;
            }
        }
        setTimeout(type, isDeleting ? 50 : 100);
    }

    type();

    let ctx, cW, cH, raindrops;
    let rainStrength = 1;
    let mouseX = 0;

    function initCanvas() {
        const canvas = document.getElementById("particleCanvas");
        ctx = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        cW = canvas.width;
        cH = canvas.height;

        mouseX = cW / 2;
    }

    class Raindrops {
        constructor() {
            this.drops = [];
            this.splashes = [];
        }

        addDrop() {
            const x = (Math.random() * (cW + 100)) - 100;
            const s = (Math.random() * 7) + 2;

            this.drops.push({
                x: x,
                y: 0,
                velY: 2,
                width: s / 3,
                height: s * 1.2,
                speed: s,
                life: 60
            });
        }

        render() {
            for (let i = 0; i < rainStrength; i++) {
                this.addDrop();
            }

            ctx.save();
            ctx.clearRect(0, 0, cW, cH);
            ctx.fillStyle = 'rgb(255, 255, 255)';

            this.drops.forEach((drop, index) => {
                ctx.fillRect(drop.x, drop.y, drop.width, drop.height);

                const direction = (mouseX - cW / 2) * 0.01;
                drop.x += direction;
                drop.y += drop.speed * 2;

                if (drop.y + drop.height > cH) {
                    this.splashes.push({
                        x: drop.x + (Math.random() * 20 - 10),
                        y: drop.y,
                        width: drop.width,
                        height: drop.height,
                        velY: drop.velY,
                        speed: drop.speed,
                        life: drop.life
                    });

                    this.drops.splice(index, 1);
                }
            });

            this.splashes.forEach((splash, index) => {
                ctx.fillRect(splash.x, splash.y, splash.width / 3, splash.height / 3);

                splash.y -= splash.velY * splash.speed / 6;
                splash.life--;
                splash.velY -= 0.1;

                if (splash.life <= 0) {
                    this.splashes.splice(index, 1);
                }
            });

            ctx.restore();
        }
    }

    function init() {
        raindrops = new Raindrops();
        loop();
    }

    function render() {
        raindrops.render();
    }

    function loop() {
        requestAnimationFrame(loop);
        render();
    }

    window.addEventListener('mousemove', (event) => {
        mouseX = event.clientX - ctx.canvas.getBoundingClientRect().left;
    });

    window.addEventListener('load', () => {
        initCanvas();
        init();
    });
});
const particleCanvas = document.getElementById('particleCanvas');
const ctx = particleCanvas.getContext('2d');

function setCanvasSize() {
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
}

setCanvasSize();
window.addEventListener('resize', setCanvasSize);

let particles = [];

function createParticles() {
    particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            size: Math.random() * 2 + 1,
            speedX: Math.random() * 2 - 1,
            speedY: Math.random() * 2 - 1,
        });
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
    ctx.fillStyle = 'rgba(0, 128, 255, 0.8)';

    particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > window.innerWidth) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > window.innerHeight) particle.speedY *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
    });

    requestAnimationFrame(animateParticles);
}

createParticles();
animateParticles();

window.addEventListener('load', () => {
    document.body.classList.add('custom-cursor');
});
