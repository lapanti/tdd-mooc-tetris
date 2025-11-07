import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board";
import { Tetromino } from "../src/Tetromino";

describe("Rotating falling tetrominoes", () => {
  let board: Board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  test("can rotate the shape right", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateRight();

    expect(board.toString()).to.equalShape(
      `....T.....
       ....TT....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });

  test("can rotate the shape right twice", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateRight();
    board.rotateRight();

    expect(board.toString()).to.equalShape(
      `..........
       ...TTT....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });

  test("can rotate the shape right thrice", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateRight();
    board.rotateRight();
    board.rotateRight();

    expect(board.toString()).to.equalShape(
      `....T.....
       ...TT.....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });

  test("can rotate the shape right four times", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateRight();
    board.rotateRight();
    board.rotateRight();
    board.rotateRight();

    expect(board.toString()).to.equalShape(
        `....T.....
         ...TTT....
         ..........
         ..........
         ..........
         ..........`
    );
  });

  test("can not rotate the shape right if it doesn't fit on the board", () => {
    board.drop(Tetromino.T_SHAPE);
    for (let i = 0; i < 4; i++) {
        board.tick()
    }
    board.rotateRight();
    
    expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         ..........
         ....T.....
         ...TTT....`
    );
  });

  test("can not rotate the shape right if it doesn't fit on a board with other blocks", () => {
    board.drop(Tetromino.O_SHAPE);
    for (let i = 0; i < 10; i++) {
        board.tick()
    }

    board.drop(Tetromino.T_SHAPE);
    for (let i = 0; i < 2; i++) {
        board.tick()
    }
    board.rotateRight();
    
    expect(board.toString()).to.equalShape(
        `..........
         ..........
         ....T.....
         ...TTT....
         ....OO....
         ....OO....`
    );
  });

  test("can rotate the shape left", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft();

    expect(board.toString()).to.equalShape(
      `....T.....
       ...TT.....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });

  test("can rotate the shape left twice", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft();
    board.rotateLeft();

    expect(board.toString()).to.equalShape(
      `..........
       ...TTT....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });

  test("can rotate the shape left thrice", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft();
    board.rotateLeft();
    board.rotateLeft();

    expect(board.toString()).to.equalShape(
      `....T.....
       ....TT....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });

  test("can rotate the shape left four times", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft();
    board.rotateLeft();
    board.rotateLeft();
    board.rotateLeft();

    expect(board.toString()).to.equalShape(
        `....T.....
         ...TTT....
         ..........
         ..........
         ..........
         ..........`
    );
  });

  test("can not rotate the shape left if it doesn't fit on the board", () => {
    board.drop(Tetromino.T_SHAPE);
    for (let i = 0; i < 4; i++) {
        board.tick()
    }
    board.rotateLeft();
    
    expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         ..........
         ....T.....
         ...TTT....`
    );
  });

  test("can not rotate the shape left if it doesn't fit on a board with other blocks", () => {
    board.drop(Tetromino.O_SHAPE);
    for (let i = 0; i < 10; i++) {
        board.tick()
    }

    board.drop(Tetromino.T_SHAPE);
    for (let i = 0; i < 2; i++) {
        board.tick()
    }
    board.rotateLeft();
    
    expect(board.toString()).to.equalShape(
        `..........
         ..........
         ....T.....
         ...TTT....
         ....OO....
         ....OO....`
    );
  });

  test.only("can wall kick on rotate right", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft()
    for (let i = 0; i < 5; i++) {
        board.moveRight()
    }

    expect(board.toString()).to.equalShape(
        `.........T
         ........TT
         .........T
         ..........
         ..........
         ..........`
    )

    board.rotateRight()

    expect(board.toString()).to.equalShape(
        `........T.
         .......TTT
         ..........
         ..........
         ..........
         ..........`
    )
  })

  test.only("can wall kick on rotate left", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateRight()
    for (let i = 0; i < 5; i++) {
        board.moveLeft()
    }

    expect(board.toString()).to.equalShape(
        `T.........
         TT........
         T.........
         ..........
         ..........
         ..........`
    )

    board.rotateLeft()

    expect(board.toString()).to.equalShape(
        `.T........
         TTT.......
         ..........
         ..........
         ..........
         ..........`
    )
  })
});
