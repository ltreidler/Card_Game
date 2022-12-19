// # of players
// # of hands & hand as it changes
class Game {
    constructor(numHands) {
        this.numHands = numHands;
    }

    deck = new Deck();
    hands = [];
    pile = [];
    // 1. Deal
    players(){
        for (let i=0; i<this.numHands; i++){
            this.hands.push(new Hand);
        }
        return this.hands;
    }
    play (){
        this.deck.generateCards();
        this.deck.shuffle();
        this.deck.deal(this.players());
        this.gameTime();
    }
    // 2. play game
    // turns up top card. draw function. If it's an 8, put in the middle
    gameTime(){
        let topCard = this.deck.draw();
        while (topCard.rank === 8){
            this.deck.splice(Math.round(this.deck.length/2),0,topCard);
            topCard = this.deck.draw();
        }
        console.log(topCard);
        this.pile.push(topCard);
    }
}

const g = new Game(3);
g.play();
