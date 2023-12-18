// console.log('hello')
//   console.log(document)
let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

let cellSize = 50;
let boardWidth = 1200;
let boardHeight = 550;

let snakeCells = [[0, 0]];

let direction = 'right';

let gameOver = false;

let foodCells = generateRandomCells();

let score = 0;

let intervalId = setInterval(function() {
  update();
  draw();
}, 250);

document.addEventListener('keydown', function(event) {
  if (event.key === 'ArrowDown')
    direction = 'down';
  else if (event.key === 'ArrowUp')
    direction = 'up';
  else if (event.key === 'ArrowLeft')
    direction = 'left';
  else
    direction = 'right';
})

// draw the snake
function draw() {

  if (gameOver === true) {
    clearInterval(intervalId);
    ctx.fillStyle = 'red';
    ctx.font = '50px sans-serif';
    ctx.fillText('Game Over!!', 200, 200);
    return;
  }

  // clear canvas
  ctx.clearRect(0, 0, boardWidth, boardHeight);
  
  // draw snake
  for (let cell of snakeCells) {
    ctx.fillStyle = 'brown';
    ctx.fillRect(cell[0], cell[1], cellSize, cellSize);
    ctx.strokeStyle = 'golden';
    ctx.strokeRect(cell[0], cell[1], cellSize, cellSize);
  }

  // draw food
  ctx.fillStyle = 'green';
  ctx.fillRect(foodCells[0], foodCells[1], cellSize, cellSize);

  // draw score
  ctx.font = '20px sans-serif';
  ctx.fillText(`Score: ${score}`, 20, 20);
}

// update snake cells
function update() {
  let headX = snakeCells[snakeCells.length - 1][0];
  let headY = snakeCells[snakeCells.length - 1][1];

  let newHeadX;
  let newHeadY;

  if (direction === 'right') {
    newHeadX = headX + cellSize;
    newHeadY = headY;

    if (newHeadX === boardWidth || checkMate(newHeadX,newHeadY)) {
      gameOver = true;
    }
  } 
  else if (direction === 'up') {
    newHeadX = headX;
    newHeadY = headY - cellSize;

    if (newHeadY < 0 || checkMate(newHeadX,newHeadY)) {
      gameOver = true;
    }
  }
  else if (direction === 'down') {
    newHeadX = headX;
    newHeadY = headY + cellSize;

    if (newHeadY === boardHeight || checkMate(newHeadX,newHeadY)) {
      gameOver = true;
    }
  }
  else {
    newHeadX = headX - cellSize;
    newHeadY = headY
    
    if (newHeadX < 0 || checkMate(newHeadX,newHeadY)) {
      gameOver = true;
    }
  }

  snakeCells.push([newHeadX, newHeadY]);

  if (newHeadX === foodCells[0] && newHeadY === foodCells[1]) {
    foodCells = generateRandomCells();
    score += 1;
  } else {
    snakeCells.shift();
  }
}

function generateRandomCells() {
  return [
    Math.round((Math.random()*(boardWidth - cellSize))/cellSize)*cellSize,
    Math.round((Math.random()*(boardHeight - cellSize))/cellSize)*cellSize
  ]
}

function checkMate(newHeadX,newHeadY){
    for(let item of snakeCells){
        if(item[0]===newHeadX && item[1]===newHeadY){
            return true;
        }
    }
    return false
}