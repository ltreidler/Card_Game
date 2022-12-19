class Deck {
    constructor() {

    }

    deck = [];
    suits = ["Diamonds", "Hearts", "Clubs", "Spades"]

    //populate the deck with an initial array of cards
    generateCards() {
        for(let current of this.suits) {
            for(let i = 1; i < 14; i++) {
                let val = i;
                if(i === 13) val = "King";
                if(i === 12) val = "Queen";
                if(i === 11) val = "Jack";
                if(i === 1) val = "Ace";


                this.deck.push(new Card(val, current));
            }
        }
    }

    shuffle() {
        let newDeck = [];

        while(this.deck.length > 0) {
            const card = this.deck.splice((Math.floor(Math.random()*this.deck.length)),1)[0];
            newDeck.push(card);
        }

        this.deck = newDeck;
    }

    draw (){
        return this.deck.shift();
    }

    // deal (numHands, cardsPerHand) {
    //     if(cardsPerHand * numHands > this.deck.length) return "error";

    //     let hands = [];
    //     for (let k=0; k<numHands; k++){
    //         hands.push([]);
    //     }
    //     for (let i = 0; i<cardsPerHand; i++){
    //         for (let j= 0; j<numHands; j++){
    //             hands[j].push(this.draw());
    //         }
    //     }
    //     return hands;
    // }

    deal (hands) {
        // crazy 8, every player starts the game w/ 5 cards per hand
        if(5 * hands.length > this.deck.length) return "error";

        for (let i = 0; i<5; i++){
            for (let hand of hands){
                hand.addCard(this.draw());
            }
        }
    }

}

// const d = new Deck();

// const h1 = new Hand();
// const h2 = new Hand();
// const h3 = new Hand();


// d.generateCards();
// d.shuffle();
// d.dealOther([h1,h2,h3],4);