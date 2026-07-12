import { Mat3 } from './mat3-core';

/**
 * Calculates the determinant of a 3x3 matrix.
 * @param a The matrix to calculate the determinant for.
 * @returns The determinant of the matrix.
 */
export function mat3Det(a: Readonly<Mat3>): number {
    return (
        a.m00 * (a.m11 * a.m22 - a.m12 * a.m21) -
        a.m01 * (a.m10 * a.m22 - a.m12 * a.m20) +
        a.m02 * (a.m10 * a.m21 - a.m11 * a.m20)
    );
}

/**
 * Calculates the Frobenius norm of a 3x3 matrix.
 * @param a The matrix to calculate the Frobenius norm for.
 * @returns The Frobenius norm of the matrix.
 */
export function mat3Frob(a: Readonly<Mat3>): number {
    return Math.sqrt(
        a.m00 * a.m00 +
            a.m01 * a.m01 +
            a.m02 * a.m02 +
            a.m10 * a.m10 +
            a.m11 * a.m11 +
            a.m12 * a.m12 +
            a.m20 * a.m20 +
            a.m21 * a.m21 +
            a.m22 * a.m22,
    );
}
