import { Vec3, vec3Set } from './vec3-core';

/**
 * Adds two Vec3.
 * @param out The vector to store the result in.
 * @param a The first vector to add.
 * @param b The second vector to add.
 * @returns The out vector with the result.
 */
export function vec3Add(out: Vec3, a: Readonly<Vec3>, b: Readonly<Vec3>): Vec3 {
    return vec3Set(out, a.x + b.x, a.y + b.y, a.z + b.z);
}

/**
 * Subtracts one Vec3 from another.
 * @param out The vector to store the result in.
 * @param a The first vector.
 * @param b The second vector to subtract from the first.
 * @returns The out vector with the result.
 */
export function vec3Subtract(out: Vec3, a: Readonly<Vec3>, b: Readonly<Vec3>): Vec3 {
    return vec3Set(out, a.x - b.x, a.y - b.y, a.z - b.z);
}

/**
 * Multiplies two Vec3.
 * @param out The vector to store the result in.
 * @param a The first vector to multiply.
 * @param b The second vector to multiply.
 * @returns The out vector with the result.
 */
export function vec3Multiply(out: Vec3, a: Readonly<Vec3>, b: Readonly<Vec3>): Vec3 {
    return vec3Set(out, a.x * b.x, a.y * b.y, a.z * b.z);
}

/**
 * Divides one Vec3 by another.
 * @param out The vector to store the result in.
 * @param a The first vector.
 * @param b The second vector to divide by.
 * @returns The out vector with the result.
 */
export function vec3Divide(out: Vec3, a: Readonly<Vec3>, b: Readonly<Vec3>): Vec3 {
    return vec3Set(out, a.x / b.x, a.y / b.y, a.z / b.z);
}

/**
 * Calculates the euclidian distance between two Vec3.
 * @param a The first vector.
 * @param b The second vector.
 * @returns The euclidian distance between the two vectors.
 */
export function vec3Distance(a: Readonly<Vec3>, b: Readonly<Vec3>): number {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const dz = b.z - a.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

/**
 * Calculates the squared euclidian distance between two Vec3.
 * @param a The first vector.
 * @param b The second vector.
 * @returns The squared euclidian distance between the two vectors.
 */
export function vec3SquaredDistance(a: Readonly<Vec3>, b: Readonly<Vec3>): number {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const dz = b.z - a.z;
    return dx * dx + dy * dy + dz * dz;
}

/**
 * Calculates the dot product of two Vec3.
 * @param a The first vector.
 * @param b The second vector.
 * @returns The dot product of the two vectors.
 */
export function vec3Dot(a: Readonly<Vec3>, b: Readonly<Vec3>): number {
    return a.x * b.x + a.y * b.y + a.z * b.z;
}

/**
 * Calculates the standard cross product of two Vec3.
 * 
 * Resulting vector orientation is such that x × y = z
 * 
 * @remarks
 * For a left-handed coordinate system:
 * take your left hand, point your forefinger in the direction of the first vector (a),
 * your middle finger in the direction of the second vector (b), 
 * and your thumb will point in the direction of the resulting vector (out).
 * 
 * @param out The vector to store the result in.
 * @param a The first vector.
 * @param b The second vector.
 * @returns The out vector with the result.
 */
export function vec3Cross(out: Vec3, a: Readonly<Vec3>, b: Readonly<Vec3>): Vec3 {
    return vec3Set(out, a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x);
}

/**
 * Linearly interpolates between two Vec3.
 * @param out The vector to store the result in.
 * @param a The starting vector.
 * @param b The ending vector.
 * @param t The interpolation factor (0.0 to 1.0).
 * @returns The out vector with the result.
 */
export function vec3Lerp(out: Vec3, a: Readonly<Vec3>, b: Readonly<Vec3>, t: number): Vec3 {
    return vec3Set(out, a.x + t * (b.x - a.x), a.y + t * (b.y - a.y), a.z + t * (b.z - a.z));
}

/**
 * Calculates the smallest unsigned angle in radians between two Vec3.
 * @param a The first vector.
 * @param b The second vector.
 * @returns The angle in radians between the two vectors.
 */
export function vec3Angle(a: Readonly<Vec3>, b: Readonly<Vec3>): number {
    const mag = Math.hypot(a.x, a.y, a.z) * Math.hypot(b.x, b.y, b.z);
    if (mag === 0) {
        return 0;
    }
    const cosine = Math.min(Math.max(vec3Dot(a, b) / mag, -1), 1);
    return Math.acos(cosine);
}
