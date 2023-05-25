var questions = [
    {
        question: "Which of the following keywords is used to define a variable in Javascript?",
        choices: ["var", "let", "Both A and B", "None of the above"],
        answer: "Both A and B"
    },
    {
        question: "Which of the following methods is used to access HTML elements using Javascript?",
        choices: ["getElementbyId()", "getElementsByClassName()", "Both A and B", "None of the above"],
        answer: "Both A and B"
    },
    {
        question: "How do you stop an interval timer in JavaScipt?",
        choices:["clearInterval", "clearTimer", "intervalOver", "None of the above"],
        answer: "clearInterval"
    },
    {
        question: "How do you write a comment in JavaScript?",
        choices: ["/* */", "//", "#", "$ $"],
        answer: "//"
    },
    {
        question: "JavaScript is a/an _____ language.",
        choices: ["Object-Oriented", "Procedural", "Object-Based", "None of the above"],
        answer: "Object-Oriented"
    }
];
// An array containing question objects with three properties each.

var currentQuestionIndex = 0;
var timeLeft = 100;
var timerInterval;
// Keeps track of the current question showing up on the page.
// Sets the initial time to start at 100 seconds.
// Used to store the time.

var startButton = document.getElementById("start-button");
var questionElement = document.getElementById("question");
var choicesElement = document.getElementById("choices");
var choices = choicesElement.getElementsByTagName("button");
var timerElement = document.getElementById("timer");
var initialsInput = document.getElementById("initials");
var saveButton = document.getElementById("save-button");
var scoreContainerElement = document.getElementById("score-container");
// The variables declared here are tied to the HTML using "getElementById" so they can be manipulated in JavaScript.

function startQuiz() {
    startButton.style.display = "none";
    timerInterval = setInterval(updateTimer, 1000);
    showQuestion(currentQuestionIndex);
}
// This function starts the game and hides the start button once the game is started.
// It also starts the timer beginning at 100 seconds.
// Lastly, it displays the first question in the questions array by using the function below this comment.

function showQuestion(questionNumber) {
    if (questionNumber >= questions.length) {
        endQuiz();
        return;
    }
    
    questionElement.innerText = questions[questionNumber].question;
    choicesElement.innerHTML = "";
    
    for (var i = 0; i < questions[questionNumber].choices.length; i++) {
        var choiceButton = document.createElement("button");
        choiceButton.innerText = questions[questionNumber].choices[i];
        choiceButton.addEventListener("click", function() {
            checkAnswer(this.innerText);
        });
        choicesElement.appendChild(choiceButton);
    }
}
// If the question number exceeds the amount of questions in the array, then end the quiz.
// The question array is updated by whichever number is bracketed and changes the HTML content of questionElement with the next index in the array.
// This clears the HTML element "choicesElement" to an empty string so that the next index in the questions array has space to move in.
// The first line is what shows the next question in the array until they are all ran through.
// A new button element is created every loop that is used to represent each of the four choices.
// The text displayed for each choice is chosen by which question the user is on.
// A "click event" is listened for that verifies whether the button clicked is the correct answer.
// choiceButton is assigned as the child to choicesElement so that it appears on the webpage.

function checkAnswer(selectedChoice) {
    var currentQuestion = questions[currentQuestionIndex];
    if (selectedChoice === currentQuestion.answer) {
    } else {
        timeLeft -= 20;
        if (timeLeft < 0) {
            timeLeft = 0;
        }
    }
    currentQuestionIndex++;
    showQuestion(currentQuestionIndex);
}
// The current question is selected and assigned to a new variable, the user answer is then checked to be true.
// If the answer is not equal, then the user loses 20 seconds of time.
// The next line checks that if the subtracted time goes negative, then the quiz will end and a negative score will not be shown.
// The final part is what renders the next question.

function updateTimer() {
    timeLeft--;
    timerElement.textContent = timeLeft;
    if (timeLeft <= 0) {
        endQuiz();
    }
}
// The time decreases one second at a time and is displayed using JavaScript through the HTML.
// endQuiz() is executed when the timer reaches zero.

function endQuiz() {
    clearInterval(timerInterval);
    questionElement.textContent = "Game over";
    choicesElement.style.display = "none";
    timerElement.style.display = "none";
    scoreContainerElement.style.display = "block";
    document.getElementById("score").textContent = timeLeft;
}
// The timer stops.
// questionElement is over written to tell the user that their game is over.
// The choices and timer are both hidden.
// The score is gotten by re-writing the HTML id "score" and replacing it with the remaining time on the timer.

function saveScore() {
    var initials = initialsInput.value.trim();
    
    if (initials !== "") {
        var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
        
        var newScore = {
            initials: initials,
            score: timeLeft
        };
        
        highScores.push(newScore);
        localStorage.setItem("highScores", JSON.stringify(highScores));
    }
}
// Any spaces are trimmed so as to better include initials.
// Checks to make sure initials is not an empty string.
// highScore date is rectrieved from local storage and turned from a string into an array.
// The new score is logged to the console with initials and score.
// newScore is appended to the end of the highScores array within the local storage.
// highScores are turned back in to strings and stored.

for (var i = 0; i < choices.length; i++) {
    choices[i].addEventListener("click", function() {
        checkAnswer(this.innerText);
    });
}
// This loop add a click event to each question choice that checks if it is true or false.
// It runs the entire time the quiz is in progress.

startButton.addEventListener("click", startQuiz);
saveButton.addEventListener("click", saveScore);
// Click events added to startQuiz and saveScore that call their respective function.