import { EPSILON } from '../utils';

export const VEC2_ZERO: Readonly<Vec2> = { x: 0, y: 0 };
export const VEC2_ONE: Readonly<Vec2> = { x: 1, y: 1 };
export const VEC2_RIGHT: Readonly<Vec2> = { x: 1, y: 0 };
export const VEC2_LEFT: Readonly<Vec2> = { x: -1, y: 0 };
export const VEC2_UP: Readonly<Vec2> = { x: 0, y: 1 };
export const VEC2_DOWN: Readonly<Vec2> = { x: 0, y: -1 };

export type Vec2 = {
    x: number;
    y: number;
};

/**
 * Creates a new Vec2.
 * @param x The x component of the vector.
 * @param y The y component of the vector.
 * @returns A new Vec2 instance with the specified x and y components.
 */
export function vec2(x: number = 0, y: number = 0): Vec2 {
    return { x, y };
}

/**
 * Sets the components of a Vec2.
 * @param out The Vec2 to set.
 * @param x The x component of the vector.
 * @param y The y component of the vector.
 * @returns The vector out with updated values.
 */
export function vec2Set(out: Vec2, x: number, y: number): Vec2 {
    out.x = x;
    out.y = y;
    return out;
}

/**
 * Copies the components of one Vec2 to another.
 * @param out The Vec2 to copy to.
 * @param a The Vec2 to copy from.
 * @returns The vector out with updated values.
 */
export function vec2Clone(out: Vec2, a: Readonly<Vec2>): Vec2 {
    out.x = a.x;
    out.y = a.y;
    return out;
}

/**
 * Fills a Vec2 with values from an array.
 * @param out The Vec2 to fill.
 * @param arr An array containing at least two numbers.
 * @returns The vector out with updated values.
 * @throws Throws an error if the array has fewer than two elements.
 */
export function vec2FillWith(out: Vec2, arr: Array<number>): Vec2 {
    if (arr.length < 2) {
        throw new Error('Array must have at least two elements to fill a Vec2.');
    }
    return vec2Set(out, arr[0], arr[1]);
}

/**
 * Checks if two Vec2 are strictly equal
 * by comparing each corresponding component for strict equality (`===` operator).
 * 
 * This comparison does not account for floating-point precision errors.
 * 
 * @param a The first Vec2 to compare.
 * @param b The second Vec2 to compare.
 * @returns True if the Vec2 are strictly equal, false otherwise.
 */
export function vec2StrictEquals(a: Readonly<Vec2>, b: Readonly<Vec2>): boolean {
    return a.x === b.x && a.y === b.y;
}

/**
 * Checks if two Vec2 are approximately equal
 * by comparing each corresponding component with a specified tolerance (epsilon).
 * 
 * This comparison accounts for floating-point precision errors.
 * 
 * @param a The first Vec2 to compare.
 * @param b The second Vec2 to compare.
 * @param epsilon The tolerance for approximate equality, default is 1e-6.
 * @returns True if the Vec2 are approximately equal within the specified tolerance, false otherwise.
 */
export function vec2Equals(a: Readonly<Vec2>, b: Readonly<Vec2>, epsilon: number = EPSILON): boolean {
    return Math.abs(a.x - b.x) <= epsilon && Math.abs(a.y - b.y) <= epsilon;
}

/**
 * Returns a string representation of the Vec2.
 */
export function vec2Stringify(a: Readonly<Vec2>): string {
    return `vec2([${a.x}, ${a.y}])`;
}