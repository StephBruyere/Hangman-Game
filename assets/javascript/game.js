var guessedLetters = [];

var wizards = ["potter", "voldemort", "hogwarts", "wand", "broom", "firebolt", "nimbus", "dumbledore"];

var arr = wizards[Math.floor(Math.random() * wizards.length)];

var blank = new Array(arr.lenght);

var numGuessRem = arr.length + 5;

var wrongGuess = 5;

var continueGame = true;


// creates empty spaces for word
for (var i = 0; i < arr.length; i++) {
    if (arr[i].indexOf(' ') >= 0) {
        blank[i] = "\u00A0";
    } else {
        blank[i] = ' _ ';
    }
}

// Count number of correct words guessed and stores on browser to reference later
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
    } else {
        document.getElementById("wins").innerHTML = "Sorry, your browser does not support web storage...";
    }
}

// Records losses and stores on browser to reference later
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
    } else {
        document.getElementById("losses").innerHTML = "Sorry, your browser does not support web storage...";
    }
}




function include(arr, obj) {

    if (guessedLetters.indexOf(obj) > -1 && numGuessRem >= 1) {
        wrongGuess--;
        document.getElementById('status').innerHTML = 'You Guessed That Letter Already, you have ' + wrongGuess + ' wrong guess\' remaining';
    } else if (arr.indexOf(obj) === -1 && guessedLetters.indexOf(obj) === -1 && numGuessRem >= 1 && arr.split(" ").toString() != blank.join()) {
        wrongGuess--;
        document.getElementById('status').innerHTML = 'Try Again, you have ' + wrongGuess + ' wrong guess\' remaining';
    } else {
        document.getElementById('status').innerHTML = '';
    }
    if (obj) {
        guessedLetters.push(obj);
    }
    for (var i = 0; i < arr.length; i++) {
        if (arr.split("")[i] === obj) {
            blank.splice(i, 1, obj);
        }
    }
}


function arraysEqual(arr1, arr2) {

    if (arr1.replace(" ", "") == arr2.join("").replace("\u00A0", "")) {
        winCounter();

        document.getElementById('status').innerHTML = 'Mischief Managed! Press the Enter key to play again';
        return continueGame = false;
    } else if (wrongGuess === 0) {
        document.getElementById('status').innerHTML = 'You lost, your word was ' + arr + ' Press the Enter key to play again';
        lossCounter();
        return continueGame = false;
    }
}

document.getElementById('word').innerHTML = blank.join(' ');
document.getElementById('guessedLetters').innerHTML = guessedLetters.join(' ');

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


document.onkeyup = function(event) {

    var userGuess = String.fromCharCode(event.keyCode).toLowerCase();
    if (event.keyCode == 13) {
        location.reload();
        continueGame = true;
    } else if (continueGame) {

        if (numGuessRem > 0) {
            numGuessRem--;
            include(arr, userGuess);
            arraysEqual(arr, blank);
        }
    }
    document.getElementById('word').innerHTML = blank.join(' ');
    document.getElementById('guessedLetters').innerHTML = guessedLetters.join(' ');
}