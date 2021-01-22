//Variables to store high scores and initials
var dataFromStorage = JSON.parse(localStorage.getItem('highscores'))|| [];

var highScoreList = document.querySelector("#highscore-list");
//Variables to get the back and clear buttons
var backButton = document.querySelector("#go-back");
var clearScores = document.querySelector("#clear-scores")
//Function to show scores on page
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
//Event listener for back button
backButton.addEventListener("click", function(){
    window.location = "index.html";
});
//Event listener for clear high scores
clearScores.addEventListener("click", function(){
    localStorage.removeItem("highscores");
    highScoreList.innerHTML = "";
})


showScores();