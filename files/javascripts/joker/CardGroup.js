class CardGroup {
  static #TYPES = ["value", "straight", "undecided"];

  constructor() {
    this.cards = new Array();
    this.jokers = new Array();
    this.type = CardGroup.#TYPES[2];
  }

  getCards() {
    return this.cards.concat(this.jokers);
  }

  getRegularCardsSize() {
    return this.cards.length;
  }

  getJokerCardsSize() {
    return this.jokers.length;
  }

  getSize() {
    return this.getRegularCardsSize() + this.getJokerCardsSize();
  }

  getValue() {
    let value = 0;
    if (this.isTableAble()) {
      for (let i = 0; i < this.getRegularCardsSize(); i++) value += this.cards[i].value;
    }
    return value;
  }

  addCard(card) {
    if (card.isJoker()) {
      this.jokers.push(card);
    } else if (this.getRegularCardsSize() == 0) this.cards.push(card);
    else {
      for (var i = 0; i < this.getRegularCardsSize(); i++) {
        if (this.cards[i].value >= card.value) break;
      }
      this.cards.splice(i, 0, card);
    }
  }

  kickCard(card) {
    let index = this.cards.indexOf(card);
    return this.cards.splice(index, 1).pop();
  }

  analyzeType() {
    if (this.isOfSameValue()) return CardGroup.#TYPES[0];
    if (this.isStraight()) return CardGroup.#TYPES[1];
    return CardGroup.#TYPES[2];
  }

  updateType() {
    this.type = this.analyzeType();
  }

  isOfSameValue() {
    let previousCard = this.cards[0];
    for (let i = 1; i < this.getRegularCardsSize(); i++) {
      if (previousCard.value != this.cards[i].value) return false;
    }
    return true;
  }

  isStraight() {
    if (this.isOfSameType) {
      let holeSize = 0;
      let previousCard = this.cards[0];
      for (let i = 1; i < this.getRegularCardsSize(); i++) {
        if (previousCard.value + 1 != this.cards[i].value) holeSize += this.cards[i].value - previousCard.value;
        previousCard = this.cards[i];
      }
      return holeSize <= this.getJokerCardsSize();
    }
    return false;
  }

  isOfSameType() {
    let previousCard = this.cards[0];
    for (let i = 1; i < this.getRegularCardsSize(); i++) {
      if (previousCard.type != this.cards[i].type) return false;
    }
    return true;
  }

  isTableAble() {
    if (this.getSize > 2) {
      this.updateType();
      if (this.type != "undecided") return true;
    }
    return false;
  }

  getCardGroupOfSameType(type) {
    let typeGroup = new CardGroup();
    for (let i = this.getRegularCardsSize() - 1; i > -1; i--) {
      if (this.cards[i].type === type) {
        typeGroup.addCard(this.kickCard(this.cards[i]));
      }
    }
    return typeGroup;
  }
}
