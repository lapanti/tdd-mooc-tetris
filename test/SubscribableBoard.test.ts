import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board";
import { Subscriber } from "../src/Subscriber";
import { Tetromino } from "../src/Tetromino";

class TestSubscriber implements Subscriber {
    #lines: number

    constructor() {
        this.#lines = 0
    }

    notifyAboutClearance(lines: number): undefined {
        this.#lines += lines
    }

    getLines(): number {
        return this.#lines
    }
}

describe("Subscribable Board", () => {
  let board: Board;
  beforeEach(() => {
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
  });

  test('The board can be subscribed to', () => {
    const subscriber = new TestSubscriber()

    board.onClearLine = (lineCount: number) => {
      subscriber.notifyAboutClearance(lineCount)
    }

    board.drop(Tetromino.O_SHAPE)

    for (let i = 0; i < 10; i++) {
      board.tick()
    }

    expect(subscriber.getLines()).to.eq(2)
  })
});
