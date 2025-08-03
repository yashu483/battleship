'use strict';

class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.shipAlreadyBeenPlacedInBoard = false;
  }

  get shipStatus() {
    return this.isSunk();
  }

  hit() {
    this.hits += 1;
  }

  isSunk() {
    return this.hits >= this.length;
  }

  // used for both placing and replacing ship on board
  shipBeenPlaced(value) {
    this.shipAlreadyBeenPlacedInBoard = value;
  }
}

export { Ship };
