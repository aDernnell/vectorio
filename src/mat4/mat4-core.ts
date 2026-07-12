import { EPSILON } from '../utils';
import type { Mat3 } from '../mat3';

/**
 * 4x4 Matrix
 * ```
 * | m00 (0)  m01 (4)  m02 (8)   m03 (12) |
 * | m10 (1)  m11 (5)  m12 (9)   m13 (13) |
 * | m20 (2)  m21 (6)  m22 (10)  m23 (14) |
 * | m30 (3)  m31 (7)  m32 (11)  m33 (15) |
 * ```
 */
// prettier-ignore
export type Mat4 = {
    m00: number; m01: number; m02: number; m03: number;
    m10: number; m11: number; m12: number; m13: number;
    m20: number; m21: number; m22: number; m23: number;
    m30: number; m31: number; m32: number; m33: number;
};

// prettier-ignore
export const MAT4_IDENTITY: Readonly<Mat4> = {
    m00: 1, m01: 0, m02: 0, m03: 0,
    m10: 0, m11: 1, m12: 0, m13: 0,
    m20: 0, m21: 0, m22: 1, m23: 0,
    m30: 0, m31: 0, m32: 0, m33: 1,
};

/** 
 * Creates a new 4x4 matrix. 
 * Data is provided in row-major order.
 * If no parameters are provided, the identity matrix is created.
 * ```
 * | m00  m01  m02  m03 |
 * | m10  m11  m12  m13 |
 * | m20  m21  m22  m23 |
 * | m30  m31  m32  m33 |
 * ```
 * @param m00 The value for the first row, first column.
 * @param m01 The value for the first row, second column.
 * @param m02 The value for the first row, third column.
 * @param m03 The value for the first row, fourth column.
 * @param m10 The value for the second row, first column.
 * @param m11 The value for the second row, second column.
 * @param m12 The value for the second row, third column.
 * @param m13 The value for the second row, fourth column.
 * @param m20 The value for the third row, first column.
 * @param m21 The value for the third row, second column.
 * @param m22 The value for the third row, third column.
 * @param m23 The value for the third row, fourth column.
 * @param m30 The value for the fourth row, first column.
 * @param m31 The value for the fourth row, second column.
 * @param m32 The value for the fourth row, third column.
 * @param m33 The value for the fourth row, fourth column.
 */
// prettier-ignore
export function mat4(
    m00: number = 1, m01: number = 0, m02: number = 0, m03: number = 0,
    m10: number = 0, m11: number = 1, m12: number = 0, m13: number = 0,
    m20: number = 0, m21: number = 0, m22: number = 1, m23: number = 0,
    m30: number = 0, m31: number = 0, m32: number = 0, m33: number = 1,
): Mat4 {
    return { m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33 };
}

/** 
 * Resets matrix to identity.
 * @param m The matrix to reset.
 * @returns Matrix m with updated values.
 */
export function mat4Reset(m: Mat4): Mat4 {
    m.m00 = 1;
    m.m01 = 0;
    m.m02 = 0;
    m.m03 = 0;
    m.m10 = 0;
    m.m11 = 1;
    m.m12 = 0;
    m.m13 = 0;
    m.m20 = 0;
    m.m21 = 0;
    m.m22 = 1;
    m.m23 = 0;
    m.m30 = 0;
    m.m31 = 0;
    m.m32 = 0;
    m.m33 = 1;
    return m;
}

/** 
 * Creates a copy of the matrix.
 * @param m The matrix to copy.
 * @returns A new matrix with the same values as m.
 */
export function mat4Clone(m: Readonly<Mat4>): Mat4 {
    return {
        m00: m.m00,
        m01: m.m01,
        m02: m.m02,
        m03: m.m03,
        m10: m.m10,
        m11: m.m11,
        m12: m.m12,
        m13: m.m13,
        m20: m.m20,
        m21: m.m21,
        m22: m.m22,
        m23: m.m23,
        m30: m.m30,
        m31: m.m31,
        m32: m.m32,
        m33: m.m33,
    };
}

/** 
 * Sets matrix values. 
 * Data is provided in row-major order.
 * @param m The matrix to set.
 * @param m00 The value for the first row, first column.
 * @param m01 The value for the first row, second column.
 * @param m02 The value for the first row, third column.
 * @param m03 The value for the first row, fourth column.
 * @param m10 The value for the second row, first column.
 * @param m11 The value for the second row, second column.
 * @param m12 The value for the second row, third column.
 * @param m13 The value for the second row, fourth column.
 * @param m20 The value for the third row, first column.
 * @param m21 The value for the third row, second column.
 * @param m22 The value for the third row, third column.
 * @param m23 The value for the third row, fourth column.
 * @param m30 The value for the fourth row, first column.
 * @param m31 The value for the fourth row, second column.
 * @param m32 The value for the fourth row, third column.
 * @param m33 The value for the fourth row, fourth column.
 * @returns The matrix m with updated values.
 */
// prettier-ignore
export function mat4Set(
    m: Mat4,
    m00: number, m01: number, m02: number, m03: number,
    m10: number, m11: number, m12: number, m13: number,
    m20: number, m21: number, m22: number, m23: number,
    m30: number, m31: number, m32: number, m33: number,
): Mat4 {
    m.m00 = m00; m.m01 = m01; m.m02 = m02; m.m03 = m03;
    m.m10 = m10; m.m11 = m11; m.m12 = m12; m.m13 = m13;
    m.m20 = m20; m.m21 = m21; m.m22 = m22; m.m23 = m23;
    m.m30 = m30; m.m31 = m31; m.m32 = m32; m.m33 = m33;
    return m;
}

/** 
 * Fills the matrix values by padding a 3x3 matrix.
 * Uses identity values for the padding.
 * @param m The matrix to fill.
 * @param mat The 3x3 matrix to pad.
 * @returns The matrix m with updated values.
 */
export function mat4FillPad(m: Mat4, mat: Readonly<Mat3>): Mat4 {
    m.m00 = mat.m00;
    m.m01 = mat.m01;
    m.m02 = mat.m02;
    m.m03 = 0;
    m.m10 = mat.m10;
    m.m11 = mat.m11;
    m.m12 = mat.m12;
    m.m13 = 0;
    m.m20 = mat.m20;
    m.m21 = mat.m21;
    m.m22 = mat.m22;
    m.m23 = 0;
    m.m30 = 0;
    m.m31 = 0;
    m.m32 = 0;
    m.m33 = 1;
    return m;
}

/**
 * Fills the matrix values from a column-major array.
 * @param m The matrix to fill.
 * @param arr The array to copy values from. Must have at least 16 elements.
 * @returns The matrix m with updated values.
 */
export function mat4FillArr(m: Mat4, arr: ArrayLike<number>): Mat4 {
    if (arr.length < 16) {
        throw new Error('Array must have at least 16 elements');
    }

    m.m00 = arr[0];
    m.m01 = arr[4];
    m.m02 = arr[8];
    m.m03 = arr[12];
    m.m10 = arr[1];
    m.m11 = arr[5];
    m.m12 = arr[9];
    m.m13 = arr[13];
    m.m20 = arr[2];
    m.m21 = arr[6];
    m.m22 = arr[10];
    m.m23 = arr[14];
    m.m30 = arr[3];
    m.m31 = arr[7];
    m.m32 = arr[11];
    m.m33 = arr[15];
    return m;
}

/**
 * Checks if two 4x4 matrices are strictly equal
 * by comparing each corresponding element for strict equality (`===` operator).
 * This comparison does not account for floating-point precision errors.
 * @param a The first matrix to compare.
 * @param b The second matrix to compare.
 * @returns True if the matrices are strictly equal, false otherwise.
 */
export function mat4StrictEquals(a: Readonly<Mat4>, b: Readonly<Mat4>): boolean {
    return (
        a.m00 === b.m00 &&
        a.m01 === b.m01 &&
        a.m02 === b.m02 &&
        a.m03 === b.m03 &&
        a.m10 === b.m10 &&
        a.m11 === b.m11 &&
        a.m12 === b.m12 &&
        a.m13 === b.m13 &&
        a.m20 === b.m20 &&
        a.m21 === b.m21 &&
        a.m22 === b.m22 &&
        a.m23 === b.m23 &&
        a.m30 === b.m30 &&
        a.m31 === b.m31 &&
        a.m32 === b.m32 &&
        a.m33 === b.m33
    );
}

/**
 * Checks if two 4x4 matrices are approximately equal
 * by comparing each corresponding element with a specified tolerance (epsilon).
 * This comparison accounts for floating-point precision errors.
 * @param a The first matrix to compare.
 * @param b The second matrix to compare.
 * @param epsilon The tolerance for approximate equality, default is 1e-6.
 * @returns True if the matrices are approximately equal within the specified tolerance, false otherwise.
 */
export function mat4Equals(a: Readonly<Mat4>, b: Readonly<Mat4>, epsilon: number = EPSILON): boolean {
    return (
        Math.abs(a.m00 - b.m00) <= epsilon &&
        Math.abs(a.m01 - b.m01) <= epsilon &&
        Math.abs(a.m02 - b.m02) <= epsilon &&
        Math.abs(a.m03 - b.m03) <= epsilon &&
        Math.abs(a.m10 - b.m10) <= epsilon &&
        Math.abs(a.m11 - b.m11) <= epsilon &&
        Math.abs(a.m12 - b.m12) <= epsilon &&
        Math.abs(a.m13 - b.m13) <= epsilon &&
        Math.abs(a.m20 - b.m20) <= epsilon &&
        Math.abs(a.m21 - b.m21) <= epsilon &&
        Math.abs(a.m22 - b.m22) <= epsilon &&
        Math.abs(a.m23 - b.m23) <= epsilon &&
        Math.abs(a.m30 - b.m30) <= epsilon &&
        Math.abs(a.m31 - b.m31) <= epsilon &&
        Math.abs(a.m32 - b.m32) <= epsilon &&
        Math.abs(a.m33 - b.m33) <= epsilon
    );
}

/** 
 * Returns a row-major order string representation of the matrix. 
 */
export function mat4Stringify(a: Readonly<Mat4>): string {
    return `mat4x4(${a.m00}, ${a.m01}, ${a.m02}, ${a.m03}, ${a.m10}, ${a.m11}, ${a.m12}, ${a.m13}, ${a.m20}, ${a.m21}, ${a.m22}, ${a.m23}, ${a.m30}, ${a.m31}, ${a.m32}, ${a.m33})`;
}
