import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board";
import { Tetromino } from "../src/Tetromino";

function fallToBottom(board: Board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

describe("Falling tetrominoes", () => {
  let board: Board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  test("start from the top middle", () => {
    board.drop(Tetromino.T_SHAPE);

    expect(board.toString()).to.equalShape(
      `...TTT....
       ....T.....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("stop when they hit the bottom", () => {
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ...TTT....
       ....T.....`
    );
  });

  test("stop when they land on another block", () => {
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board);
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ...TTT....
       ....T.....
       ...TTT....
       ....T.....`
    );
  });

  test("the row should clear when filled", () => {
    board = new Board(10, 6, [
      ['.','.','.','.','.','.','.','.','.','.'],
      ['.','.','.','.','.','.','.','.','.','.'],
      ['.','.','.','.','.','.','.','.','.','.'],
      ['.','.','.','.','.','.','.','.','.','.'],
      ['.','.','.','.','.','.','.','.','.','.'],
      ['I','I','I','I','.','.','I','I','I','I'],
    ])

    board.drop(Tetromino.O_SHAPE);
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       ....OO....`
    )
  });

  test("the row should clear when filled even if not last row", () => {
    board = new Board(10, 6, [
      ['.','.','.','.','.','.','.','.','.','.'],
      ['.','.','.','.','.','.','.','.','.','.'],
      ['.','.','.','.','.','.','.','.','.','.'],
      ['.','.','.','.','.','.','.','.','.','.'],
      ['I','I','I','I','.','.','I','I','I','I'],
      ['.','.','.','.','.','.','.','.','.','.'],
    ])

    board.drop(Tetromino.O_SHAPE);
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       ....OO....`
    )
  });

  test("two rows should clear when filled", () => {
    board = new Board(10, 6, [
      ['.','.','.','.','.','.','.','.','.','.'],
      ['.','.','.','.','.','.','.','.','.','.'],
      ['.','.','.','.','.','.','.','.','.','.'],
      ['.','.','.','.','.','.','.','.','.','.'],
      ['I','I','I','I','.','.','I','I','I','I'],
      ['I','I','I','I','.','.','I','I','I','I'],
    ])

    board.drop(Tetromino.O_SHAPE);
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       ..........`
    )
  });

  test("two rows should clear when filled even if not connect", () => {
    board = new Board(10, 8, [
      ['.','.','.','.','.','.','.','.','.','.'],
      ['.','.','.','.','.','.','.','.','.','.'],
      ['.','.','.','.','.','.','.','.','.','.'],
      ['.','.','.','.','.','.','.','.','.','.'],
      ['.','.','.','.','.','.','.','.','.','.'],
      ['I','I','I','I','I','.','I','I','I','I'],
      ['.','.','.','.','.','.','.','.','.','.'],
      ['I','I','I','I','I','.','I','I','I','I'],
    ])

    board.drop(Tetromino.I_SHAPE);
    board.rotateRight();
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       ..........
       .....I....
       .....I....`
    )
  });

  test("three rows should clear when filled", () => {
    board = new Board(10, 8, [
      ['.','.','.','.','.','.','.','.','.','.'],
      ['.','.','.','.','.','.','.','.','.','.'],
      ['.','.','.','.','.','.','.','.','.','.'],
      ['.','.','.','.','.','.','.','.','.','.'],
      ['.','.','.','.','.','.','.','.','.','.'],
      ['I','I','I','I','I','.','I','I','I','I'],
      ['I','I','I','I','I','.','I','I','I','I'],
      ['I','I','I','I','I','.','I','I','I','I'],
    ])

    board.drop(Tetromino.I_SHAPE);
    board.rotateRight();
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       ..........
       ..........
       .....I....`
    )
  });

  test("three rows should clear when filled even if not connect", () => {
    board = new Board(10, 8, [
      ['.','.','.','.','.','.','.','.','.','.'],
      ['.','.','.','.','.','.','.','.','.','.'],
      ['.','.','.','.','.','.','.','.','.','.'],
      ['.','.','.','.','.','.','.','.','.','.'],
      ['I','I','I','I','I','.','I','I','I','I'],
      ['I','I','I','I','I','.','I','I','I','I'],
      ['.','.','.','.','.','.','.','.','.','.'],
      ['I','I','I','I','I','.','I','I','I','I'],
    ])

    board.drop(Tetromino.I_SHAPE);
    board.rotateRight();
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       ..........
       ..........
       .....I....`
    )
  });

  test("four rows should clear when filled", () => {
    board = new Board(10, 8, [
      ['.','.','.','.','.','.','.','.','.','.'],
      ['.','.','.','.','.','.','.','.','.','.'],
      ['.','.','.','.','.','.','.','.','.','.'],
      ['.','.','.','.','.','.','.','.','.','.'],
      ['I','I','I','I','I','.','I','I','I','I'],
      ['I','I','I','I','I','.','I','I','I','I'],
      ['I','I','I','I','I','.','I','I','I','I'],
      ['I','I','I','I','I','.','I','I','I','I'],
    ])

    board.drop(Tetromino.I_SHAPE);
    board.rotateRight();
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       ..........
       ..........
       ..........`
    )
  });
});
