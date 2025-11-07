import { Shape, shapeToString } from "./Shape";

export class Block implements Shape {
  #character;

  constructor(character: string) {
    this.#character = character;
  }

  width() {
    return 1;
  }

  height() {
    return 1;
  }

  blockAt(row: number, col: number) {
    if (row === 0 && col === 0) {
      return this.#character;
    }
  }

  rotateRight(): Shape {
    return this
  }

  rotateLeft(): Shape {
    return this
  }

  toString() {
    return shapeToString(this);
  }
}
