class Player {
  constructor() {
    this.cardGroups = new Array();
    this.score = 0;
  }

  addScore(score) {
    this.score += score;
  }

  getCardGroups() {
    return this.cardGroups;
  }

  getScore() {
    return this.score;
  }

  addCardGroup(cardGroup) {
    this.cardGroups.push(cardGroup);
  }
}
