// variables for html 
let startButton = document.getElementById("start-button");
let questionEle = document.getElementById("question");
let timerElement = document.getElementById("timer")

// game questions
let questions = [
  {
    question: "Are Java and Javascript the same thing?",
    answers: [
      { text: "Yes", correct: false },
      { text: "No", correct: true },
    ]
  }
]

// variables for the function
let currentQuestion;
let remainingTime;
let score;

startButton.addEventListener("click", startGame);
function startGame() {
  currentQuestion = 0;
  remainingTime = 30;
  score = 0;
  // hiding start button
  startButton.classList.add("hidden");

  timerInterval = setInterval(function() {
    timeLeft--;
    timerElement.textContent = timeLeft;
//starting the timer
    if (remainingTime <= 0 || currentQuestion === questions.length) {
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
  })
}