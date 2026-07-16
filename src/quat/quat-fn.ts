import type { Quat } from './quat-core';
import { quatSet } from './quat-core';

/**
 * Calculate the exponential of a unit quaternion.
 *
 * @param out the receiving quaternion
 * @param a quat to calculate the exponential of
 * @returns out quat updated to be the exponential of a
 */
export function quatExp(out: Quat, a: Readonly<Quat>): Quat {
    let r = Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z);
    let et = Math.exp(a.w);
    let s = r > 0 ? (et * Math.sin(r)) / r : 0;

    return quatSet(out, a.x * s, a.y * s, a.z * s, et * Math.cos(r));
}

/**
 * Calculate the natural logarithm of a unit quaternion.
 *
 * @param out the receiving quaternion
 * @param a quat to calculate the natural logarithm of
 * @returns out quat updated to be the natural logarithm of a
 */
export function quatLn(out: Quat, a: Readonly<Quat>): Quat {
    let r = Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z);
    let t = r > 0 ? Math.atan2(r, a.w) / r : 0;

    return quatSet(out, a.x * t, a.y * t, a.z * t, 0.5 * Math.log(a.x * a.x + a.y * a.y + a.z * a.z + a.w * a.w));
}

/**
 * Calculate the scalar power of a unit quaternion.
 *
 * @param out the receiving quaternion
 * @param a quat to calculate the power of
 * @param b the exponent to raise the quaternion to
 * @returns out quat updated to be the power of a by b
 */
export function quatPow(out: Quat, a: Readonly<Quat>, b: number): Quat {
    quatLn(out, a);
    quatScale(out, out, b);
    quatExp(out, out);
    return out;
}

/**
 * Scales a quaternion by a scalar.
 * 
 * @remarks
 * Same as vec4Scale(a as Vec4, b) or vec4Scale(vec4(a.x, a.y, a.z, a.w), b).
 * 
 * @param out the receiving quaternion
 * @param a quat to scale
 * @param b the scalar to scale by
 * @returns out quat updated to be the scaled version of a
 */
export function quatScale(out: Quat, a: Readonly<Quat>, b: number): Quat {
    return quatSet(out, a.x * b, a.y * b, a.z * b, a.w * b);
}