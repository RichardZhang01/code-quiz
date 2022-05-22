const highScoreBtn = document.querySelector("#highscore-button");
const startButton = document.querySelector("#start");
const backButton = document.querySelector(".back");

const timerEl = document.querySelector("#time-count");
const titleQuestionEl = document.querySelector("#title");
const optionsAnswersEl = document.querySelectorAll("options");
const responseEl = document.querySelector("#response");

const introSection = document.querySelector(".intro");
const quizSection = document.querySelector(".quiz");
const scoresSection = document.querySelector(".highscores");

introSection.hidden = false;
quizSection.hidden = true;
scoresSection.hidden = true;

let score = 0;
let timerCount = 10;
let allQuestionsAnswered = false;


const startTimer = () => {

    const timer = setInterval(function() {

        timerCount--;
        timerEl.textContent = timerCount;
        
        if (timerCount >= 0) {          
          if (allQuestionsAnswered && timerCount > 0) {
            clearInterval(timer);
            displayScore();
          }
        }

        if (timerCount === 0) {    
          clearInterval(timer);
          displayScore();
        }

      }, 1000);
}

const startQuiz = () => {
    introSection.hidden = true;
    quizSection.hidden = false;
    highScoreBtn.disabled = true;
    startTimer();
}

const displayScores = () => {
    introSection.hidden = true;
    quizSection.hidden = true;
    scoresSection.hidden = false;
}

const displayMain = () => {
    introSection.hidden = false;
    quizSection.hidden = true;
    scoresSection.hidden = true;
}

startButton.addEventListener("click", startQuiz);
highScoreBtn.addEventListener("click", displayScores);
backButton.addEventListener("click", displayMain);