import { Subscriber } from "./Subscriber";

export class Scores implements Subscriber {
    #score: number

    constructor() {
        this.#score = 0
    }

    notifyDeletedLines(lines: number): undefined {
        this.#score += lines
    }
}
