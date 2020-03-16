const choiceLetterContainer = document.getElementById("choiceLetterContainer");
const guessLetterContainer = document.getElementById("guessLetterContainer");
const alphabet = "abcdefghijklmnopqrstuvwxyz";
let dictionary = [];
let guessWord;

// fetch data from the dictionary database .json file
fetch("src/dictionary.json")
    .then(response => {
        return response.json();
    })
    .then(data => {
        dictionary = data;
        console.log(data);
        main();
    });
// main call on load
function main(){
    generateChoiceLetters();
    generateGuessWord();
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

// get random guess word from .json
function generateGuessWord() {
    let randomNumber = Math.floor(Math.random() * dictionary.length);
    guessWord = dictionary[randomNumber];
    generateGuessLetters();
    console.log(guessWord)
}

// generates the guess word letters
function generateGuessLetters(){
    for (let i = 0; i < guessWord['word'].length; i++) {
        let guessLetterId = 'g-letter-' + guessWord['word'][i];
        let guessLetter = document.createElement('button');
        guessLetter.classList.add('choiceLetterBtn');
        guessLetter.id = guessLetterId;
        guessLetter.innerText = "_";
        guessLetter.style.width = '8vh';
        guessLetter.style.height = '8vh';
        guessLetterContainer.appendChild(guessLetter);
    }
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