import { Mat2, mat2Set } from './mat2-core';
import type { Vec2 } from '../vec2';

/**
 * Applies a 2D rotation to a 2x2 affine transformation matrix.
 * 
 * out = a * R, where R is the rotation matrix.
 * 
 * A positive angle rotates counter-clockwise when the origin 
 * is the bottom-left corner of the screen (X right, Y up).
 * This is equivalent to a left-handed rotation around the Z axis in 3D space.
 * 
 * @param out The matrix to store the result in.
 * @param a The matrix to rotate.
 * @param rad The angle in radians to rotate by.
 * @returns The out matrix with the result of the rotation.
 */
export function mat2Rotate(out: Mat2, a: Readonly<Mat2>, rad: number): Mat2 {
    const s = Math.sin(rad);
    const c = Math.cos(rad);

    // prettier-ignore
    return mat2Set(
        out,
        a.m00 * c + a.m01 * s, a.m01 * c - a.m00 * s,
        a.m10 * c + a.m11 * s, a.m11 * c - a.m10 * s
    );
}

/**
 * Applies a 2D scale to a 2x2 affine transformation matrix.
 * 
 * out = a * S, where S is the scale matrix.
 * 
 * @param out The matrix to store the result in.
 * @param a The matrix to scale.
 * @param v The vector to scale by.
 * @returns The out matrix with the result of the scaling.
 */
export function mat2Scale(out: Mat2, a: Readonly<Mat2>, v: Readonly<Vec2>): Mat2 {
    // prettier-ignore
    return mat2Set(
        out,
        a.m00 * v.x, a.m01 * v.y,
        a.m10 * v.x, a.m11 * v.y
    );
}

/** 
 * Fills a 2x2 matrix as a 2D rotation affine transformation.
 * 
 * A positive angle rotates counter-clockwise when the origin 
 * is the bottom-left corner of the screen (X right, Y up).
 * This is equivalent to a left-handed rotation around the Z axis in 3D space.
 * 
 * Equivalent to calling mat2Rotate on an identity matrix, but faster due to fewer operations.
 * 
 * @param out The matrix to store the result in.
 * @param rad The rotation angle in radians.
 * @returns The out matrix with the rotation applied.
 */
export function mat2FillRotation(out: Mat2, rad: number): Mat2 {
    const s = Math.sin(rad);
    const c = Math.cos(rad);

    // prettier-ignore
    return mat2Set(
        out,
        c, -s,
        s, c,
    );
}

/** 
 * Fills a 2x2 matrix as a 2D scale affine transformation.
 * 
 * Equivalent to calling mat2Scale on an identity matrix, but faster due to fewer operations.
 * 
 * @param out The matrix to store the result in.
 * @param v The scaling vector.
 * @returns The out matrix with the scaling applied.
 */
export function mat2FillScale(out: Mat2, v: Readonly<Vec2>): Mat2 {
    // prettier-ignore
    return mat2Set(
        out,
        v.x, 0,
        0, v.y,
    );
}
