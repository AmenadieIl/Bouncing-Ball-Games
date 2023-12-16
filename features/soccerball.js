class SoccerBall {
    constructor() {
        this.canvas = document.getElementById('soccerCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.ballImage = new Image();
        this.ballImage.src = '../imgs/soccerball.png';
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
        this.ctx.drawImage(
            this.ballImage,
            ball.x - ball.radius,
            ball.y - ball.radius,
            ball.radius * 2,
            ball.radius * 2
        );
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
        this.canvas.addEventListener('click', (event) => {
            const newBall = {
                x: event.clientX - this.canvas.getBoundingClientRect().left,
                y: event.clientY - this.canvas.getBoundingClientRect().top,
                vy: 0,
                radius: 20,
                gravity: 0.3,
                rebound: 0.6,
            };
            this.balls.push(newBall);
        });

        requestAnimationFrame(() => this.update());
    }
}

const soccerBall = new SoccerBall();
