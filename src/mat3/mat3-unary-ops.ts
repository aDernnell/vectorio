import { Mat3, mat3Set } from './mat3-core';

/** Transposes a 3x3 matrix.
 * @param out The matrix to store the result in.
 * @param a The matrix to transpose.
 * @returns The out matrix with the result of the transposition.
 */
export function mat3Transpose(out: Mat3, a: Readonly<Mat3>): Mat3 {
    // prettier-ignore
    return mat3Set(
        out,
        a.m00, a.m10, a.m20,
        a.m01, a.m11, a.m21,
        a.m02, a.m12, a.m22,
    );
}

/** 
 * Inverts a 3x3 matrix. Returns null if matrix is singular.
 * @param out The matrix to store the result in.
 * @param a The matrix to invert.
 * @returns The out matrix with the result of the inversion, or null if the matrix is singular.
 */
export function mat3Invert(out: Mat3, a: Readonly<Mat3>): Mat3 | null {
    const c00 = a.m11 * a.m22 - a.m12 * a.m21;
    const c01 = a.m02 * a.m21 - a.m01 * a.m22;
    const c02 = a.m01 * a.m12 - a.m02 * a.m11;

    const c10 = a.m12 * a.m20 - a.m10 * a.m22;
    const c11 = a.m00 * a.m22 - a.m02 * a.m20;
    const c12 = a.m02 * a.m10 - a.m00 * a.m12;

    const c20 = a.m10 * a.m21 - a.m11 * a.m20;
    const c21 = a.m01 * a.m20 - a.m00 * a.m21;
    const c22 = a.m00 * a.m11 - a.m01 * a.m10;

    let det = a.m00 * c00 + a.m01 * c10 + a.m02 * c20;
    if (det == 0) {
        return null;
    }

    det = 1.0 / det;

    // prettier-ignore
    return mat3Set(
        out,
        c00 * det, c01 * det, c02 * det,
        c10 * det, c11 * det, c12 * det,
        c20 * det, c21 * det, c22 * det,
    );
}

/** 
 * Computes the adjugate of a 3x3 matrix.
 * @param out The matrix to store the result in.
 * @param a The matrix to compute the adjugate of.
 * @returns The out matrix with the adjugate of the input matrix.
 */
export function mat3Adjugate(out: Mat3, a: Readonly<Mat3>): Mat3 {
    // prettier-ignore
    return mat3Set(
        out,
        a.m11 * a.m22 - a.m12 * a.m21,
        a.m02 * a.m21 - a.m01 * a.m22,
        a.m01 * a.m12 - a.m02 * a.m11,

        a.m12 * a.m20 - a.m10 * a.m22,
        a.m00 * a.m22 - a.m02 * a.m20,
        a.m02 * a.m10 - a.m00 * a.m12,

        a.m10 * a.m21 - a.m11 * a.m20,
        a.m01 * a.m20 - a.m00 * a.m21,
        a.m00 * a.m11 - a.m01 * a.m10,
    );
}
