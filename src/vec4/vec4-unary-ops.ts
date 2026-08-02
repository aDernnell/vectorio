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
 * Scales a Vec4 by a scalar value.
 * @param out The vector to store the result in.
 * @param a The vector to scale.
 * @param scalar The scalar value to scale the vector by.
 * @returns The out vector with the result.
 */
export function vec4Scale(out: Vec4, a: Readonly<Vec4>, scalar: number): Vec4 {
    return vec4Set(out, a.x * scalar, a.y * scalar, a.z * scalar, a.w * scalar);
}

/**
 * Negates a Vec4 (multiplies each component by -1).
 * @param out The vector to store the result in.
 * @param a The vector to negate.
 * @returns The out vector with the result.
 */
export function vec4Negate(out: Vec4, a: Readonly<Vec4>): Vec4 {
    return vec4Set(out, -a.x, -a.y, -a.z, -a.w);
}

/**
 * Inverts a Vec4 (takes the inverse of each component).
 * @param out The vector to store the result in.
 * @param a The vector to invert.
 * @returns The out vector with the result.
 */
export function vec4Invert(out: Vec4, a: Readonly<Vec4>): Vec4 {
    return vec4Set(out, 1 / a.x, 1 / a.y, 1 / a.z, 1 / a.w);
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
