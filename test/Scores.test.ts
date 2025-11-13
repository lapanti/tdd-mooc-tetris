import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board";
import { Scores } from "../src/Scores";
import { Tetromino } from "../src/Tetromino";

describe("Scores", () => {
  let board: Board;
  beforeEach(() => {
    board = new Board(3, 3);
  });

  test('Scores can subscribe to Board', () => {
    const scores = new Scores()

    board.subscribe(scores)

    expect(board.getSubscribers()).to.include(scores)
  })

  test('Scores returns score', () => {
    const scores = new Scores()

    expect(scores.getScore()).to.eq(0)
  })

  describe('scores cleared rows correctly', () => {
    test('gets 40 points from clearing 1 line', () => {
        board = new Board(10, 10, [
            ['.','.','.','.','.','.','.','.','.','.'],
            ['.','.','.','.','.','.','.','.','.','.'],
            ['.','.','.','.','.','.','.','.','.','.'],
            ['.','.','.','.','.','.','.','.','.','.'],
            ['.','.','.','.','.','.','.','.','.','.'],
            ['.','.','.','.','.','.','.','.','.','.'],
            ['.','.','.','.','.','.','.','.','.','.'],
            ['.','.','.','.','.','.','.','.','.','.'],
            ['.','.','.','.','.','.','.','.','.','.'],
            ['X','X','X','X','.','.','X','X','X','X'],
          ])

        const scores = new Scores()

        board.subscribe(scores)

        board.drop(Tetromino.O_SHAPE)

        for (let i = 0; i < 10; i++) {
            board.tick()
        }

        expect(scores.getScore()).to.eq(40)
    })
  })
});
