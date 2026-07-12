import { Vec3, vec3Set } from './vec3-core';

/**
 * Applies a unary function to each component of a Vec3.
 * @param out The vector to store the result in.
 * @param a The vector to apply the function to.
 * @param fn The unary function to apply to each component.
 * @returns The out vector with the result.
 */
export function vec3Apply(out: Vec3, a: Readonly<Vec3>, fn: (value: number) => number): Vec3 {
    return vec3Set(out, fn(a.x), fn(a.y), fn(a.z));
}

/**
 * Normalizes a Vec3 (to have a magnitude of 1).
 * @param out The vector to store the result in.
 * @param a The vector to normalize.
 * @returns The out vector with the result.
 */
export function vec3Normalize(out: Vec3, a: Readonly<Vec3>): Vec3 {
    let len = a.x * a.x + a.y * a.y + a.z * a.z;
    if (len === 0) {
        return vec3Set(out, 0, 0, 0);
    }
    len = 1 / Math.sqrt(len);
    return vec3Set(out, a.x * len, a.y * len, a.z * len);
}
