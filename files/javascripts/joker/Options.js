class Options {
  static cardId = 0;

  static getPacksCount() {
    return 2;
  }

  static getCardWidthInt() {
    return 80;
  }

  static getFontSize() {
    return `${Math.floor(this.getCardWidthInt() / 15)}px`;
  }

  static getJokerFontSize() {
    return `${Math.floor(this.getCardWidthInt() / 6)}px`;
  }

  static getCardWidth() {
    return `${this.getCardWidthInt()}px`;
  }

  static getTableCardWidth() {
    return `${this.getCardWidthInt()}px`;
  }

  static getMaxColumnsInCardgroup() {
    return Math.floor(PARENT.clientWidth / (this.getCardWidthInt() + 15));
  }

  static getUniqueID() {
    Options.cardId++;
    return Options.cardId;
  }
}
