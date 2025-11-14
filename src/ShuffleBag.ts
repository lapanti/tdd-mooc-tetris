import { Shape } from "./Shape";

export class ShuffleBag {
    #currentIndex: number
    #shapes: Shape[]
    
    constructor(shapes: Shape[]) {
        this.#currentIndex = shapes.length - 1
        this.#shapes = shapes    
    }

    next() {
        if (this.#currentIndex < 1) {
            this.#currentIndex = this.#shapes.length - 1
            return this.#shapes[0]
        }

        const next = this.#currentIndex
        this.#currentIndex--
        return this.#shapes[next]
    }
}
