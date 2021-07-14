'use strict';

// Selecting elements
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');
const score0Element = document.querySelector('#score--0');
const score1Element = document.getElementById('score--1'); //this is an alternative way to select IDs. Apparently it works a little bit faster
const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');

const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores = [0, 0];
let currentScore = 0; //this cannot be inside of the function because we need it to remain untouched when nessesary. If we define it inside of the function, it will continuously be reassigned
let activePlayer = 0; //sets back to player 1
let playing = true;

// let scores, currentScore, activePlayer, playing; this is shorthand for the above

//Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  playing = true;
  console.log('BITCH');
  score0Element.textContent = 0;
  score1Element.textContent = 0; //here, although we are specifying numbers instead of strings, JavaScript will automatically convert them to strings in order to display them on the page

  current0Element.textContent = 0;
  current1Element.textContent = 0;
  diceElement.classList.add('hidden');
  player0Element.classList.add('player--active');
  player1Element.classList.remove('player--active');
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle('player--active'); //will REMOVE the class if it IS THERE ALREADY. Will ADD the class if it IS NOT THERE ALREADY
  player1Element.classList.toggle('player--active');
};

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    // 2. Display dice
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${dice}.png`;
    // 3. Check for rolled 1: if true, switch to next player

    if (dice !== 1) {
      //add dice to current score
      // currentScore = currentScore + dice;
      currentScore += dice; //short hand for the code above
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
      // current0Element.textContent = currentScore; //CHANGE LATER
    } else {
      switchPlayer();
      // switch to next player
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. add current score to the active player's score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      //below we want to take away the class that shows that a player is 'active' and replace it with the class that shows that the player is the winner
      playing = false;
      diceElement.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
    // Switch to the next player
  }
});

btnNew.addEventListener('click', init);

//if the class is not there and you ask JavaScript to remove it, nothing will happen. Likewise, if you tell JavaScript to add a class but it is already there, nothing will be added
