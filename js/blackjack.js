const suits = ["Corazon", "Trebol", "Diamante", "Picas"];
const values = ["A","K","Q","J","10","9","8","7","6","5","4","3","2"];

let game = {
	dealerCards : [],
	playerCards : [],
	dealerScore: 0,
	playerScore : 0,
	deck : []
}


// junta las dos constantes dando como resultado el array game.deck
function createDeck() {
	for (let suitIdx = 0; suitIdx < suits.length; suitIdx++) {
    for (let valueIdx = 0; valueIdx < values.length; valueIdx++) {
      let card = {
        suit: suits[suitIdx],
        value: values[valueIdx]
      };
      game.deck.push(card);
    }
  }
}

// busca una posicion aleatoria, la guarfda en tmp, pone la i en la posicion aleatoria y tmp en la i
function suffleDeck() {
	for (let i = 0; i < game.deck.length; i++) {
		let swapIdx = Math.trunc(Math.random() * game.deck.length);
		let tmp = game.deck[swapIdx];
		game.deck[swapIdx] = game.deck[i];
		game.deck[i] = tmp;
	}
}

function initialTurn() {
	game.playerCards.length = 0;
	game.dealerCards.length = 0;
  for (let i = 0; i < 2; i++) {
    game.playerCards.push(game.deck.shift());
    game.dealerCards.push(game.deck.shift());
  }
	game.dealerScore = getScore(game.dealerCards);
	game.playerScore = getScore(game.playerCards);
}

function getCardNumericValue(card){
  switch (card.value){
    case "A": return 11;
    case "K": case "Q": case "J": return 10;
    default: return +card.value;
	}
}


function getScore(cards) {
  let score = 0;
  let hasAce = 0;

  for (let i = 0; i < cards.length; i++) {
    score += getCardNumericValue(cards[i]);
    if (cards[i].value === "A") {
      hasAce++;
    }
  }

  while (hasAce > 0 && score > 21){
    score -= 10;
    hasAce--;
  }

  return score;
}


function getNextCard(cards) {
  cards.push(game.deck.shift());
}

function playDealer(){
  game.dealerScore = getScore(game.dealerCards);
  while (game.playerScore <= 21 && game.dealerScore < game.playerScore && game.dealerScore < 21){
    getNextCard(game.dealerCards);
    game.dealerScore = getScore(game.dealerCards);
  }
}


function playGame() {
	createDeck();
	suffleDeck();
	initialTurn();
	console.log(game.dealerCards);
	console.log(game.playerCards);
	console.log(game.deck);
	console.log(game.dealerScore);
	console.log(game.playerScore);

	console.log("---------")

	game.playerScore=18;
	playDealer();
	console.log(game.dealerScore);



}


playGame();


