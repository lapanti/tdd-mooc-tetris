import { describe, test } from "vitest";
import { expect } from "chai";
import { ShuffleBag } from "../src/ShuffleBag";
import { Tetromino } from "../src/Tetromino";

describe("ShuffleBag", () => {
  test('can be initialized', () => {
    const bag = new ShuffleBag([Tetromino.O_SHAPE])

    expect(bag).to.not.eq(undefined)
  })
});
