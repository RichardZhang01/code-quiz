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
const scoresEl = document.querySelector(".scores");

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
let timerCount = 60;
let correctAnswers = 0;
let questionsCount = 0;
let allQuestionsAnswered = false;
let storedScores = JSON.parse(localStorage.getItem("scores")) || [];
let responses = "";

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
        answer: "Store values so we can use them later and change them from the code",
        options: ["Store values so we can use them later and change them from the code", 
        "Store values so we can use them but cannot change them",
        "Store values so we can use them once", 
        "Store values in containers so we can't use them later"]
    },

    {
        question: "What does HTML stand for?",
        answer: "Hyper Text Markup Language",
        options: ["Hyperlinks and Text Markup Language", 
        "Hyper Text Markup Language",
        "Home Tool Markup Language"]
    },

    {
        question: "If we want to place text around an image, which CSS property should we use?",
        answer: "Float",
        options: ["Push", "Float", "Align", "Wrap"]
    },

    {
        question: "Suppose we want to arrange three DIVs so that DIV 3 is placed above DIV1. Now, which CSS property are we going to use to control the stack order?",
        answer: "Z-index",
        options: ["D-index", "S-index", "X-index", "Z-index"]
    },

    {
        question: 'Which of the following will write the message “Hello World!” in an alert box?',
        answer: 'alert(“Hello World!”);',
        options: ['alertBox(“Hello World!”);', 'alert(Hello World!);', 
        'msgAlert(“Hello World!”);', 'alert(“Hello World!”);']
    },

    {
        question: "Choose the correct HTML tag for a large title.",
        answer: "H1",
        options: ["H1", "Heading", "Head", "H6"]
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
    timerCount = 60;

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

// function that feeds questions and answers from the questions array
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
            // can populate the section. Also calls the checkQuizOver function
            responses = responses.concat("✅");
            responseEl.textContent = responses;
            correctAnswers++;
            answersEl.innerHTML = "";
            questionEl.textContent = "";
            questionsCount++;
            checkQuizOver();
        
        // This condition runs if the user selected the incorrect answer
        } else {

            // if the option is incorrect, displays a message, timer decreases, counter tracking answers
            // answered increases by 1, and the quiz section is reset for the next question. Also calls the
            // checkQuizOver function
            responses = responses.concat("❌");
            responseEl.textContent = responses;
            timerCount -= 10;
            answersEl.innerHTML = "";
            questionEl.textContent = "";
            questionsCount++;
            checkQuizOver();  
        };

    } else {
        return;
    };

    // if the quiz is finished, this function exits. If not, calls the displayQuiz function
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
    responses = "";

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
    timerEl.textContent = 60;

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

    // variable that tests if the user's input consists of only letters. true if yes, false otherwise
    const testString = /^[a-zA-Z]+$/.test(initialsInput.value);

    // function displays a message to the user if they do not enter anything in the input box, or if they 
    // enter non-alpha characters. function then exits
    if (initialsInput.value === "") {
        window.alert("Please enter your initials if you wish to submit your score.");
        return;
    } else if (!testString) {
        window.alert("Please enter only letters.");
        return;
    };   

    // creation of an object used to store the user's initials and score that will be added to an array
    const obj = {
        initials: initialsInput.value.toUpperCase().trim(),
        score: correctAnswers,
    };

    // adds the user's information to the storedScores array and then stores all of the saved scores to
    // localStorage. Also clears the initials input box
    storedScores.push(obj);
    localStorage.setItem("scores", JSON.stringify(storedScores));
    initialsInput.value = "";

    // calls the displayScores function and renderScores function
    displayScores();
    renderScores();
};

// function that renders saved scores in localStorage to the scores section
const renderScores = () => {
    // clears the scores list for repopulation from localStorage
    scoresEl.innerHTML = "";

    // stores the information from localStorage in an array (empty if nothing in localStorage)
    let scoresArray = JSON.parse(localStorage.getItem("scores")) || [];

    // sorts the array by score
    scoresArray.sort((a, b) => b.score - a.score);

    // checks if the array is empty
    if (scoresArray.length === 0) {

        // creates a default message to display when no scores are saved to localStorage
        let defaultHead = document.createElement("tr");
        let noScores = document.createElement("td");
        noScores.textContent = "No highscores are currently available";

        scoresEl.appendChild(defaultHead);
        defaultHead.appendChild(noScores);

        // function exits
        return;
    }

    // creates the header row for the highscores table if scoresArray is not empty
    let firstRow = document.createElement("tr");

    let th0 = document.createElement("th");
    th0.textContent = "";

    let th1 = document.createElement("th");
    th1.textContent = "Player";

    let th2 = document.createElement("th");
    th2.textContent = "Score";

    scoresEl.appendChild(firstRow);
    firstRow.appendChild(th0);
    firstRow.appendChild(th1);
    firstRow.appendChild(th2);
    
    // populates scores page with stored initials and score data in localStorage
    for (let i = 0; i < scoresArray.length; i++) {

        let tr = document.createElement("tr");

        let td0 = document.createElement("td");
        td0.textContent = i + 1;

        let td1 = document.createElement("td");        
        td1.textContent = scoresArray[i].initials;

        let td2 = document.createElement("td");        
        td2.textContent = scoresArray[i].score;
    
        scoresEl.appendChild(tr);
        tr.appendChild(td0);
        tr.appendChild(td1);
        tr.appendChild(td2);
    }
};

// function that clears localStorage data
const clearScores = () => {

    // this clears localStorage data and resets any stored scores in the script to an empty array
    localStorage.clear();
    storedScores = [];

    // calls renderScores function to clear the scores list
    renderScores();
};

// function that runs when the page initially loads. Basically just calls the renderScores
// function which retrieves localStorage data and populates the scores list
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

// calls init function when the page loads
init();