import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board";
import { Scores } from "../src/Scores";

describe("Scores", () => {
  let board: Board;
  beforeEach(() => {
    board = new Board(10, 10);
  });

  test('Scores can subscribe to Board', () => {
    const scores = new Scores()

    board.subscribe(scores)

    expect(board.getSubscribers()).to.include(scores)
  })
});
