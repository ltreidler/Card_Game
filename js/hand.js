class Hand {
    constructor(computer = true) {
        this.computer = computer;
    }

    cards = [];

    addCard(card) {
        this.cards.push(card);

    }

    playCard(card) {
        if(card in this.cards) return null;
        return this.cards.splice(this.cards.indexOf(card), 1);
    }

    renderCard(card){
        let cardElement = document.createElement('div');
        cardElement.textContent = `${card.rank} of ${card.suit}`;
        return cardElement;
    }


    render(){
        debugger;
        let handElement = document.querySelector(".hand");
        for (let card of this.cards){
            handElement.appendChild(this.renderCard(card));
        }
    }

}

/*
1. check hand (checkHand())
    1a. if they can't play anything, pick up cards until they can (draw(), then check)
    1b. play the card, put it on top of the pile, move to the next player
2. if they do have a card, choose the card to play
3. place that on top of the deck
4. go to the next player

*/