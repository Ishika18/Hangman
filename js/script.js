const choiceLetterContainer = document.getElementById("choiceLetterContainer");
const alphabet = "abcdefghijklmnopqrstuvwxyz";

function main(){
    generateChoiceLetters()
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

function generateChoiceLetters(){
    for (let i = 0; i < alphabet.length; i++) {
        let choiceLetterId = 'c-letter-' + alphabet[i];
        let choiceLetter = document.createElement('button');
        choiceLetter.classList.add('choiceLetterBtn');
        choiceLetter.id = choiceLetterId;
        choiceLetter.onclick = choiceLetterClick;
        choiceLetter.innerText = alphabet[i].toUpperCase();
        choiceLetter.style.width = '10vh';
        choiceLetter.style.height = '10vh';
        choiceLetterContainer.appendChild(choiceLetter);
    }
}

function looseLife() {

}

function choiceLetterClick() {
    let choiceLetterClicked = document.getElementById(this.id);
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

main();