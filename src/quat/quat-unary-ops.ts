import { vec4Scale } from '../vec4';
import { Quat, quatSet } from './quat-core';

/**
 * Calculates the inverse of a quat (out = a^-1)
 * The result is a quaternion that represents the opposite rotation (a * a^-1 = identity).
 *
 * @param out the receiving quaternion
 * @param a quat to calculate inverse of
 * @returns out quat updated with inverse values
 */
export function quatInvert(out: Quat, a: Readonly<Quat>): Quat {
    let dot = a.x * a.x + a.y * a.y + a.z * a.z + a.w * a.w;
    if (dot === 0) {
        return quatSet(out, 0, 0, 0, 0);
    }
    dot = 1.0 / dot;

    return quatSet(out, -a.x * dot, -a.y * dot, -a.z * dot, a.w * dot);
}

/**
 * Calculates the negation of a quat (out = -a)
 * The result is a quaternion that represents the same rotation
 * but with a different representation (the opposite hemisphere).
 *
 * @param out the receiving quaternion
 * @param a quat to calculate negation of
 * @returns out quat updated with negated values
 */
export function quatNegate(out: Quat, a: Readonly<Quat>): Quat {
    return quatSet(out, -a.x, -a.y, -a.z, -a.w);
}

/**
 * Calculates the conjugate of a quat (out = a*)
 * If the quaternion is normalized, this function is faster than quatInvert and produces the same result.
 *
 * @param out the receiving quaternion
 * @param a quat to calculate conjugate of
 * @returns out quat updated with conjugated values
 */
export function quatConjugate(out: Quat, a: Readonly<Quat>): Quat {
    return quatSet(out, -a.x, -a.y, -a.z, a.w);
}

/**
 * Normalizes a quat (to have a magnitude of 1).
 * The result is a unit quaternion.
 * If the quaternion has zero length, it won't be modified.
 *
 * @param out the receiving quaternion
 * @param a quat to normalize
 * @returns out quat updated to be the normalized version of a
 */
export function quatNormalize(out: Quat, a: Readonly<Quat>): Quat {
    let len = a.x * a.x + a.y * a.y + a.z * a.z + a.w * a.w;

    if (len === 0) {
        return out; // Return the original quaternion if it has zero length
    }
    len = 1 / Math.sqrt(len);
    return quatSet(out, a.x * len, a.y * len, a.z * len, a.w * len);
}

/**
 * Calculate the exponential of a unit quaternion.
 *
 * @param out the receiving quaternion
 * @param a quat to calculate the exponential of
 * 
 * 
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
 * @param a quat to calculate the natural logarithm of (must be normalized)
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
 * Same as vec4Scale(a, b)
 * 
 * @param out the receiving quaternion
 * @param a quat to scale
 * @param b the scalar to scale by
 * @returns out quat updated to be the scaled version of a
 */
export function quatScale(out: Quat, a: Readonly<Quat>, b: number): Quat {
    return vec4Scale(out, a, b);
}