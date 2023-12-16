class BallInWater {
    constructor() {
        this.canvas = document.getElementById('waterCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.height = window.innerHeight;
        this.canvas.width = window.innerWidth;
        this.balls = [];
        this.waterLevel = this.canvas.height;

        this.init();
    }

    updateBallPosition(ball) {
        ball.vy += ball.gravity;

        if (ball.y + ball.radius > this.waterLevel) {
            ball.y = this.waterLevel - ball.radius;
            ball.vy = -ball.vy * ball.rebound;

            if (ball.type === 'bowling') {
                ball.vy = 0;
            }
        } else {
            ball.y += ball.vy;
        }
    }

    createBall(ball) {
        this.ctx.drawImage(
            ball.image,
            ball.x - ball.radius,
            ball.y - ball.radius,
            ball.radius * 2,
            ball.radius * 2
        );
    }

    createWater() {
        this.ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
        this.ctx.fillRect(0, this.waterLevel, this.canvas.width, this.canvas.height - this.waterLevel);
    }

    update() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.createWater();

        for (const ball of this.balls) {
            this.updateBallPosition(ball);
            this.createBall(ball);
        }

        requestAnimationFrame(() => this.update());
    }

    init() {
        this.canvas.addEventListener('click', (event) => {
            const type = Math.random() < 0.5 ? 'basketball' : 'bowling';

            const newBall = {
                x: event.clientX - this.canvas.getBoundingClientRect().left,
                y: event.clientY - this.canvas.getBoundingClientRect().top,
                vy: type === 'basketball' ? -20 : 0,
                radius: type === 'basketball' ? 20 : 20,
                gravity: type === 'basketball' ? 0 : 0.8,
                rebound: type === 'basketball' ? 0.5 : 0.2,
                type: type,
                image: new Image(),
            };

            newBall.image.src = type === 'basketball' ? '../imgs/basketball.png' : '../imgs/bowlingball.png';
            newBall.image.onload = () => {
                this.balls.push(newBall);
            };
        });

        requestAnimationFrame(() => this.update());
    }
}

const ballInWater = new BallInWater();
