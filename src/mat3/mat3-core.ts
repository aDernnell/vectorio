import { EPSILON } from '../utils';
import type { Mat2 } from '../mat2';
import type { Mat4 } from '../mat4';

/**
 * 3x3 Matrix
 * ```
 * | m00 (0)  m01 (3)  m02 (6) |
 * | m10 (1)  m11 (4)  m12 (7) |
 * | m20 (2)  m21 (5)  m22 (8) |
 * ```
 */
// prettier-ignore
export type Mat3 = {
    /** 0 */
    m00: number;
    /** 3 */
    m01: number;
    /** 6 */
    m02: number;
    /** 1 */
    m10: number;
    /** 4 */
    m11: number;
    /** 7 */
    m12: number;
    /** 2 */
    m20: number;
    /** 5 */
    m21: number;
    /** 8 */
    m22: number;
};

// prettier-ignore
export const MAT3_IDENTITY: Readonly<Mat3> = {
    m00: 1, m01: 0, m02: 0,
    m10: 0, m11: 1, m12: 0,
    m20: 0, m21: 0, m22: 1,
};

/**
 * Creates a new 3x3 matrix.
 * 
 * Data is provided in row-major order.
 * 
 * If no parameters are provided, the identity matrix is created.
 * ```
 * | m00  m01  m02 |
 * | m10  m11  m12 |
 * | m20  m21  m22 |
 * ```
 * @param m00 The value for the first row, first column.
 * @param m01 The value for the first row, second column.
 * @param m02 The value for the first row, third column.
 * @param m10 The value for the second row, first column.
 * @param m11 The value for the second row, second column.
 * @param m12 The value for the second row, third column.
 * @param m20 The value for the third row, first column.
 * @param m21 The value for the third row, second column.
 * @param m22 The value for the third row, third column.
 */
// prettier-ignore
export function mat3(
    m00: number = 1, m01: number = 0, m02: number = 0,
    m10: number = 0, m11: number = 1, m12: number = 0,
    m20: number = 0, m21: number = 0, m22: number = 1,
): Mat3 {
    return { m00, m01, m02, m10, m11, m12, m20, m21, m22 };
}

/** 
 * Resets matrix to identity.
 * @param m The matrix to reset.
 * @returns The m matrix with updated values.
 */
export function mat3Reset(m: Mat3): Mat3 {
    m.m00 = 1;
    m.m01 = 0;
    m.m02 = 0;
    m.m10 = 0;
    m.m11 = 1;
    m.m12 = 0;
    m.m20 = 0;
    m.m21 = 0;
    m.m22 = 1;
    return m;
}

/** 
 * Creates a copy of the matrix.
 * @param m The matrix to clone.
 * @returns A new matrix with the same components as m.
 */
export function mat3Clone(m: Readonly<Mat3>): Mat3 {
    return {
        m00: m.m00,
        m01: m.m01,
        m02: m.m02,
        m10: m.m10,
        m11: m.m11,
        m12: m.m12,
        m20: m.m20,
        m21: m.m21,
        m22: m.m22,
    };
}

/** 
 * Sets matrix values. 
 * 
 * Data is provided in row-major order.
 * 
 * @param m The matrix to set values for.
 * @param m00 The value for the first row, first column.
 * @param m01 The value for the first row, second column.
 * @param m02 The value for the first row, third column.
 * @param m10 The value for the second row, first column.
 * @param m11 The value for the second row, second column.
 * @param m12 The value for the second row, third column.
 * @param m20 The value for the third row, first column.
 * @param m21 The value for the third row, second column.
 * @param m22 The value for the third row, third column.
 * @returns The m matrix with updated values.
 */
// prettier-ignore
export function mat3Set(
    m: Mat3,
    m00: number, m01: number, m02: number, // first row
    m10: number, m11: number, m12: number, // second row
    m20: number, m21: number, m22: number, // third row
): Mat3 {
    m.m00 = m00;
    m.m01 = m01;
    m.m02 = m02;
    m.m10 = m10;
    m.m11 = m11;
    m.m12 = m12;
    m.m20 = m20;
    m.m21 = m21;
    m.m22 = m22;
    return m;
}

/** 
 * Fills the matrix values by truncating a 4x4 matrix.
 * @param m The matrix to fill values for.
 * @param mat The 4x4 matrix to copy values from.
 * @returns The m matrix with updated values.
 */
export function mat3FillTrunc(m: Mat3, mat: Readonly<Mat4>): Mat3 {
    m.m00 = mat.m00;
    m.m01 = mat.m01;
    m.m02 = mat.m02;
    m.m10 = mat.m10;
    m.m11 = mat.m11;
    m.m12 = mat.m12;
    m.m20 = mat.m20;
    m.m21 = mat.m21;
    m.m22 = mat.m22;
    return m;
}

/**
 * Fills the matrix values by padding a 2x2 matrix.
 * 
 * Uses identity values for the padding.
 * 
 * @param m The matrix to fill values for.
 * @param mat The 2x2 matrix to copy values from.
 * @returns The m matrix with updated values.
 */
export function mat3FillPad(m: Mat3, mat: Readonly<Mat2>): Mat3 {
    m.m00 = mat.m00;
    m.m01 = mat.m01;
    m.m02 = 0;
    m.m10 = mat.m10;
    m.m11 = mat.m11;
    m.m12 = 0;
    m.m20 = 0;
    m.m21 = 0;
    m.m22 = 1;
    return m;
}

/**
 * Fills the matrix values from a column-major array.
 * @param m The matrix to fill values for.
 * @param arr The array to copy values from. Must have at least 9 elements.
 * @returns The m matrix with updated values.
 */
export function mat3FillArr(m: Mat3, arr: ArrayLike<number>): Mat3 {
    if (arr.length < 9) {
        throw new Error('Array must have at least 9 elements');
    }
    m.m00 = arr[0];
    m.m01 = arr[3];
    m.m02 = arr[6];
    m.m10 = arr[1];
    m.m11 = arr[4];
    m.m12 = arr[7];
    m.m20 = arr[2];
    m.m21 = arr[5];
    m.m22 = arr[8];
    return m;
}

/**
 * Checks if two 3x3 matrices are strictly equal
 * by comparing each corresponding element for strict equality (`===` operator).
 * 
 * This comparison does not account for floating-point precision errors.
 * @param a The first matrix to compare.
 * @param b The second matrix to compare.
 * @returns True if the matrices are strictly equal, false otherwise.
 */
export function mat3StrictEquals(a: Readonly<Mat3>, b: Readonly<Mat3>): boolean {
    return (
        a.m00 === b.m00 &&
        a.m01 === b.m01 &&
        a.m02 === b.m02 &&
        a.m10 === b.m10 &&
        a.m11 === b.m11 &&
        a.m12 === b.m12 &&
        a.m20 === b.m20 &&
        a.m21 === b.m21 &&
        a.m22 === b.m22
    );
}

/**
 * Checks if two 3x3 matrices are approximately equal
 * by comparing each corresponding element with a specified tolerance (epsilon).
 * 
 * This comparison accounts for floating-point precision errors.
 * @param a The first matrix to compare.
 * @param b The second matrix to compare.
 * @param epsilon The tolerance for approximate equality, default is 1e-6.
 * @returns True if the matrices are approximately equal within the specified tolerance, false otherwise.
 */
export function mat3Equals(a: Readonly<Mat3>, b: Readonly<Mat3>, epsilon: number = EPSILON): boolean {
    return (
        Math.abs(a.m00 - b.m00) <= epsilon &&
        Math.abs(a.m01 - b.m01) <= epsilon &&
        Math.abs(a.m02 - b.m02) <= epsilon &&
        Math.abs(a.m10 - b.m10) <= epsilon &&
        Math.abs(a.m11 - b.m11) <= epsilon &&
        Math.abs(a.m12 - b.m12) <= epsilon &&
        Math.abs(a.m20 - b.m20) <= epsilon &&
        Math.abs(a.m21 - b.m21) <= epsilon &&
        Math.abs(a.m22 - b.m22) <= epsilon
    );
}

/**
 * Returns a row-major order string representation of the matrix.
 */
export function mat3Stringify(a: Readonly<Mat3>): string {
    return `mat3x3(${a.m00}, ${a.m01}, ${a.m02}, ${a.m10}, ${a.m11}, ${a.m12}, ${a.m20}, ${a.m21}, ${a.m22})`;
}
