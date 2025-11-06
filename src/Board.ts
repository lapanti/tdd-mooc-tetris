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

  moveLeft() {
    return new MovableShape(this.#shape, this.#row, this.#col - 1)
  }

  height() {
    return this.#row + this.#shape.height();
  }

  width() {
    return this.#col + this.#shape.width();
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
    for (let row = 0; row < height; row++) {
      this.#immobile[row] = Array.from(EMPTY.repeat(width))
    }
    this.blocks = [];
  }

  toString() {
    return shapeToString(this)
  }

  hasFalling() {
    return this.#falling !== null
  }

  width() {
    return this.#width;
  }

  height() {
    return this.#height;
  }

  drop(block: string | Shape) {
    const piece = typeof block === 'string' ? new Block(block) : block

    if (this.hasFalling()) {
      throw new Error("already falling");
    }

    this.#falling = new MovableShape(piece, 0, Math.floor((this.width() - piece.width()) / 2))
  }

  #hitsFloor(falling: MovableShape) {
    for (const point of falling.nonEmptyPoints()) {
      if (point.row >= this.height()) {
        return true
      }
    }

    return false
  }

  #hitsImmobile(falling: MovableShape) {
    for (const point of falling.nonEmptyPoints()) {
      if (this.#immobile[point.row][point.col] !== EMPTY) {
        return true
      }
    }

    return false
  }

  blockAt(row: number, col: number) {
    if (this.hasFalling()) {
      const block = this.#falling!.blockAt(row, col);
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
    if (this.hasFalling()) {
      const attempt = this.#falling!.moveDown()

      if (this.#hitsFloor(attempt) || this.#hitsImmobile(attempt)) {
        this.#stopFalling()
      } else {
        this.#falling = attempt
      }
    }
  }

  moveLeft() {
    if (this.hasFalling()) {
      const attempt = this.#falling!.moveLeft()

      this.#falling = attempt
    }
  }
}
