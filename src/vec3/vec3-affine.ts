import type { Mat3 } from '../mat3';
import { Quat } from '../quat/quat-core';
import { Vec3, vec3Set } from './vec3-core';

/**
 * Transforms a Vec3 by a 3x3 matrix.
 * Uses column vector post-multiplication: v' = M * v
 * @param out The vector to store the result in.
 * @param a The vector to transform.
 * @param m The 3x3 matrix to transform the vector by.
 * @returns The out vector with the result.
 */
export function vec3MatTransform(out: Vec3, a: Readonly<Vec3>, m: Readonly<Mat3>): Vec3 {
    return vec3Set(
        out,
        m.m00 * a.x + m.m01 * a.y + m.m02 * a.z,
        m.m10 * a.x + m.m11 * a.y + m.m12 * a.z,
        m.m20 * a.x + m.m21 * a.y + m.m22 * a.z,
    );
}

/**
 * Rotates a Vec3 by a unit quaternion.
 * @param out The vector to store the result in.
 * @param a The vector to transform.
 * @param q The quaternion to transform by (must be normalized).
 * @returns The out vector with the result.
 */
export function vec3QuatTransform(out: Vec3, a: Readonly<Vec3>, q: Readonly<Quat>): Vec3 {
    // Fast Vector Rotation using Quaternions by Robert Eisele
    // https://raw.org/proof/vector-rotation-using-quaternions/

    // v = (q.x, q.y, q.z)

    // t = 2v x a
    let tx = 2 * (q.y * a.z - q.z * a.y);
    let ty = 2 * (q.z * a.x - q.x * a.z);
    let tz = 2 * (q.x * a.y - q.y * a.x);

    // a' = a + w t + v x t
    return vec3Set(
        out,
        a.x + q.w * tx + (q.y * tz - q.z * ty),
        a.y + q.w * ty + (q.z * tx - q.x * tz),
        a.z + q.w * tz + (q.x * ty - q.y * tx),
    );
}

/**
 * Rotates a Vec3 around the X axis and a specified origin.
 * @param out The vector to store the result in.
 * @param a The vector to rotate.
 * @param origin The point to rotate around.
 * @param angleRad The angle in radians to rotate by.
 * @returns The out vector with the result.
 */
export function vec3RotateX(out: Vec3, a: Readonly<Vec3>, origin: Readonly<Vec3>, angleRad: number): Vec3 {
    const cos = Math.cos(angleRad);
    const sin = Math.sin(angleRad);
    const y = a.y - origin.y;
    const z = a.z - origin.z;
    return vec3Set(out, a.x, origin.y + y * cos - z * sin, origin.z + y * sin + z * cos);
}

/**
 * Rotates a Vec3 around the Y axis and a specified origin.
 * @param out The vector to store the result in.
 * @param a The vector to rotate.
 * @param origin The point to rotate around.
 * @param angleRad The angle in radians to rotate by.
 * @returns The out vector with the result.
 */
export function vec3RotateY(out: Vec3, a: Readonly<Vec3>, origin: Readonly<Vec3>, angleRad: number): Vec3 {
    const cos = Math.cos(angleRad);
    const sin = Math.sin(angleRad);
    const x = a.x - origin.x;
    const z = a.z - origin.z;
    return vec3Set(out, origin.x + x * cos + z * sin, a.y, origin.z - x * sin + z * cos);
}

/**
 * Rotates a Vec3 around the Z axis and a specified origin.
 * @param out The vector to store the result in.
 * @param a The vector to rotate.
 * @param origin The point to rotate around.
 * @param angleRad The angle in radians to rotate by.
 * @returns The out vector with the result.
 */
export function vec3RotateZ(out: Vec3, a: Readonly<Vec3>, origin: Readonly<Vec3>, angleRad: number): Vec3 {
    const cos = Math.cos(angleRad);
    const sin = Math.sin(angleRad);
    const x = a.x - origin.x;
    const y = a.y - origin.y;
    return vec3Set(out, origin.x + x * cos - y * sin, origin.y + x * sin + y * cos, a.z);
}

/**
 * Scales a Vec3 by a scalar value.
 * @param out The vector to store the result in.
 * @param a The vector to scale.
 * @param scalar The scalar value to scale the vector by.
 * @returns The out vector with the result.
 */
export function vec3Scale(out: Vec3, a: Readonly<Vec3>, scalar: number): Vec3 {
    return vec3Set(out, a.x * scalar, a.y * scalar, a.z * scalar);
}
