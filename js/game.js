// # of players
// # of hands & hand as it changes
class Game {
    constructor(numHands) {
        this.numHands = numHands;
    }

    deck = new Deck();
    hands = [];
    pile = [];
    gameOver = false;
    // 1. Deal
    players(){
        for (let i=0; i<this.numHands; i++){
            let h = new Hand();
            this.hands.push(h);
        }
        return this.hands;
    }

    play (){
        this.deck.generateCards();
        this.deck.shuffle();
        this.deck.deal(this.players());
        this.gameTime();
        this.takeTurns();

        
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

    takeTurns() {
        //iterate through the hands
        while(!this.gameOver) {
            for(let hand of this.hands) {
                console.log(hand);
                if(!hand.computer) {
                    //do a separate function for how a human does this
                    this.human();
                } else if(this.checkHand(hand.cards) === false) {
                    this.drawCards(hand);
                    //once it's true, place that card on the top of the pile and go to the next player
                } else {
                    //choose which of the possible cards randomly (valid cards is returned from this.checkHand)

                    //place that card at the top of the pile

                    //go to the next person
                }

                if(hand.cards.length <= 0) {
                    gameOver = true;
                }
            }
            //this is temporary, just to avoid an infinite loop
            this.gameOver = true;
        }

        return true;

    }

    drawCards(hand){
        while(this.deck.length>0){
            let drawnCard=this.deck.draw();
            if (this.checkHand([drawnCard])){
                this.pile.unshift(drawnCard);
                return true;
            }
            //draw cards until checkhand is true
            hand.cards.push(drawnCard);
        }
        this.reshuffle();
        this.drawCards(hand);  
    }

    reshuffle (){
        this.deck = this.pile.splice(1);
        this.deck.shuffle();
    }

    checkHand(cards) {
        //return an array of the possible cards to play
        let validCards = [];
        for(let card of cards) {
            if(card.rank === 8) validCards.push(card);
            if(card.rank === this.pile[0].rank) validCards.push(card);
            if(card.suit === this.pile[0].suit) validCards.push(card);
        }

        validCards.length > 0 ? validCards : false;
    }

}

const g = new Game(3);
g.play();
