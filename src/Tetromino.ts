import { RotatingShape } from "./RotatingShape";
import { Shape } from "./Shape";

export class Tetromino implements Shape {
    static T_SHAPE = new Tetromino({
        currentOrientation: 0,
        numberOfOrientations: 4,
        initialShape: `.T.
            TTT
            ...`
    })

    #currentOrientation: number
    #orientations: RotatingShape[]

    constructor({
        currentOrientation,
        numberOfOrientations,
        initialShape,
        orientations,
    }: { currentOrientation: number; numberOfOrientations?: number; initialShape?: string; orientations?: RotatingShape[] }) {
        if (initialShape) {
            this.#currentOrientation = currentOrientation
            const shape = new RotatingShape(initialShape)
            this.#orientations = [
                shape,
                shape.rotateRight(),
                shape.rotateRight().rotateRight(),
                shape.rotateRight().rotateRight().rotateRight()
            ].slice(0, numberOfOrientations)
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
