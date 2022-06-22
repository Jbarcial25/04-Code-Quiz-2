
const questions = [
  {
    question: "CSS stands for:",
    options: ["Cascade style sheets", "color and style sheets", "Cascading style sheets", "None of the above"],
    answer: "Cascading style sheets"
  },
  {
    question:
      "The HTML attribute used to define the inline style is:",
      options: ["style", "styles", "class", "None of the above"],
    answer: "style"
  },
  {
    question: "How do you group selectors?",
    options: ["Separate each selector with a comma","Separate each selector with a plus sign", "Separate each selector with a space","All of the ABOVE"],
    answer: "Separate each selector with a comma"
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    options: ["<scripting>", "<javascript>", "<script>", "<js>"],
    answer: "<script>"
  },
  {
    question:
      "The correct syntax to give a line over text is:",
    options: ["text-decorations: line-through", "text-decoration: none", "text-decoration: overline", "text-decoration: underline"],
    answer: "text-decoration: overline"
  }
];

//elements
const submitBtn = document.getElementById("submit");
const startBtn = document.getElementById("start");
const noteEl = document.getElementById("note");
const questionsEl = document.getElementById("questions");
const timerEl = document.getElementById("time");
const optionsEl = document.getElementById("options");
const initialsEl = document.getElementById("initials");

//timers
var questionsOption = 0;
var timerId;
var time = questions.length * 20;





//Function to start the quiz
function gameStart() {

  // Hides the start screen
  const startScreenEl = document.getElementById("startQuiz");
  startScreenEl.setAttribute("class", "hide");

  // Shows the questions
  questionsEl.removeAttribute("class");

  // sets the timer with a given set time
  timerId = setInterval(clock, 1000);

  // shows the user the timer
  timerEl.textContent = time;

  getQuestions();
}


function getQuestions() {
  const currentQuestion = questions[questionsOption];
  const questionEl = document.getElementById("questionType");
  questionEl.textContent = currentQuestion.question;

  optionsEl.innerHTML = "";

  currentQuestion.options.forEach(function(option, i) {
    const optionSelect = document.createElement("button");
    optionSelect.setAttribute("class", "option");
    optionSelect.setAttribute("value", option);
    optionSelect.textContent = i + 1 + ". " + option;

    optionSelect.onclick = questionClick;

    optionsEl.appendChild(optionSelect);
  });
}

function questionClick() {
  if (this.value !== questions[questionsOption].answer) {
    time -= 10;
    if (time < 0) {
      time = 0;
    }
    timerEl.textContent = time;
    noteEl.textContent = "Incorrect!";
  } else {
    noteEl.textContent = "Correct!";
  }

  noteEl.setAttribute("class", "note");
  setTimeout(function() {
    noteEl.setAttribute("class", "hide");
  }, 1 * 1000);

  questionsOption++;

  if (questionsOption === questions.length) {
    gameOver();
  } else {
    getQuestions();
  }
}

function gameOver() {
  clearInterval(timerId);

  const endOfScreenEl = document.getElementById("end");
  endOfScreenEl.removeAttribute("class");

  const finalScoreEl = document.getElementById("finalScore");
  finalScoreEl.textContent = time;

  questionsEl.setAttribute("class", "hide");
}

function clock() {
  time--;
  timerEl.textContent = time;

  if (time <= 0) {
    quizDone();
  }
}

function saveScore() {
  var initials = initialsEl.value.trim();

  if (initials !== "") {
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    var userScore = {
      score: time,
      initials: initials
    };
    highscores.push(userScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));
    window.location.href = "scores.html";
  }
}
submitBtn.onclick = saveScore;
startBtn.onclick = gameStart;
