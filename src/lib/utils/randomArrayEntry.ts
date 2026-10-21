/**
 * Returns a random entry from an array.
 *
 * @param object
 * @returns A random entry from the array or a random character from the string.
 */
export default function randomArrayEntry<T extends string | unknown[]>(
    object: T
): T extends string ? string : T[number] {
    return object[Math.floor(Math.random() * object.length)] as unknown as T extends string ? string : T[number];
}
