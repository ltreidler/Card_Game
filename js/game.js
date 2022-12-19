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
            this.deck.cardArray.splice(Math.round(this.deck.length/2),0,topCard);
            topCard = this.deck.draw();
        }

        this.pile.push(topCard);
        console.log(`The top card is ${topCard.rank} of ${topCard.suit}`);

    }

    takeTurns() {
        //iterate through the hands
        while(!this.gameOver) {
            for(let hand of this.hands) {
                console.log(`Next player`);
                let validCards = this.checkHand(hand.cards);

                if(!hand.computer) {
                    //do a separate function for how a human does this
                    this.human();
                } else if(validCards === false) {
                    console.log("Need to draw cards");
                    this.drawCards(hand);
                    //once it's true, place that card on the top of the pile and go to the next player
                } else {
                    //choose which of the possible cards randomly (valid cards is returned from this.checkHand)

                    const playing = validCards[Math.floor(Math.random() * validCards.length)];
                    hand.playCard(playing);
                    this.pile.unshift(playing);

                    console.log(`Just played ${playing.rank} of ${playing.suit}`);

                    //place that card at the top of the pile

                    //go to the next person
                }

                if(hand.cards.length <= 0) {
                    console.log(`Player has ${hand.cards.length} cards`)
                    this.gameOver = true;
                }
            }


            //this is temporary, just to avoid an infinite loop
            //this.gameOver = true;
        }

        return true;

    }

    drawCards(hand){
        while(this.deck.cardArray.length>0){
            let drawnCard=this.deck.draw();
            console.log(`drew ${drawnCard.rank} of ${drawnCard.suit}`);
            if (this.checkHand([drawnCard])){
                this.pile.unshift(drawnCard);
                console.log(`Played ${drawnCard}`);
                return true;
            }
            //draw cards until checkhand is true
            hand.cards.push(drawnCard);
        }
        this.reshuffle();
        this.drawCards(hand);  
        
    }

    reshuffle (){
        console.log("deck empty");
        this.deck.cardArray = this.pile.splice(1);
        this.pile = [this.pile[0]];
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

        if(validCards.length > 0){
            return validCards;
        }
        return false;
    }

}

const g = new Game(6);
g.play();
