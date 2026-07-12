import type { Mat4 } from './mat4-core';
import type { Vec3 } from '../vec3';
import { EPSILON, HALF_PI } from '../utils';

/**
 * Extracts translation from a 4x4 affine transformation matrix.
 * @param out The vector to store the translation in.
 * @param a The matrix to extract translation from.
 * @returns The out vector with the extracted translation.
 */
export function mat4ExtractTranslation(out: Vec3, a: Readonly<Mat4>): Vec3 {
    out.x = a.m03;
    out.y = a.m13;
    out.z = a.m23;
    return out;
}

/**
 * Extracts ZYX Euler angles from a 4x4 affine transformation matrix.
 * Angles are returned in radians.
 * Assumes
 * - no skewing
 * - strictly positive scaling factors.
 * - rotation composition order is R = Rz * Ry * Rx (rotate around X first, then Y, then Z).
 * - transformation composition order is T * R * S (scale then rotate then translate).
 * @param out The vector to store the Euler angles in.
 * @param a The matrix to extract Euler angles from.
 * @returns The out vector with the extracted Euler angles.
 */
export function mat4ExtractEulerAngles(out: Vec3, a: Readonly<Mat4>): Vec3 {
    const scaleX = Math.hypot(a.m00, a.m10, a.m20);
    const scaleY = Math.hypot(a.m01, a.m11, a.m21);
    const scaleZ = Math.hypot(a.m02, a.m12, a.m22);

    if (scaleX < EPSILON || scaleY < EPSILON || scaleZ < EPSILON) {
        throw new Error('Cannot extract Euler angles from matrix with zero scale axis');
    }

    // Normalize basis columns first so Euler extraction is not polluted by non-uniform scaling.
    const m00 = a.m00 / scaleX;
    const m10 = a.m10 / scaleX;
    const m20 = a.m20 / scaleX;
    const m11 = a.m11 / scaleY;
    const m21 = a.m21 / scaleY;
    const m12 = a.m12 / scaleZ;
    const m22 = a.m22 / scaleZ;

    if (m20 > -1) {
        if (m20 < 1) {
            out.y = Math.asin(-m20);
            out.x = Math.atan2(m21, m22);
            out.z = Math.atan2(m10, m00);
        } else {
            out.y = -HALF_PI;
            out.x = Math.atan2(-m12, m11);
            out.z = 0;
        }
    } else {
        out.y = HALF_PI;
        out.x = Math.atan2(-m12, m11);
        out.z = 0;
    }
    return out;
}

/**
 * Extracts scaling from a 4x4 affine transformation matrix.
 * Assumes
 * - no skewing
 * - strictly positive scaling factors.
 * - transformation composition order is T * R * S (scale then rotate then translate).
 * @param out The vector to store the scaling factors in.
 * @param a The matrix to extract scaling from.
 * @returns The out vector with the extracted scaling factors.
 */
export function mat4ExtractScaling(out: Vec3, a: Readonly<Mat4>): Vec3 {
    out.x = Math.hypot(a.m00, a.m10, a.m20);
    out.y = Math.hypot(a.m01, a.m11, a.m21);
    out.z = Math.hypot(a.m02, a.m12, a.m22);
    return out;
}