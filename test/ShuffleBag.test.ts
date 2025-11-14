import { describe, test } from "vitest";
import { expect } from "chai";
import { ShuffleBag } from "../src/ShuffleBag";
import { Tetromino } from "../src/Tetromino";
import { Shape } from "../src/Shape";

describe("ShuffleBag", () => {
  test('has next functionality', () => {
    const bag = new ShuffleBag([Tetromino.O_SHAPE])

    expect(bag.next()).to.eq(Tetromino.O_SHAPE)
  })

  test('can hold more than 1 item', () => {
    const bag = new ShuffleBag([
        Tetromino.O_SHAPE,
        Tetromino.I_SHAPE,
        Tetromino.J_SHAPE,
        Tetromino.L_SHAPE,
        Tetromino.S_SHAPE,
        Tetromino.T_SHAPE,
        Tetromino.Z_SHAPE,
    ])

    let result: Shape[] = []
    for (let i = 0; i < 7; i++) {
        result = result.concat(bag.next())
    }

    expect(result).to.have.members([
        Tetromino.O_SHAPE,
        Tetromino.I_SHAPE,
        Tetromino.J_SHAPE,
        Tetromino.L_SHAPE,
        Tetromino.S_SHAPE,
        Tetromino.T_SHAPE,
        Tetromino.Z_SHAPE,
    ])
  })

  test('starts over when it reaches the end', () => {
    const bag = new ShuffleBag([
        Tetromino.O_SHAPE,
        Tetromino.I_SHAPE,
    ])

    let result: Shape[] = []
    for (let i = 0; i < 4; i++) {
        result = result.concat(bag.next())
    }

    expect(result.length).to.eq(4)
    expect(result).to.have.members([Tetromino.O_SHAPE, Tetromino.O_SHAPE, Tetromino.I_SHAPE, Tetromino.I_SHAPE])
  })
});
