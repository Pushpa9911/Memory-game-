
const cardImages = [
    'https://static.vecteezy.com/system/resources/previews/004/244/268/original/cute-dog-cartoon-character-illustration-free-vector.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStBnlxhFzYcY2E-2kEgp0CJIQ-DbaakNy8MA&s',
    'https://thumbs.dreamstime.com/b/cartoon-little-star-vector-illustration-design-element-43670778.jpg',
    'https://c8.alamy.com/comp/2FKKDF1/cute-lion-cartoon-animal-vector-illustration-2FKKDF1.jpg',
    'https://static.vecteezy.com/system/resources/previews/004/244/268/original/cute-dog-cartoon-character-illustration-free-vector.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStBnlxhFzYcY2E-2kEgp0CJIQ-DbaakNy8MA&s',
    'https://thumbs.dreamstime.com/b/cartoon-little-star-vector-illustration-design-element-43670778.jpg',
    'https://c8.alamy.com/comp/2FKKDF1/cute-lion-cartoon-animal-vector-illustration-2FKKDF1.jpg'
];

let moveCount = 0;
let firstCard, secondCard;
let lockBoard = false;
const cards = document.querySelector('.memory-game');
const restartBtn = document.getElementById('restartBtn');
const moveCounter = document.getElementById('moveCounter');
const message = document.getElementById('message');

function createCard(imageUrl) {
    const card = document.createElement('div');
    card.classList.add('memory-card');
    card.innerHTML = `
        <div class="card-inner">
            <div class="front-face">P</div>
            <div class="back-face" style="background-image: url('${imageUrl}')"></div>
        </div>
    `;
    card.addEventListener('click', flipCard);
    return card;
}

function initializeGame() {
    cards.innerHTML = '';
    moveCount = 0;
    moveCounter.textContent = moveCount;
    lockBoard = false;
    message.classList.add('hidden');

    let cardImagesShuffled = [...cardImages];
    cardImagesShuffled.sort(() => 0.5 - Math.random());

    cardImagesShuffled.forEach(imageUrl => {
        cards.appendChild(createCard(imageUrl));
    });
}

function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add('flip');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;
    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.querySelector('.back-face').style.backgroundImage === 
                    secondCard.querySelector('.back-face').style.backgroundImage;

    if (isMatch) {
        disableCards();
        setTimeout(() => showMessage('Congratulations! You matched all pairs!'), 500);
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
    moveCount++;
    moveCounter.textContent = moveCount;

    if (document.querySelectorAll('.memory-card:not(.flip)').length === 0) {
        setTimeout(() => showMessage('Congratulations! You matched all pairs!'), 500);
    }
}

function showMessage(text) {
    const messageContent = message.querySelector('p');
    messageContent.textContent = text;
    message.classList.remove('hidden');
}

restartBtn.addEventListener('click', initializeGame);

initializeGame();
