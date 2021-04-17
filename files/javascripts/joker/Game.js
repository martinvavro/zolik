class Game {
  constructor() {
    this.table = new Table();
    this.players = [new Player(false, "frantisek"), new Player(true, "koloman"), new Player(true, "gejza")];
    this.winner = null;
  }

  getPlayersCount() {
    return this.players.length;
  }

  generateFreshHand(cardGroupBefore) {
    let cardGroup = cardGroupBefore || new CardGroup();

    while (cardGroup.getSize() != 14) {
      cardGroup.addCard(this.table.getPack().drawRandomCard());
    }

    return cardGroup;
  }

  dealCards() {
    let cardGroup = this.table.getPack().cutThePack();
    this.players[this.getPlayersCount() - 1].addCardGroup(this.generateFreshHand(cardGroup));

    for (let i = 0; i < this.getPlayersCount() - 1; i++) {
      this.players[i].addCardGroup(this.generateFreshHand());
    }
  }

  startGame() {
    this.dealCards();
    while (this.winner == null) {
      this.players.forEach((player) => {
        if (player.ai) player.makeTurn();
        else this.generateTurnView(player);
      });
    }
  }

  generateTurnView(player) {}
}

let game = new Game();
game.dealCards();
renderTable(game.table);
for (let i = 0; i < game.getPlayersCount(); i++) {
  game.players[i].regroupByType(game.players[i].cardGroups[0]);
  renderPlayerView(game.players[i]);
}

function renderTable(table) {
  let tableEl = document.createElement("div");
  let tableId = document.createElement("h1");
  tableEl.classList.add("table-container");
  tableId.innerHTML = "Table";
  document.querySelector(".centered-div").appendChild(tableId);
  // tableEl.appendChild(tableId);
  let cardHolder = document.createElement("div");
  cardHolder.style.width = Options.getTableCardWidth();

  let cardPackHolder = cardHolder.cloneNode(true);

  // cardHolder.appendChild(renderCard(table.getPack().getBottomCard()));

  cardHolder.appendChild(renderEmptyCard());
  let kickerCard = renderKickerCard(table);
  cardPackHolder.appendChild(kickerCard);
  cardPackHolder.appendChild(renderCardBack());
  tableEl.appendChild(cardHolder);
  tableEl.appendChild(cardPackHolder);
  document.querySelector(".centered-div").appendChild(tableEl);
}

function renderKickerCard(table) {
  let kickerCard = renderCard(table.getPack().getKickerCard());
  kickerCard.classList.add("card-kicker");
  return kickerCard;
}

function renderPlayerView(player) {
  let playerDiv = document.createElement("div");
  playerDiv.classList.add("player-container");
  let playerId = document.createElement("h1");
  playerId.innerHTML = "player " + player.getName();
  document.querySelector(".centered-div").appendChild(playerId);
  renderHand(player, playerDiv);
  document.querySelector(".centered-div").appendChild(playerDiv);
}

function renderHand(player, playerDiv) {
  player.getCardGroups().forEach((cardGroup) => {
    let cardContainer = document.createElement("div");
    cardContainer.classList.add("card-group");
    cardContainer.style.gridTemplateColumns = `repeat(${cardGroup.getSize()}, auto)`;

    cardGroup.getCards().forEach((card) => {
      let cardHolder = document.createElement("div");
      cardHolder.style.width = Options.getCardWidth();
      cardHolder.appendChild(renderCard(card));
      cardContainer.appendChild(cardHolder);
    });
    playerDiv.appendChild(cardContainer);
  });
}

function renderCard(card) {
  let cardEl = document.querySelector("#template .card").cloneNode(true);
  if (card.isJoker()) {
    cardEl.style.fontSize = "4px";
    cardEl.querySelectorAll("img").forEach((img) => (img.src = ""));
  } else {
    cardEl.querySelectorAll("img").forEach((img) => (img.src = card.getIconPath()));
  }
  cardEl.querySelectorAll(".card-value").forEach((el) => (el.innerHTML = card.getValueString()));

  cardEl.classList.add(card.isRed() ? "red" : "black");
  return cardEl;
}

function renderCardBack() {
  let cardEl = document.querySelector("#template .card").cloneNode(true);
  cardEl.classList.add("navy");
  cardEl.querySelector(".card-inner").innerHTML = "";
  cardEl.querySelector(".card-inner").classList.add("card-back");
  return cardEl;
}

function renderEmptyCard() {
  let cardEl = document.querySelector("#template .card-empty-placeholder").cloneNode(true);
  return cardEl;
}
