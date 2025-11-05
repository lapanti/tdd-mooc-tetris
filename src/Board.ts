const EMPTY = '.'

class Point {
  row: number;
  col: number;

  constructor(row: number, col: number) {
    this.row = row
    this.col = col
  }
}

interface Shape {
  width(): number
  height(): number

  blockAt(row: number, col: number): string | undefined
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
    this.blocks = [];
  }

  toString() {
    const board: string[][] = Array.from(Array(this.#height), () => Array(this.#width).fill(EMPTY));

    this.blocks.forEach((block) => {
      board[block.row][block.column] = block.character;
    });

    return board
      .map((row) => row.join(""))
      .join("\n")
      .concat("\n");
  }

  drop(block: string) {
    if (this.blocks.length > 0) {
      throw new Error("already falling");
    }

    this.blocks = this.blocks.concat({ character: block, column: Math.floor(this.#width / 2), row: 0 });
  }

  tick() {
    this.blocks = this.blocks.map((block) => ({ ...block, row: block.row + 1 }));
  }
}
