class Pack {
  constructor(value) {
    this.cards = new Array();
    this.generateMultiplePacks(value);
    this.shufflePack();
  }

  getSize() {
    return this.cards.length;
  }

  generateMultiplePacks(number) {
    for (var i = 0; i < number; i++) {
      this.cards = this.cards.concat(this.generateFreshPack());
    }
  }

  generateFreshPack() {
    let pack = new Array();
    for (let i = 0; i < 4; i++) for (let j = 0; j < 14; j++) pack.push(new Card(i, j));
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
    for (var i = 0; i < 3; i++) cardGroup.addCard(this.cards.pop(position));
    return cardGroup;
  }

  drawTopCard() {
    return this.cards.pop(this.getSize() - 1);
  }

  drawBottomCard() {
    return this.cards.pop(0);
  }

  static getRandomNumber(limit) {
    return Math.floor(Math.random() * limit);
  }
}
