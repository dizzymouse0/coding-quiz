// variables for html 
let startButton = document.getElementById("start-button");
let questionEle = document.getElementById("question");
let timerElement = document.getElementById("timer")
let answerButtonsElement = document.getElementById("answer-buttons");
let scoreElement = document.getElementById("score")
let saveButton = document.getElementById("save-button");
let highScores = document.getElementById("high-scores")

// game questions
let questions = [
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
  }
]

// variables for the function
let currentQuestion;
let score;
let timeLeft;
let timerInterval;

startButton.addEventListener("click", startGame);

function startGame() {
  currentQuestion = 0;
  timeLeft = 30;
  score = 0;
  timerElement.textContent = timeLeft;
  // hiding start button
  startButton.classList.add("hidden");
  questionEle.classList.remove("hidden");
  answerButtonsElement.classList.remove("hidden");

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
  let question = questions[currentQuestion];
  questionEle.textContent = question.question;
//show answer buttons
  question.answers.forEach(function(answer) {
    let button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("btn");
    if(answer.correct) {
      button.dataset.correct = answer.correct;
    }
  });
}

function selectAnswer(selectAnswer) {
  let selectedButton = selectAnswer.target;
  let correct = selectedButton.dataset.correct;
  if (correct) {
    //add 1 to score if correct
    score++;
  } else {
    //or subtract time if wrong
    timeLeft -= 10;
    if(timeLeft < 0) {
      timeLeft = 0;
    }
    timerElement.textContent = timeLeft;
  }

  currentQuestion++;
// shows next questions or ends the game
  if (currentQuestion < questions.length) {
    displayQuestion();
  } else {
    endGame();
  }
}
//hide questions
function endGame() {
  questionEle.classList.add("hide");
  answerButtonsElement.classList.add("hide");
//showing user score
  scoreElement.textContent = "Score: " + score;

}