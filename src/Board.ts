export class Board {
  width: number;
  height: number;
  board: string;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.board = `...
...
...
`;
  }

  toString() {
    return this.board;
  }

  drop(block: string) {
    this.board = `.${block}.
...
...
`;
  }

  tick() {
    this.board = `...
.X.
...
`
  }
}
