const highScoreBtn = document.querySelector("#highscore-button");
const startBtn = document.querySelector("#start");
const backBtn = document.querySelector("#back");
const clearBtn = document.querySelector("#clear");
const submitBtn = document.querySelector("#submit");
const returnBtn = document.querySelector("#return");

const timerEl = document.querySelector("#time-count");
const titleQuestionEl = document.querySelector("#title");
const optionsAnswersEl = document.querySelector("options");
const responseEl = document.querySelector("#response");

const introSection = document.querySelector(".intro");
const quizSection = document.querySelector(".quiz");
const scoresSection = document.querySelector(".highscores");
const resultsSection = document.querySelector(".quiz-results");

introSection.hidden = false;
quizSection.hidden = true;
scoresSection.hidden = true;
resultsSection.hidden = true;

let score = 0;
let questionsCount = 0;
let allQuestionsAnswered = false;

const questions = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        answer: "<script>",
        options: ["<js>", "<script>", "<javascript>", "<scripting>"]
    },

    {
        question: "Where is the correct place to insert a JavaScript?",
        answer: "The <body> section",
        options: ["Both the <head> section and the <body section are correct", 
        "The <body> section", "The <head> section"]
    },

    {
        question: "What does CSS stand for?",
        answer: "Cascading Style Sheets",
        options: ["Colorful Style Sheets", "Computer Style Sheets",
        "Creative Style Sheets", "Cascading Style Sheets"]
    },

    {
        question: "To make a comment in HTML you use:",
        answer: "<!--  -->",
        options: ["//", "/*", "#", "<!--  -->"]
    },

    {
        question: "What is a variable?",
        answer: "Store values so we can use them later and change them from the code.",
        options: ["Store values so we can use them later and change them from the code", 
        "Store values so we can use them but cannot change them",
        "Store values so we can use them once", 
        "Store values in containers so we can't use them later"]
    }
];

const checkQuizOver = () => {
    if (questionsCount === questions.length) {
        allQuestionsAnswered = true;
    }
}

const startTimer = () => {
    let timerCount = 10;

    const timer = setInterval(function () {

        timerCount--;
        timerEl.textContent = timerCount;

        if (timerCount >= 0) {
            if (allQuestionsAnswered && timerCount > 0) {
                clearInterval(timer);
                displayQuizResults();
            }
        }

        if (timerCount === 0) {
            clearInterval(timer);
            displayQuizResults();
        }

    }, 100);
}

const startQuiz = () => {
    allQuestionsAnswered = false;
    introSection.hidden = true;
    quizSection.hidden = false;
    resultsSection.hidden = true;
    highScoreBtn.disabled = true;
    startTimer();
}

const displayQuizResults = () => {
    resultsSection.hidden = false;
    introSection.hidden = true;
    quizSection.hidden = true;
    scoresSection.hidden = true;
}

const displayScores = () => {
    introSection.hidden = true;
    quizSection.hidden = true;
    scoresSection.hidden = false;
    resultsSection.hidden = true;
    highScoreBtn.disabled = false;
}

const displayMain = () => {
    introSection.hidden = false;
    quizSection.hidden = true;
    scoresSection.hidden = true;
    resultsSection.hidden = true;
    highScoreBtn.disabled = false;
}

startBtn.addEventListener("click", startQuiz);
highScoreBtn.addEventListener("click", displayScores);
backBtn.addEventListener("click", displayMain);
returnBtn.addEventListener("click", displayMain);