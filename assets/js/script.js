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

    // resets the counter
    timerCount = 100;

    const timer = setInterval(function () {

        // displays the time left
        timerCount--;
        timerEl.textContent = timerCount;

        if (timerCount > 0) {
            // checks if all questions have been answered. Displays results section
            if (allQuestionsAnswered && timerCount > 0) {
                clearInterval(timer);
                displayQuizResults();
            };
        }

        // checks if time has run out. Displays results section
        if (timerCount <= 0) {
            clearInterval(timer);
            displayQuizResults();
            timerEl.textContent = 0;
        };

    }, 1000);
};

// function that feeds questions and answers from the questions array (line 48)
// into the quiz section
const displayQuiz = () => {

    // Displays the question
    questionEl.textContent = questions[questionsCount].question;

    // creates and displays the options for each question as buttons
    for (let i = 0; i < questions[questionsCount].options.length; i++) {
            
        let li = document.createElement("li");        
        li.setAttribute("data-index", i);
    
        let btn = document.createElement("button");
        btn.textContent = questions[questionsCount].options[i];
    
        li.appendChild(btn);
        answersEl.appendChild(li);

      };
};

// function that checks which answer the user selected
const checkAnswer = (event) => {
    let element = event.target;

    // checks that a button has been clicked
    if (element.matches("button")) {

        // checks that the option that the user selected was the correct answer
        if (element.textContent === questions[questionsCount].answer) {

            // if the option was correct, displays a message, counter tracking correct answers and questions
            // answered increases by 1, and resets the quiz section so that a new question and its options
            // can populate the section. Also calls the checkQuizOver function (line 78)
            responseEl.textContent = "Correct!";
            correctAnswers++;
            answersEl.innerHTML = "";
            questionEl.textContent = "";
            questionsCount++;
            checkQuizOver();
        
        // This condition runs if the user selected the incorrect answer
        } else {

            // if the option is incorrect, displays a message, timer decreases, counter tracking answers
            // answered increases by 1, and the quiz section is reset for the next question. Also calls the
            // checkQuizOver function (line 78)
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

    // if the quiz is finished, this function exits. If not, calls the displayQuiz function (line 117)
    // which will display the next question and its options.
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

    // displays the user's final score
    finalScoreEl.textContent = `Your final score was: ${correctAnswers} out of ${questions.length}`;

    // makes the results section visible, while all other sections remain hidden
    resultsSection.hidden = false;
    introSection.hidden = true;
    quizSection.hidden = true;
    scoresSection.hidden = true;

};

// function that displays the users' scores
const displayScores = () => {

    // only makes the scores section visible
    introSection.hidden = true;
    quizSection.hidden = true;
    scoresSection.hidden = false;
    resultsSection.hidden = true;
    highScoreBtn.disabled = false;

    // resets the scores list for repopulation by the localStorage scores
    scoresEl.innerHTML == "";

};

// function that displays the main page of the quiz
const displayMain = () => {

    // resets the timer
    timerEl.textContent = 100;

    // displays the main section while keeping everything else hidden. Also reenables the 
    // highscore button that takes the user to the score page if it had been disabled
    introSection.hidden = false;
    quizSection.hidden = true;
    scoresSection.hidden = true;
    resultsSection.hidden = true;
    highScoreBtn.disabled = false;

};

// function that saves the user's initials and score
const submitScore = (event) => {

    // prevents the form from refreshing the page
    event.preventDefault();

    // creation of an object used to store the user's initials and score that will be added to an array
    const obj = {
        initials: initialsInput.value.toUpperCase().trim(),
        score: correctAnswers,
    };

    // function doesn't do anything if no initials are entered. displayScores function (line 225)
    // is called to change sections
    if (initialsInput.value === "") {
        displayScores();
        return;
    }     

    // adds the user's information to the storedScores array and then stores all of the saved scores to
    // localStorage. Also clears the initials input box
    storedScores.push(obj);
    localStorage.setItem("scores", JSON.stringify(storedScores));
    initialsInput.value = "";

    // calls the displayScores function (line 225) and renderScores function (line 285)
    displayScores();
    renderScores();
};

// function that renders saved scores in localStorage to the scores section
const renderScores = () => {
    // clears the scores list for repopulation from localStorage
    scoresEl.innerHTML = "";

    // stores the information from localStorage in an array (empty if nothing in localStorage)
    const scoresArray = JSON.parse(localStorage.getItem("scores")) || [];

    // function exits if there's nothing saved in localStorage
    if (!scoresArray) {
        return;
    }
    
    // populates scores page with stored initials and score data in localStorage
    for (let i = 0; i < scoresArray.length; i++) {

        let li = document.createElement("li");        
        li.setAttribute("data-index", i);
        li.textContent = `Initials: ${scoresArray[i].initials} Score:${scoresArray[i].score}`;
    
        scoresEl.appendChild(li);
    }
};

// function that clears localStorage data
const clearScores = () => {

    // this clears localStorage data and resets any stored scores in the script to an empty array
    localStorage.clear();
    storedScores = [];

    // calls renderScores function (line 286) to clear the scores list
    renderScores();
};

// function that runs when the page initially loads. Basically just calls the renderScores
// function (line 286) which retrieves localStorage data and populates the scores list
const init = () => {
    renderScores();
};

// All of the button event listeners and their respective function calls
startBtn.addEventListener("click", startQuiz);
highScoreBtn.addEventListener("click", displayScores);
backBtn.addEventListener("click", displayMain);
returnBtn.addEventListener("click", displayMain);
submitBtn.addEventListener("click", submitScore);
clearBtn.addEventListener("click", clearScores);

// An event listener on the container for the options for each question
quizSection.addEventListener("click", checkAnswer);

// calls init function (line 322) when the page loads
init();