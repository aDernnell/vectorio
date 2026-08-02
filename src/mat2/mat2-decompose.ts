import type { Mat2 } from './mat2-core';
import { Vec2, vec2Set } from '../vec2';

/**
 * Extracts the rotation angle from a 2x2 affine transformation matrix.
 * 
 * Assumes
 * - no skewing
 * - strictly positive scaling factors.
 * - matrix composition order is R * S (scale then rotate).
 * 
 * @param a The matrix to extract the angle from.
 * @returns The rotation angle in radians.
 */
export function mat2ExtractAngle(a: Readonly<Mat2>): number {
    // Assumes no shear, scale.x > 0 and scale.y > 0
    return Math.atan2(a.m10, a.m00);
}

/**
 * Extracts the scaling factors from a 2x2 affine transformation matrix.
 * 
 * Assumes
 * - no skewing
 * - strictly positive scaling factors.
 * - matrix composition order is R * S (scale then rotate).
 * 
 * @param out The vector to store the result in.
 * @param a The matrix to extract the scaling factors from.
 * @returns The out vector with the scaling factors.
 */
export function mat2ExtractScaling(out: Vec2, a: Readonly<Mat2>): Vec2 {
    const scaleX = Math.hypot(a.m00, a.m10);
    const scaleY = Math.hypot(a.m01, a.m11);
    return vec2Set(out, scaleX, scaleY);
}
