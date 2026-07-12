import type { Vec2 } from "./vec2-core";

/**
 * Calculates the magnitude (length) of a Vec2.
 * @param a The vector to calculate the magnitude for.
 * @returns The magnitude of the vector.
 */
export function vec2Magnitude(a: Readonly<Vec2>): number {
    return Math.hypot(a.x, a.y);
}

/**
 * Calculates the squared magnitude (length) of a Vec2.
 * @param a The vector to calculate the squared magnitude for.
 * @returns The squared magnitude of the vector.
 */
export function vec2SquaredMagnitude(a: Readonly<Vec2>): number {
    return a.x * a.x + a.y * a.y;
}