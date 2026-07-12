import { Mat4, mat4Set } from './mat4-core';

/** 
 * Transposes a 4x4 matrix.
 * @param out The matrix to store the result in.
 * @param a The matrix to transpose.
 * @returns The out matrix with the result of the transposition.
 */
export function mat4Transpose(out: Mat4, a: Readonly<Mat4>): Mat4 {
    // prettier-ignore
    return mat4Set(
        out,
        a.m00, a.m10, a.m20, a.m30,
        a.m01, a.m11, a.m21, a.m31,
        a.m02, a.m12, a.m22, a.m32,
        a.m03, a.m13, a.m23, a.m33,
    );
}

/** 
 * Inverts a 4x4 matrix. Returns null if matrix is singular.
 * @param out The matrix to store the result in.
 * @param a The matrix to invert.
 * @returns The out matrix with the result of the inversion, or null if the matrix is singular.
 */
export function mat4Invert(out: Mat4, a: Readonly<Mat4>): Mat4 | null {
    const i0 = a.m00;
    const i1 = a.m10;
    const i2 = a.m20;
    const i3 = a.m30;
    const i4 = a.m01;
    const i5 = a.m11;
    const i6 = a.m21;
    const i7 = a.m31;
    const i8 = a.m02;
    const i9 = a.m12;
    const i10 = a.m22;
    const i11 = a.m32;
    const i12 = a.m03;
    const i13 = a.m13;
    const i14 = a.m23;
    const i15 = a.m33;

    const b00 = i0 * i5 - i1 * i4;
    const b01 = i0 * i6 - i2 * i4;
    const b02 = i0 * i7 - i3 * i4;
    const b03 = i1 * i6 - i2 * i5;
    const b04 = i1 * i7 - i3 * i5;
    const b05 = i2 * i7 - i3 * i6;
    const b06 = i8 * i13 - i9 * i12;
    const b07 = i8 * i14 - i10 * i12;
    const b08 = i8 * i15 - i11 * i12;
    const b09 = i9 * i14 - i10 * i13;
    const b10 = i9 * i15 - i11 * i13;
    const b11 = i10 * i15 - i11 * i14;

    let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
    if (det == 0) {
        return null;
    }

    det = 1.0 / det;

    out.m00 = (i5 * b11 - i6 * b10 + i7 * b09) * det;
    out.m10 = (i2 * b10 - i1 * b11 - i3 * b09) * det;
    out.m20 = (i13 * b05 - i14 * b04 + i15 * b03) * det;
    out.m30 = (i10 * b04 - i9 * b05 - i11 * b03) * det;

    out.m01 = (i6 * b08 - i4 * b11 - i7 * b07) * det;
    out.m11 = (i0 * b11 - i2 * b08 + i3 * b07) * det;
    out.m21 = (i14 * b02 - i12 * b05 - i15 * b01) * det;
    out.m31 = (i8 * b05 - i10 * b02 + i11 * b01) * det;

    out.m02 = (i4 * b10 - i5 * b08 + i7 * b06) * det;
    out.m12 = (i1 * b08 - i0 * b10 - i3 * b06) * det;
    out.m22 = (i12 * b04 - i13 * b02 + i15 * b00) * det;
    out.m32 = (i9 * b02 - i8 * b04 - i11 * b00) * det;

    out.m03 = (i5 * b07 - i4 * b09 - i6 * b06) * det;
    out.m13 = (i0 * b09 - i1 * b07 + i2 * b06) * det;
    out.m23 = (i13 * b01 - i12 * b03 - i14 * b00) * det;
    out.m33 = (i8 * b03 - i9 * b01 + i10 * b00) * det;
    return out;
}

/** 
 * Computes the adjugate of a 4x4 matrix.
 * @param out The matrix to store the result in.
 * @param a The matrix to compute the adjugate of.
 * @returns The out matrix with the result of the adjugate computation.
 */
export function mat4Adjugate(out: Mat4, a: Readonly<Mat4>): Mat4 {
    const i0 = a.m00;
    const i1 = a.m10;
    const i2 = a.m20;
    const i3 = a.m30;
    const i4 = a.m01;
    const i5 = a.m11;
    const i6 = a.m21;
    const i7 = a.m31;
    const i8 = a.m02;
    const i9 = a.m12;
    const i10 = a.m22;
    const i11 = a.m32;
    const i12 = a.m03;
    const i13 = a.m13;
    const i14 = a.m23;
    const i15 = a.m33;

    const b00 = i0 * i5 - i1 * i4;
    const b01 = i0 * i6 - i2 * i4;
    const b02 = i0 * i7 - i3 * i4;
    const b03 = i1 * i6 - i2 * i5;
    const b04 = i1 * i7 - i3 * i5;
    const b05 = i2 * i7 - i3 * i6;
    const b06 = i8 * i13 - i9 * i12;
    const b07 = i8 * i14 - i10 * i12;
    const b08 = i8 * i15 - i11 * i12;
    const b09 = i9 * i14 - i10 * i13;
    const b10 = i9 * i15 - i11 * i13;
    const b11 = i10 * i15 - i11 * i14;

    out.m00 = i5 * b11 - i6 * b10 + i7 * b09;
    out.m10 = i2 * b10 - i1 * b11 - i3 * b09;
    out.m20 = i13 * b05 - i14 * b04 + i15 * b03;
    out.m30 = i10 * b04 - i9 * b05 - i11 * b03;

    out.m01 = i6 * b08 - i4 * b11 - i7 * b07;
    out.m11 = i0 * b11 - i2 * b08 + i3 * b07;
    out.m21 = i14 * b02 - i12 * b05 - i15 * b01;
    out.m31 = i8 * b05 - i10 * b02 + i11 * b01;

    out.m02 = i4 * b10 - i5 * b08 + i7 * b06;
    out.m12 = i1 * b08 - i0 * b10 - i3 * b06;
    out.m22 = i12 * b04 - i13 * b02 + i15 * b00;
    out.m32 = i9 * b02 - i8 * b04 - i11 * b00;

    out.m03 = i5 * b07 - i4 * b09 - i6 * b06;
    out.m13 = i0 * b09 - i1 * b07 + i2 * b06;
    out.m23 = i13 * b01 - i12 * b03 - i14 * b00;
    out.m33 = i8 * b03 - i9 * b01 + i10 * b00;
    return out;
}
