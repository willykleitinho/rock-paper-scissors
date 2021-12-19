
/* 
  rock: paper
  rock beats paper
*/

var playerScore = 0;

const winningRelationships = {
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

var mainContainer = document.querySelector('.main-container') || document.createElement('div');
mainContainer.className = 'main-container';

var resultContainer = document.createElement('div');
resultContainer.className = 'result';
resultContainer.innerHTML = `
  <div id="your-choice"></div>
  <div id="house-choice"></div>
  <div id="result"></div>
`;

window.onload = () => {
  // temp
  document.querySelectorAll('.play-button').forEach(button => {
    button.addEventListener('click', (ev) => {
      const buttonValue = ev.currentTarget.value;
      const houseChoice = chooseForHouse();

      const main = document.querySelector('main');
      main.removeChild(mainContainer);
      main.appendChild(resultContainer);

      document.getElementById('your-choice').innerHTML = `
        <button class="play-button ${buttonValue}" value="${buttonValue}">
          <div class="image">
            <img src="./images/icon-${buttonValue}.svg">
          </div>
        </button>
        <p>You picked</p>
      `;

      document.getElementById('house-choice').innerHTML = `
        <button class="play-button ${houseChoice}" value="${houseChoice}">
          <div class="image">
            <img src="./images/icon-${houseChoice}.svg">
          </div>
        </button>
        <p>The house picked</p>
      `;

      let message = '';

      if (houseChoice == buttonValue) {
        message = 'draw';
      } else if (winningRelationships[houseChoice] != buttonValue) {
        message = 'you won';
        playerScore++;
        document.getElementById('player-score').innerText = playerScore;
      } else {
        message = 'you lose';
      }

      document.getElementById('result').innerHTML = `
        <h2>${message}</h2>
        <button id="play-again-button">Play again</button>
      `;

      document.getElementById('play-again-button')
        .addEventListener('click', () => {
          main.removeChild(resultContainer);
          main.appendChild(mainContainer);
        });

    });
  });

  // temp rule on/off
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