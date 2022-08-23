const canvas = document.getElementById("game");
const context = canvas.getContext("2d");

const ground = new Image();
ground.src = "img/ground.png";

const carrot = new Image();
carrot.src = "img/carrot.png";

let box = 32;
let score = 0;

let food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box,
};

let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box,
};

document.addEventListener("keydown", direct);

let dir;

function direct(e) {
  if (e.keyCode == 37 && dir != "right") {
    dir = "left";
  } else if (e.keyCode == 38 && dir != "down") {
    dir = "up";
  } else if (e.keyCode == 39 && dir != "left") {
    dir = "right";
  } else if (e.keyCode == 40 && dir != "up") {
    dir = "down";
  }
}

function eatTail (head, arr) {
    for(let i = 0; i < arr.length; i++) {
        if(head.x == arr[i].x && head.y == arr[i].y) {
            clearInterval(game);
        }
    }
}

function drawGame() {
  context.drawImage(ground, 0, 0);
  context.drawImage(carrot, food.x, food.y, box, box);

  for (let i = 0; i < snake.length; i++) {
    context.fillStyle = i == 0 ? 'green' : 'red';
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }

  context.fillStyle = "white";
  context.font = "50px Arial";
  context.fillText(score, box * 2.5, box * 1.7);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (snakeX == food.x && snakeY == food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 15 + 3) * box,
    };
  } else {
    snake.pop();
  }

  if(snakeX < box || snakeX > box * 17 || snakeY < 3 * box || snakeY > box * 17) {
    clearInterval(game);
  }

  if (dir == "left") snakeX -= box;
  if (dir == "right") snakeX += box;
  if (dir == "down") snakeY += box;
  if (dir == "up") snakeY -= box;

  let snakeNewHead = {
    x: snakeX,
    y: snakeY,
  };

 eatTail(snakeNewHead, snake);

  snake.unshift(snakeNewHead);
}

let game = setInterval(drawGame, 100);
