class Player {
  constructor(ai, name) {
    this.cardGroups = new Array();
    this.score = 0;
    this.ai = ai;
    this.name = name;
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

  getName() {
    return this.name;
  }

  addCardGroup(cardGroup) {
    this.cardGroups.push(cardGroup);
  }

  removeCardGroup(cardGroup) {
    let index = this.cardGroups.indexOf(cardGroup);
    this.cardGroups.splice(index, 1);
  }

  removeEmptyCardGroups() {
    this.cardGroups.forEach((group) => {
      if (group.getSize() == 0) this.removeCardGroup(group);
    });
  }

  regroupByType(cardGroup) {
    for (let i = 0; i < 4; i++) this.addCardGroup(cardGroup.getCardGroupOfSameType(i));
    this.removeEmptyCardGroups();
  }

  makeTurn() {}
}
