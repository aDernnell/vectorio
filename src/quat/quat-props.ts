import { Quat } from "./quat-core";

/**
 * Calculates the magnitude (length) of a quat.
 * @param a The quaternion to calculate the magnitude of.
 * @returns The magnitude of the quaternion.
 */
export function magnitude(a: Readonly<Quat>): number {
    return Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z + a.w * a.w);
}

/**
 * Calculates the squared magnitude (length) of a quat.
 * @param a The quaternion to calculate the squared magnitude of.
 * @returns The squared magnitude of the quaternion.
 */
export function squaredMagnitude(a: Readonly<Quat>): number {
    return a.x * a.x + a.y * a.y + a.z * a.z + a.w * a.w;
}
