import { describe, test } from "vitest";
import { expect } from "chai";
import { ShuffleBag } from "../src/ShuffleBag";

describe("ShuffleBag", () => {
  test('can be initialized', () => {
    const bag = new ShuffleBag()

    expect(bag).to.not.eq(undefined)
  })
});
