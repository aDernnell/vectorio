import { EPSILON } from "../utils";
import { vec4StrictEquals } from "../vec4";
import { quatDot } from "./quat-binary-ops";

export type Quat = { x: number; y: number; z: number; w: number };

export const QUAT_IDENTITY: Readonly<Quat> = { x: 0, y: 0, z: 0, w: 1 };

/**
 * Creates a new quaternion with the given components.
 * If no components are provided, it defaults to the identity quaternion (0, 0, 0, 1).
 * @param x The x component of the quaternion.
 * @param y The y component of the quaternion.
 * @param z The z component of the quaternion.
 * @param w The w component of the quaternion.
 * @returns The newly created quaternion.
 */
export function quat(x: number = 0, y: number = 0, z: number = 0, w: number = 1): Quat {
    return { x, y, z, w };
}

/**
 * Sets the components of a quaternion.
 * @param out The quaternion to set.
 * @param x The x component to set.
 * @param y The y component to set.
 * @param z The z component to set.
 * @param w The w component to set.
 * @returns The updated quaternion.
 */
export function quatSet(out: Quat, x: number, y: number, z: number, w: number): Quat {
    out.x = x;
    out.y = y;
    out.z = z;
    out.w = w;
    return out;
}

/**
 * Resets a quaternion to the identity quaternion (0, 0, 0, 1).
 * @param out The quaternion to reset.
 * @returns The updated quaternion set to the identity.
 */
export function quatReset(out: Quat): Quat {
    return quatSet(out, 0, 0, 0, 1);
}

/**
 * Clones a quaternion.
 * @param a The quaternion to clone.
 * @returns A new quaternion with the same components as the input quaternion.
 */
export function quatClone(a: Readonly<Quat>): Quat {
    return quat(a.x, a.y, a.z, a.w);
}
    
/**
 * Checks if two quaternions are strictly equal
 * by comparing each corresponding component for strict equality (`===` operator).
 * 
 * @remarks
 * Same as vec4StrictEquals(a, b).
 *
 * @param a The first quaternion.
 * @param b The second quaternion.
 * @returns True if the quaternions are equal, false otherwise.
 */
export function quatStrictEquals(a: Readonly<Quat>, b: Readonly<Quat>): boolean {
    return vec4StrictEquals(a, b);
}

/**
 * Checks if two quaternions are approximately equal 
 * by checking if they point to the same direction by a given tolerance (epsilon).
 * Both quaternions are assumed to be unit length.
 *
 * @param a The first quaternion (must be normalized).
 * @param b The second quaternion (must be normalized).
 * @param epsilon The tolerance for equality. Default is 1e-6.
 * @returns True if the quaternions are equal, false otherwise.
 */
export function quatEquals(a: Readonly<Quat>, b: Readonly<Quat>, epsilon: number = EPSILON): boolean {
    return Math.abs(quatDot(a, b)) >= 1 - epsilon;
}

/**
 * Returns a string representation of a quaternion.
 * @param a The quaternion to stringify.
 * @returns A string in the format "quat(x, y, z, w)".
 */
export function quatStringify(a: Readonly<Quat>): string {
    return `quat(${a.x}, ${a.y}, ${a.z}, ${a.w})`;
}

