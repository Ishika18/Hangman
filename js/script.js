const choiceLetterContainer = document.getElementById("choiceLetterContainer");
const guessLetterContainer = document.getElementById("guessLetterContainer");
const alphabet = "abcdefghijklmnopqrstuvwxyz";
let wordList = [];
let guessWord;
let guessWordDefinition;


// Oh?! What's this!? Blake got a god damn API Booya!
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
            generateGuessDefinition();
        });
}

// fetch data from wordlist.json file apply to wordList variable
fetch("src/wordlist.json")
    .then(res => res.json())
    .then(data => {
        wordList = data;
        console.log(data);
        main();
    });

// main call on load
function main(){
    generateChoiceLetters();
    getGuessWord();
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
        choiceLetter.style.width = '8vh';
        choiceLetter.style.height = '8vh';
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
        let guessLetterId = 'g-letter-' + guessWord[i];
        let guessLetter = document.createElement('button');
        guessLetter.classList.add('guessLetterBtn');
        guessLetter.id = guessLetterId;
        guessLetter.innerText = "_";
        guessLetter.style.width = '8vh';
        guessLetter.style.height = '8vh';
        guessLetterContainer.appendChild(guessLetter);
    }
}

// generates the guess word definition from OWL API
function generateGuessDefinition() {
    let guessDefinitionId = "guessDefinitionId";
    let guessDefinition = document.createElement('p');
    guessDefinition.id = guessDefinitionId;
    guessDefinition.innerText = guessWordDefinition;
    guessDefinition.style.width = '40vh';
    guessDefinition.style.height = '20vh';
    guessLetterContainer.appendChild(guessDefinition);
}

// function for when choice letters are clicked
function choiceLetterClick() {
    let choiceLetterClicked = document.getElementById(this.id);
}

function looseLife() {

}

function scoreIncrement(){

}

function scoreReset() {

}

function scoreUpdate() {

}

function gameOver() {

}

function gameStop() {

}

function gameStart(){

}

function musicToggle() {
    if (musicPlaying === false) {
        musicPlaying = true;
        playAudio(audioMusic)
    } else {
        musicPlaying = false;
        pauseAudio(audioMusic)
    }
}

function playAudio(audioID) {
    audioID.play();
}

function pauseAudio(audioID) {
    audioID.pause();
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

function difficulty_setting() {
    if (gamePlaying) {
        return
    }
    gameDifficulty++;
    if (gameDifficulty === 5) {
        gameDifficulty = 1
    }
    if (gameDifficulty === 1) {
        gameDifficultyTimer = 2200;
        gameDifficultySpeed = 0.9;
        difficultyBtn.innerHTML = 'Easy';
        difficultyBtn.style.color = '#e7e7e7';
        difficultyBtn.style.fontSize = '28px';
        setTimeout(function () {
            difficultyBtn.style.fontSize = '20px';
            difficultyBtn.style.color = 'lawngreen';
        }, 200);
        return
    }
    if (gameDifficulty === 2) {
        gameDifficultyTimer = 1200;
        gameDifficultySpeed = 1.1;
        difficultyBtn.innerHTML = 'Medium';
        difficultyBtn.style.color = '#e7e7e7';
        difficultyBtn.style.fontSize = '28px';
        setTimeout(function () {
            difficultyBtn.style.fontSize = '20px';
            difficultyBtn.style.color = 'yellow';
        }, 200);
        return
    }
    if (gameDifficulty === 3) {
        gameDifficultyTimer = 900;
        gameDifficultySpeed = 1.2;
        difficultyBtn.innerHTML = 'Hard';
        difficultyBtn.style.color = '#e7e7e7';
        difficultyBtn.style.fontSize = '28px';
        setTimeout(function () {
            difficultyBtn.style.fontSize = '20px';
            difficultyBtn.style.color = 'orange';
        }, 200);
        return
    }
    if (gameDifficulty === 4) {
        gameDifficultyTimer = 800;
        gameDifficultySpeed = 1.3;
        difficultyBtn.innerHTML = 'NIGHTMARE';
        difficultyBtn.style.color = '#e7e7e7';
        difficultyBtn.style.fontSize = '28px';
        setTimeout(function () {
            difficultyBtn.style.fontSize = '20px';
            difficultyBtn.style.color = 'red';
        }, 200);
    }
}