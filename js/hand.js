class Hand {
    constructor() {

    }

    cards = [];

    addCard(card) {
        this.cards.push(card);
    }

    playCard(card) {
        if(card in cards) return null;
        return this.cards.splice(cards.indexOf(card), 1);
    }
}