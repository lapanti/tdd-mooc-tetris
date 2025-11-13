export class ScoringSystem {
    level: number
    score: number

    constructor() {
        this.level = 0
        this.score = 0
    }

    linesCleared(lines: number): undefined {
        if (lines === 1) {
            this.score += 40 * (this.level + 1)
        } else if (lines === 2) {
            this.score += 100 * (this.level + 1)
        } else if (lines === 3) {
            this.score += 300 * (this.level + 1)
        } else {
            this.score += 1200 * (this.level + 1)
        }
    }
}
