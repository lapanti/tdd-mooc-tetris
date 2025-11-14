import { Shape } from "./Shape";

export class ShuffleBag {
    #shapes: Shape[]
    
    constructor(shapes: Shape[]) {
        this.#shapes = shapes    
    }

    next() {
        return this.#shapes[0]
    }
}
