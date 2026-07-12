import { Vec4, vec4Set } from './vec4-core';

/**
 * Applies a unary function to each component of a Vec4.
 * @param out The vector to store the result in.
 * @param a The vector to apply the function to.
 * @param fn The unary function to apply to each component.
 * @returns The out vector with the result.
 */
export function vec4Apply(out: Vec4, a: Readonly<Vec4>, fn: (value: number) => number): Vec4 {
    return vec4Set(out, fn(a.x), fn(a.y), fn(a.z), fn(a.w));
}

/**
 * Normalizes a Vec4 (to have a magnitude of 1).
 * @param out The vector to store the result in.
 * @param a The vector to normalize.
 * @returns The out vector with the result.
 */
export function vec4Normalize(out: Vec4, a: Readonly<Vec4>): Vec4 {
    let len = a.x * a.x + a.y * a.y + a.z * a.z + a.w * a.w;
    if (len === 0) {
        return vec4Set(out, 0, 0, 0, 0);
    }
    len = 1 / Math.sqrt(len);
    return vec4Set(out, a.x * len, a.y * len, a.z * len, a.w * len);
}
