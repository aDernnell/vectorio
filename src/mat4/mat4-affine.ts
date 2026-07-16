import { EPSILON } from '../utils';
import type { Vec3 } from '../vec3';
import { Mat4, mat4Set } from './mat4-core';

/**
 * Applies a 3D translation to a 4x4 affine transformation matrix.
 * out = a * T, where T is the translation matrix.
 * @param out The matrix to store the result in.
 * @param a The matrix to translate.
 * @param v The vector to translate by.
 * @returns The out matrix with the result of the translation.
 */
export function mat4Translate(out: Mat4, a: Readonly<Mat4>, v: Readonly<Vec3>): Mat4 {
    // prettier-ignore
    return mat4Set(
        out,
        a.m00, a.m01, a.m02, a.m00 * v.x + a.m01 * v.y + a.m02 * v.z + a.m03,
        a.m10, a.m11, a.m12, a.m10 * v.x + a.m11 * v.y + a.m12 * v.z + a.m13,
        a.m20, a.m21, a.m22, a.m20 * v.x + a.m21 * v.y + a.m22 * v.z + a.m23,
        a.m30, a.m31, a.m32, a.m30 * v.x + a.m31 * v.y + a.m32 * v.z + a.m33,
    );
}

/**
 * Applies a 3D axis-angle rotation to a 4x4 affine transformation matrix.
 * out = a * R, where R is the rotation matrix.
 * The rotation direction follows a left-handed convention 
 * (clockwise when looking from the tip of the vector towards the origin).
 * Returns null for degenerate axis.
 * @param out The matrix to store the result in.
 * @param a The matrix to rotate.
 * @param axis The axis to rotate around.
 * @param rad The angle in radians.
 * @returns The out matrix with the result of the rotation, or null if the axis is degenerate.
 */
export function mat4Rotate(out: Mat4, a: Readonly<Mat4>, axis: Readonly<Vec3>, rad: number): Mat4 | null {
    let x = axis.x;
    let y = axis.y;
    let z = axis.z;
    let len = Math.sqrt(x * x + y * y + z * z);

    if (len < EPSILON) {
        return null;
    }

    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    const s = Math.sin(rad);
    const c = Math.cos(rad);
    const t = 1 - c;

    const b00 = x * x * t + c;
    const b01 = y * x * t + z * s;
    const b02 = z * x * t - y * s;

    const b10 = x * y * t - z * s;
    const b11 = y * y * t + c;
    const b12 = z * y * t + x * s;

    const b20 = x * z * t + y * s;
    const b21 = y * z * t - x * s;
    const b22 = z * z * t + c;

    const m00 = a.m00 * b00 + a.m01 * b01 + a.m02 * b02;
    const m10 = a.m10 * b00 + a.m11 * b01 + a.m12 * b02;
    const m20 = a.m20 * b00 + a.m21 * b01 + a.m22 * b02;
    const m30 = a.m30 * b00 + a.m31 * b01 + a.m32 * b02;

    const m01 = a.m00 * b10 + a.m01 * b11 + a.m02 * b12;
    const m11 = a.m10 * b10 + a.m11 * b11 + a.m12 * b12;
    const m21 = a.m20 * b10 + a.m21 * b11 + a.m22 * b12;
    const m31 = a.m30 * b10 + a.m31 * b11 + a.m32 * b12;

    const m02 = a.m00 * b20 + a.m01 * b21 + a.m02 * b22;
    const m12 = a.m10 * b20 + a.m11 * b21 + a.m12 * b22;
    const m22 = a.m20 * b20 + a.m21 * b21 + a.m22 * b22;
    const m32 = a.m30 * b20 + a.m31 * b21 + a.m32 * b22;

    // prettier-ignore
    return mat4Set(
        out,
        m00, m01, m02, a.m03,
        m10, m11, m12, a.m13,
        m20, m21, m22, a.m23,
        m30, m31, m32, a.m33,
    );
}

/**
 * Applies a rotation around X axis to a 4x4 affine transformation matrix.
 * out = a * Rx, where Rx is the rotation matrix around X axis.
 * The rotation direction follows a left-handed convention 
 * (clockwise when looking from the tip of the axis vector towards the origin).
 * @param out The matrix to store the result in.
 * @param a The matrix to rotate.
 * @param rad The angle in radians.
 * @returns The out matrix with the result of the rotation.
 */
export function mat4RotateX(out: Mat4, a: Readonly<Mat4>, rad: number): Mat4 {
    const s = Math.sin(rad);
    const c = Math.cos(rad);

    // prettier-ignore
    return mat4Set(
        out,
        a.m00, a.m01 * c + a.m02 * s, a.m02 * c - a.m01 * s, a.m03,
        a.m10, a.m11 * c + a.m12 * s, a.m12 * c - a.m11 * s, a.m13,
        a.m20, a.m21 * c + a.m22 * s, a.m22 * c - a.m21 * s, a.m23,
        a.m30, a.m31 * c + a.m32 * s, a.m32 * c - a.m31 * s, a.m33,
    );
}

/**
 * Applies a rotation around Y axis to a 4x4 affine transformation matrix.
 * out = a * Ry, where Ry is the rotation matrix around Y axis.
 * The rotation direction follows a left-handed convention 
 * (clockwise when looking from the tip of the axis vector towards the origin).
 * @param out The matrix to store the result in.
 * @param a The matrix to rotate.
 * @param rad The angle in radians.
 * @returns The out matrix with the result of the rotation.
 */
export function mat4RotateY(out: Mat4, a: Readonly<Mat4>, rad: number): Mat4 {
    const s = Math.sin(rad);
    const c = Math.cos(rad);

    // prettier-ignore
    return mat4Set(
        out,
        a.m00 * c - a.m02 * s, a.m01, a.m00 * s + a.m02 * c, a.m03,
        a.m10 * c - a.m12 * s, a.m11, a.m10 * s + a.m12 * c, a.m13,
        a.m20 * c - a.m22 * s, a.m21, a.m20 * s + a.m22 * c, a.m23,
        a.m30 * c - a.m32 * s, a.m31, a.m30 * s + a.m32 * c, a.m33,
    );
}

/**
 * Applies a rotation around Z axis to a 4x4 affine transformation matrix.
 * out = a * Rz, where Rz is the rotation matrix around Z axis.
 * The rotation direction follows a left-handed convention 
 * (clockwise when looking from the tip of the axis vector towards the origin).
 * @param out The matrix to store the result in.
 * @param a The matrix to rotate.
 * @param rad The angle in radians.
 * @returns The out matrix with the result of the rotation.
 */
export function mat4RotateZ(out: Mat4, a: Readonly<Mat4>, rad: number): Mat4 {
    const s = Math.sin(rad);
    const c = Math.cos(rad);

    // prettier-ignore
    return mat4Set(
        out,
        a.m00 * c + a.m01 * s, a.m01 * c - a.m00 * s, a.m02, a.m03,
        a.m10 * c + a.m11 * s, a.m11 * c - a.m10 * s, a.m12, a.m13,
        a.m20 * c + a.m21 * s, a.m21 * c - a.m20 * s, a.m22, a.m23,
        a.m30 * c + a.m31 * s, a.m31 * c - a.m30 * s, a.m32, a.m33,
    );
}

/**
 * Applies ZYX Euler rotation to a 4x4 affine transformation matrix.
 * out = a * Rz * Ry * Rx (rotate around X first, then Y, then Z).
 * The rotation direction follows a left-handed convention 
 * (clockwise when looking from the tip of the axis vector towards the origin).
 * Equivalent to calling mat4RotateZ, mat4RotateY, and then mat4RotateX in sequence
 * but faster due to fewer operations.
 * @param out The matrix to store the result in.
 * @param a The matrix to rotate.
 * @param rad The Euler angles in radians.
 * @returns The out matrix with the result of the rotation.
 */
export function mat4RotateZYX(out: Mat4, a: Readonly<Mat4>, rad: Readonly<Vec3>): Mat4 {
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

    const sx = Math.sin(rad.x);
    const cx = Math.cos(rad.x);
    const sy = Math.sin(rad.y);
    const cy = Math.cos(rad.y);
    const sz = Math.sin(rad.z);
    const cz = Math.cos(rad.z);

    const r00 = cz * cy;
    const r01 = cz * sy * sx - sz * cx;
    const r02 = cz * sy * cx + sz * sx;
    const r10 = sz * cy;
    const r11 = sz * sy * sx + cz * cx;
    const r12 = sz * sy * cx - cz * sx;
    const r20 = -sy;
    const r21 = cy * sx;
    const r22 = cy * cx;

    out.m00 = a00 * r00 + a01 * r10 + a02 * r20;
    out.m10 = a10 * r00 + a11 * r10 + a12 * r20;
    out.m20 = a20 * r00 + a21 * r10 + a22 * r20;
    out.m30 = a30 * r00 + a31 * r10 + a32 * r20;

    out.m01 = a00 * r01 + a01 * r11 + a02 * r21;
    out.m11 = a10 * r01 + a11 * r11 + a12 * r21;
    out.m21 = a20 * r01 + a21 * r11 + a22 * r21;
    out.m31 = a30 * r01 + a31 * r11 + a32 * r21;

    out.m02 = a00 * r02 + a01 * r12 + a02 * r22;
    out.m12 = a10 * r02 + a11 * r12 + a12 * r22;
    out.m22 = a20 * r02 + a21 * r12 + a22 * r22;
    out.m32 = a30 * r02 + a31 * r12 + a32 * r22;

    out.m03 = a.m03;
    out.m13 = a.m13;
    out.m23 = a.m23;
    out.m33 = a.m33;
    return out;
}

/**
 * Applies 3D scale to a 4x4 affine transformation matrix.
 * out = a * S, where S is the scale matrix.
 * @param out The matrix to store the result in.
 * @param a The matrix to scale.
 * @param v The scale vector.
 * @returns The out matrix with the result of the scaling.
 */
export function mat4Scale(out: Mat4, a: Readonly<Mat4>, v: Readonly<Vec3>): Mat4 {
    // prettier-ignore
    return mat4Set(
        out,
        a.m00 * v.x, a.m01 * v.y, a.m02 * v.z, a.m03,
        a.m10 * v.x, a.m11 * v.y, a.m12 * v.z, a.m13,
        a.m20 * v.x, a.m21 * v.y, a.m22 * v.z, a.m23,
        a.m30 * v.x, a.m31 * v.y, a.m32 * v.z, a.m33,
    );
}

/**
 * Fills the matrix values with a 3D translation transform.
 * Equivalent to calling mat4Translate on an identity matrix, but faster due to fewer operations.
 * @param out The matrix to fill values for.
 * @param v The translation vector.
 * @returns The out matrix with the translation transform.
 */
export function mat4FillTranslation(out: Mat4, v: Readonly<Vec3>): Mat4 {
    // prettier-ignore
    return mat4Set(
        out,
        1, 0, 0, v.x,
        0, 1, 0, v.y,
        0, 0, 1, v.z,
        0, 0, 0, 1,
    );
}

/**
 * Fills the matrix values with a 3D axis-angle rotation transform.
 * The rotation direction follows a left-handed convention 
 * (clockwise when looking from the tip of the vector towards the origin)
 * Returns null for degenerate axis.
 * Equivalent to calling mat4Rotate on an identity matrix, but faster due to fewer operations.
 * @param out The matrix to fill values for.
 * @param axis The axis of rotation.
 * @param rad The rotation angle in radians.
 * @returns The out matrix with the rotation transform, or null if the axis is degenerate.
 */
export function mat4FillRotation(out: Mat4, axis: Readonly<Vec3>, rad: number): Mat4 | null {
    let x = axis.x;
    let y = axis.y;
    let z = axis.z;
    let len = Math.sqrt(x * x + y * y + z * z);
    if (len < EPSILON) {
        return null;
    }

    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    const s = Math.sin(rad);
    const c = Math.cos(rad);
    const t = 1 - c;

    const tx = t * x;
    const ty = t * y;
    const tz = t * z;
    const sx = s * x;
    const sy = s * y;
    const sz = s * z;

    // prettier-ignore
    return mat4Set(
        out,
        tx * x + c, tx * y - sz, tx * z + sy, 0,
        tx * y + sz, ty * y + c, ty * z - sx, 0,
        tx * z - sy, ty * z + sx, tz * z + c, 0,
        0, 0, 0, 1,
    );
}

/**
 * Fills the matrix values with an X-axis rotation transform.
 * The rotation direction follows a left-handed convention 
 * (clockwise when looking from the tip of the axis vector towards the origin)
 * Equivalent to calling mat4RotateX on an identity matrix, but faster due to fewer operations.
 * @param out The matrix to fill values for.
 * @param rad The rotation angle in radians.
 * @returns The out matrix with the rotation transform.
 */
export function mat4FillRotationX(out: Mat4, rad: number): Mat4 {
    const s = Math.sin(rad);
    const c = Math.cos(rad);

    // prettier-ignore
    return mat4Set(
        out,
        1, 0, 0, 0,
        0, c, -s, 0,
        0, s, c, 0,
        0, 0, 0, 1,
    );
}

/**
 * Fills the matrix values with a Y-axis rotation transform.
 * The rotation direction follows a left-handed convention 
 * (clockwise when looking from the tip of the axis vector towards the origin)
 * Equivalent to calling mat4RotateY on an identity matrix, but faster due to fewer operations.
 * @param out The matrix to fill values for.
 * @param rad The rotation angle in radians.
 * @returns The out matrix with the rotation transform.
 */
export function mat4FillRotationY(out: Mat4, rad: number): Mat4 {
    const s = Math.sin(rad);
    const c = Math.cos(rad);

    // prettier-ignore
    return mat4Set(
        out,
        c, 0, s, 0,
        0, 1, 0, 0,
        -s, 0, c, 0,
        0, 0, 0, 1,
    );
}

/**
 * Fills the matrix values with a Z-axis rotation transform.
 * The rotation direction follows a left-handed convention 
 * (clockwise when looking from the tip of the axis vector towards the origin)
 * Equivalent to calling mat4RotateZ on an identity matrix, but faster due to fewer operations.
 * @param out The matrix to fill values for.
 * @param rad The rotation angle in radians.
 * @returns The out matrix with the rotation transform.
 */
export function mat4FillRotationZ(out: Mat4, rad: number): Mat4 {
    const s = Math.sin(rad);
    const c = Math.cos(rad);

    // prettier-ignore
    return mat4Set(
        out,
        c, -s, 0, 0,
        s, c, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
    );
}

/**
 * Fills the matrix values as a ZYX Euler rotation transform.
 * The rotation direction follows a left-handed convention 
 * (clockwise when looking from the tip of the axis vector towards the origin)
 * Equivalent to calling mat4RotateZYX on an identity matrix, but faster due to fewer operations.
 * @param out The matrix to fill values for.
 * @param rad The rotation angles in radians.
 * @returns The out matrix with the rotation transform.
 */
export function mat4FillRotationZYX(out: Mat4, rad: Readonly<Vec3>): Mat4 {
    const sx = Math.sin(rad.x);
    const cx = Math.cos(rad.x);
    const sy = Math.sin(rad.y);
    const cy = Math.cos(rad.y);
    const sz = Math.sin(rad.z);
    const cz = Math.cos(rad.z);

    // prettier-ignore
    return mat4Set(
        out,
        cz * cy, cz * sy * sx - sz * cx, cz * sy * cx + sz * sx, 0,
        sz * cy, sz * sy * sx + cz * cx, sz * sy * cx - cz * sx, 0,
        -sy, cy * sx, cy * cx, 0,
        0, 0, 0, 1,
    );
}

/**
 * Fills the matrix values with a 3D scale transform.
 * Equivalent to calling mat4Scale on an identity matrix, but faster due to fewer operations.
 * @param out The matrix to fill values for.
 * @param v The scale vector.
 * @returns The out matrix with the scale transform.
 */
export function mat4FillScale(out: Mat4, v: Readonly<Vec3>): Mat4 {
    // prettier-ignore
    return mat4Set(
        out,
        v.x, 0, 0, 0,
        0, v.y, 0, 0,
        0, 0, v.z, 0,
        0, 0, 0, 1,
    );
}
