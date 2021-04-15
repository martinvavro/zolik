class Game {
  constructor() {
    this.table = new Table();
    this.players = [new Player(), new Player()];
  }

  initialRound() {
    // this.table.getPack().cutThePack()
    this.players.forEach((player) => {
      let cardGroup = new CardGroup();

      for (let i = 0; i < 14; i++) {
        cardGroup.addCard(this.table.getPack().drawRandomCard());
      }

      player.addCardGroup(cardGroup);
    });
  }
}

let game = new Game();
game.initialRound();
game.players[0].getCardGroups;
