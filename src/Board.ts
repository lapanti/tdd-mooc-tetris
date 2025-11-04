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
}

export class Board {
  width: number;
  height: number;
  blocks: { column: number; row: number; character: string }[];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.blocks = [];
  }

  toString() {
    const board: string[][] = Array.from(Array(this.height), () => Array(this.width).fill(EMPTY));

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

    this.blocks = this.blocks.concat({ character: block, column: Math.floor(this.width / 2), row: 0 });
  }

  tick() {
    this.blocks = this.blocks.map((block) => ({ ...block, row: block.row + 1 }));
  }
}
