import { EPSILON } from '../utils';
import { Vec2 } from '../vec2';
import { Vec4 } from '../vec4';

/** (0, 0, 0) */
export const VEC3_ZERO: Readonly<Vec3> = { x: 0, y: 0, z: 0 };
/** (1, 1, 1) */
export const VEC3_ONE: Readonly<Vec3> = { x: 1, y: 1, z: 1 };
/** (1, 0, 0) */
export const VEC3_RIGHT: Readonly<Vec3> = { x: 1, y: 0, z: 0 };
/** (0, 1, 0) */
export const VEC3_LEFT: Readonly<Vec3> = { x: -1, y: 0, z: 0 };
/** (0, 0, 1) */
export const VEC3_UP: Readonly<Vec3> = { x: 0, y: 1, z: 0 };
/** (0, -1, 0) */
export const VEC3_DOWN: Readonly<Vec3> = { x: 0, y: -1, z: 0 };
/** (0, 0, 1) */
export const VEC3_FORWARD: Readonly<Vec3> = { x: 0, y: 0, z: 1 };
/** (0, 0, -1) */
export const VEC3_BACK: Readonly<Vec3> = { x: 0, y: 0, z: -1 };

export const VEC3_X: Readonly<Vec3> = VEC3_RIGHT;
export const VEC3_Y: Readonly<Vec3> = VEC3_UP;
export const VEC3_Z: Readonly<Vec3> = VEC3_FORWARD;

export type Vec3 = {
    x: number;
    y: number;
    z: number;
};

/**
 * Creates a new Vec3.
 * @param x The x component of the vector.
 * @param y The y component of the vector.
 * @param z The z component of the vector.
 * @returns A new Vec3 instance with the specified x, y and z components.
 */
export function vec3(x: number = 0, y: number = 0, z: number = 0): Vec3 {
    return { x, y, z };
}

/**
 * Sets the components of a Vec3.
 * @param out The Vec3 to set.
 * @param x The x component of the vector.
 * @param y The y component of the vector.
 * @param z The z component of the vector.
 * @returns The vector out with updated values.
 */
export function vec3Set(out: Vec3, x: number, y: number, z: number): Vec3 {
    out.x = x;
    out.y = y;
    out.z = z;
    return out;
}

/**
 * Copies the components of one Vec3 to another.
 * @param out The Vec3 to copy to.
 * @param a The Vec3 to copy from.
 * @returns The vector out with updated values.
 */
export function vec3Clone(out: Vec3, a: Readonly<Vec3>): Vec3 {
    out.x = a.x;
    out.y = a.y;
    out.z = a.z;
    return out;
}

/**
 * Fills a Vec3 with values from an array.
 * @param out The Vec3 to fill.
 * @param arr An array containing at least three numbers.
 * @returns The vector out with updated values.
 * @throws Throws an error if the array has fewer than three elements.
 */
export function vec3FillWith(out: Vec3, arr: Array<number>): Vec3 {
    if (arr.length < 3) {
        throw new Error('Array must have at least three elements to fill a Vec3.');
    }
    return vec3Set(out, arr[0], arr[1], arr[2]);
}

/**
 * Fills a Vec3 from a Vec2 and a z component.
 * @param out The Vec3 to fill.
 * @param v The Vec2 source.
 * @param z The value for z component, default is 0.
 * @returns The vector out with updated values.
 */
export function vec3FillPad(out: Vec3, v: Readonly<Vec2>, z: number = 0): Vec3 {
    out.x = v.x;
    out.y = v.y;
    out.z = z;
    return out;
}

/**
 * Fills a Vec3 from a Vec4, truncating the w component.
 * @param out The Vec3 to fill.
 * @param v The Vec4 source.
 * @returns The vector out with updated values.
 */
export function vec3FillTrunc(out: Vec3, v: Readonly<Vec4>): Vec3 {
    out.x = v.x;
    out.y = v.y;
    out.z = v.z;
    return out;
}

/**
 * Checks if two Vec3 are strictly equal
 * by comparing each corresponding component for strict equality (`===` operator).
 * 
 * This comparison does not account for floating-point precision errors.
 * 
 * @param a The first Vec3 to compare.
 * @param b The second Vec3 to compare.
 * @returns True if the Vec3 are strictly equal, false otherwise.
 */
export function vec3StrictEquals(a: Readonly<Vec3>, b: Readonly<Vec3>): boolean {
    return a.x === b.x && a.y === b.y && a.z === b.z;
}

/**
 * Checks if two Vec3 are approximately equal
 * by comparing each corresponding component with a specified tolerance (epsilon).
 * 
 * This comparison accounts for floating-point precision errors.
 * 
 * @param a The first Vec3 to compare.
 * @param b The second Vec3 to compare.
 * @param epsilon The tolerance for approximate equality, default is 1e-6.
 * @returns True if the Vec3 are approximately equal within the specified tolerance, false otherwise.
 */
export function vec3Equals(a: Readonly<Vec3>, b: Readonly<Vec3>, epsilon: number = EPSILON): boolean {
    return Math.abs(a.x - b.x) <= epsilon && Math.abs(a.y - b.y) <= epsilon && Math.abs(a.z - b.z) <= epsilon;
}

/**
 * Returns a string representation of the Vec3.
 */
export function vec3Stringify(a: Readonly<Vec3>): string {
    return `vec3([${a.x}, ${a.y}, ${a.z}])`;
}
