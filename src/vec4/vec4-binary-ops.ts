import { Vec4, vec4Set } from './vec4-core';

/**
 * Adds two Vec4.
 * @param out The vector to store the result in.
 * @param a The first vector to add.
 * @param b The second vector to add.
 * @returns The out vector with the result.
 */
export function vec4Add(out: Vec4, a: Readonly<Vec4>, b: Readonly<Vec4>): Vec4 {
    return vec4Set(out, a.x + b.x, a.y + b.y, a.z + b.z, a.w + b.w);
}

/**
 * Subtracts one Vec4 from another.
 * @param out The vector to store the result in.
 * @param a The first vector.
 * @param b The second vector to subtract from the first.
 * @returns The out vector with the result.
 */
export function vec4Subtract(out: Vec4, a: Readonly<Vec4>, b: Readonly<Vec4>): Vec4 {
    return vec4Set(out, a.x - b.x, a.y - b.y, a.z - b.z, a.w - b.w);
}

/**
 * Multiplies two Vec4.
 * @param out The vector to store the result in.
 * @param a The first vector to multiply.
 * @param b The second vector to multiply.
 * @returns The out vector with the result.
 */
export function vec4Multiply(out: Vec4, a: Readonly<Vec4>, b: Readonly<Vec4>): Vec4 {
    return vec4Set(out, a.x * b.x, a.y * b.y, a.z * b.z, a.w * b.w);
}

/**
 * Divides one Vec4 by another.
 * @param out The vector to store the result in.
 * @param a The first vector.
 * @param b The second vector to divide by.
 * @returns The out vector with the result.
 */
export function vec4Divide(out: Vec4, a: Readonly<Vec4>, b: Readonly<Vec4>): Vec4 {
    return vec4Set(out, a.x / b.x, a.y / b.y, a.z / b.z, a.w / b.w);
}

/**
 * Calculates the euclidian distance between two Vec4.
 * @param a The first vector.
 * @param b The second vector.
 * @returns The euclidian distance between the two vectors.
 */
export function vec4Distance(a: Readonly<Vec4>, b: Readonly<Vec4>): number {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const dz = b.z - a.z;
    const dw = b.w - a.w;
    return Math.sqrt(dx * dx + dy * dy + dz * dz + dw * dw);
}

/**
 * Calculates the squared euclidian distance between two Vec4.
 * @param a The first vector.
 * @param b The second vector.
 * @returns The squared euclidian distance between the two vectors.
 */
export function vec4SquaredDistance(a: Readonly<Vec4>, b: Readonly<Vec4>): number {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const dz = b.z - a.z;
    const dw = b.w - a.w;
    return dx * dx + dy * dy + dz * dz + dw * dw;
}

/**
 * Calculates the dot product of two Vec4.
 * @param a The first vector.
 * @param b The second vector.
 * @returns The dot product of the two vectors.
 */
export function vec4Dot(a: Readonly<Vec4>, b: Readonly<Vec4>): number {
    return a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w;
}

/**
 * Linearly interpolates between two Vec4.
 * @param out The vector to store the result in.
 * @param a The starting vector.
 * @param b The ending vector.
 * @param t The interpolation factor (0.0 to 1.0).
 * @returns The out vector with the result.
 */
export function vec4Lerp(out: Vec4, a: Readonly<Vec4>, b: Readonly<Vec4>, t: number): Vec4 {
    return vec4Set(out, a.x + t * (b.x - a.x), a.y + t * (b.y - a.y), a.z + t * (b.z - a.z), a.w + t * (b.w - a.w));
}

/**
 * Calculates the smallest unsigned angle in radians between two Vec4.
 * @param a The first vector.
 * @param b The second vector.
 * @returns The angle in radians between the two vectors.
 */
export function vec4Angle(a: Readonly<Vec4>, b: Readonly<Vec4>): number {
    const mag = Math.hypot(a.x, a.y, a.z, a.w) * Math.hypot(b.x, b.y, b.z, b.w);
    if (mag === 0) {
        return 0;
    }
    const cosine = Math.min(Math.max(vec4Dot(a, b) / mag, -1), 1);
    return Math.acos(cosine);
}
