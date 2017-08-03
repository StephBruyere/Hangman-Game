

//Globals

var guessedLetters = [];
var wizards = ["potter", "voldemort", "hogwarts", "wand", "broom", "firebolt", "nimbus", "dumbledore"];
var arr = wizards[Math.floor(Math.random() * wizards.length)];
var blank = new Array(arr.length);
var lives = arr.length + 5;
var wrongGuess = 5;
var continueGame = true;

// ==========================================================================================

// On key up to change inner HTML to letters entered (actual word or letters guessed)
document.onkeyup = function(event) {

    var userGuess = String.fromCharCode(event.keyCode).toLowerCase();
    if (event.keyCode == 32) {
        location.reload();
        continueGame = true;
    } else if (continueGame) {

        if (lives > 0) {
            lives--;
            include(arr, userGuess);
            arraysEqual(arr, blank);
        }
    }
    document.getElementById("word").innerHTML = blank.join(' ');
    document.getElementById("guessedLetters").innerHTML = guessedLetters.join(' ');
}

// ==========================================================================================

// creates empty spaces for word based off length of array
for (var i = 0; i < arr.length; i++) {
    if (arr[i].indexOf(' ') >= 0) {
        blank[i] = "\u00A0";
    } else {
        blank[i] = ' _ ';
    }
}

// ==========================================================================================

// changes counter- stores on browser via local storage (does not reset on browser close)

function winCounter() {
    if (typeof(Storage) !== "undefined") {
        if (sessionStorage.wincount) {
            sessionStorage.wincount = Number(sessionStorage.wincount) + 1;
            wins = sessionStorage.wincount;
        } else {
            sessionStorage.wincount = 1;
            wins = 0;
        }
        document.getElementById("wins").innerHTML = 'Wins: ' + sessionStorage.wincount;
    } 
}

function lossCounter() {
    if (typeof(Storage) !== "undefined") {
        if (sessionStorage.losscount) {
            sessionStorage.losscount = Number(sessionStorage.losscount) + 1;
            losses = sessionStorage.losscount;
        } else {
            sessionStorage.losscount = 1;
            losses = 0;
        }
        document.getElementById("losses").innerHTML = 'Losses: ' + sessionStorage.losscount;
    } 
}

//change inner HTML to show wins and losses
if (typeof(sessionStorage.wincount) == "undefined") {
    document.getElementById('wins').innerHTML = 'Wins: ' + 0;
} else {
    document.getElementById("wins").innerHTML = 'Wins: ' + sessionStorage.wincount;
}
if (typeof(sessionStorage.losscount) == "undefined") {
    document.getElementById('losses').innerHTML = 'Losses: ' + 0;
} else {
    document.getElementById("losses").innerHTML = 'Losses: ' + sessionStorage.losscount;
}


// ==========================================================================================
//sets value of remaining guesses and guesses left, sets user input letters in to the input to complete word

function include(arr, object) {

    if (guessedLetters.indexOf(object) > -1 && lives >= 1) {
        wrongGuess--;
        document.getElementById('lives').innerHTML = 'You Guessed That Letter Already, you have ' + wrongGuess + ' wrong guess\' remaining';
    } else if (arr.indexOf(object) === -1 && guessedLetters.indexOf(object) === -1 && lives >= 1 && arr.split(" ").toString() != blank.join()) {
        wrongGuess--;
        document.getElementById('status').innerHTML = 'Nope! You have ' + wrongGuess + ' wrong guess\' remaining';
    } else {
        document.getElementById('status').innerHTML = '';
    }
    if (object) {
        guessedLetters.push(object);
    }
    for (var i = 0; i < arr.length; i++) {
        if (arr.split("")[i] === object) {
            blank.splice(i, 1, object);
        }
    }
}

// ==========================================================================================

//if win- "You win, hit play again."" Else, "game over, hit to play again"

function arraysEqual(arr1, arr2) {

    if (arr1.replace(" ", "") == arr2.join("").replace("\u00A0", "")) {
        winCounter();
        document.getElementById('status').innerHTML = '<h2>Mischief Managed!</h2> <br> <h4>Press the SPACE key to play again</h4>';
        return continueGame = false;

    } else if (wrongGuess === 0) {
        document.getElementById('status').innerHTML = '<h3>You lost! Your word was ' + arr + ' </h3> <br> <h4> Press the SPACE key to play again</h4>';
        lossCounter();
        return continueGame = false;
    }
}

// populate blanks between games
document.getElementById('word').innerHTML = blank.join(' ');
document.getElementById('guessedLetters').innerHTML = guessedLetters.join(' ');


//reference for later 
// https://developer.mozilla.org/en-US/docs/User:wbamberg/Examples_on_top/Array.prototype.indexOf():v2
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array


