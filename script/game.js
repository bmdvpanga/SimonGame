var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var start = false; //tracks whether game has started or not


//start the game when the user has pressed a key
$(document).on("keydown", function(e) {
  if(!start && !e.altKey) {
    start = true;
    nextSequence();
  }
});

//adds event handler to the buttons to track for clicking
$(".btn").on("click", function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor); //add the button pressed to the array

  playSound(userChosenColor);
  animatePress(userChosenColor);

  //validate user's input
  checkAnswer( userClickedPattern.length - 1 );
});

//generated the next sequence to be clicked
function nextSequence() {
  //clear globar var for user input
  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber]; //assign to random color
  $("#level-title").text("Level " + (++level) ); //increment level then update the header to show current level
  gamePattern.push(randomChosenColor); //push randomColor to pattern;

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100); //show new button to the player
  playSound(randomChosenColor);
}

function checkAnswer(index) {

  //check to make sure that the button pressed is the same as gamePattern position
  if( gamePattern[index] === userClickedPattern[index] ) {

      //move on if we have clicked as many buttons as game pattern length
    if(gamePattern.length - 1 === index) {
      //need to go to next level after user has completed the Level
      setTimeout(nextSequence, 1000);

    }

  } else {

    //reset start value to false to prevent from moving on to next stage
    start = false;

    var audio = new Audio("sounds/wrong.mp3");
    //change heading to a game over message
    $("#level-title").text("Game Over, Press Any Key To Restart");

    audio.play();

    //add and remove class to give a flashing red effect on screen for incorrect button pressed
    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    },200);

    //need to restart game
    restartLevel();
  }

}


//plays the sound of the corresponding color
function playSound(color){
  var audio = new Audio( "sounds/" + color + ".mp3" );
  audio.play();
}

//highlights the button that is pressed by the user
function animatePress(currentColor) {
  $("#"+currentColor).addClass("pressed");

  //remove the highlight from the button after 100 ms
  setTimeout(function() {
    $("#"+currentColor).removeClass("pressed");
  },100);
}

//restarts the level after game is over
function restartLevel() {
  gamePattern = [];
  level = 0;
  start = false;
}
