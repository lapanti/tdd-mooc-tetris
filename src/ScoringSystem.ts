export class ScoringSystem {
    #score: number

    constructor() {
        this.#score = 0
    }

    notifyAboutClearance(lines: number): undefined {
        if (lines === 1) {
            this.#score += 40
        } else if (lines === 2) {
            this.#score += 100
        } else if (lines === 3) {
            this.#score += 300
        } else {
            this.#score += 1200
        }
    }

    getScore(): number {
        return this.#score
    }
}
