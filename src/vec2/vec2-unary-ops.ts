import { Vec2, vec2Set } from "./vec2-core";

/**
 * Applies a unary function to each component of a Vec2.
 * @param out The vector to store the result in.
 * @param a The vector to apply the function to.
 * @param fn The unary function to apply to each component.
 * @returns The out vector with the result.
 */
export function vec2Apply(out: Vec2, a: Readonly<Vec2>, fn: (value: number) => number): Vec2 {
    return vec2Set(out, fn(a.x), fn(a.y));
}

/**
 * Normalizes a Vec2 (to have a magnitude of 1).
 * @param out The vector to store the result in.
 * @param a The vector to normalize.
 * @returns The out vector with the result.
 */
export function vec2Normalize(out: Vec2, a: Readonly<Vec2>): Vec2 {
    let len = a.x * a.x + a.y * a.y;
    if (len === 0) {
        return vec2Set(out, 0, 0);
    }
    len = 1 / Math.sqrt(len);
    return vec2Set(out, a.x * len, a.y * len);
}