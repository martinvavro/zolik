class Table {
  constructor() {
    this.cardGroups = new Array();
    this.pack = new Pack();
  }

  getPack() {
    return this.pack;
  }

  addCardGroup(cardGroup) {
    this.cardGroups.push(cardGroup);
  }
}
