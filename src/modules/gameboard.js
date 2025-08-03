'use strict';

import { Ship } from './ship';

// Creates cells required in board
class Cell {
  constructor(x, y) {
    this.rowCoordinate = x;
    this.columnCoordinate = y;

    // this.shipPlaced will also be used as a place for ship being placed in current cell
    this.shipPlaced = null;
    this.didHit = false;
  }
  placeShipToCell(ship) {
    this.shipPlaced = ship;
  }

  hitCell() {
    this.didHit = true;

    // if cell also contains a part of a ship then hit() the ship
    if (this.shipPlaced !== null) {
      this.shipPlaced.hit();
    }
  }
  get isOccupied() {
    return this.shipPlaced !== null;
  }
}

// Note: board in the game is going to be 10 x 10 grid. In this code upper row and first (leftmost) column is denoted by 0
class Gameboard {
  constructor() {
    this.board = this.#createBoard();
    this.ships = this.#createShips();
  }
  #createBoard() {
    const board = [];
    for (let i = 0; i < 10; i++) {
      const row = [];
      for (let j = 0; j < 10; j++) {
        const cell = new Cell(i, j);
        row.push(cell);
      }
      board.push(row);
    }
    return board;
  }
  #createShips() {
    const carrier = new Ship(5);
    const battleship = new Ship(4);
    const destroyer = new Ship(3);
    const submarine = new Ship(3);
    const patrolBoat1 = new Ship(2);
    const patrolBoat2 = new Ship(2);
    const boat = new Ship(1);
    return {
      carrier,
      battleship,
      destroyer,
      submarine,
      patrolBoat1,
      patrolBoat2,
      boat,
    };
  }
  getCell(coordinate) {
    return this.board[coordinate[0]][coordinate[1]];
  }
  receiveAttack(x, y) {
    if (this.board[x][y].didHit) return;
    this.board[x][y].hitCell();
  }
  #isVerticalOrientation(startingCoordinate, endingCoordinate) {
    // if columns in both coordinates are  same then its vertical orientation, so return true, else false
    return startingCoordinate[1] === endingCoordinate[1] ? true : false;
  }
  #checkIfCellsAreEmpty(startingCoordinate, endingCoordinate) {
    if (this.#isVerticalOrientation(startingCoordinate, endingCoordinate)) {
      const currentColumn = startingCoordinate[1];
      for (let i = startingCoordinate[0]; i < endingCoordinate[0]; i++) {
        if (this.board[i][currentColumn].shipPlaced !== null) return false;
      }
    } else {
      const currentRow = startingCoordinate[0];
      for (let i = startingCoordinate[1]; i < endingCoordinate[1]; i++) {
        if (this.board[currentRow][i].shipPlaced !== null) return false;
      }
    }
    return true;
  }
  placeShip(ship, startingCoordinate, orientation) {
    if (ship.shipAlreadyBeenPlacedInBoard) return;

    const length = ship.length;
    const row = startingCoordinate[0];
    const column = startingCoordinate[1];
    if (orientation === 'vertical') {
      // grid rows and columns are denoted using numbers from 0 to 9, so subtracting 1 from ship length
      const shipEndingRow = length - 1 + row;
      if (shipEndingRow > 10) return;
      if (
        this.#checkIfCellsAreEmpty(startingCoordinate, [shipEndingRow, column])
      ) {
        for (let i = row; i <= shipEndingRow; i++) {
          this.board[i][column].placeShipToCell(ship);
        }
      }
    } else if (orientation === 'horizontal') {
      const shipEndingColumn = length - 1 + column;
      if (shipEndingColumn > 10) return;
      if (
        this.#checkIfCellsAreEmpty(startingCoordinate, [row, shipEndingColumn])
      ) {
        for (let i = column; i <= shipEndingColumn; i++) {
          this.board[row][i].placeShipToCell(ship);
        }
      }
    }
  }
}

export { Gameboard, Cell };
