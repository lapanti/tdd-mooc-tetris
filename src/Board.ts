import { Block } from './Block';
import { Shape, shapeToString } from './Shape'
import { Subscriber } from './Subscriber';

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

  moveRight() {
    return new MovableShape(this.#shape, this.#row, this.#col + 1)
  }

  rotateRight() {
    return new MovableShape(this.#shape.rotateRight() as Shape, this.#row, this.#col)
  }

  rotateLeft() {
    return new MovableShape(this.#shape.rotateLeft() as Shape, this.#row, this.#col)
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
  #subscribers: Subscriber[]

  constructor(width: number, height: number, immobile?: string[][]) {
    this.#width = width;
    this.#height = height;
    this.#immobile = immobile || new Array(height)
    if (!immobile) {
      for (let row = 0; row < height; row++) {
        this.#immobile[row] =  Array.from(EMPTY.repeat(width))
      }
    }
    this.blocks = [];
    this.#subscribers = []
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

  #hitsWall(falling: MovableShape) {
    for (const point of falling.nonEmptyPoints()) {
      if (point.col >= this.width() || point.col < 0) {
        return true
      }
    }

    return false
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

  #notifySubscribers() {
    this.#subscribers.forEach((subscriber) => subscriber.notifyAboutClearance(1))
  }

  #stopFalling() {
    for (let row = 0; row < this.height(); row++) {
      for (let col = 0; col < this.width(); col++) {
        this.#immobile[row][col] = this.blockAt(row, col) as string
      }
    }

    // I hate using immutability for such things, but just now I have no better ideas
    let wasRowCleared = false
    for (let row = 0; row < this.height(); row++) {
      if (this.#immobile[row].every((value) => value !== EMPTY)) {
        // Row is full, so clear it
        this.#immobile.splice(row, 1)
        this.#immobile = [Array.from(EMPTY.repeat(this.width()))].concat(this.#immobile)

        wasRowCleared = true
      }
    }

    if (wasRowCleared) {
      this.#notifySubscribers()
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

      if (this.#hitsWall(attempt) || this.#hitsImmobile(attempt)) {
        return
      }

      this.#falling = attempt
    }
  }

  moveRight() {
    if (this.hasFalling()) {
      const attempt = this.#falling!.moveRight()

      if (this.#hitsWall(attempt) || this.#hitsImmobile(attempt)) {
        return
      }

      this.#falling = attempt
    }
  }

  moveDown() {
    if (this.hasFalling()) {
      const attempt = this.#falling!.moveDown()

      if (this.#hitsFloor(attempt) || this.#hitsImmobile(attempt)) {
        this.#stopFalling()
      } else {
        this.#falling = attempt
      }
    }
  }

  #wallKick(attempt: MovableShape): MovableShape | undefined {
    if (this.#hitsWall(attempt)) {
      const wallKickRight = attempt.moveLeft()
      // If the wall that was kicked was on the left, kick the left wall
      if (this.#hitsWall(wallKickRight)) {
        const wallKickLeft = attempt.moveRight()
        if (!this.#hitsWall(wallKickLeft)) {
          return wallKickLeft
        }
      } else {
        return wallKickRight
      }
    }

    return undefined
  }

  rotateRight() {
    if (this.hasFalling()) {
      const attempt = this.#falling!.rotateRight()

      const wallkickAttempt = this.#wallKick(attempt)

      if (wallkickAttempt) {
        this.#falling = wallkickAttempt
        return wallkickAttempt
      }

      if (this.#hitsFloor(attempt) || this.#hitsImmobile(attempt)) {
        return undefined
      } else {
        this.#falling = attempt
        return attempt
      }
    }
  }

  rotateLeft() {
    if (this.hasFalling()) {
      const attempt = this.#falling!.rotateLeft()

      const wallkickAttempt = this.#wallKick(attempt)

      if (wallkickAttempt) {
        this.#falling = wallkickAttempt
        return wallkickAttempt
      }

      if (this.#hitsFloor(attempt) || this.#hitsImmobile(attempt)) {
        return undefined
      } else {
        this.#falling = attempt
        return attempt
      }
    }
  }

  subscribe(subscriber: Subscriber) {
    this.#subscribers = this.#subscribers.concat(subscriber)
  }

  unsubscribe(subscriber: Subscriber) {
    this.#subscribers = this.#subscribers.filter((existingSubscriber) => existingSubscriber !== subscriber)
  }

  getSubscribers(): Subscriber[] {
    return this.#subscribers.slice()
  }
}
