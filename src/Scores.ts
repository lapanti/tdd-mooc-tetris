import { Subscriber } from "./Subscriber";

export class Scores implements Subscriber {
    #score: number

    constructor() {
        this.#score = 0
    }

    notifyAboutClearance(lines: number): undefined {
        this.#score += lines
    }

    getScore(): number {
        return this.#score
    }
}
