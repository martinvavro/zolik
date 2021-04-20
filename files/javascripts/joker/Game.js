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

var PARENT = document.querySelector(".centered-div");

let game = new Game();
game.dealCards();
initView();

function initView() {
  PARENT.style.fontSize = Options.getFontSize();
  renderTable(game.table);
  for (let i = 0; i < game.getPlayersCount(); i++) {
    game.players[i].regroupByType(game.players[i].cardGroups[0]);
    renderPlayerView(game.players[i]);
  }
}

function renderTable(table) {
  let tableEl = document.createElement("div");
  tableEl.classList.add("table-container");
  renderTableHeading();
  let emptyCardGroup = renderEmptyCard();
  emptyCardGroup.id = "pile";
  setSortable(emptyCardGroup);
  tableEl.appendChild(emptyCardGroup);
  tableEl.appendChild(renderCardsPack(table));
  PARENT.appendChild(tableEl);
}

function renderTableHeading() {
  let tableHeading = document.createElement("h1");
  tableHeading.innerHTML = "Table";
  PARENT.appendChild(tableHeading);
}

function renderCardsPack(table) {
  let pack = renderKickerCard(table);
  pack.append(renderCardBack());
  return encapsulateInDiv(pack, Options.getCardWidth);
}

function renderKickerCard(table) {
  let kickerCard = renderCard(table.getPack().getKickerCard());
  kickerCard.firstChild.classList.add("card-kicker");
  return kickerCard;
}

function renderPlayerView(player) {
  let playerDiv = document.createElement("div");
  playerDiv.classList.add("player-container");
  let playerId = document.createElement("h1");
  playerId.innerHTML = "player " + player.getName();
  PARENT.appendChild(playerId);
  renderHand(player, playerDiv);
  PARENT.appendChild(playerDiv);
}

function renderHand(player, playerDiv) {
  player.getCardGroups().forEach((cardGroup) => {
    let cardGroupEl = renderCardGroup();
    cardGroup.getCards().forEach((card) => {
      cardGroupEl.appendChild(renderCard(card));
    });
    setRenderedCardGroupWidth(cardGroupEl);
    playerDiv.appendChild(cardGroupEl);
  });

  playerDiv.appendChild(renderAddNewCardGroup());
}

function renderCardGroup() {
  let cardGroup = document.createElement("div");
  cardGroup.classList.add("card-group", "sortable");
  setSortable(cardGroup);
  return cardGroup;
}

function setSortable(cardGroup) {
  var oldParentDiv, hoverTarget;
  $(cardGroup).sortable({
    connectWith: ".sortable",
    tolerance: "pointer",
    cancel: ".unsortable",
    containment: "section",
    receive: function (event, ui) {
      let newParentDiv = ui.item[0].parentElement;
      handleNewGroupCreation(newParentDiv);
      setRenderedCardGroupWidth(newParentDiv);
      if (newParentDiv.id == "pile") {
        newParentDiv.lastChild.remove();
        newParentDiv.firstChild.style = "";
      }
    },
    activate: function (event, ui) {
      oldParentDiv = ui.item[0].parentElement;
    },
    over: function (event, ui) {
      hoverTarget = ui.placeholder[0].parentElement;
      if (hoverTarget.id == "pile" && oldParentDiv.id != hoverTarget.id) {
        hoverTarget.firstChild.classList.add("shadowHighlight");
        $(hoverTarget.firstChild).mouseenter(hoverTarget.firstChild.classList.add("shadowHighlight")).mouseleave(hoverTarget.firstChild.classList.remove("shadowHighlight"));

        ui.placeholder[0].style = "display:none;";
      } else {
        PARENT.querySelector("#pile").firstChild.style = "";
      }
    },
    stop: function (event, ui) {
      if (oldParentDiv) {
        if (oldParentDiv.childElementCount == 0) oldParentDiv.remove();
        else setRenderedCardGroupWidth(oldParentDiv);
      }
    },
  });
  $(cardGroup).disableSelection();
}

function handleNewGroupCreation(newParentDiv) {
  if (newParentDiv.classList.contains("card-group-empty-placeholder")) {
    newParentDiv.classList.remove("card-group-empty-placeholder");
    newParentDiv.classList.add("card-group");
    newParentDiv.querySelector(".cross").remove();
    newParentDiv.parentElement.appendChild(renderAddNewCardGroup());
  }
}

function renderAddNewCardGroup() {
  let emptyCardGroup = document.querySelector(".card-group-empty-placeholder").cloneNode(true);
  setSortable(emptyCardGroup);
  return emptyCardGroup;
}

function setRenderedCardGroupWidth(cardContainer) {
  let max_width = Options.getMaxColumnsInCardgroup();
  let columnCount = cardContainer.childElementCount > max_width ? max_width : cardContainer.childElementCount;
  cardContainer.style.gridTemplateColumns = `repeat(${columnCount}, auto)`;
}

function renderCard(card) {
  let cardEl = document.querySelector("#template .card").cloneNode(true);
  if (card.isJoker()) {
    cardEl.querySelectorAll("h1").forEach((h1) => (h1.style.fontSize = Options.getJokerFontSize()));
    cardEl.querySelectorAll("img").forEach((img) => (img.src = ""));
  } else {
    cardEl.querySelectorAll("img").forEach((img) => (img.src = card.getIconPath()));
  }
  cardEl.querySelectorAll(".card-value").forEach((el) => (el.innerHTML = card.getValueString()));

  cardEl.classList.add(card.isRed() ? "red" : "black");
  return encapsulateInDiv(cardEl, Options.getCardWidth());
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
  return encapsulateInDiv(cardEl, Options.getCardWidth(), "sortable");
}

function encapsulateInDiv(child, width, className) {
  let parentDiv = document.createElement("div");
  if (width) parentDiv.style.width = width;
  if (className) parentDiv.className = className;
  parentDiv.appendChild(child);
  return parentDiv;
}
