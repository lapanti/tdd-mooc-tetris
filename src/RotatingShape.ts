import { Shape, shapeToString } from "./Shape";

export class RotatingShape implements Shape {
    #shape: string[][];

    static fromString(shape: string) {
        return new RotatingShape(shape)
    }

    constructor(shape: string) {
        this.#shape = shape
            .replaceAll(' ', '')
            .trim()
            .split('\n')
            .map((row) => row.split(''))
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
}
