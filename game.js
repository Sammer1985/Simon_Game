var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = "nope";
var level;

//Keydown event to start the game
$(document).on("keydown", function() {
  if (gameStarted !== "started") {
    gameStarted = "started";
    $("h1").text("Level 0");
    nextSequence();
  };
});

//Click event to choose a colour
$(".btn").on("click", function() {
  if (gameStarted === "started") {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    buttonFlash(userChosenColour);
    playSound(userChosenColour);
    level++;
    //checks answer is correct to the sequence
    if (checkAnswer(level) === "true") {
      //On a correct answer, checks if sequence is completed
      if (level >= gamePattern.length) {
        setTimeout(function() {
          nextSequence();
        }, 1000)
      }
    } else {
      //a failed answer
      gameOver();
      startOver();
    };
  }
});

//Checks if the latest answer is correct
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel - 1] !== userClickedPattern[currentLevel - 1]) {
    return "false";
  }
  else {
    return "true";
  }
};

//Add the next colour to the sequence
function nextSequence(){
  var randomNumber;
  randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour;
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  buttonFlash(randomChosenColour);
  playSound(randomChosenColour);
  level = 0;
  userClickedPattern = [];
  $("h1").text("Level " + gamePattern.length);
};

//Flashes the button
function buttonFlash(chosenColour) {
  var activeButton = $("." + chosenColour);
  activeButton.addClass("pressed");
  setTimeout(function() {
    activeButton.removeClass("pressed");
  }, 100)
}

//Plays the sound of the chosen colour
function playSound (chosenColour) {
  var correctClick = new Audio("sounds/" + chosenColour + ".mp3");
  correctClick.play();
};

//played on a failed answer
function gameOver() {

  //sound
  var correctClick = new Audio("sounds/wrong.mp3");
  correctClick.play();

  //animation
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200)

  $("h1").text("Game Over, Press Any Key to Restart");
}

function startOver() {
  gameStarted = "nope";
  gamePattern = [];
}
