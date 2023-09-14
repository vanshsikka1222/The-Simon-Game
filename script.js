//Creating Array of colors 
var colors = ["red","blue","green","yellow"];
//Creating Array of Game Patterns (Random)
var gamePatterns = [];
//Creating Array of User Clicked Patterns
var userPatterns = [];

//Keeping track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;
//Create a new variable called level and start at level 0.
var level = 0;

//For Mobile (Click anywhere on Screen to Start the Game)
$(document).click(function() {
    if (!started) {
        //The h1 title, change this to say "Level 1".
        $("#level-title").text("Level " + level);
        nextSequence();
        //Now game is started so "started = true"
        started = true;
    }
});
//When a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function() {
    if (!started) {
        //The h1 title, change this to say "Level 1".
        $("#level-title").text("Level " + level);
        nextSequence();
        //Now game is started so "started = true"
        started = true;
    }
});

//--------------USER COLORS----------------------------------------
//If any of the Button is clicked by User add in User Array
$(".btn").click(function() {
    //Variable for UserChosen Color
    var userSelectedColour = $(this).attr("id");
    //Pushing it in User Pattern Array
    userPatterns.push(userSelectedColour);
    //Play Sound for User Selected Color
    playSound(userSelectedColour);
    //Animation
    animatePress(userSelectedColour);
    //Check Answer
    checkAnswer(userPatterns.length - 1);
})

//FUNCTION To check whether answer is correct or not
function checkAnswer(currentLevel) {
    //Write an if statement inside checkAnswer() to check if the most recent user pattern is the same as the game pattern. 
    //If so then log "success", otherwise log "wrong".
    if (gamePatterns[currentLevel] === userPatterns[currentLevel]) {
        console.log("Success");
        //If the user got the most recent answer right in, then check that they have finished their sequence with another if statement.
        if (userPatterns.length === gamePatterns.length) {
            //Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function() {
                nextSequence();
            }, 1000);   
        }
    } 
    else {
        console.log("Failure");   
        //If Answer is Wrong Play Wrong Audio
        playSound("wrong");
        //Adding CSS style "game-over" for 200ms and then removing it
        $("body").addClass("game-over");
        //Change h1 title when Game is Over after wrong Answer
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        //Starting again if RESTART (Function Call)
        startOver();
    }
}

//--------------RANDOM COLORS------------------------------------
function nextSequence() {
    //Once nextSequence() is triggered, reset the userPatterns array to an empty array ready for the next level.
    userPatterns = [];
    //Increasing level by 1 everytime game is initiated.
    level++;
    //Also updating level number in h1
    $("#level-title").text("Level " + level);
    //Creating Random nummber
    var randomNumber = Math.floor(Math.random()*4);
    //Variable for Random Selected Color
    var randomSelectedColor = colors[randomNumber];

    //Storing Game pattern in Array
    gamePatterns.push(randomSelectedColor);

    //Animation on Selected color button using jQuery
    //Flash Animation
    $("#"+ randomSelectedColor).fadeIn(150).fadeOut(150).fadeIn(150);
    //Play Sound for Random Selected Color Button
    playSound(randomSelectedColor);
}

//---------------------Secondary Functions------------------------
//SOUND PLAYING Function in Game
function playSound(name) {
    //Adding Sound for Selected Color Button
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//ANIMATION when Pressed 
function animatePress(currColor) {
    //Adding CSS class ".pressed" to the button when pressed
    $("#" + currColor).addClass("pressed");
    //Removing the effect after 1 sec timeout
    setTimeout(function () {
        $("#" + currColor).removeClass("pressed");
    }, 100);
}

//Function to RESTART the Game when USER gets Wrong
function startOver() {
    //RESET values
    level = 0;
    gamePatterns = [];
    started = false;
}
