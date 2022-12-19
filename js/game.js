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
        this.hands[0].render();
        this.gameTime();
        //wait for a human to click something
  
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
        this.renderPile();

    }

    takeTurns() {
        //iterate through the computers' hands one time
            for(let i = 1; i < this.numHands; i++) {
                console.log(`Next player`);
                let validCards = this.checkHand(hand.cards);
                
                if(validCards === false) {
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
    }


    //if it's a person => 

    human(str){
        console.log(this.hands[0]);

        //let them choose their card
        let chosenCard = str.split(`\nof\n`);
        let humanCard = {};
        if (isNaN(Number(chosenCard[0]))){
            humanCard = new Card(chosenCard[0], chosenCard[1])
        } else {
            humanCard = new Card(Number(chosenCard[0]), chosenCard[1]);
        }
         
    
        //check if that card works (give them an error message if not)
            //if they don't have any, make them draw cards until they have one that works
            //render all of those cards
        //play that card, add it to the pile
        //remove that card from their hand
        //check if they have 0 cards
        //if yes, the game is over
        //if no, go to the next person




        //calls take turns at the end
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

    renderPile() {
        let cardElement = document.createElement('div');
        cardElement.innerText = `${this.pile[0].rank} \n of \n ${this.pile[0].suit}`;
        cardElement.classList += 'card';
        
        const pileSection = document.querySelector('.pile');
        //pileSection.removeChild();
        pileSection.appendChild(cardElement);
    }
}

const g = new Game(6);
g.play();
