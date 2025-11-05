import { Block } from './Block';
import { Shape, shapeToString } from './Shape'

const EMPTY = '.'

class Point {
  row: number;
  col: number;

  constructor(row: number, col: number) {
    this.row = row
    this.col = col
  }
}



class MovableShape implements Shape {
  #shape: Shape
  #row: number
  #col: number

  constructor(shape: Shape, row: number, col: number) {
    this.#shape = shape
    this.#row = row
    this.#col = col
  }

  moveDown() {
    return new MovableShape(this.#shape, this.#row + 1, this.#col)
  }

  nonEmptyPoints() {
    const points = [];
    for (let row = this.#row; row < this.height(); row++) {
      for (let col = this.#col; col < this.width(); col++) {
        const block = this.blockAt(row, col);
        if (block !== EMPTY) {
          points.push(new Point(row, col));
        }
      }
    }
    return points;
  }

  blockAt(row: number, col: number) {
    if (
      row >= this.#row && row < this.height() &&
      col >= this.#col && col < this.width()
    ) {
      return this.#shape.blockAt(row - this.#row, col - this.#col);
    } else {
      return EMPTY;
    }
  }

  height() {
    return this.#row + this.#shape.height();
  }

  width() {
    return this.#col + this.#shape.width();
  }
}

export class Board {
  #width: number;
  #height: number;
  #falling: MovableShape | null = null;
  #immobile: string[][];
  blocks: { column: number; row: number; character: string }[];

  constructor(width: number, height: number) {
    this.#width = width;
    this.#height = height;
    this.#immobile = new Array(height)
    for (let row = 0; row < this.#immobile.length; row++) {
      this.#immobile[row] = Array.from(EMPTY.repeat(width))
    }
    this.blocks = [];
  }

  toString() {
    return shapeToString(this)
  }

  width() {
    return this.#width;
  }

  height() {
    return this.#height;
  }

  drop(block: string) {
    const piece = typeof block === 'string' ? new Block(block) : block

    if (this.#falling) {
      throw new Error("already falling");
    }

    this.#falling = new MovableShape(piece, 0, Math.floor((this.width() - piece.width()) / 2))
  }

  #hitsFloor(falling: MovableShape) {
    return falling.nonEmptyPoints().some((point) => point.row >= this.height())
  }

  #hitsImmobile(falling: MovableShape) {
    return falling.nonEmptyPoints().some((point) => this.#immobile[point.row][point.col] !== EMPTY)
  }

  blockAt(row: number, col: number) {
    if (this.#falling) {
      const block = this.#falling.blockAt(row, col);
      if (block !== EMPTY) {
        return block;
      }
    }

    return this.#immobile[row][col];
  }

  #stopFalling() {
    for (let row = 0; row < this.height(); row++) {
      for (let col = 0; col < this.width(); col++) {
        this.#immobile[row][col] = this.blockAt(row, col) as string
      }
    }

    this.#falling = null
  }

  tick() {
    if (!this.#falling) {
      return
    }

    const attempt = this.#falling.moveDown()

    if (this.#hitsFloor(attempt) || this.#hitsImmobile(attempt)) {
      this.#stopFalling()
    }

    this.#falling = attempt
  }
}
