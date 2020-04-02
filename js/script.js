const optionsContainer = document.querySelector('#optionsContainer');
const choiceLetterContainer = document.getElementById("choiceLetterContainer");
const guessLetterContainer = document.getElementById("guessLetterContainer");
const animationArea = document.getElementById("animationArea");
const guessDefinitionContainer = document.getElementById("guessDefinition");
const alphabet = "abcdefghijklmnopqrstuvwxyz";
// instance of firebase database
const database = firebase.firestore();

let wordList = [];
let guessWord;
let guessWordDefinition;
let score = 0;
let lives = 7;
let gamePlaying = false;
let gameStartingFirstTime = true;
let highGroundVideo;
let videoPauseTime;
let clapAudio = new Audio('src/claps3.mp3');


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
                guessDefinition.innerText = guessWordDefinition[0].toUpperCase() + guessWordDefinition.slice(1);
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
    generateStartStopButton();
    mediaVisible();
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

// checks for older definition of word
function checkForOldDefinition(){
    return document.body.contains(document.querySelector('#guessDefinitionId'));
}

// generates the guess word definition from OWL API
function generateGuessDefinition() {
    let guessDefinitionId = "guessDefinitionId";
    let guessDefinition = document.createElement('p');
    guessDefinition.id = guessDefinitionId;
    guessDefinition.innerText = guessWordDefinition[0].toUpperCase() + guessWordDefinition.slice(1);
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
    // play a clap audio
    clapAudio.play();
    let allGuessLetters = document.getElementsByClassName("guessLetter");
    for (let i = 0; i < allGuessLetters.length; i++) {
        allGuessLetters[i].classList.add("all-guess-letters");
    }
}

// changes colour of the choice letters when clicked, on fail red
function choiceLetterClickFail(letter) {
    letter.classList.add("letter-on-click");
    setTimeout(function () {
        letter.classList.remove("letter-on-click");
        letter.classList.add("letter-fail");
    }, 100);
}

// changes colour of the choice letters when clicked, on success green
function choiceLetterClickSuccess(letter) {
    letter.classList.add("letter-on-click");
    setTimeout(function () {
        letter.classList.remove("letter-on-click");
        letter.classList.add("letter-success");
    }, 100);
}

// creates the game reset button
function generateResetButton() {
    let reset = document.createElement("button");
    reset.onclick = gameRestart;
    reset.innerText = "Reset";
    reset.id='reset';
    optionsContainer.appendChild(reset)
}

// creates start stop button
function generateStartStopButton() {
    let startStopBtn = document.createElement("button");
    startStopBtn.onclick = startStop(startStopBtn);
    startStopBtn.id = 'startStop';
    if (gameStartingFirstTime) {
        startStopBtn.innerText = "Start";
        gameStartingFirstTime = false;
    }
    else {
        startStopBtn.innerText = 'Stop';
    }
    optionsContainer.appendChild(startStopBtn);
}

// decrement player life
function lifeDecrement() {
    if (lives === 1) {
        gameOver();
    } else {
        lives -= 1;
        console.log(lives);
    }
}

//reset lives
function lifeReset() {
    lives = 7;
}

// decrement score
function scoreDecrement(){
    score -= 1;
    scoreUpdate();
}

// increment score
function scoreIncrement() {
    score += 1;
    scoreUpdate();
}

// reset score
function scoreReset() {
    score = 0;
    scoreUpdate()
}

// update score
function scoreUpdate() {
    document.getElementById('scoreContainer').innerHTML = "Score: " + score;
}

// ends the game early, promps for username to update scoreboard with info, resets game
function gameOver() {
    let userName = prompt("You score is: "+ score + " Write your name: ");
    updateLeaderboard(userName, score);
    // show the user the leaderboard
    generateLeaderBoard();
    gameRestart();
}

// start the game
function gameStart(){
    restartVid();
    generateResetButton();
    generateStartStopButton();
    generateChoiceLetters();
    getGuessWord();
}

// clears screen, calls new word, resets lives, maintains score, restarts video
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

// same as gameNewRound be we reset the score as well
function gameRestart() {
    scoreReset();
    gameNewRound();
}

// start / stop button to end game early
function startStop(startStopBtn){
    return function() {
        if (gamePlaying === false) {
            gamePlaying = true;
            gameRestart();
            startStopBtn.innerText = 'Stop';
        } else {
            gamePlaying = false;
            startStopBtn.innerText = 'Start';
            gameOver();
        }
    }
}

// create the video for hangman, high ground
function generateMedia(){
    let mediaId = 'media';
    let media = document.createElement('video');
    media.id = mediaId;
    media.src = "src/highground.mp4";
    media.type = "video/mp4";
    media.preload = "auto";
    media.style.visibility = "hidden";
    media.ontimeupdate = () => {
        if (highGroundVideo.currentTime >= videoPauseTime) {
            pauseVid()
        }
    };
    animationArea.appendChild(media);
    highGroundVideo = document.getElementById("media");
}

// default of video is hidden so that it may load, this sets to to visible on game start
function mediaVisible() {
    highGroundVideo.style.visibility = "visible"
}

// media start and stop times
function hangMediaPlay() {
    const pauseOn7Lives = 2.0;
    const pauseOn6Lives = 3.5;
    const pauseOn5Lives = 6.0;
    const pauseOn4Lives = 8.4;
    const pauseOn3Lives = 11.0;
    const pauseOn2Lives = 14.0;
    const pauseOn1Lives = 20.0;

    if(lives === 7) {
        videoPauseTime = pauseOn7Lives;
        playVid();
    } else if(lives === 6) {
        videoPauseTime = pauseOn6Lives;
        playVid();
    } else if(lives === 5) {
        videoPauseTime = pauseOn5Lives;
        playVid();
    } else if(lives === 4) {
        videoPauseTime = pauseOn4Lives;
        playVid();
    } else if(lives === 3) {
        videoPauseTime = pauseOn3Lives;
        playVid();
    } else if(lives === 2) {
        videoPauseTime = pauseOn2Lives;
        playVid();
    } else if(lives === 1) {
        videoPauseTime = pauseOn1Lives;
        playVid();
    }
}

// play video
function playVid() {
    highGroundVideo.play();
}

// pause video
function pauseVid() {
    highGroundVideo.pause();
}

// restart video
function restartVid() {
    highGroundVideo.currentTime = 0;
    pauseVid();
}

// update the leaderboard with username and score
function updateLeaderboard(userName, score) {
    if (!userName) {
        return;
    }
    // add the information of users in database
    database.collection("scores").doc().set({
        userName: userName,
        score: score
    })
    .then(function() {
        console.log("document successfully written");
        updateScores();
    })
    .catch(function(error) {
        console.error("Enter writing document: ", error);
    });
}

// updates the scores of th leaderboard, write to table
function updateScores() {
    let i = 1;
    // get the top 5 scores from the scoreboard
    database.collection("scores").orderBy("score", "desc").limit(5).get().then((snapshot) => {
        snapshot.forEach((doc) => {
            document.getElementById("name" + i).innerText = doc.data().userName;

            document.getElementById("score" + i).innerText = doc.data().score;
            i++;
        })
    })
}


// clears table
function clearTable() {
    console.log("cleartable");
    let names = document.getElementsByClassName('cell1');
    let scores = document.getElementsByClassName('cell2');
    console.log("names: " + names);
    console.log("scores: " + scores);
    for (let i = 0; i < names.length; i++) {
        console.log(names[i]);
        names[i].remove();
        console.log(scores[i]);
        scores[i].remove();
    }
}

// show leaderboard, for testing purposes
function showLeaderboard() {
    console.log("showleaderboard works");
    rootRef.on('value', gotData, errData);
}

// get the data from the firebase
function gotData(data) {
    console.log(data.val());

    let records = data.val();
    for (let i = 0; i < records.length; i++) {
        let userName = records[i].userName;
        let score = records[i].score;
        console.log(userName, score);
    }
}

// error function on bad firestore call
function errData(err) {
    console.log("Error");
    console.log(err);
}

// jquery for the leaderboard modal popup
function generateLeaderBoard() {
    $('#leaderBoard').modal('show');
}