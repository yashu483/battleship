import { Gameboard } from '../modules/gameboard';

const gameBoard = new Gameboard();

describe('testing board only', () => {
  test('gameBoard to contain a board', () => {
    expect(typeof gameBoard.board).toBe('object');
  });

  test('board to be length of 10', () => {
    expect(gameBoard.board.length).toBe(10);
  });

  test('every item of board to have 10 cells', () => {
    expect(
      gameBoard.board.every((item) => {
        return item.length === 10;
      }),
    ).toBe(true);
  });
  test('first cell should contain 0 and 0 for x and y coordinates', () => {
    const firstCell = gameBoard.board[0][0];
    expect(firstCell.rowCoordinate).toBe(0);
    expect(firstCell.columnCoordinate).toBe(0);
  });

  test('hit the first cell of gameBoard', () => {
    gameBoard.receiveAttack(0, 0);
    const firstCell = gameBoard.board[0][0];
    expect(firstCell.didHit).toBeTruthy();
  });
});

describe('testing placeShip() functionality', () => {
  test('ship is being placed', () => {
    gameBoard.placeShip(gameBoard.ships.destroyer, [0, 0], 'vertical');

    expect(gameBoard.getCell([2, 0]).shipPlaced).toEqual(
      gameBoard.ships.destroyer,
    );
  });
  test('ship is being placed', () => {
    gameBoard.placeShip(gameBoard.ships.destroyer, [0, 0], 'vertical');

    expect(gameBoard.getCell([0, 0]).shipPlaced).toEqual(
      gameBoard.ships.destroyer,
    );
  });
  test('empty place are still empty', () => {
    gameBoard.placeShip(gameBoard.ships.destroyer, [0, 0], 'vertical');

    expect(gameBoard.getCell([0, 1]).shipPlaced).toBeNull();
  });
});
