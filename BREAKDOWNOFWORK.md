# Breakdown of work

## Team Member: Shagun
### Tasks Worked On:
#### Task Title
- What you did.
- What you did.
#### Task Title
- What you did.
- What you did.

## Team Member: Trevor 
### Tasks Worked On:
#### Task Title
- What you did.
- What you did.
#### Task Title
- What you did.
- What you did.

## Team Member: Eric 
### Tasks Worked On:
#### Task Title
- What you did.
- What you did.
#### Task Title
- What you did.
- What you did.

## Team Member: Blake Michalzik
### Tasks Worked On:
#### Set up base html containers for page
- id optionsContainer, to contain buttons used in the game (start/stop)
- id choiceLetterContainer, to contain the buttons of letter that you can choose.
- id guessLetterContainer, to contain the letters you need to guess.
- id guessDefinitionContainer, to contain the definition of the word to be guessed.
#### Wrote generateChoiceLetters() function.
- generates to the buttons of letters that you can choose, to guess the word.
#### Wrote wordlist.json for holding list of ~2000 unique words
- Researched a random unique word generator.
- Generated ~2000 unique words.
- Formatted word list to json format. wordlist.json
#### Wrote fetch function to pull wordlist.json data
- Pulls the list of words so that a random word may be chosen.
- That random word then becomes the guess word, and the OwlAPI fetches for the definition.
#### Researched technique to impliment HINT requirement.
- Researched an appropriate API to get word definitions.
- Settled on OwlBot API. https://owlbot.info/
#### Wrote getOwlAPIWord() function.
- Used OwlBot API.
- Wrote fetch for word definition querying.
#### Wrote choiceLetterClickFail() function.
- Styles button to visially cue to the user to know that button was not valid
#### Wrote choiceLetterClickSuccess() function.
- Styles button to visially cue to the user to know that button was valid.
#### Wrote lifeReset() function.
- Resets play life to 7.
#### Wrote scoreDecrement() function.
- Reduces the player score by 1 and updates player score.
#### Wrote scoreIncrement() function.
- Increases the player score by 1 and updates player score.
#### Wrote scoreReset() function.
- Resets the player score by 0 and updates player score.
#### Wrote scoreUpdate() function.
- Updates the player's score on html page.
#### Wrote gameStart() function.
- Calls set of functions to setup the start of game.
#### Wrote gameNewRound() function.
- Resets elements.
- Calls set of functions to setup the start of a new round, same game.
#### Wrote generateMedia() function.
- Sets-up and generates media video object for hangman game.
- This is a take on the hangman 7 lives, the video will be played in 7 parts.
#### Wrote mediaVisible() function.
- Media on load has no visibility to give the browser time to load in the background.
- This get's called on gameStart()
#### Wrote mediaVisible() function.
- Calls set of functions to setup the start of game.
#### Wrote hangMediaPlay() function.
- Play's the hangman media video.
- Play time is dependent upon player lives left.
- Pauses media in relation to player lives left.
#### Wrote playVid() function.
- Play hangman video media.
#### Wrote pauseVid() function.
- Pause hangman video media.
#### Wrote restartVid() function.
- Reset hangman video media to start, prep for new round or new game.
#### Wrote restartVid() function.
- Reset hangman video media to start, prep for new round or new game.