import { describe, test } from "vitest";
import { expect } from "chai";
import { ShuffleBag } from "../src/ShuffleBag";
import { Tetromino } from "../src/Tetromino";

describe("ShuffleBag", () => {
  test('has next functionality', () => {
    const bag = new ShuffleBag([Tetromino.O_SHAPE])

    expect(bag.next()).to.eq(Tetromino.O_SHAPE)
  })
});
