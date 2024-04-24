let buttonsSequenceArray = [];
let clickColor;
let gameRunning = false;
let streak = 0;
let level = 0;
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

function playSound(colorname) {
  switch (colorname) {
    case "green": {
      const greenSound = new Audio("./sounds/green.mp3");
      greenSound.play();
      break;
    }
    case "red": {
      const redSound = new Audio("./sounds/red.mp3");
      redSound.play();
      break;
    }
    case "yellow": {
      const yellowSound = new Audio("./sounds/yellow.mp3");
      yellowSound.play();
      break;
    }
    case "blue": {
      const blueSound = new Audio("./sounds/blue.mp3");
      blueSound.play();
      break;
    }
    default:
      console.log(`${colorname}`);
  }
}

function pressedButton(colorname) {
  $(`.${colorname}`).addClass("pressed");
  setTimeout(function () {
    $(`.${colorname}`).removeClass("pressed");
  }, 200);
}

function wrongButton() {
  const wrongSound = new Audio("./sounds/wrong.mp3");
  wrongSound.play();
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
}

function getRandomIndex(arrayLength) {
  return Math.floor(Math.random() * arrayLength);
}

function randomColor(buttonsSequenceArray) {
  const buttonsOptions = ["green", "red", "yellow", "blue"];
  const color = buttonsOptions[getRandomIndex(buttonsOptions.length)];
  playSound(color);
  pressedButton(color);
  return buttonsSequenceArray.push(color);
}

function setLevel(level) {
  return level + 1;
}

function setHeader(level) {
  $("h1").text(`Level ${level}`);
}

async function resetGame() {
  if (!gameRunning) {
    level = 1;
    setHeader(level);
    await delay(500);
    randomColor(buttonsSequenceArray);
    gameRunning = true;
  }
}

async function checkButton(colorName) {
  if (colorName === buttonsSequenceArray[streak]) {
    streak += 1;
    if (streak === buttonsSequenceArray.length) {
      level = setLevel(level);
      setHeader(level);
      await delay(500);
      randomColor(buttonsSequenceArray);
      streak = 0;
    }
  } else {
    gameRunning = false;
    level = 1;
    buttonsSequenceArray = [];
    wrongButton();
    $("h1").text("Game Over, Press Any Key to Restart.");
  }
}

$(".btn").click(function (event) {
  if (gameRunning) {
    clickColor = event.target.id;
    playSound(clickColor);
    pressedButton(clickColor);
    checkButton(clickColor);
  }
});

$(document).keypress(resetGame);
