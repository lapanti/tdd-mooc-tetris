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

  test('returns score', () => {
    const scores = new ScoringSystem()

    expect(scores.score).to.eq(0)
  })

  describe('scores cleared rows correctly', () => {
    test('gets 40 points from clearing 1 line (level 0)', () => {
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

        board.onClearLine = (linesCleared: number) => {
          scores.linesCleared(linesCleared)
        }

        board.drop(Tetromino.O_SHAPE)

        for (let i = 0; i < 10; i++) {
            board.tick()
        }

        expect(scores.score).to.eq(40)
    })

    test('gets 80 points from clearing 1 line (level 1)', () => {
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

        scores.level = 1

        board.onClearLine = (linesCleared: number) => {
          scores.linesCleared(linesCleared)
        }

        board.drop(Tetromino.O_SHAPE)

        for (let i = 0; i < 10; i++) {
            board.tick()
        }

        expect(scores.score).to.eq(80)
    })

    test('gets 80 points from clearing 2 lines in succession (level 0)', () => {
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

        board.onClearLine = (linesCleared: number) => {
          scores.linesCleared(linesCleared)
        }

        board.drop(Tetromino.O_SHAPE)

        for (let i = 0; i < 10; i++) {
            board.tick()
        }

        board.drop(Tetromino.O_SHAPE)

        for (let i = 0; i < 10; i++) {
            board.tick()
        }

        expect(scores.score).to.eq(80)
    })

    test('gets 240 points from clearing 2 lines in succession (level 2)', () => {
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

        scores.level = 2

        board.onClearLine = (linesCleared: number) => {
          scores.linesCleared(linesCleared)
        }

        board.drop(Tetromino.O_SHAPE)

        for (let i = 0; i < 10; i++) {
            board.tick()
        }

        board.drop(Tetromino.O_SHAPE)

        for (let i = 0; i < 10; i++) {
            board.tick()
        }

        expect(scores.score).to.eq(240)
    })

    test('gets 100 points from clearing 2 lines at the same time (level 0)', () => {
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

        board.onClearLine = (linesCleared: number) => {
          scores.linesCleared(linesCleared)
        }

        board.drop(Tetromino.O_SHAPE)

        for (let i = 0; i < 10; i++) {
            board.tick()
        }

        expect(scores.score).to.eq(100)
    })

    test('gets 400 points from clearing 2 lines at the same time (level 3)', () => {
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

        scores.level = 3

        board.onClearLine = (linesCleared: number) => {
          scores.linesCleared(linesCleared)
        }

        board.drop(Tetromino.O_SHAPE)

        for (let i = 0; i < 10; i++) {
            board.tick()
        }

        expect(scores.score).to.eq(400)
    })

    test('gets 300 points from clearing 3 lines at the same time (level 0)', () => {
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

        board.onClearLine = (linesCleared: number) => {
          scores.linesCleared(linesCleared)
        }

        board.drop(Tetromino.I_SHAPE)
        board.rotateRight()

        for (let i = 0; i < 10; i++) {
            board.tick()
        }

        expect(scores.score).to.eq(300)
    })

    test('gets 1500 points from clearing 3 lines at the same time (level 4)', () => {
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
        
        scores.level = 4

        board.onClearLine = (linesCleared: number) => {
          scores.linesCleared(linesCleared)
        }

        board.drop(Tetromino.I_SHAPE)
        board.rotateRight()

        for (let i = 0; i < 10; i++) {
            board.tick()
        }

        expect(scores.score).to.eq(1500)
    })

    test('gets 1200 points from clearing 4 lines at the same time (level 0)', () => {
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

        board.onClearLine = (linesCleared: number) => {
          scores.linesCleared(linesCleared)
        }

        board.drop(Tetromino.I_SHAPE)
        board.rotateRight()

        for (let i = 0; i < 10; i++) {
            board.tick()
        }

        expect(scores.score).to.eq(1200)
    })

    test('gets 7200 points from clearing 4 lines at the same time (level 5)', () => {
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

        scores.level = 5

        board.onClearLine = (linesCleared: number) => {
          scores.linesCleared(linesCleared)
        }

        board.drop(Tetromino.I_SHAPE)
        board.rotateRight()

        for (let i = 0; i < 10; i++) {
            board.tick()
        }

        expect(scores.score).to.eq(7200)
    })
  })
});
