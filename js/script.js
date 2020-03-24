const optionsContainer = document.querySelector('#optionsContainer');
const choiceLetterContainer = document.getElementById("choiceLetterContainer");
const guessLetterContainer = document.getElementById("guessLetterContainer");
const animationArea = document.getElementById("animationArea");
const guessDefinitionContainer = document.getElementById("guessDefinition");
const alphabet = "abcdefghijklmnopqrstuvwxyz";
// instance of firebase database
const database = firebase.database();
const rootRef = database.ref('leaderboard');
let wordList = [];
let guessWord;
let guessWordDefinition;
let score = 0;
let lives = 7;
let highgroundvideo;

// Oh?! What's this!? Blake got a god damn API?? Booyah!
// curl --header "Authorization: Token d58d5b9e279673445fd27ae980b3a29950a230c9" https://owlbot.info/api/v4/dictionary/owl -s | json_pp
// fetch definition of word from OwlBot API apply to guessWordDefinition variable
function getOwlAPIWord(word) {
    let url = "https://owlbot.info/api/v4/dictionary/" + word;
    let options = {
        headers: {
            Authorization: "Token d58d5b9e279673445fd27ae980b3a29950a230c9"
        }
    };
    fetch(url, options)
        .then(res => res.json())
        .then(data => {
            guessWordDefinition = data["definitions"][0]["definition"];
            console.log(data);
            console.log(data["definitions"][0]["definition"]);
            if(checkForOldDefinition){
                let guessDefinition = document.querySelector('#guessDefinition');
                guessDefinition.innerText = guessWordDefinition;
            }else{
                generateGuessDefinition();
            }
        });
}

// fetch data from wordlist.json file apply to wordList variable
fetch("src/wordlist.json")
    .then(res => res.json())
    .then(data => {
        wordList = data;
        console.log(data);
        generateMedia();
        main();
    });

// main call
function main(){
    gameStart();
    mediaVisible();
    restartVid();
}

// generates choice letters
function generateChoiceLetters(){
    for (let i = 0; i < alphabet.length; i++) {
        let choiceLetterId = 'c-letter-' + alphabet[i];
        let choiceLetter = document.createElement('button');
        choiceLetter.classList.add('choiceLetterBtn');
        choiceLetter.id = choiceLetterId;
        choiceLetter.onclick = choiceLetterClick;
        choiceLetter.innerText = alphabet[i].toUpperCase();
        // show right alphabets when the button is clicked
        choiceLetter.onclick = choiceLetterClick;
        choiceLetterContainer.appendChild(choiceLetter);
    }
}

// get random guess word from wordList
function getGuessWord() {
    let randomNumber = Math.floor(Math.random() * wordList.length);
    guessWord = wordList[randomNumber];
    generateGuessLetters();
    console.log(guessWord);
    getOwlAPIWord(guessWord);
}

// generates the guess word letters
function generateGuessLetters(){
    for (let i = 0; i < guessWord.length; i++) {
        // letters can repeat in a word, so instead of using id, use class name
        // let guessLetterId = 'g-letter-' + guessWord['word'][i];

        // use the class to show letters when a button is clicked.
        let guessLetterClass = guessWord[i];
        let guessLetter = document.createElement('button');
        guessLetter.classList.add(guessLetterClass);
        guessLetter.classList.add("guessLetter");
        // guessLetter.id = guessLetterId;
        guessLetter.innerText = "_";
        guessLetterContainer.appendChild(guessLetter);
    }
}

function checkForOldDefinition(){
    return document.body.contains(document.querySelector('#guessDefinitionId'));
}


// generates the guess word definition from OWL API
function generateGuessDefinition() {
    let guessDefinitionId = "guessDefinitionId";
    let guessDefinition = document.createElement('p');
    guessDefinition.id = guessDefinitionId;
    guessDefinition.innerText = guessWordDefinition;
    guessDefinitionContainer.appendChild(guessDefinition);
    // guessLetterContainer.appendChild(guessDefinition);   create new container to hold definition
}

// function for when choice letters are clicked
function choiceLetterClick() {
    let choiceLetterClicked = document.getElementById(this.id);
    let letterToShow = choiceLetterClicked.innerText.toLowerCase();
    let elementsArray = document.getElementsByClassName(letterToShow);

    // if no letter is present decrease the score
    if (elementsArray.length === 0) {
        choiceLetterClickFail(choiceLetterClicked);
        hangMediaPlay();
        scoreDecrement();
        lifeDecrement();
    } else {
        // loop over the elements and change the innerText for letters present, increment score
        for (let i = 0; i < elementsArray.length; i++) {
            elementsArray[i].innerText = letterToShow;
            scoreIncrement();
        }
        choiceLetterClickSuccess(choiceLetterClicked);
    }
    // disable button, make the button clickable only once
    choiceLetterClicked.disabled = true;

    // check if the guessWord has been completely guessed.
    checkIfWordIsGuessed();
}

// check if the player has guessed the word yet
function checkIfWordIsGuessed() {
    let allGuessLetters = document.getElementsByClassName("guessLetter");
    console.log(allGuessLetters);
    for (let i = 0; i < allGuessLetters.length; i++) {
        if (allGuessLetters[i].innerHTML === "_") {
            // if word has not yet been guessed
            console.log("Word has not yet been guessed.");
            return
        }
    }
    // if word has been guessed correctly
    console.log("Word has been guessed!");
    wordIsGuessedFlair();
    setTimeout(gameNewRound, 2000)
}

// flair for when player guesses the word correctly
function wordIsGuessedFlair() {
    let allGuessLetters = document.getElementsByClassName("guessLetter");
    for (let i = 0; i < allGuessLetters.length; i++) {
        allGuessLetters[i].style.background = "lawngreen";
        allGuessLetters[i].style.fontWeight = "bolder";
        allGuessLetters[i].style.fontSize = "2vh";
        allGuessLetters[i].style.color = 'black';
    }
}


// changes colour of the choice letters when clicked, on fail red
function choiceLetterClickFail(letter) {
    letter.style.color = 'black';
    letter.style.fontSize = '28px';
    setTimeout(function () {
        letter.style.fontSize = '20px';
        letter.style.color = "white";
        letter.style.backgroundColor = "red"
    }, 100);
}

// changes colour of the choice letters when clicked, on success green
function choiceLetterClickSuccess(letter) {
    letter.style.color = 'black';
    letter.style.fontSize = '28px';
    setTimeout(function () {
        letter.style.fontSize = '20px';
        letter.style.backgroundColor = "lawngreen"
    }, 200);
}

// creates the game reset button
function generateResetButton() {
    let reset = document.createElement("button");
    reset.onclick = gameRestart;
    reset.innerText = "Reset";
    reset.id='reset';
    optionsContainer.appendChild(reset)
}

function lifeDecrement() {
    if (lives === 1) {
        gameOver();
    } else {
        lives -= 1;
        console.log(lives);

        // some animation of loose life.
    }
}

function lifeReset() {
    lives = 7;
}

function scoreDecrement(){
    score -= 1;
    scoreUpdate();
}

function scoreIncrement() {
    score += 1;
    scoreUpdate();
}

function scoreReset() {
    score = 0;
    scoreUpdate()
}

function scoreUpdate() {
    document.getElementById('scoreContainer').innerHTML = "Score: " + score;
}

function gameOver() {
    console.log("You loose.");
    // ask the player for their name for the leaderboard
    userName = prompt("Write your name")
    updateLeaderboard(userName, score);
    // restart the game when a player looses
    gameRestart();
}

function gameStop() {

}

// start the game
function gameStart(){
    generateResetButton();
    generateChoiceLetters();
    getGuessWord();
}

// clears screen, calls new word, resets lives, maintains score, re
function gameNewRound() {
    while (choiceLetterContainer.firstChild) {
        choiceLetterContainer.removeChild(choiceLetterContainer.lastChild);
    }
    while (guessLetterContainer.firstChild) {
        guessLetterContainer.removeChild(guessLetterContainer.lastChild);
    }
    while (optionsContainer.firstChild) {
        optionsContainer.removeChild(optionsContainer.lastChild);
    }
    lifeReset();
    gameStart();
}
// clears screen, calls new word, resets score, resets lives
function gameRestart() {
    while (choiceLetterContainer.firstChild) {
        choiceLetterContainer.removeChild(choiceLetterContainer.lastChild);
    }
    while (guessLetterContainer.firstChild) {
        guessLetterContainer.removeChild(guessLetterContainer.lastChild);
    }
    while (optionsContainer.firstChild) {
        optionsContainer.removeChild(optionsContainer.lastChild);
    }
    scoreReset();
    lifeReset();
    gameStart();
}

function startStop(){
    if (gamePlaying === false) {
        gamePlaying = true;
        startStopBtn.innerText = 'Stop';
        startStopBtn.style.fontSize = '28px';
        setTimeout(function () {
            startStopBtn.style.fontSize = '20px';
        }, 200);
        gameStart();
        return
    }
    if (gamePlaying === true) {
        gamePlaying = false;
        startStopBtn.innerText = 'Start';
        startStopBtn.style.fontSize = '28px';
        setTimeout(function () {
            startStopBtn.style.fontSize = '20px';
        }, 200);
        gameStop();
    }
}

// <video id="myVideo" width="320" height="176">
//     <source src="mov_bbb.mp4" type="video/mp4">
//     <source src="mov_bbb.ogg" type="video/ogg">
//     Your browser does not support HTML5 video.
// </video>

function generateMedia(){
    let mediaId = 'media';
    let media = document.createElement('video');
    media.id = mediaId;
    media.src = "src/highground.mp4";
    media.type = "video/mp4";
    media.preload = "auto";
    media.style.width = "50em";
    media.style.height = "30em";
    media.style.visibility = "hidden";
    animationArea.appendChild(media);
    highgroundvideo = document.getElementById("media");
}

function mediaVisible() {
    highgroundvideo.style.visibility = "visible"
}

function hangMediaPlay() {
    if(lives === 7) {
        highgroundvideo.currentTime = 0;
        playVid();
        setTimeout(pauseVid, 2000)
    } else if(lives === 6) {
        highgroundvideo.currentTime = 2.0;
        playVid();
        setTimeout(pauseVid, 1500)
    } else if(lives === 5) {
        highgroundvideo.currentTime = 3.5;
        playVid();
        setTimeout(pauseVid, 2500)
    } else if(lives === 4) {
        highgroundvideo.currentTime = 6.0;
        playVid();
        setTimeout(pauseVid, 2400)
    } else if(lives === 3) {
        highgroundvideo.currentTime = 8.4;
        playVid();
        setTimeout(pauseVid, 2600)
    } else if(lives === 2) {
        highgroundvideo.currentTime = 11.0;
        playVid();
        setTimeout(pauseVid, 3000)
    } else if(lives === 1) {
        highgroundvideo.currentTime = 14.0;
        playVid();
    }
}

function playVid() {
    highgroundvideo.play();
}

function pauseVid() {
    highgroundvideo.pause();
}

function restartVid() {
    highgroundvideo.currentTime = 0;
    pauseVid();
}

function updateLeaderboard(userName, score) {
    // add the information of users in database
    rootRef.child(userName).set({
        userName: userName,
        score: score
    });
}

function showLeaderboard() {
    console.log("showleaderboard works");
    rootRef.on('value', gotData, errData);
}

// get the data from the fireabase
function gotData(data) {
    console.log(data.val());

    let scores = data.val();
    let userNames = Object.keys(scores);
    for (let i = 0; i < userNames.length; i++) {
        let userName = userNames[i];
        let score = scores[userName].score;
        console.log(userName, score);
    }
}

function errData(err) {
    console.log("Error");
    console.log(err);
}

showLeaderboard();