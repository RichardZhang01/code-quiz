// creating variables that link to their respective button in the HTML document
const highScoreBtn = document.querySelector("#highscore-button");
const startBtn = document.querySelector("#start");
const backBtn = document.querySelector("#back");
const clearBtn = document.querySelector("#clear");
const submitBtn = document.querySelector("#submit");
const returnBtn = document.querySelector("#return");

// creating variables that link to their respective element in the HTML document
const timerEl = document.querySelector("#time-count");
const titleEl = document.querySelector("#title");
const answersEl = document.querySelector(".options");
const responseEl = document.querySelector(".response");
const questionEl = document.querySelector("#question");
const finalScoreEl = document.querySelector("#final-score");
const scoresEl = document.querySelector("#scores");

// creating variables that link to their respective section in the HTML document
const introSection = document.querySelector(".intro");
const quizSection = document.querySelector(".quiz");
const scoresSection = document.querySelector(".highscores");
const resultsSection = document.querySelector(".quiz-results");

const initialsInput = document.querySelector("#initials");

// default visibility of the various sections in the HTML document
introSection.hidden = false;
quizSection.hidden = true;
scoresSection.hidden = true;
resultsSection.hidden = true;

// variables keeping track of the various parts of the quiz
let timerCount = 100;
let correctAnswers = 0;
let questionsCount = 0;
let allQuestionsAnswered = false;
let storedScores = JSON.parse(localStorage.getItem("scores")) || [];

// an array of questions, their answers, and their options
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

// function checking if all questions have been answered
const checkQuizOver = () => {
    
    if (questionsCount === questions.length) {
        allQuestionsAnswered = true;
    };
};

// timer function that will terminate when time reaches 0 or all questions have been answered
const startTimer = () => {

    timerCount = 100;

    const timer = setInterval(function () {

        timerCount--;
        timerEl.textContent = timerCount;

        if (timerCount > 0) {
            if (allQuestionsAnswered && timerCount > 0) {
                clearInterval(timer);
                displayQuizResults();
            };
        }

        if (timerCount <= 0) {
            clearInterval(timer);
            displayQuizResults();
            timerEl.textContent = 0;
        };

    }, 1000);
};

const displayQuiz = () => {

    questionEl.textContent = questions[questionsCount].question;

    for (let i = 0; i < questions[questionsCount].options.length; i++) {
            
        let li = document.createElement("li");        
        li.setAttribute("data-index", i);
    
        let btn = document.createElement("button");
        btn.textContent = questions[questionsCount].options[i];
    
        li.appendChild(btn);
        answersEl.appendChild(li);

      };
};

const checkAnswer = (event) => {
    let element = event.target;

    if (element.matches("button")) {

        if (element.textContent === questions[questionsCount].answer) {

            responseEl.textContent = "Correct!";
            correctAnswers++;
            answersEl.innerHTML = "";
            questionEl.textContent = "";
            questionsCount++;
            checkQuizOver();

        } else {

            responseEl.textContent = "Wrong!";
            timerCount -= 5;
            answersEl.innerHTML = "";
            questionEl.textContent = "";
            questionsCount++;
            checkQuizOver();  
        };

    } else {
        return;
    };

    if (allQuestionsAnswered === true) {
        return;
    } else {
        displayQuiz();
    }
};

// function that starts the quiz when the start buttton is pressed. 
const startQuiz = () => {

    // sets all sections to hidden except for the quiz section
    introSection.hidden = true;
    quizSection.hidden = false;
    resultsSection.hidden = true;
    highScoreBtn.disabled = true;

    // Makes sure that the quiz section is initially empty before populating it with questions/answers
    answersEl.innerHTML = "";
    questionEl.textContent = "";
    responseEl.textContent = "";

    // initializes the variables tracking different parts of the quiz
    allQuestionsAnswered = false;
    questionsCount = 0;
    correctAnswers = 0;

    // calls the timer function (which starts the timer), and the displayQuiz function that shows the quiz section
    // and populates the section with questions and answers
    startTimer();
    displayQuiz();

};

// function that displays the quiz results when the quiz is over
const displayQuizResults = () => {

    finalScoreEl.textContent = `Your final score was: ${correctAnswers} out of ${questions.length}`;

    resultsSection.hidden = false;
    introSection.hidden = true;
    quizSection.hidden = true;
    scoresSection.hidden = true;

};

const displayScores = () => {

    introSection.hidden = true;
    quizSection.hidden = true;
    scoresSection.hidden = false;
    resultsSection.hidden = true;
    highScoreBtn.disabled = false;

    scoresEl.innerHTML == "";

};

const displayMain = () => {

    timerEl.textContent = 100;

    introSection.hidden = false;
    quizSection.hidden = true;
    scoresSection.hidden = true;
    resultsSection.hidden = true;
    highScoreBtn.disabled = false;

};

const submitScore = (event) => {

    event.preventDefault();

    const obj = {
        initials: initialsInput.value.toUpperCase().trim(),
        score: correctAnswers,
    };

    if (initialsInput.value === "") {
        displayScores();
        return;
    }     

    storedScores.push(obj);
    localStorage.setItem("scores", JSON.stringify(storedScores));
    initialsInput.value = "";

    displayScores();
    renderScores();
};

const renderScores = () => {
    scoresEl.innerHTML = "";

    const scoresArray = JSON.parse(localStorage.getItem("scores")) || [];

    if (!scoresArray) {
        return;
    }
    
    for (let i = 0; i < scoresArray.length; i++) {

        let li = document.createElement("li");        
        li.setAttribute("data-index", i);
        li.textContent = `Initials: ${scoresArray[i].initials} Score:${scoresArray[i].score}`;
    
        scoresEl.appendChild(li);
    }
};

const clearScores = () => {
    localStorage.clear();
    storedScores = [];

    renderScores();
};

const init = () => {
    renderScores();
};

startBtn.addEventListener("click", startQuiz);
highScoreBtn.addEventListener("click", displayScores);
backBtn.addEventListener("click", displayMain);
returnBtn.addEventListener("click", displayMain);
submitBtn.addEventListener("click", submitScore);
clearBtn.addEventListener("click", clearScores);

quizSection.addEventListener("click", checkAnswer);

init();