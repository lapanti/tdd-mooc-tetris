import { RotatingShape } from "./RotatingShape";
import { Shape } from "./Shape";

export class Tetromino implements Shape {
    static T_SHAPE = new Tetromino(
        `.T.
         TTT
         ...`
    )

    #shape: RotatingShape

    constructor(initialShape: string) {
        const shape = new RotatingShape(initialShape)
        this.#shape = shape
    }  
    
    width() {
        return this.#shape.width();
    }
    
    height() {
        return this.#shape.height();
    }
    
    blockAt(row: number, col: number) {
        return this.#shape.blockAt(row, col);
    }
    
    toString() {
        return this.#shape.toString();
    }
}
