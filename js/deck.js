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


                this.deck.push({rank: val, suit: current})
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




}

const d = new Deck();

d.generateCards();
d.shuffle();