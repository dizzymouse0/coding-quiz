let startButton = document.getElementById("start-button");
let questionEle = document.getElementById("question");

let questions = [
  {
    question: "Are Java and Javascript the same thing?",
    answers: [
      { text: "Yes", correct: false },
      { text: "No", correct: true },
    ]
  }
]

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
}