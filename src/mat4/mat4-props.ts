import { Mat4 } from './mat4-core';

/**
 * Calculates the determinant of a 4x4 matrix.
 * @param a The matrix to calculate the determinant for.
 * @returns The determinant of the matrix.
 */
export function mat4Det(a: Readonly<Mat4>): number {
    const a00 = a.m00;
    const a10 = a.m10;
    const a20 = a.m20;
    const a30 = a.m30;
    const a01 = a.m01;
    const a11 = a.m11;
    const a21 = a.m21;
    const a31 = a.m31;
    const a02 = a.m02;
    const a12 = a.m12;
    const a22 = a.m22;
    const a32 = a.m32;
    const a03 = a.m03;
    const a13 = a.m13;
    const a23 = a.m23;
    const a33 = a.m33;

    const b0 = a00 * a11 - a10 * a01;
    const b1 = a00 * a21 - a20 * a01;
    const b2 = a10 * a21 - a20 * a11;
    const b3 = a02 * a13 - a12 * a03;
    const b4 = a02 * a23 - a22 * a03;
    const b5 = a12 * a23 - a22 * a13;

    const c1 = a00 * b5 - a10 * b4 + a20 * b3;
    const c2 = a01 * b5 - a11 * b4 + a21 * b3;
    const c3 = a02 * b2 - a12 * b1 + a22 * b0;
    const c4 = a03 * b2 - a13 * b1 + a23 * b0;

    return a31 * c1 - a30 * c2 + a33 * c3 - a32 * c4;
}

/**
 * Calculates the Frobenius norm of a 4x4 matrix.
 * @param a The matrix to calculate the Frobenius norm for.
 * @returns The Frobenius norm of the matrix.
 */
export function mat4Frob(a: Readonly<Mat4>): number {
    return Math.sqrt(
        a.m00 * a.m00 + a.m01 * a.m01 + a.m02 * a.m02 + a.m03 * a.m03 +
            a.m10 * a.m10 + a.m11 * a.m11 + a.m12 * a.m12 + a.m13 * a.m13 +
            a.m20 * a.m20 + a.m21 * a.m21 + a.m22 * a.m22 + a.m23 * a.m23 +
            a.m30 * a.m30 + a.m31 * a.m31 + a.m32 * a.m32 + a.m33 * a.m33,
    );
}
