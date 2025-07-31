import "/style.css";

const TOTAL_LINES = 10;
const BOARD_SIZE = 500; // Board is 500x500px
const LINE_WIDTH = 6; // Line width in pixels
const MIN_LINE_LENGTH = 150; // Minimum line length
const allocatedOrders = new Set(); // to store the line order

let colors = [];
let score = 0;
let time = 0;
let timer = null;
let isGameOngoing = false;

// UI elements
const board = document.querySelector(".board");
const messageBox = document.querySelector(".message");
const levelContainer = document.querySelector(".game-info .level span");
const scoreContainer = document.querySelector(".game-info .score span");
const timeContainer = document.querySelector(".game-info .time span");
const startGameCTA = document.querySelector(".controls button");

// this value will update as topmost line is clicked
let topOrder = TOTAL_LINES - 1;

// method to generate a number between min and max limit.
function getRandomIndexInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function _getRandomColor() {
  const randomColor = () => Math.floor(Math.random() * 256);
  const r = randomColor().toString(16).padStart(2, "0");
  const g = randomColor().toString(16).padStart(2, "0");
  const b = randomColor().toString(16).padStart(2, "0");

  return `#${r}${g}${b}`;
}

// generate random colors based on a limit
function getRandomColors(limit) {
  const colors = [];
  const seen = new Set();

  for (let i = 0; i < limit; i++) {
    let color = _getRandomColor();

    while (seen.has(color)) {
      color = _getRandomColor();
    }

    seen.add(color);
    colors.push(color);
  }

  return colors;
}

// generate a unique order for each line
function getLineOrder() {
  let order;

  do {
    order = getRandomIndexInclusive(0, TOTAL_LINES - 1);
  } while (allocatedOrders.has(order));

  allocatedOrders.add(order);

  return order;
}

// Generate two random points within the board
function generateRandomPoints() {
  // First point can be anywhere on the board
  const x1 = getRandomIndexInclusive(0, BOARD_SIZE);
  const y1 = getRandomIndexInclusive(0, BOARD_SIZE);

  // Second point can also be anywhere on the board
  const x2 = getRandomIndexInclusive(0, BOARD_SIZE);
  const y2 = getRandomIndexInclusive(0, BOARD_SIZE);

  // Calculate the line length
  const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

  // If the line is too short, generate new points
  if (length < MIN_LINE_LENGTH) {
    return generateRandomPoints();
  }

  return { x1, y1, x2, y2, length };
}

/**
 * Algorithm to generate random lines on the board:
 *  1. We will first generate two random points on the board where the upper limit would be BOARD_SIZE. This ensures that line do not go outside the board.
 *  2. We will calculate the distance between the two points. This would be the length of the line.
 *  3. If the distance is less than 150px, we will generate new points.
 *  4. We will create a div element and set its width to the distance between the two points.
 *  5. We will set its height to 6px.
 *  6. We will calculate the angle between the two points and set the transform property to rotate the div element from the line's starting point.
 *  7. Each line will be assigned a random background color and a order number.
 */
function drawLines() {
  // Generate colors first
  colors = getRandomColors(TOTAL_LINES);

  for (let i = 0; i < TOTAL_LINES; i++) {
    const randomColor = colors[i % colors.length];
    const order = getLineOrder();

    // Generate two random points
    const { x1, y1, x2, y2, length } = generateRandomPoints();

    // Calculate angle
    const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

    // Create line element
    const div = document.createElement("div");
    div.classList.add("line");

    // Position and style properties
    div.style.position = "absolute";
    div.style.backgroundColor = randomColor;
    div.style.width = `${length}px`;
    div.style.height = `${LINE_WIDTH}px`;

    // Set the position to the first point
    div.style.left = `${x1}px`;
    div.style.top = `${y1}px`;

    // Set transform origin to the left side (first point)
    div.style.transformOrigin = "0 50%";

    // Rotate to point to the second point
    div.style.transform = `rotate(${angle}deg)`;

    // Set data attribute for click events
    div.setAttribute("data-order", order);

    board.appendChild(div);
  }
}

function updateScore() {
  score += 1;
  scoreContainer.innerText = score;
}

function stopTimer() {
  clearInterval(timer);
}

function startGame() {
  timer = setInterval(() => {
    time += 1;
    timeContainer.innerText = time;
  }, 1000);

  isGameOngoing = true;
  startGameCTA.style.display = "none";
  messageBox.innerText = "";
  drawLines();
}

function endGame() {
  stopTimer();

  isGameOngoing = false;
  startGameCTA.style.display = "block";
  messageBox.innerText = "Game ended!";
}

function handleBoardClick(e) {
  if (!isGameOngoing) {
    return;
  }

  const { target } = e;
  const order = target.getAttribute("data-order");
  messageBox.innerText = "";

  if (!order) {
    return;
  }

  const parsedOrder = Number(order);

  if (parsedOrder === topOrder) {
    target.style.display = "none";
    topOrder -= 1;
    messageBox.innerText = "";
    updateScore();
  }

  if (score === TOTAL_LINES) {
    endGame();
  } else {
    messageBox.innerText = "Selected line is not the topmost!";
  }
}

function setupGameInfo() {
  levelContainer.innerText = "1"; // hard-coding for now
  scoreContainer.innerText = score;
  timeContainer.innerText = time;
}

function setup() {
  stopTimer();

  board.addEventListener("click", handleBoardClick);
  startGameCTA.addEventListener("click", startGame);

  setupGameInfo();
}

function init() {
  // Set the board size dynamically if needed
  board.style.width = `${BOARD_SIZE}px`;
  board.style.height = `${BOARD_SIZE}px`;
  board.style.position = "relative";

  setup();
}

init();
