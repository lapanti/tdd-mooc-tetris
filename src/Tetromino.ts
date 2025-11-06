import { RotatingShape } from "./RotatingShape";
import { Shape } from "./Shape";

export class Tetromino implements Shape {
    static T_SHAPE = new Tetromino(
        0,
        4,
        `.T.
         TTT
         ...`
    )

    #currentOrientation: number
    #orientations: RotatingShape[]

    constructor(
        currentOrientation: number,
        orientations: number,
        initialShape?: string,
    ) {
        if (typeof initialShape === 'string') {
            this.#currentOrientation = currentOrientation
            const shape = new RotatingShape(initialShape)
            this.#orientations = [
                shape,
                shape.rotateRight(),
                shape.rotateRight().rotateRight(),
                shape.rotateRight().rotateRight().rotateRight()
            ].slice(0, orientations)
        } else {
            this.#currentOrientation = currentOrientation
            this.#orientations = []
        }
    }

    #shape() {
        return this.#orientations[this.#currentOrientation]
    }
    
    width() {
        return this.#shape().width();
    }
    
    height() {
        return this.#shape().height();
    }
    
    blockAt(row: number, col: number) {
        return this.#shape().blockAt(row, col);
    }
    
    toString() {
        return this.#shape().toString();
    }
}
