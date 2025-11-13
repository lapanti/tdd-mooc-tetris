import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board";
import { ScoringSystem } from "../src/ScoringSystem";
import { Tetromino } from "../src/Tetromino";

describe("ScoringSystem", () => {
  let board: Board;
  beforeEach(() => {
    board = new Board(3, 3);
  });

  test('can subscribe to Board', () => {
    const scores = new ScoringSystem()

    board.subscribe(scores)

    expect(board.getSubscribers()).to.include(scores)
  })

  test('returns score', () => {
    const scores = new ScoringSystem()

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

        const scores = new ScoringSystem()

        board.subscribe(scores)

        board.drop(Tetromino.O_SHAPE)

        for (let i = 0; i < 10; i++) {
            board.tick()
        }

        expect(scores.getScore()).to.eq(40)
    })

    test('gets 80 points from clearing 2 lines in succession', () => {
        board = new Board(10, 10, [
            ['.','.','.','.','.','.','.','.','.','.'],
            ['.','.','.','.','.','.','.','.','.','.'],
            ['.','.','.','.','.','.','.','.','.','.'],
            ['.','.','.','.','.','.','.','.','.','.'],
            ['.','.','.','.','.','.','.','.','.','.'],
            ['.','.','.','.','.','.','.','.','.','.'],
            ['.','.','.','.','.','.','.','.','.','.'],
            ['X','X','X','X','.','.','X','X','X','X'],
            ['.','.','.','.','.','.','.','.','.','.'],
            ['X','X','X','X','.','.','X','X','X','X'],
          ])

        const scores = new ScoringSystem()

        board.subscribe(scores)

        board.drop(Tetromino.O_SHAPE)

        for (let i = 0; i < 10; i++) {
            board.tick()
        }

        board.drop(Tetromino.O_SHAPE)

        for (let i = 0; i < 10; i++) {
            board.tick()
        }

        expect(scores.getScore()).to.eq(80)
    })

    test('gets 100 points from clearing 2 lines at the same time', () => {
        board = new Board(10, 10, [
            ['.','.','.','.','.','.','.','.','.','.'],
            ['.','.','.','.','.','.','.','.','.','.'],
            ['.','.','.','.','.','.','.','.','.','.'],
            ['.','.','.','.','.','.','.','.','.','.'],
            ['.','.','.','.','.','.','.','.','.','.'],
            ['.','.','.','.','.','.','.','.','.','.'],
            ['.','.','.','.','.','.','.','.','.','.'],
            ['.','.','.','.','.','.','.','.','.','.'],
            ['X','X','X','X','.','.','X','X','X','X'],
            ['X','X','X','X','.','.','X','X','X','X'],
          ])

        const scores = new ScoringSystem()

        board.subscribe(scores)

        board.drop(Tetromino.O_SHAPE)

        for (let i = 0; i < 10; i++) {
            board.tick()
        }

        expect(scores.getScore()).to.eq(100)
    })

    test('gets 300 points from clearing 3 lines at the same time', () => {
        board = new Board(10, 10, [
            ['.','.','.','.','.','.','.','.','.','.'],
            ['.','.','.','.','.','.','.','.','.','.'],
            ['.','.','.','.','.','.','.','.','.','.'],
            ['.','.','.','.','.','.','.','.','.','.'],
            ['.','.','.','.','.','.','.','.','.','.'],
            ['.','.','.','.','.','.','.','.','.','.'],
            ['.','.','.','.','.','.','.','.','.','.'],
            ['X','X','X','X','X','.','X','X','X','X'],
            ['X','X','X','X','X','.','X','X','X','X'],
            ['X','X','X','X','X','.','X','X','X','X'],
          ])

        const scores = new ScoringSystem()

        board.subscribe(scores)

        board.drop(Tetromino.I_SHAPE)
        board.rotateRight()

        for (let i = 0; i < 10; i++) {
            board.tick()
        }

        expect(scores.getScore()).to.eq(300)
    })

    test('gets 1200 points from clearing 4 lines at the same time', () => {
        board = new Board(10, 10, [
            ['.','.','.','.','.','.','.','.','.','.'],
            ['.','.','.','.','.','.','.','.','.','.'],
            ['.','.','.','.','.','.','.','.','.','.'],
            ['.','.','.','.','.','.','.','.','.','.'],
            ['.','.','.','.','.','.','.','.','.','.'],
            ['.','.','.','.','.','.','.','.','.','.'],
            ['X','X','X','X','X','.','X','X','X','X'],
            ['X','X','X','X','X','.','X','X','X','X'],
            ['X','X','X','X','X','.','X','X','X','X'],
            ['X','X','X','X','X','.','X','X','X','X'],
          ])

        const scores = new ScoringSystem()

        board.subscribe(scores)

        board.drop(Tetromino.I_SHAPE)
        board.rotateRight()

        for (let i = 0; i < 10; i++) {
            board.tick()
        }

        expect(scores.getScore()).to.eq(1200)
    })
  })
});
