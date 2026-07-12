import type { Vec3 } from './vec3-core';

/**
 * Calculates the magnitude (length) of a Vec3.
 * @param a The vector to calculate the magnitude for.
 * @returns The magnitude of the vector.
 */
export function vec3Magnitude(a: Readonly<Vec3>): number {
    return Math.hypot(a.x, a.y, a.z);
}

/**
 * Calculates the squared magnitude (length) of a Vec3.
 * @param a The vector to calculate the squared magnitude for.
 * @returns The squared magnitude of the vector.
 */
export function vec3SquaredMagnitude(a: Readonly<Vec3>): number {
    return a.x * a.x + a.y * a.y + a.z * a.z;
}
