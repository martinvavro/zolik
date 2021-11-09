class Card {
  static #STRINGVALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "JOKER"];
  static #STRINGTYPES = ["Hearts", "Tiles", "Clovers", "Pikes"];

  constructor(type, value) {
    this.type = type;
    this.value = value;
    this.id = Options.getUniqueID();
    return this;
  }

  toString() {
    return this.getValueString() + " of " + this.#getTypeString();
  }

  #getTypeString() {
    return Card.#STRINGTYPES[this.type];
  }

  getValueString() {
    return Card.#STRINGVALUES[this.value];
  }

  getIconPath() {
    return `files/assets/joker/cardIcons/${this.#getTypeString()}.svg`;
  }

  isJoker() {
    return this.value === Card.#STRINGVALUES.length - 1;
  }

  isRed() {
    return this.type < 2;
  }

  getID() {
    return this.id;
  }
}
