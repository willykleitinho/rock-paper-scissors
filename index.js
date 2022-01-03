var playerScore = window.localStorage.getItem('score') || 0;
document.getElementById('player-score').innerText = playerScore;

/* 
  rock: paper
  rock beats paper
*/

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
        <button style="opacity: 1;" class="play-button ${buttonValue}" value="${buttonValue}">
          <div class="image">
            <img src="./images/icon-${buttonValue}.svg">
          </div>
        </button>
        <p>You picked</p>
      `;

      document.getElementById('house-choice').innerHTML = `
        <div>
          <button class="play-button ${houseChoice}" value="${houseChoice}">
            <div class="image">
              <img src="./images/icon-${houseChoice}.svg">
            </div>
          </button>
        </div>
        <p>The house picked</p>
      `;

      setTimeout(() => {
        document.getElementById('house-choice').querySelector('.play-button').style.opacity = `1`; 
        document.getElementById('your-choice').querySelector('.play-button').classList.add('play-button_shadow');
        setTimeout(() => {
          document.getElementById('result').classList.add('result_expand');
        }, 300);
      }, 300);

      let message = '';

      if (houseChoice == buttonValue) {
        message = 'draw';
      } else if (winningRelationships[houseChoice] != buttonValue) {
        message = 'you win';
        setTimeout(()=> {
          playerScore++;
          window.localStorage.setItem('score', playerScore);
          document.getElementById('player-score').innerText = playerScore;
        }, 600);
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
          resultContainer.querySelector('#result').classList.remove('result_expand');
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