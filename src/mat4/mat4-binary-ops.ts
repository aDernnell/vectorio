import { Mat4, mat4Set } from './mat4-core';

/** 
 * Adds two 4x4 matrices.
 * @param out The matrix to store the result in.
 * @param a The first matrix to add.
 * @param b The second matrix to add.
 * @returns The out matrix with the result of the addition.
 */
export function mat4Add(out: Mat4, a: Readonly<Mat4>, b: Readonly<Mat4>): Mat4 {
    // prettier-ignore
    return mat4Set(
        out,
        a.m00 + b.m00, a.m01 + b.m01, a.m02 + b.m02, a.m03 + b.m03,
        a.m10 + b.m10, a.m11 + b.m11, a.m12 + b.m12, a.m13 + b.m13,
        a.m20 + b.m20, a.m21 + b.m21, a.m22 + b.m22, a.m23 + b.m23,
        a.m30 + b.m30, a.m31 + b.m31, a.m32 + b.m32, a.m33 + b.m33,
    );
}

/** 
 * Subtracts one 4x4 matrix from another.
 * @param out The matrix to store the result in.
 * @param a The first matrix.
 * @param b The second matrix to subtract from the first.
 * @returns The out matrix with the result of the subtraction.
 */
export function mat4Subtract(out: Mat4, a: Readonly<Mat4>, b: Readonly<Mat4>): Mat4 {
    // prettier-ignore
    return mat4Set(
        out,
        a.m00 - b.m00, a.m01 - b.m01, a.m02 - b.m02, a.m03 - b.m03,
        a.m10 - b.m10, a.m11 - b.m11, a.m12 - b.m12, a.m13 - b.m13,
        a.m20 - b.m20, a.m21 - b.m21, a.m22 - b.m22, a.m23 - b.m23,
        a.m30 - b.m30, a.m31 - b.m31, a.m32 - b.m32, a.m33 - b.m33,
    );
}

/** 
 * Multiplies two 4x4 matrices.
 * @param out The matrix to store the result in.
 * @param a The first matrix.
 * @param b The second matrix.
 * @returns The out matrix with the result of the multiplication.
 */
export function mat4Multiply(out: Mat4, a: Readonly<Mat4>, b: Readonly<Mat4>): Mat4 {
    const m00 = a.m00 * b.m00 + a.m01 * b.m10 + a.m02 * b.m20 + a.m03 * b.m30;
    const m01 = a.m00 * b.m01 + a.m01 * b.m11 + a.m02 * b.m21 + a.m03 * b.m31;
    const m02 = a.m00 * b.m02 + a.m01 * b.m12 + a.m02 * b.m22 + a.m03 * b.m32;
    const m03 = a.m00 * b.m03 + a.m01 * b.m13 + a.m02 * b.m23 + a.m03 * b.m33;

    const m10 = a.m10 * b.m00 + a.m11 * b.m10 + a.m12 * b.m20 + a.m13 * b.m30;
    const m11 = a.m10 * b.m01 + a.m11 * b.m11 + a.m12 * b.m21 + a.m13 * b.m31;
    const m12 = a.m10 * b.m02 + a.m11 * b.m12 + a.m12 * b.m22 + a.m13 * b.m32;
    const m13 = a.m10 * b.m03 + a.m11 * b.m13 + a.m12 * b.m23 + a.m13 * b.m33;

    const m20 = a.m20 * b.m00 + a.m21 * b.m10 + a.m22 * b.m20 + a.m23 * b.m30;
    const m21 = a.m20 * b.m01 + a.m21 * b.m11 + a.m22 * b.m21 + a.m23 * b.m31;
    const m22 = a.m20 * b.m02 + a.m21 * b.m12 + a.m22 * b.m22 + a.m23 * b.m32;
    const m23 = a.m20 * b.m03 + a.m21 * b.m13 + a.m22 * b.m23 + a.m23 * b.m33;

    const m30 = a.m30 * b.m00 + a.m31 * b.m10 + a.m32 * b.m20 + a.m33 * b.m30;
    const m31 = a.m30 * b.m01 + a.m31 * b.m11 + a.m32 * b.m21 + a.m33 * b.m31;
    const m32 = a.m30 * b.m02 + a.m31 * b.m12 + a.m32 * b.m22 + a.m33 * b.m32;
    const m33 = a.m30 * b.m03 + a.m31 * b.m13 + a.m32 * b.m23 + a.m33 * b.m33;

    // prettier-ignore
    return mat4Set(
        out,
        m00, m01, m02, m03,
        m10, m11, m12, m13,
        m20, m21, m22, m23,
        m30, m31, m32, m33,
    );
}

/** 
 * Multiplies a 4x4 matrix by a scalar.
 * @param out The matrix to store the result in.
 * @param a The matrix to multiply.
 * @param scalar The scalar to multiply by.
 * @returns The out matrix with the result of the multiplication.
 */
export function mat4MultiplyScalar(out: Mat4, a: Readonly<Mat4>, scalar: number): Mat4 {
    // prettier-ignore
    return mat4Set(
        out,
        a.m00 * scalar, a.m01 * scalar, a.m02 * scalar, a.m03 * scalar,
        a.m10 * scalar, a.m11 * scalar, a.m12 * scalar, a.m13 * scalar,
        a.m20 * scalar, a.m21 * scalar, a.m22 * scalar, a.m23 * scalar,
        a.m30 * scalar, a.m31 * scalar, a.m32 * scalar, a.m33 * scalar,
    );
}
