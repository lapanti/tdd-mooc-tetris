import { Shape } from "./Shape";

export class ShuffleBag {
    random: () => number
    #currentIndex: number
    #shapes: Shape[]
    
    constructor(shapes: Shape[]) {
        this.random = Math.random
        this.#currentIndex = shapes.length - 1
        this.#shapes = shapes    
    }

    next() {
        if (this.#currentIndex < 1) {
            this.#currentIndex = this.#shapes.length - 1
            return this.#shapes[0]
        }

        const randomPosition = Math.floor(this.random() * this.#currentIndex)
        const randomItem = this.#shapes[randomPosition]
        this.#shapes[randomPosition] = this.#shapes[this.#currentIndex]
        this.#shapes[this.#currentIndex] = randomItem
        this.#currentIndex--

        return randomItem
    }
}
