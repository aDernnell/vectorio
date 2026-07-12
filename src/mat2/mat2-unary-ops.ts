import { Mat2, mat2Set } from './mat2-core';

/**
 * Transposes a 2x2 matrix.
 * @param out The matrix to store the result in.
 * @param a The matrix to transpose.
 * @returns The out matrix with the result of the transposition.
 */
export function mat2Transpose(out: Mat2, a: Readonly<Mat2>): Mat2 {
    // prettier-ignore
    return mat2Set(
        out,
        a.m00, a.m10,
        a.m01, a.m11
    );
}

/**
 * Inverts a 2x2 matrix.
 * @param out The matrix to store the result in.
 * @param a The matrix to invert.
 * @returns The out matrix with the result of the inversion, or null if the matrix is not invertible.
 */
export function mat2Invert(out: Mat2, a: Readonly<Mat2>): Mat2 | null {
    let det = a.m00 * a.m11 - a.m10 * a.m01;
    if (det == 0) {
        return null;
    }

    det = 1.0 / det;

    // prettier-ignore
    return mat2Set(
        out,
        a.m11 * det, -a.m01 * det,
        -a.m10 * det,  a.m00 * det
    );
}

/**
 * Computes the adjugate of a 2x2 matrix.
 * @param out The matrix to store the result in.
 * @param a The matrix to compute the adjugate of.
 * @returns The out matrix with the result of the adjugate computation.
 */
export function mat2Adjugate(out: Mat2, a: Readonly<Mat2>): Mat2 {
    // prettier-ignore
    return mat2Set(
        out,
        a.m11, -a.m01,
        -a.m10,  a.m00
    );
}
