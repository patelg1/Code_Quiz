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

var highscores = {
    initials: [],
    scores: [],
}

var timeLeft = 75;
var currentQuestion = 0;
var score = 0;
var startQuiz = document.querySelector("#start-button");
var quizText = document.querySelector("#quizInfo");
var quizChoices = document.querySelector("#question-choice");
var answerChoice = document.querySelector("#answer-check");
var timerEl = document.querySelector("#timer");
var highScoreList = document.querySelector("#highscore-list");
var backButton = document.querySelector("#go-back");
var clearScores = document.querySelector("#clear-scores")

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
        
        
        choiceButton.addEventListener("click", function(e){
            if(currentQuestion < questionBank.length) {
                nextQuestion(e.target.textContent);
            } else {
                location.href = 'highscore.html'                
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
startQuiz.addEventListener("click", function(){
    startQuiz.remove();
    nextQuestion();
    startTimer();     
})

function checkAnswer(answerText){
    console.log(answerText);
    console.log(questionBank[currentQuestion-1].answer)    

    if (questionBank[currentQuestion-1].answer === answerText){
        answerChoice.textContent = "CORRECT!"        
    }else{
        answerChoice.textContent = "WRONG!!"
        if (timeLeft <= 15){
            timeLeft = 0;
        }else{
            timeLeft -= 15;
        }
    }    
     
    
}    
function startTimer(){
    var timerInterval = setInterval(function(){
        document.getElementById("timer").innerHTML = timeLeft;
        timeLeft--;
        if (timeLeft === 0){
            clearInterval(timerInterval);
            timerEl.innerHTML = "Done"
        }
        
    }, 1000)
        
}

function quizScore(){
    if (timeLeft >= 0){
        score = timeLeft ;
        var scorePara = document.createElement("p");
        scorePara.textContent = "Your final score is: " + score;
        highScoreList.prepend(scorePara);
    }


}

function getUserName(){
    
}
  
    
        
