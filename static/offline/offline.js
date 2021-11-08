class Ball {
  constructor(radius, speed, startX, startY) {
    this.radius = radius;
    this.dx = speed;
    this.dy = -speed;
    this.startX = startX;
    this.startY = startY;
    this.x = startX;
    this.y = startY;
  }

  set updateSpeed(speed) {
    this.speed = speed;
  }

  get nextPosX() {
    return this.x + this.dx;
  }

  get nextPosY() {
    return this.y + this.dy;
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
  }

  changeDirectionX() {
    this.dx = -this.dx;
  }
  changeDirectionY() {
    this.dy = -this.dy;
  }

  backToBeginning() {
    this.x = this.startX;
    this.y = this.startY;
    this.dx = Math.abs(this.dx);
    this.dy = -Math.abs(this.dy);
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#6B1FD1';
    ctx.fill();
    ctx.closePath();
  }
}

class Paddle {
  constructor(width, height, step, startX, startY) {
    this.width = width;
    this.height = height;
    this.step = step;
    this.startX = startX - width / 2;
    this.x = this.startX;
    this.y = startY - height;
  }

  moveLeft() {
    this.x -= this.step
  }

  moveRight() {
    this.x += this.step
  }

  isHit(x) {
    return this.x < x && x < this.x + this.width;
  }

  backToBeginning() {
    this.x = this.startX;
  }

  draw() {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = '#6B1FD1';
    ctx.fill();
    ctx.closePath();
  }
}

const p2wPx = (percent) => {
  return width * percent / 100;
}
const p2hPx = (percent) => {
  return height * percent / 100;
}

var canvas = document.getElementById('myCanvas');

const width = document.body.clientWidth;
const height = window.innerHeight * 0.95;

canvas.width = width;
canvas.height = height;

const brickOffsetTopPercent = 5;
const brickOffsetLeftPercent = 5;
const brickOffsetTop = p2hPx(brickOffsetTopPercent);
const brickOffsetBottom = p2hPx(brickOffsetTopPercent);
const brickOffsetLeft = p2wPx(brickOffsetLeftPercent);

let ctx = canvas.getContext('2d');

let rightPressed = false;
let leftPressed = false;

let paused = true;
let score = 0;
let lives = 3;

const brickRowCount = 5;
const brickColumnCount = 5;

const brickWidthPercent = 16;
const brickHeightPercent = 4;
const brickPaddingPercent = 2;
const paddleWidthPercent = 20;

const paddleWidth = p2wPx(paddleWidthPercent);

const brickWidth = p2wPx(brickWidthPercent);
const brickHeight = p2hPx(brickHeightPercent);
const brickPadding = p2wPx(brickPaddingPercent);

paddle = new Paddle(paddleWidth, 20, 7, canvas.width / 2, canvas.height - brickOffsetBottom)
ball = new Ball(10, 8, canvas.width / 2, paddle.y - 10)

let bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);

document.addEventListener('touchend', touchedHandler, false);
document.addEventListener('touchmove', touchMoveHandler, false);

function keyDownHandler(e) {
  if (e.key == 'Right' || e.key == 'ArrowRight') {
    rightPressed = true;
  } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key == 'Right' || e.key == 'ArrowRight') {
    rightPressed = false;
  } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
    leftPressed = false;
  } else if (e.keyCode == 32) {
    paused = false;
  }
}

function mouseMoveHandler(e) {
  let relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddle.x = relativeX - paddle.width / 2;
  }
}

function touchMoveHandler(e) {
  const { touches } = e;
  let relativeX = touches[0].clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddle.x = relativeX - paddle.width / 2;
  }
}

function touchedHandler(e) {
  paused = false;
}

function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      let b = bricks[c][r];
      if (b.status === 1) {
        if (ball.x > b.x && ball.x < b.x + brickWidth && ball.y > b.y && ball.y < b.y + brickHeight) {
          ball.changeDirectionY();
          b.status = 0;
          score++;
          if (score === brickRowCount * brickColumnCount) {
            alert('YOU WIN, CONGRATS!');
            document.location.reload();
          }
        }
      }
    }
  }
}

function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status === 1) {
        const brickX = (r * (brickWidth + brickPadding)) + brickOffsetLeft;
        const brickY = (c * (brickHeight + brickPadding)) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = '#6B1FD1';
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function drawScore() {
  ctx.font = '16px Arial';
  ctx.textAlign = 'left';
  ctx.fillStyle = '#6B1FD1';
  ctx.fillText('Score: ' + score, 8, 20);
}

function drawLives() {
  ctx.font = '16px Arial';
  ctx.textAlign = 'right';
  ctx.fillStyle = '#6B1FD1';
  ctx.fillText('Lives: ' + lives, canvas.width, 20);
}

function drawPause() {
  ctx.font = "36px Arial";
  ctx.textAlign = 'center';
  ctx.fillStyle = '#6B1FD1';
  ctx.fillText('Press', width / 2, height / 2);
}

function update() {
  draw()

  if (ball.nextPosX > canvas.width - ball.radius || ball.nextPosX < ball.radius) {
    ball.changeDirectionX();
  }
  if (ball.nextPosY < ball.radius) {
    ball.changeDirectionY();
  } else if (ball.nextPosY > paddle.y) {
    if (paddle.isHit(ball.x)) {
      ball.changeDirectionY();
    } else {
      lives--;
      if (!lives) {
        alert('GAME OVER');
        document.location.reload();
      } else {
        paused = true;
        ball.backToBeginning();
        paddle.backToBeginning();
      }
    }
  }

  if (rightPressed && paddle.x < canvas.width - paddle.width) {
    paddle.moveRight();
  } else if (leftPressed && paddle.x > 0) {
    paddle.moveLeft();
  }

  ball.move()
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  ball.draw();
  paddle.draw();
  drawScore();
  drawLives();
  collisionDetection();
}

function Start() {
  if (!paused) {
    update();
  } else {
    drawPause()
  }

  requestAnimationFrame(Start);
}

Start();
