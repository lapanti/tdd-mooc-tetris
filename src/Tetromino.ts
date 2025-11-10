import { RotatingShape } from "./RotatingShape";
import { Shape, shapeToString } from "./Shape";

class SimpleShape implements Shape {
    #shape: string[][]

    constructor(shape: string[][]) {
        this.#shape = shape
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

    rotateRight(): Shape | null | undefined {
        return undefined
    }

    rotateLeft(): Shape | null | undefined {
        return undefined
    }

    toString() {
        return shapeToString(this)
    }
}

export class Tetromino implements Shape {
    static T_SHAPE = new Tetromino({
        currentOrientation: 0,
        numberOfOrientations: 4,
        orientations: [
            new SimpleShape([
                ['T','T','T','.'],
                ['.','T','.','.'],
                ['.','.','.','.'],
                ['.','.','.','.'],
            ]),
            new SimpleShape([
                ['.','T','.','.'],
                ['T','T','.','.'],
                ['.','T','.','.'],
                ['.','.','.','.'],
            ]),
            new SimpleShape([
                ['.','.','.','.'],
                ['.','T','.','.'],
                ['T','T','T','.'],
                ['.','.','.','.'],
            ]),
            new SimpleShape([
                ['.','T','.','.'],
                ['.','T','T','.'],
                ['.','T','.','.'],
                ['.','.','.','.'],
            ]),
        ]
    })

    static I_SHAPE = new Tetromino({
        currentOrientation: 0,
        numberOfOrientations: 2,
        initialShape: `.....
            .....
            IIII.
            .....
            .....`
    })

    static O_SHAPE = new Tetromino({
        currentOrientation: 0,
        numberOfOrientations: 1,
        initialShape: `.OO
            .OO
            ...`
    })

    #currentOrientation: number
    #orientations: Shape[]

    constructor({
        currentOrientation,
        numberOfOrientations,
        initialShape,
        orientations,
    }: { currentOrientation: number; numberOfOrientations?: number; initialShape?: string; orientations?: Shape[] }) {
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
            orientations = orientations as RotatingShape[]
            this.#currentOrientation = (currentOrientation + orientations.length) % orientations.length
            this.#orientations = orientations
        }
    }

    rotateRight() {
        return new Tetromino({ currentOrientation: this.#currentOrientation + 1, orientations: this.#orientations })
    }

    rotateLeft() {
        return new Tetromino({ currentOrientation: this.#currentOrientation - 1, orientations: this.#orientations })
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
