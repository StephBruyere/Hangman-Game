//loads page
window.onload = function () {

//Word Bank
var library = ["Potter", "Hogwarts", "Voldemorts"]

//Pull from library
var words = library[Math.floor(Math.random() * library.length)];


// globals 
var str;
var count = 0;
var answerArray = [];

//Spaces for words from word bank
function start() {
  for (var i = 0; i < words.length; i++) {
    answerArray[i] = "_";
  }

  // putting in a string
  str = answerArray.join(" ");
  document.getElementById("anwser").innerHTML = str;
}

function letter() {
  var letter = document.getElementById("letter").value;

  if (letter.length > 0) {
    for (var i = 0; i < words.length; i ++) {
      if (words[i] === letter) {
        answerArray[i] = letter;
      }
    }
    count++;
    document.getElementById("counter").innerHTML = "No of clicks: " + count;
    document.getElementById("answer").innerHTML = answerArray.join(" ");
  }

}
}