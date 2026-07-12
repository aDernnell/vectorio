import type { Mat3 } from './mat3-core';
import { Vec2, vec2Set } from '../vec2';

/** 
 * Extracts 2D translation from a 3x3 affine transformation matrix.
 * @param out The vector to store the result in.
 * @param a The matrix to extract the translation from.
 * @returns The out vector with the translation values.
 */
export function mat3ExtractTranslation(out: Vec2, a: Readonly<Mat3>): Vec2 {
    return vec2Set(out, a.m02, a.m12);
}

/** 
 * Extracts 2D rotation angle from a 3x3 affine transformation matrix.
 * Assumes 
 * - no skewing
 * - strictly positive scaling factors.
 * - matrix composition order is T * R * S (scale then rotate then translate).
 * @param a The matrix to extract the rotation angle from.
 * @returns The rotation angle in radians.
 */
export function mat3ExtractAngle(a: Readonly<Mat3>): number {
    // Assumes no shear, scale.x > 0 and scale.y > 0
    return Math.atan2(a.m10, a.m00);
}

/** 
 * Extracts 2D scaling from a 3x3 affine transformation matrix.
 * Assumes 
 * - no skewing
 * - strictly positive scaling factors.
 * - matrix composition order is T * R * S (scale then rotate then translate).
 * @param out The vector to store the result in.
 * @param a The matrix to extract the scaling from.
 * @returns The out vector with the scaling values.
 */
export function mat3ExtractScaling(out: Vec2, a: Readonly<Mat3>): Vec2 {
    const scaleX = Math.hypot(a.m00, a.m10);
    const scaleY = Math.hypot(a.m01, a.m11);
    return vec2Set(out, scaleX, scaleY);
}