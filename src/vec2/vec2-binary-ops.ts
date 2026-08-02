import { Vec2, vec2Set } from "./vec2-core";

/**
 * Adds two Vec2.
 * @param out The vector to store the result in.
 * @param a The first vector to add.
 * @param b The second vector to add.
 * @returns The out vector with the result.
 */
export function vec2Add(out: Vec2, a: Readonly<Vec2>, b: Readonly<Vec2>): Vec2 {
    return vec2Set(out, a.x + b.x, a.y + b.y);
}

/**
 * Subtracts one Vec2 from another.
 * @param out The vector to store the result in.
 * @param a The first vector.
 * @param b The second vector to subtract from the first.
 * @returns The out vector with the result.
 */
export function vec2Subtract(out: Vec2, a: Readonly<Vec2>, b: Readonly<Vec2>): Vec2 {
    return vec2Set(out, a.x - b.x, a.y - b.y);
}

/**
 * Multiplies two Vec2.
 * @param out The vector to store the result in.
 * @param a The first vector to multiply.
 * @param b The second vector to multiply.
 * @returns The out vector with the result.
 */
export function vec2Multiply(out: Vec2, a: Readonly<Vec2>, b: Readonly<Vec2>): Vec2 {
    return vec2Set(out, a.x * b.x, a.y * b.y);
}

/**
 * Divides one Vec2 by another.
 * @param out The vector to store the result in.
 * @param a The first vector.
 * @param b The second vector to divide by.
 * @returns The out vector with the result.
 */
export function vec2Divide(out: Vec2, a: Readonly<Vec2>, b: Readonly<Vec2>): Vec2 {
    return vec2Set(out, a.x / b.x, a.y / b.y);
}

/**
 * Calculates the euclidian distance between two Vec2.
 * @param a The first vector.
 * @param b The second vector.
 * @returns The euclidian distance between the two vectors.
 */
export function vec2Distance(a: Readonly<Vec2>, b: Readonly<Vec2>): number {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Calculates the squared euclidian distance between two Vec2.
 * @param a The first vector.
 * @param b The second vector.
 * @returns The squared euclidian distance between the two vectors.
 */
export function vec2SquaredDistance(a: Readonly<Vec2>, b: Readonly<Vec2>): number {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    return dx * dx + dy * dy;
}

/**
 * Calculates the dot product of two Vec2.
 * 
 * In 2D, the dot product is a scalar value representing the projection of one vector onto another.
 * 
 * @param a The first vector.
 * @param b The second vector.
 * @returns The dot product of the two vectors.
 */
export function vec2Dot(a: Readonly<Vec2>, b: Readonly<Vec2>): number {
    return a.x * b.x + a.y * b.y;
}

/**
 * Calculates the cross product of two Vec2.
 * 
 * In 2D, the cross product is a scalar value representing the magnitude 
 * of the vector perpendicular to the plane defined by the two vectors.
 * 
 * @param a The first vector.
 * @param b The second vector.
 * @returns The scalar value of the cross product.
 */
export function vec2Cross(a: Readonly<Vec2>, b: Readonly<Vec2>): number {
    return a.x * b.y - a.y * b.x;
}

/**
 * Linearly interpolates between two Vec2.
 * @param out The vector to store the result in.
 * @param a The starting vector.
 * @param b The ending vector.
 * @param t The interpolation factor (0.0 to 1.0).
 * @returns The out vector with the result.
 */
export function vec2Lerp(out: Vec2, a: Readonly<Vec2>, b: Readonly<Vec2>, t: number): Vec2 {
    return vec2Set(out, a.x + t * (b.x - a.x), a.y + t * (b.y - a.y));
}

/**
 * Calculates the smallest unsigned angle in radians between two Vec2.
 * @param a The first vector.
 * @param b The second vector.
 * @returns The angle in radians between the two vectors.
 */
export function vec2Angle(a: Readonly<Vec2>, b: Readonly<Vec2>): number {
    return Math.abs(Math.atan2(a.y * b.x - a.x * b.y, a.x * b.x + a.y * b.y));
}

/**
 * Calculates the signed angle in radians between two Vec2.
 * 
 * Angle is in the range [-pi, pi], where a positive value indicates a counter-clockwise rotation.
 * 
 * @param from The starting vector.
 * @param to The ending vector.
 * @returns The signed angle in radians between the two vectors.
 */
export function vec2SignedAngle(from: Readonly<Vec2>, to: Readonly<Vec2>): number {
    return Math.atan2(from.x * to.y - from.y * to.x, from.x * to.x + from.y * to.y);
}