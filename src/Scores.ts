import { Subscriber } from "./Subscriber";

export class Scores implements Subscriber {
    #score: number

    constructor() {
        this.#score = 0
    }

    notifyAboutClearance(lines: number): undefined {
        if (lines === 1) {
            this.#score += 40
        } else {
            this.#score += 100
        }
    }

    getScore(): number {
        return this.#score
    }
}
