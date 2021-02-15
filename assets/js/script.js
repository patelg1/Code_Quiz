var dataFromStorage = JSON.parse(localStorage.getItem('highscores'))|| [];
var timerInterval;

// Array of question object with question, choices, and answer
var questionBank = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        choices: ["<head>", "<body>", "<meta>", "<script>"],
        answer: "<script>"
    },
    {
        question: "Commonly used data types DO NOT include:",
        choices: ["alert", "string", "boolean", "number"],
        answer: "alert"
    },
    {
        question: "What does CSS stand for?",
        choices: ["Computer Style Sheets", "Creative Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"],
        answer: "Cascading Style Sheets"
    },
    {
        question: "The Bootstrap grid system is based on how many columns?",
        choices: ["9", "12", "8", "4"],
        answer: "12"
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        choices: ["msg('Hello World');", "alert('Hello World');", "alert: 'Hello World';", "msgBox('Hello World');"],
        answer: "alert('Hello World');"
    }
];
//highscore object holding array of initals and scores
var highScores = {
    initials: [],
    scores: [],
}
// Initial variable declartion
var timeLeft = 20;
var currentQuestion = 0;
var score;
var startQuiz = document.querySelector("#start-button");
var quizText = document.querySelector("#quizInfo");
var quizChoices = document.querySelector("#question-choice");
var answerChoice = document.querySelector("#answer-check");
var timerEl = document.querySelector("#timer");
var highScoreList = document.querySelector("#highscore-list");
var backButton = document.querySelector("#go-back");
var clearScores = document.querySelector("#clear-scores")
var quizEl = document.querySelector(".quiz");
//Function to change page to show question and choices and loop through the array
function nextQuestion(answerText){    
    quizChoices.innerHTML = "";    
    quizText.textContent = questionBank[currentQuestion].question; 
    var quizAnswers = document.createElement("ul");
    document.getElementById
    quizAnswers.setAttribute("class", "quiz-answers");   

    for (i = 0; i < questionBank[currentQuestion].choices.length; i++){
        var answerList = document.createElement("li");
        var choiceButton = document.createElement("button");
        choiceButton.setAttribute("class", "quiz-answer");
        choiceButton.style.height = "50px";
        choiceButton.style.width = "200px";
        choiceButton.style.marginBottom = "10px";
        
        //Click event for choices
        choiceButton.addEventListener("click", function(e){
            if(currentQuestion < questionBank.length) {
                nextQuestion(e.target.textContent);
            } else {
                
                endQuiz();                               
            }
        });
        choiceButton.textContent = questionBank[currentQuestion].choices[i];
        answerList.append(choiceButton)
        quizChoices.append(answerList);
    }
    if (currentQuestion !== 0){
        checkAnswer(answerText);
    }    
    currentQuestion++;
}
//Function to begin quiz and timer
startQuiz.addEventListener("click", function(){
    startQuiz.remove();
    nextQuestion();
    startTimer();
        
})
//Function to check if answer is correct
function checkAnswer(answerText){
    if (questionBank[currentQuestion-1].answer === answerText){
        answerChoice.textContent = "CORRECT!"        
    }else{
        answerChoice.textContent = "WRONG!!"
        if (timeLeft <= 15){
            timeLeft = 0;
            timerEl.innerHTML = "Done";
            endQuiz();
        }else{
            timeLeft -= 15;
            
        }
    }
     
    
} 
// Function to run timer and deduct 15 sec for each wrong answer   
function startTimer(){
    timerInterval = setInterval(function(){
        // document.getElementById("timer").innerHTML = timeLeft;
        timeLeft--;
        if (timeLeft <= 0){
            timeLeft = 0;
            timerEl.innerHTML = "Done";
            endQuiz()
        }

        document.getElementById("timer").innerHTML = timeLeft;
        
    }, 1000)
        
}
// Function to stop timer
function stopTimer(){
    clearInterval(timerInterval);
}

//Function to end quiz and show score and add initials and submit button
function endQuiz(){
    stopTimer();
    
    console.log("end of quiz");
    var quizDone = document.createElement("div");
    quizDone.setAttribute("class", "quiz-done");
    quizChoices.innerHTML = "";

    var doneMsg = document.createElement("h1");
    doneMsg.textContent = "All Done!";

    score = document.createElement("p");
    score.textContent = "Your score is: " + timeLeft;

    var formEl = document.createElement("div");
    formEl.setAttribute("class", "quiz-form");
    var labelEl = document.createElement("label");
    labelEl.textContent = "Enter your initials: ";
    var inputEl = document.createElement("input");
    inputEl.setAttribute("type", "text");
    var submitEl = document.createElement("button");
    submitEl.setAttribute("class", "submit-score");
    submitEl.style.height = "50px";
    submitEl.style.width = "150px";
    submitEl.style.marginTop = "10px"
    submitEl.textContent = "Submit"
    labelEl.appendChild(inputEl);
    formEl.appendChild(labelEl);
    formEl.appendChild(submitEl);

    quizDone.appendChild(doneMsg);
    quizDone.appendChild(score);
    quizDone.appendChild(formEl);
    quizEl.replaceChild(quizDone, quizText);

    submitEl.addEventListener("click", function(event){
        
        if (inputEl.value === ""){
            alert("Please enter initials!");
        } else {
            saveScore(inputEl.value, timeLeft);
            window.location = "highscore.html"
        }
        })
    
    };
//Function to get scores and initials from local storage
function getScores(){
    var savedScore = localStorage.getItem("highScores");

    if (savedScore != null){
        var storedScores = JSON.parse(savedScore);
        highScores.initials = storedScores.initials;
        highScores.scores = storedScores.scores;
    }else{
        highScores.initials = [];
        highScores.scores = [];
    }
}
//Function to show scores and initials on web page
function showScores(){
    highScoreList.innerHTML = "";   

    for(var i = 0; i < dataFromStorage.length; i++){
        var listEl = document.createElement("li");
        var paraEl = document.createElement("p");
        paraEl.setAttribute("class", "highscore");
        paraEl.textContent = (i + 1) + ". " + dataFromStorage[i].initials + "- " + dataFromStorage[i].score;

        listEl.appendChild(paraEl);
        highScoreList.appendChild(listEl);

    }
}
// Function to save score and initials
function saveScore(newInitials, newScore){
    
    var newRecord = {
        initials: newInitials,
        score: newScore
    }

    dataFromStorage.push(newRecord);
    
    var highScore = JSON.stringify(dataFromStorage);

    localStorage.setItem("highscores", highScore);
}


    

  
    
        
