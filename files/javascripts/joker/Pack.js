class Pack {
  constructor() {
    this.cards = new Array();
    this.generateMultiplePacks(Options.getPacksCount());
    this.shufflePack();
    this.kickerCard;
  }

  getSize() {
    return this.cards.length;
  }

  generateMultiplePacks(number) {
    for (var i = 0; i < number; i++) {
      this.cards = this.cards.concat(this.generateFreshPack(i === 0));
    }
  }

  getBottomCard() {
    return this.cards[0];
  }

  getKickerCard() {
    return this.kickerCard;
  }

  generateFreshPack(jokers) {
    let pack = new Array();
    let numberOfCards = jokers ? 14 : 13;
    for (let i = 0; i < 4; i++) for (let j = 0; j < numberOfCards; j++) pack.push(new Card(i, j));
    return pack;
  }

  shufflePack() {
    for (let i = this.getSize() - 1; i > 0; i--) {
      const j = Pack.getRandomNumber(i + 1);
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  drawRandomCard() {
    return this.cards.pop(Pack.getRandomNumber(this.getSize()));
  }

  returnCard(card) {
    this.cards.splice(0, 0, card);
  }

  cutThePack() {
    let position = Pack.getRandomNumber(this.getSize() - 2) + 2;
    let cardGroup = new CardGroup();
    for (var i = 0; i < 3; i++) {
      if (this.cards[position - i].isJoker()) {
        cardGroup.addCard(this.drawSpecificPositionCard(position - i));
      } else if (!this.kickerCard) {
        this.kickerCard = this.drawSpecificPositionCard(position - i);
      }
    }
    return cardGroup;
  }

  drawTopCard() {
    return this.cards.pop();
  }

  drawBottomCard() {
    return this.drawSpecificPositionCard(0);
  }

  drawSpecificPositionCard(position) {
    let card = this.cards.splice(position, 1);
    return card.pop();
  }

  static getRandomNumber(limit) {
    return Math.floor(Math.random() * limit);
  }
}
