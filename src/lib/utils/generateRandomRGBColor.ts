function randomColorValue(): number {
    return Math.floor(Math.random() * 255);
}

/**
 * Generates a random RGB color.
 *
 * @returns The generated color in `rgb(r,g,b)` format as a string.
 */
export default function generateRandomRGBColor(): string {
    return `rgb(${randomColorValue()},${randomColorValue()},${randomColorValue()})`;
}
