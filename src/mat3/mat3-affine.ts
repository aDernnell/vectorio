import { Mat3, mat3Set } from './mat3-core';
import type { Vec2 } from '../vec2';

/** 
 * Applies a 2D translation to a 3x3 affine transformation matrix.
 * 
 * out = a * T, where T is the translation matrix.
 * 
 * @param out The matrix to store the result in.
 * @param a The matrix to translate.
 * @param v The vector to translate by.
 * @returns The out matrix with the result of the translation.
 */
export function mat3Translate(out: Mat3, a: Readonly<Mat3>, v: Readonly<Vec2>): Mat3 {

    /*
     *       | a.m00 a.m01 a.m02 |   | 1 0 v.x |
     * out = | a.m10 a.m11 a.m12 | * | 0 1 v.y |
     *       | a.m20 a.m21 a.m22 |   | 0 0 1   |
     */

    // prettier-ignore
    return mat3Set(
        out,
        a.m00, a.m01, v.x * a.m00 + v.y * a.m01 + a.m02,
        a.m10, a.m11, v.x * a.m10 + v.y * a.m11 + a.m12,
        a.m20, a.m21, v.x * a.m20 + v.y * a.m21 + a.m22,
    );
}

/** 
 * Applies a 2D rotation to a 3x3 affine transformation matrix.
 * 
 * out = a * R, where R is the rotation matrix.
 * 
 * A positive angle rotates counter-clockwise when the origin 
 * is the bottom-left corner of the screen (X right, Y up).
 * This is equivalent to a left-handed rotation around the Z axis in 3D space.
 * 
 * @param out The matrix to store the result in.
 * @param a The matrix to rotate.
 * @param rad The angle in radians to rotate by.
 * @returns The out matrix with the result of the rotation.
 */
export function mat3Rotate(out: Mat3, a: Readonly<Mat3>, rad: number): Mat3 {
    const s = Math.sin(rad);
    const c = Math.cos(rad);

    /*
     *       | a.m00 a.m01 a.m02 |   | cos -sin 0 |
     * out = | a.m10 a.m11 a.m12 | * | sin  cos 0 |
     *       | a.m20 a.m21 a.m22 |   | 0    0   1 |
     */

    // prettier-ignore
    return mat3Set(
        out,
        c * a.m00 + s * a.m01, c * a.m01 - s * a.m00, a.m02,
        c * a.m10 + s * a.m11, c * a.m11 - s * a.m10, a.m12,
        c * a.m20 + s * a.m21, c * a.m21 - s * a.m20, a.m22,
    );
}

/** 
 * Applies a 2D scale to a 3x3 affine transformation matrix.
 * 
 * out = a * S, where S is the scale matrix.
 * 
 * @param out The matrix to store the result in.
 * @param a The matrix to scale.
 * @param v The vector to scale by.
 * @returns The out matrix with the result of the scaling.
 */
export function mat3Scale(out: Mat3, a: Readonly<Mat3>, v: Readonly<Vec2>): Mat3 {

    /*
     *       | a.m00 a.m01 a.m02 |   | v.x 0   0 |
     * out = | a.m10 a.m11 a.m12 | * | 0   v.y 0 |
     *       | a.m20 a.m21 a.m22 |   | 0   0   1 |
     */

    // prettier-ignore
    return mat3Set(
        out,
        v.x * a.m00, v.y * a.m01, a.m02,
        v.x * a.m10, v.y * a.m11, a.m12,
        v.x * a.m20, v.y * a.m21, a.m22,
    );
}

/** 
 * Fills a 3x3 matrix as a 2D translation transformation.
 * 
 * Equivalent to calling mat3Translate on an identity matrix, but faster due to fewer operations.
 * 
 * @param out The matrix to store the result in.
 * @param v The translation vector.
 * @returns The out matrix with the translation applied.
 */
export function mat3FillTranslation(out: Mat3, v: Readonly<Vec2>): Mat3 {
    // prettier-ignore
    return mat3Set(
        out,
        1, 0, v.x,
        0, 1, v.y,
        0, 0, 1,
    );
}

/** 
 * Fills a 3x3 matrix as a 2D rotation transformation.
 * 
 * Equivalent to calling mat3Rotate on an identity matrix, but faster due to fewer operations.
 * 
 * @param out The matrix to store the result in.
 * @param rad The rotation angle in radians.
 * @returns The out matrix with the rotation applied.
 */
export function mat3FillRotation(out: Mat3, rad: number): Mat3 {
    const s = Math.sin(rad);
    const c = Math.cos(rad);

    // prettier-ignore
    return mat3Set(
        out,
        c, -s, 0,
        s, c, 0,
        0, 0, 1,
    );
}

/** 
 * Fills a 3x3 matrix as a 2D scale transformation.
 * 
 * Equivalent to calling mat3Scale on an identity matrix, but faster due to fewer operations.
 * 
 * @param out The matrix to store the result in.
 * @param v The scaling vector.
 * @returns The out matrix with the scaling applied.
 */
export function mat3FillScale(out: Mat3, v: Readonly<Vec2>): Mat3 {
    // prettier-ignore
    return mat3Set(
        out,
        v.x, 0, 0,
        0, v.y, 0,
        0, 0, 1,
    );
}
