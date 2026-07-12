import { Vec4, vec4Set } from './vec4-core';
import type { Mat4 } from '../mat4';

/**
 * Transforms a Vec4 by a 4x4 matrix.
 * Uses column vector post-multiplication: v' = M * v
 * @param out The vector to store the result in.
 * @param a The vector to transform.
 * @param m The 4x4 matrix to transform the vector by.
 * @returns The out vector with the result.
 */
export function vec4MatTransform(out: Vec4, a: Readonly<Vec4>, m: Readonly<Mat4>): Vec4 {
    return vec4Set(
        out,
        m.m00 * a.x + m.m01 * a.y + m.m02 * a.z + m.m03 * a.w,
        m.m10 * a.x + m.m11 * a.y + m.m12 * a.z + m.m13 * a.w,
        m.m20 * a.x + m.m21 * a.y + m.m22 * a.z + m.m23 * a.w,
        m.m30 * a.x + m.m31 * a.y + m.m32 * a.z + m.m33 * a.w,
    );
}

/**
 * Scales a Vec4 by a scalar value.
 * @param out The vector to store the result in.
 * @param a The vector to scale.
 * @param scalar The scalar value to scale the vector by.
 * @returns The out vector with the result.
 */
export function vec4Scale(out: Vec4, a: Readonly<Vec4>, scalar: number): Vec4 {
    return vec4Set(out, a.x * scalar, a.y * scalar, a.z * scalar, a.w * scalar);
}
