import { Mat3, mat3Set } from './mat3-core';

/** Adds two 3x3 matrices.
 * @param out The matrix to store the result in.
 * @param a The first matrix to add.
 * @param b The second matrix to add.
 * @returns The out matrix with the result of the addition.
 */
export function mat3Add(out: Mat3, a: Readonly<Mat3>, b: Readonly<Mat3>): Mat3 {
    // prettier-ignore
    return mat3Set(
        out,
        a.m00 + b.m00, a.m01 + b.m01, a.m02 + b.m02,
        a.m10 + b.m10, a.m11 + b.m11, a.m12 + b.m12,
        a.m20 + b.m20, a.m21 + b.m21, a.m22 + b.m22,
    );
}

/** Subtracts one 3x3 matrix from another.
 * @param out The matrix to store the result in.
 * @param a The matrix to subtract from.
 * @param b The matrix to subtract.
 * @returns The out matrix with the result of the subtraction.
 */
export function mat3Subtract(out: Mat3, a: Readonly<Mat3>, b: Readonly<Mat3>): Mat3 {
    // prettier-ignore
    return mat3Set(
        out,
        a.m00 - b.m00, a.m01 - b.m01, a.m02 - b.m02,
        a.m10 - b.m10, a.m11 - b.m11, a.m12 - b.m12,
        a.m20 - b.m20, a.m21 - b.m21, a.m22 - b.m22,
    );
}

/** 
 * Multiplies two 3x3 matrices.
 * @param out The matrix to store the result in.
 * @param a The first matrix to multiply.
 * @param b The second matrix to multiply.
 * @returns The out matrix with the result of the multiplication.
 */
export function mat3Multiply(out: Mat3, a: Readonly<Mat3>, b: Readonly<Mat3>): Mat3 {
    const m00 = a.m00 * b.m00 + a.m01 * b.m10 + a.m02 * b.m20;
    const m01 = a.m00 * b.m01 + a.m01 * b.m11 + a.m02 * b.m21;
    const m02 = a.m00 * b.m02 + a.m01 * b.m12 + a.m02 * b.m22;

    const m10 = a.m10 * b.m00 + a.m11 * b.m10 + a.m12 * b.m20;
    const m11 = a.m10 * b.m01 + a.m11 * b.m11 + a.m12 * b.m21;
    const m12 = a.m10 * b.m02 + a.m11 * b.m12 + a.m12 * b.m22;

    const m20 = a.m20 * b.m00 + a.m21 * b.m10 + a.m22 * b.m20;
    const m21 = a.m20 * b.m01 + a.m21 * b.m11 + a.m22 * b.m21;
    const m22 = a.m20 * b.m02 + a.m21 * b.m12 + a.m22 * b.m22;

    // prettier-ignore
    return mat3Set(
        out,
        m00, m01, m02,
        m10, m11, m12,
        m20, m21, m22,
    );
}

/** 
 * Multiplies a 3x3 matrix by a scalar.
 * @param out The matrix to store the result in.
 * @param a The matrix to multiply.
 * @param scalar The scalar to multiply by.
 * @returns The out matrix with the result of the multiplication.
 */
export function mat3MultiplyScalar(out: Mat3, a: Readonly<Mat3>, scalar: number): Mat3 {
    // prettier-ignore
    return mat3Set(
        out,
        a.m00 * scalar, a.m01 * scalar, a.m02 * scalar,
        a.m10 * scalar, a.m11 * scalar, a.m12 * scalar,
        a.m20 * scalar, a.m21 * scalar, a.m22 * scalar,
    );
}
