import type { Vec4 } from './vec4-core';

/**
 * Calculates the magnitude (length) of a Vec4.
 * @param a The vector to calculate the magnitude for.
 * @returns The magnitude of the vector.
 */
export function vec4Magnitude(a: Readonly<Vec4>): number {
    return Math.hypot(a.x, a.y, a.z, a.w);
}

/**
 * Calculates the squared magnitude (length) of a Vec4.
 * @param a The vector to calculate the squared magnitude for.
 * @returns The squared magnitude of the vector.
 */
export function vec4SquaredMagnitude(a: Readonly<Vec4>): number {
    return a.x * a.x + a.y * a.y + a.z * a.z + a.w * a.w;
}
