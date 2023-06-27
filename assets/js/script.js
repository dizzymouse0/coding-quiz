// variables for html 
var startButton = document.getElementById("start-button");
var questionElement = document.getElementById("question");
var timerElement = document.getElementById("timer")
var answerButtonsElement = document.getElementById("answer-buttons");
var scoreElement = document.getElementById("score")
var saveButton = document.getElementById("save-button");
var highScoresList = document.getElementById("high-scores")
var nameElement = document.getElementById("name-entry");

// game questions
var questions = [
  {
    question: "Are Java and Javascript the same thing?",
    answers: [
      { text: "Yes", correct: false },
      { text: "No", correct: true },
    ]
  },
  {
    question: "How many primitive data types are there?",
    answers: [
      { text: "8", correct: false},
      { text: "4", correct: false},
      { text: "9", correct: false},
      { text: "7", correct: true},
    ]
  },
  {
    question: "What is NOT a reference type?",
    answers: [
      { text: "object", correct: false},
      { text: "array", correct: false},
      { text: "while", correct: true},
      { text: "function", correct: false},
    ]
  }
  //{
   // question: "b! = c"
  //}
]

// variables for the function
var currentQuestion;
var score;
var timeLeft;
var timerInterval;
var highScores = [];

startButton.addEventListener("click", startGame);

saveButton.addEventListener("click", saveScore);

function startGame() {
  currentQuestion = 0;
  timeLeft = 30;
  score = 0;
  timerElement.textContent = timeLeft;
  // hiding start button
  startButton.classList.add("hide");
  questionElement.classList.remove("hide");
  answerButtonsElement.classList.remove("hide");

  timerInterval = setInterval(function() {
    timeLeft--;
    timerElement.textContent = timeLeft;
//starting the timer
    if (timeLeft <= 0 || currentQuestion === questions.length) {
      clearInterval(timerInterval);
      endGame();
    }
  }, 1000);
  
  displayQuestion();
}
// displaying next questions
function displayQuestion() {
  var question = questions[currentQuestion];
  questionElement.textContent = question.question;

  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }

//show answer buttons
  question.answers.forEach(function(answer) {
    var button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

// adding correct or wrong functions
function selectAnswer(selectAnswer) {
  var selectedButton = selectAnswer.target;
  var correct = selectedButton.dataset.correct;
  if (correct) {
    //add 1 to score if correct
    score++;
  } else {
    //or subtract time if wrong
    timeLeft -= 10;
    //do not subtract time if at zero
    if(timeLeft < 0) {
      timeLeft = 0;
    }
    timerElement.textContent = timeLeft;
  }
//next question
  currentQuestion++;
// shows next questions or ends the game
  if (currentQuestion < questions.length) {
    displayQuestion();
  } else {
    endGame();
  }
}
//hide questions and show name and score
function endGame() {
  questionElement.classList.add("hide");
  answerButtonsElement.classList.add("hide");
  nameElement.classList.remove("hide");
  scoreElement.classList.remove("hide");
  saveButton.classList.remove("hide");
 
//showing user score
  scoreElement.textContent = "Score: " + score;

  var savedScores = localStorage.getItem("highScores");
  if (savedScores) {
    highScores = JSON.parse(savedScores);
  }

  //show high scores
  highScoresList.innerHTML = "";
  highScores.forEach(function(score) {
    var li = document.createElement("li");
    li.textContent = score.initials + " - " + score.score;
    highScoresList.appendChild(li);
  });
}

//saving high scores
function saveScore() {
  var nameEntry = nameElement.value;
  var highScore = { nameEntry: nameEntry, score: score};
  highScores.push(highScore);

//store highscores
  localStorage.setItem("highScores", JSON.stringify(highScores));

  nameElement.classList.add("hide");
  scoreElement.classList.add("hide");
  saveButton.classList.add("hide");

  highScoresList.innerHTML = "";
  highScores.forEach(function(score) {
   var li = document.createElement("li");
   li.textContent = score.initials + " - " + score.score;
    highScoresList.appendChild(li);
  });
}