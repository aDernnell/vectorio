import { EPSILON } from '../utils';
import type { Mat3 } from '../mat3';

/**
 * 2x2 Matrix
 * ```
 * | m00 (0)  m01 (2) |
 * | m10 (1)  m11 (3) |
 * ```
 */
// prettier-ignore
export type Mat2 = {
    /** 0 */
    m00: number; 
    /** 2 */
    m01: number;
    /** 1 */
    m10: number;
    /** 3 */
    m11: number;
}

// prettier-ignore
export const MAT2_IDENTITY: Readonly<Mat2> = {
    m00: 1, m01: 0,
    m10: 0, m11: 1
};

/**
 * Creates a new 2x2 matrix.
 * 
 * Data is provided in row-major order.
 * 
 * If no parameters are provided, the identity matrix is created.
 * ```
 * | m00  m01 |
 * | m10  m11 |
 * ```
 * @param m00 The value for the first row, first column.
 * @param m01 The value for the first row, second column.
 * @param m10 The value for the second row, first column.
 * @param m11 The value for the second row, second column.
 */
// prettier-ignore
export function mat2(
    m00: number = 1, m01: number = 0, // first row
    m10: number = 0, m11: number = 1 // second row
): Mat2 {
    return {
        m00, m01,
        m10, m11
    };
}

/**
 * Reset matrix to identity.
 * @param m The matrix to reset.
 * @returns The m matrix with updated values.
 */
export function mat2Reset(m: Mat2): Mat2 {
    m.m00 = 1;
    m.m01 = 0;
    m.m10 = 0;
    m.m11 = 1;
    return m;
}

/**
 * Creates a copy of the matrix.
 * @param m The matrix to clone.
 * @returns A new matrix with the same components as m.
 */
export function mat2Clone(m: Mat2): Mat2 {
    return {
        m00: m.m00,
        m01: m.m01,
        m10: m.m10,
        m11: m.m11,
    };
}

/**
 * Sets the values of the matrix.
 * 
 * Data is provided in row-major order.
 * 
 * @param m The matrix to set values for.
 * @param m00 The value for the first row, first column.
 * @param m01 The value for the first row, second column.
 * @param m10 The value for the second row, first column.
 * @param m11 The value for the second row, second column.
 * @returns The m matrix with updated values.
 */
// prettier-ignore
export function mat2Set(
    m: Mat2,
    m00: number, m01: number, // first row
    m10: number, m11: number // second row
): Mat2 {
    m.m00 = m00; 
    m.m01 = m01;
    m.m10 = m10; 
    m.m11 = m11;
    return m;
}

/**
 * Fills the values of the matrix by truncating a 3x3 matrix.
 * @param m The matrix to fill values for.
 * @param mat The 3x3 matrix to copy values from.
 * @returns The m matrix with updated values.
 */
export function mat2FillTrunc(m: Mat2, mat: Mat3): Mat2 {
    m.m00 = mat.m00;
    m.m01 = mat.m01;
    m.m10 = mat.m10;
    m.m11 = mat.m11;
    return m;
}

/**
 * Fills the values of the matrix from a column-major array.
 * @param m The matrix to fill values for.
 * @param arr The array to copy values from. Must have at least 4 elements.
 * @returns The m matrix with updated values.
 */
export function mat2FillArr(m: Mat2, arr: ArrayLike<number>): Mat2 {
    if (arr.length < 4) {
        throw new Error('Array must have at least 4 elements');
    }
    m.m00 = arr[0];
    m.m01 = arr[2];
    m.m10 = arr[1];
    m.m11 = arr[3];
    return m;
}

/**
 * Checks if two 2x2 matrices are strictly equal
 * by comparing each corresponding element for strict equality (`===` operator).
 * 
 * This comparison does not account for floating-point precision errors.
 * @param a The first matrix to compare.
 * @param b The second matrix to compare.
 * @returns True if the matrices are strictly equal, false otherwise.
 */
export function mat2StrictEquals(a: Readonly<Mat2>, b: Readonly<Mat2>): boolean {
    return a.m00 === b.m00 && a.m01 === b.m01 && a.m10 === b.m10 && a.m11 === b.m11;
}

/**
 * Checks if two 2x2 matrices are approximately equal
 * by comparing each corresponding element with a specified tolerance (epsilon).
 * 
 * This comparison accounts for floating-point precision errors.
 * @param a The first matrix to compare.
 * @param b The second matrix to compare.
 * @param epsilon The tolerance for approximate equality, default is 1e-6.
 * @returns True if the matrices are approximately equal within the specified tolerance, false otherwise.
 */
export function mat2Equals(a: Readonly<Mat2>, b: Readonly<Mat2>, epsilon: number = EPSILON): boolean {
    return (
        Math.abs(a.m00 - b.m00) <= epsilon &&
        Math.abs(a.m01 - b.m01) <= epsilon &&
        Math.abs(a.m10 - b.m10) <= epsilon &&
        Math.abs(a.m11 - b.m11) <= epsilon
    );
}

/**
 * Returns a row-major order string representation of the matrix.
 */
export function mat2Stringify(a: Readonly<Mat2>): string {
    // row major representation
    return `mat2x2(${a.m00}, ${a.m01}, ${a.m10}, ${a.m11})`;
}
