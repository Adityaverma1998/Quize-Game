console.log("hello");

const question = document.getElementById("question");
// console.log(question)
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarText = document.getElementById("progress-bar-text");
let currentQuestion = {};
let acceptAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestion = [];
let questions = [
  {
    question: "Which type of JavaScript language is ___",
    choice1: "Object-Oriented",
    choice2: "Object-base",
    choice3: "Assembly-language",
    choice4: "High-level",
    answer: 2,
  },
  {
    question:
      "Which one of the following also known as Conditional Expression:",
    choice1: "Alternative to if-else",
    choice2: "Switch statement",
    choice3: "if-then-else statement",
    choice4: "immediate if",
    answer: 4,
  },
  {
    question: "The function and  var are known as:",
    choice1: "Keywords",
    choice2: "Data types",
    choice3: "Declaration statements",
    choice4: "Prototypes",
    answer: 3,
  },
  {
    question:
      "Which one of the following is the correct way for calling the JavaScript code?",
    choice1: "Preprocessor",
    choice2: "Triggering Event",
    choice3: "RMI",
    choice4: "Function/Method",
    answer: 4,
  },
  {
    question: "Which of the following type of a variable is volatile?",
    choice1: "Mutable variable",
    choice2: "Dynamic variable",
    choice3: "Volatile variable",
    choice4: "Immutable variable",
    answer: 1,
  },
];

// COnstraint
const CORRECT_BONUS = 10;
const MAX_QUESTION = 5;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestion = [...questions];
  //  console.log(availableQuestion.length);

  getNewQuestion();
};
getNewQuestion = () => {
  if (availableQuestion === 0 || questionCounter >= MAX_QUESTION) {

    // score set in localStroage
    localStorage.setItem("mostRecentScore", score);
    // go to the  end game
    window.location.assign("/end.html");
  }
  // update question number
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTION}`;
  console.log(score +"score") 

  // upDATE PROGRESS Bar
  progressBarText.style.width = `${(questionCounter / MAX_QUESTION) * 100}%`;
  questionCounter++;

  const questionIndex = Math.floor(Math.random() * availableQuestion.length);
  currentQuestion = availableQuestion[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];

  });
  availableQuestion.splice(questionIndex, 1);
  acceptAnswers = true;
};
choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptAnswers) return;
    acceptAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];
    // console.log(selectedAnswer)
    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }
    selectedChoice.parentElement.classList.add(classToApply);
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});
incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
