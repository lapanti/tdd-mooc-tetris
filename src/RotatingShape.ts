import { Shape, shapeToString } from "./Shape";

const createNewArrayArray = (size: number): string[][] => {
    const array = new Array(size);
    for (let row = 0; row < size; row++) {
      array[row] = new Array(size);
    }
    return array;
  }

export class RotatingShape implements Shape {
    #shape: string[][];

    static fromString(shape: string) {
        return new RotatingShape(shape)
    }

    constructor(shape: string | string[][]) {
        if (typeof shape === 'string') {
        this.#shape = shape
            .replaceAll(' ', '')
            .trim()
            .split('\n')
            .map((row) => row.split(''))
        } else {
            this.#shape = shape
        }
    }

    width() {
        return this.#shape[0].length
    }

    height() {
        return this.#shape.length
    }
    

    blockAt(row: number, col: number) {
        return this.#shape[row][col];
    }

    toString() {
        return shapeToString(this)
    }

    rotateRight() {
        const size = this.#shape.length;
        const rotated = createNewArrayArray(size);
        for (let row = 0; row < size; row++) {
          for (let column = 0; column < size; column++) {
            rotated[row][column] = this.#shape[size - 1 - column][row];
          }
        }

        return new RotatingShape(rotated);
      }
}
