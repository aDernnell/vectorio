import { Mat2 } from './mat2-core';

/**
 * Calculates the determinant of a 2x2 matrix.
 * @param a The matrix to calculate the determinant for.
 * @returns The determinant of the matrix.
 */
export function mat2Det(a: Readonly<Mat2>): number {
    return a.m00 * a.m11 - a.m10 * a.m01;
}

/**
 * Calculates the Frobenius norm of a 2x2 matrix.
 * @param a The matrix to calculate the Frobenius norm for.
 * @returns The Frobenius norm of the matrix.
 */
export function mat2Frob(a: Readonly<Mat2>): number {
    return Math.sqrt(a.m00 * a.m00 + a.m01 * a.m01 + a.m10 * a.m10 + a.m11 * a.m11);
}

/** 
 * Returns a row-major string representation of the matrix.
 */
export function mat2ToString(a: Readonly<Mat2>): string {
    return `mat2x2([${a.m00}, ${a.m01}, ${a.m10}, ${a.m11}])`;
}
