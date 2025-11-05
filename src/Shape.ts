export interface Shape {
    width(): number
    height(): number

    blockAt(row: number, col: number): string | undefined
}

export const shapeToString = (shape: Shape): string => {
    let stringRepresentation = "";

    for (let row = 0; row < shape.height(); row++) {
        for (let col = 0; col < shape.width(); col++) {
            stringRepresentation += shape.blockAt(row, col);
        }
        stringRepresentation += "\n";
    }

    return stringRepresentation;
}
