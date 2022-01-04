'use strict';

var playerScore = window.localStorage.getItem('score') || 0;
document.getElementById('player-score').innerText = playerScore;

const winningRelationships = {
  /* 
    rock: paper
    rock beats paper
  */

  paper: 'rock',
  scissors: 'paper',
  rock: 'scissors'
}

function chooseForHouse() {
  const value = Math.floor(Math.random() * 100);
  if (value < 34) {
    return 'paper';
  } else if (value > 67) {
    return 'scissors';
  } else {
    return 'rock';
  }
}

const animationDelay = 600;

const mainElement = document.querySelector('main');

const mainContainer = document.querySelector('.main-container');

const resultContainer = document.createElement('div');
resultContainer.className = 'result';
resultContainer.innerHTML = `
  <div id="your-choice"></div>
  <div id="house-choice"></div>
  <div id="result">
    <h2 id="result-message"></h2>
    <button id="play-again-button">Play again</button>
  </div>
`;


window.onload = () => {
  document.querySelectorAll('.play-button').forEach(button => {
    button.addEventListener('click', (ev) => {
      const buttonValue = ev.currentTarget.value;
      const houseChoice = chooseForHouse();

      mainElement.removeChild(mainContainer);
      mainElement.appendChild(resultContainer);

      document.getElementById('your-choice').innerHTML = `
        ${strPlayButton(buttonValue)}
        <p>You picked</p>
      `;

      document.getElementById('house-choice').innerHTML = `
        <div>
          ${strPlayButton(houseChoice)}
        </div>
        <p>The house picked</p>
      `;

      const resultMessageContainer = resultContainer.querySelector('#result');

      // button and match result animation 
      setTimeout(() => {
        document.getElementById('house-choice').querySelector('.play-button').style.opacity = `1`; 
        document.getElementById('your-choice').querySelector('.play-button').classList.add('play-button_shadow');
        setTimeout(() => {
          resultMessageContainer.className = 'result_expand';
        }, animationDelay / 2);
      }, animationDelay / 2);

      let resultMessage = '';

      if (houseChoice == buttonValue) {
        resultMessage = 'draw';
      } else if (winningRelationships[houseChoice] != buttonValue) {
        resultMessage = 'you win';
        setTimeout(incrementScore, animationDelay);
      } else {
        resultMessage = 'you lose';
      }

      resultMessageContainer.querySelector('#result-message').innerText = resultMessage;

      document.getElementById('play-again-button').addEventListener('click', () => {
        mainElement.removeChild(resultContainer);
        mainElement.appendChild(mainContainer);
        resultMessageContainer.className = '';
      });
    });
  });


  // rules modal
  document.getElementById('show-rules-button').addEventListener('click', e => {
    const rulesContainer = e.currentTarget.nextElementSibling;
    rulesContainer.style.display = 'block';
    rulesContainer.style.opacity = '1';
  });

  document.getElementById('close-rules-button').addEventListener('click', e => {
    const rulesContainer = e.currentTarget.parentElement;
    rulesContainer.style.opacity = '0';
    setTimeout(() => rulesContainer.style.display = 'none', 100)
  });
}

function strPlayButton(value) {
  return `
    <button class="play-button ${value}" value="${value}">
      <div class="image">
        <img src="./images/icon-${value}.svg">
      </div>
    </button>
  `;
}

function incrementScore() {
  playerScore++;
  document.getElementById('player-score').innerText = playerScore;
  window.localStorage.setItem('score', playerScore);
}