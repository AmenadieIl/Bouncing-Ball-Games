class BouncingBalls {
    constructor() {
        this.canvas = document.getElementById('mainCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.height = window.innerHeight;
        this.canvas.width = window.innerWidth;
        this.balls = [];
        this.init();
    }

    updateBallPosition(ball) {
        ball.vy += ball.gravity;
        ball.y += ball.vy;

        if (ball.y + ball.radius > this.canvas.height) {
            ball.y = this.canvas.height - ball.radius;
            ball.vy = -ball.vy * ball.rebound;
        }
    }

    createBall(ball) {
        const ballImage = new Image();
        ballImage.src = ball.src;

        this.ctx.drawImage(ballImage, ball.x - ball.radius, ball.y - ball.radius, ball.radius * 2, ball.radius * 2);
    }

    handleCanvasClick(event) {
        const clickX = event.clientX - this.canvas.getBoundingClientRect().left;
        const clickY = event.clientY - this.canvas.getBoundingClientRect().top;

        for (const ball of this.balls) {
            if (
                clickX >= ball.x - ball.radius &&
                clickX <= ball.x + ball.radius &&
                clickY >= ball.y - ball.radius &&
                clickY <= ball.y + ball.radius
            ) {
                if (ball.link) {
                    window.open(ball.link, '_blank');
                }
                break;
            }
        }
    }

    update() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (const ball of this.balls) {
            this.updateBallPosition(ball);
            this.createBall(ball);
        }

        requestAnimationFrame(() => this.update());
    }

    init() {
        this.canvas.addEventListener('click', (event) => this.handleCanvasClick(event));

        this.addBall(500, 250, 50, 0.3, 0.6, './imgs/soccerball.png', './pages/soccer.html');
        this.addBall(800, 250, 50, 0.3, 0.7, './imgs/basketball.png', './pages/basketball.html');
        this.addBall(1100, 250, 50, 0.3, 0.6, './imgs/water.png', './pages/water.html');

        requestAnimationFrame(() => this.update());
    }

    addBall(x, y, radius, gravity, rebound, src, link) {
        this.balls.push({ x, y, radius, gravity, rebound, src, link, vy: 0 });
    }
}

const bouncingBalls = new BouncingBalls();
