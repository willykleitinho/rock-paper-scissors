
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

window.onload = () => {

  // temp
  document.querySelectorAll('.play-button').forEach(button => {
    button.addEventListener('click', (ev) => {
      const buttonValue = ev.currentTarget.value;
      const houseChoice = chooseForHouse();

      console.log(`house chose: ${houseChoice}`);

      if (houseChoice == buttonValue) {
        console.log('draw, no one won');
      } else if (winningRelationships[houseChoice] != buttonValue) {
        console.log('you won');
        playerScore++;
        document.getElementById('player-score').innerText = playerScore;
      } else {
        console.log('you lost');
      }
    });
  });

  // temp rule on/off
  document.getElementById('show-images-button').addEventListener('click', e => {
    const rulesContainer = e.target.nextElementSibling;
    console.log(rulesContainer);
    if (e.target.dataset.showing === 'no') {
      e.target.dataset.showing = 'true';
      rulesContainer.style.display = 'block';
    } else {
      e.target.dataset.showing = 'no';
      rulesContainer.style.display = 'none';
    }
  })
}