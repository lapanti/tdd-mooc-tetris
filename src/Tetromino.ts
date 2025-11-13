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
                ['T','T','T'],
                ['.','T','.'],
                ['.','.','.'],
            ]),
            new SimpleShape([
                ['.','T','.'],
                ['T','T','.'],
                ['.','T','.'],
            ]),
            new SimpleShape([
                ['.','.','.'],
                ['.','T','.'],
                ['T','T','T'],
            ]),
            new SimpleShape([
                ['.','T','.'],
                ['.','T','T'],
                ['.','T','.'],
            ]),
        ]
    })

    static I_SHAPE = new Tetromino({
        currentOrientation: 0,
        numberOfOrientations: 2,
        orientations: [
            new SimpleShape([
                ['.','.','.','.'],
                ['I','I','I','I'],
                ['.','.','.','.'],
                ['.','.','.','.'],
            ]),
            new SimpleShape([
                ['.','.','I','.'],
                ['.','.','I','.'],
                ['.','.','I','.'],
                ['.','.','I','.'],
            ])
        ]
    })

    static O_SHAPE = new Tetromino({
        currentOrientation: 0,
        numberOfOrientations: 1,
        orientations: [
            new SimpleShape([
                ['O','O'],
                ['O','O'],
            ])
        ]
    })

    static L_SHAPE = new Tetromino({
        currentOrientation: 0,
        numberOfOrientations: 4,
        orientations: [
            new SimpleShape([
                ['L','L','L'],
                ['L','.','.'],
                ['.','.','.'],
            ]),
            new SimpleShape([
                ['L','L','.'],
                ['.','L','.'],
                ['.','L','.'],
            ]),
            new SimpleShape([
                ['.','.','L'],
                ['L','L','L'],
                ['.','.','.'],
            ]),
            new SimpleShape([
                ['.','L','.'],
                ['.','L','.'],
                ['.','L','L'],
            ]),
        ]
    })

    static J_SHAPE = new Tetromino({
        currentOrientation: 0,
        numberOfOrientations: 4,
        orientations: [
            new SimpleShape([
                ['J','J','J'],
                ['.','.','J'],
                ['.','.','.'],
            ]),
            new SimpleShape([
                ['.','J','.'],
                ['.','J','.'],
                ['J','J','.'],
            ]),
            new SimpleShape([
                ['J','.','.'],
                ['J','J','J'],
                ['.','.','.'],
            ]),
            new SimpleShape([
                ['.','J','J'],
                ['.','J','.'],
                ['.','J','.'],
            ]),
        ]
    })

    #currentOrientation: number
    #orientations: Shape[]

    constructor({
        currentOrientation,
        numberOfOrientations,
        orientations,
    }: { currentOrientation: number; numberOfOrientations?: number; orientations: Shape[] }) {
        orientations = orientations
        this.#currentOrientation = (currentOrientation + orientations.length) % orientations.length
        this.#orientations = orientations
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
