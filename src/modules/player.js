'use strict';

import { Gameboard } from './gameboard';

class Player {
  constructor(name, isComputer = false) {
    this.name = name;
    this.gameboard = new Gameboard();
    this.isComputer = isComputer;
  }
}

class ComputerPlayer extends Player {
  constructor(name) {
    super(name, true);
  }
}
export { Player, ComputerPlayer };
