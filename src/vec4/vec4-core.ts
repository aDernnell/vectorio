import { EPSILON } from '../utils';
import { Vec3 } from '../vec3';

export const VEC4_ZERO: Readonly<Vec4> = { x: 0, y: 0, z: 0, w: 0 };
export const VEC4_ONE: Readonly<Vec4> = { x: 1, y: 1, z: 1, w: 1 };

export type Vec4 = {
    x: number;
    y: number;
    z: number;
    w: number;
};

/**
 * Creates a new Vec4.
 * @param x The x component of the vector.
 * @param y The y component of the vector.
 * @param z The z component of the vector.
 * @param w The w component of the vector.
 * @returns A new Vec4 instance with the specified x, y, z and w components.
 */
export function vec4(x: number = 0, y: number = 0, z: number = 0, w: number = 0): Vec4 {
    return { x, y, z, w };
}

/**
 * Sets the components of a Vec4.
 * @param out The Vec4 to set.
 * @param x The x component of the vector.
 * @param y The y component of the vector.
 * @param z The z component of the vector.
 * @param w The w component of the vector.
 * @returns The vector out with updated values.
 */
export function vec4Set(out: Vec4, x: number, y: number, z: number, w: number): Vec4 {
    out.x = x;
    out.y = y;
    out.z = z;
    out.w = w;
    return out;
}

/**
 * Fills a Vec4 with values from an array.
 * @param out The Vec4 to fill.
 * @param arr An array containing at least four numbers.
 * @returns The vector out with updated values.
 * @throws Throws an error if the array has fewer than four elements.
 */
export function vec4FillWith(out: Vec4, arr: Array<number>): Vec4 {
    if (arr.length < 4) {
        throw new Error('Array must have at least four elements to fill a Vec4.');
    }
    return vec4Set(out, arr[0], arr[1], arr[2], arr[3]);
}

/**
 * Fills a Vec4 from a Vec3 and a w component.
 * @param out The Vec4 to fill.
 * @param v The Vec3 source.
 * @param w The value for w component, default is 1.
 * @returns The vector out with updated values.
 */
export function vec4FillWithVec3(out: Vec4, v: Readonly<Vec3>, w: number = 1): Vec4 {
    return vec4Set(out, v.x, v.y, v.z, w);
}

/**
 * Checks if two Vec4 are strictly equal
 * by comparing each corresponding component for strict equality (`===` operator).
 * This comparison does not account for floating-point precision errors.
 * @param a The first Vec4 to compare.
 * @param b The second Vec4 to compare.
 * @returns True if the Vec4 are strictly equal, false otherwise.
 */
export function vec4StrictEquals(a: Readonly<Vec4>, b: Readonly<Vec4>): boolean {
    return a.x === b.x && a.y === b.y && a.z === b.z && a.w === b.w;
}

/**
 * Checks if two Vec4 are approximately equal
 * by comparing each corresponding component with a specified tolerance (epsilon).
 * This comparison accounts for floating-point precision errors.
 * @param a The first Vec4 to compare.
 * @param b The second Vec4 to compare.
 * @param epsilon The tolerance for approximate equality, default is 1e-6.
 * @returns True if the Vec4 are approximately equal within the specified tolerance, false otherwise.
 */
export function vec4Equals(a: Readonly<Vec4>, b: Readonly<Vec4>, epsilon: number = EPSILON): boolean {
    return (
        Math.abs(a.x - b.x) <= epsilon &&
        Math.abs(a.y - b.y) <= epsilon &&
        Math.abs(a.z - b.z) <= epsilon &&
        Math.abs(a.w - b.w) <= epsilon
    );
}

/**
 * Returns a string representation of the Vec4.
 */
export function vec4Stringify(a: Readonly<Vec4>): string {
    return `vec4([${a.x}, ${a.y}, ${a.z}, ${a.w}])`;
}
