import { Vec2, vec2Set } from "./vec2-core";
import type { Mat2 } from "../mat2";


/**
 * Transforms a Vec2 by a 2x2 matrix.
 * Uses column vector post-multiplication: v' = M * v
 * @param out The vector to store the result in.
 * @param a The vector to transform.
 * @param m The 2x2 matrix to transform the vector by.
 * @returns The out vector with the result.
 */
export function vec2MatTransform(out: Vec2, a: Readonly<Vec2>, m: Readonly<Mat2>): Vec2 {
    return vec2Set(out, m.m00 * a.x + m.m01 * a.y, m.m10 * a.x + m.m11 * a.y);
}

/**
 * Rotates a Vec2 around a specified origin by a given angle in radians.
 * 
 * TODO rotation direction / coordinate system ?
 * 
 * @param out The vector to store the result in.
 * @param a The vector to rotate.
 * @param origin The point to rotate around.
 * @param angleRad The angle in radians to rotate by.
 * @returns The out vector with the result.
 */
export function vec2Rotate(out: Vec2, a: Readonly<Vec2>, origin: Readonly<Vec2>, angleRad: number): Vec2 {
    const cos = Math.cos(angleRad);
    const sin = Math.sin(angleRad);
    const dx = a.x - origin.x;
    const dy = a.y - origin.y;
    return vec2Set(out, origin.x + dx * cos - dy * sin, origin.y + dx * sin + dy * cos);
}