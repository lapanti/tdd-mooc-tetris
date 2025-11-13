import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board";
import { Subscriber } from "../src/Subscriber";

class TestSubscriber implements Subscriber {
    #lines: number

    constructor() {
        this.#lines = 0
    }

    notifyDeletedLines(lines: number): undefined {
        this.#lines += lines
    }

    getLines(): number {
        return this.#lines
    }
}

describe("Subscribable Board", () => {
  let board: Board;
  beforeEach(() => {
    board = new Board(3, 3);
  });

  test('The board can be subscribed to', () => {
    const subscriber = new TestSubscriber()

    board.subscribe(subscriber)

    expect(board.getSubscribers()).to.include(subscriber)
  })
});
