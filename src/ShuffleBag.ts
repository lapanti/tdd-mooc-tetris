import { Shape } from "./Shape";

export class ShuffleBag {
    #currentIndex: number
    #shapes: Shape[]
    
    constructor(shapes: Shape[]) {
        this.#currentIndex = 0
        this.#shapes = shapes    
    }

    next() {
        const next = this.#currentIndex
        this.#currentIndex++
        return this.#shapes[next]
    }
}
