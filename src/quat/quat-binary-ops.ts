import { EPSILON } from '../utils';
import { vec4Add, vec4Dot, vec4Lerp } from '../vec4/vec4-binary-ops';
import { quatSet, type Quat } from './quat-core';

/**
 * Multiplies two quaternions.
 * The resulting quaternion represents the rotation of b followed by the rotation of a.
 * @param out The quaternion to store the result in.
 * @param a The first quaternion to multiply.
 * @param b The second quaternion to multiply.
 * @returns The out quaternion with the result.
 */
export function quatMultiply(out: Quat, a: Readonly<Quat>, b: Readonly<Quat>): Quat {
    // standard right-handed Hamilton algebra
    return quatSet(
        out,
        a.x * b.w + a.w * b.x + a.y * b.z - a.z * b.y,
        a.y * b.w + a.w * b.y + a.z * b.x - a.x * b.z,
        a.z * b.w + a.w * b.z + a.x * b.y - a.y * b.x,
        a.w * b.w - a.x * b.x - a.y * b.y - a.z * b.z,
    );
}

/**
 * Adds two quaternions.
 *
 * @remarks
 * Same as vec4Add(a, b).
 *
 * @param out The quaternion to store the result in.
 * @param a The first quaternion to add.
 * @param b The second quaternion to add.
 * @returns The out quaternion with the result.
 */
export function quatAdd(out: Quat, a: Readonly<Quat>, b: Readonly<Quat>): Quat {
    return vec4Add(out, a, b);
}

/**
 * Calculates the dot product of two quaternions.
 * Gives the cosine of the angle between them if they are unit (normalized) quaternions.
 *
 * @remarks
 * Double cover issue: if the cosine of the angle is negative (dot(q1, q2) < 0),
 * the quaternions are in opposite hemispheres, and the angle q1 → −q2​ is shorter than q1 → q2​,
 * while -q2 represents the same rotation as q2.
 * Exemple: q and -q represent the same rotation, but are in opposite hemispheres,
 * dot(q, -q) = -1 and acos(-1) = π, but the angle between them is 0.
 * Rule of thumb: if the dot product is negative, always negate one quaternion first:
 * ```
 * if(quatDot(q1, q2) < 0) {
 *     quatNegate(q2, q2);
 * }
 * ```
 *
 * @remarks
 * Same as vec4Dot(a, b).
 *
 * @param a The first quaternion.
 * @param b The second quaternion.
 * @returns The dot product of the two quaternions.
 */
export function quatDot(a: Readonly<Quat>, b: Readonly<Quat>): number {
    return vec4Dot(a, b);
}

/**
 * Gets the angular distance between two unit (normalized) quaternions
 * Accounts for the double cover issue, so for q and -q, this function returns 0, not π.
 *
 * @param a Origin quaternion (must be normalized)
 * @param b Destination quaternion (must be normalized)
 * @returns The angle, in radians, between the two quaternions
 */
export function quatAngle(a: Readonly<Quat>, b: Readonly<Quat>): number {
    const dot = quatDot(a, b);

    // For unit quaternions, the dot product is equal to the cosine of the half-angle between them:
    // dot = cos(omega) = cos(theta / 2) where theta is the angle in 3D space
    // half-angle identity: cos(theta/2)² = (1 + cos(theta)) / 2
    // => 2 * dot * dot - 1 = cos(theta)

    // acos returns NaN if its parameter is even slightly outside [-1,1], so we clamp the value to avoid that.
    return Math.acos(Math.min(Math.max(2 * dot * dot - 1, -1), 1));
}

/**
 * Performs a linear interpolation between two quaternions.
 *
 * @remarks
 * Same as vec4Lerp(a, b, t).
 *
 * @param out The quaternion to store the result in.
 * @param a The first quaternion.
 * @param b The second quaternion.
 * @param t The interpolation factor, in the range [0, 1].
 * @returns The out quaternion with the result.
 */
export function quatLerp(out: Quat, a: Readonly<Quat>, b: Readonly<Quat>, t: number): Quat {
    return vec4Lerp(out, a, b, t);
}

/**
 * Performs a spherical linear interpolation between two quaternions.
 *
 * @param out the receiving quaternion
 * @param a the origin quaternion (must be normalized)
 * @param b the destination quaternion (must be normalized)
 * @param t the interpolation factor, in the range [0-1].
 * @returns out
 */
export function quatSlerp(out: Quat, a: Readonly<Quat>, b: Readonly<Quat>, t: number): Quat {
    let cosOmega = quatDot(a, b); // omega = theta / 2 where theta is the angle in 3D space
    let bx = b.x,
        by = b.y,
        bz = b.z,
        bw = b.w;

    // If the dot product is negative, negate one quaternion to take the shorter path (avoid double cover issue)
    if (cosOmega < 0) {
        bx = -bx;
        by = -by;
        bz = -bz;
        bw = -bw;
        cosOmega = -cosOmega;
    }

    // If the quaternions are very close (cos ~> 1), use linear interpolation (avoid division by zero)
    if (cosOmega >= 1 - EPSILON) {
        const ratioA = 1 - t;
        const ratioB = t;
        return quatSet(
            out,
            a.x * ratioA + bx * ratioB,
            a.y * ratioA + by * ratioB,
            a.z * ratioA + bz * ratioB,
            a.w * ratioA + bw * ratioB,
        );
    }

    const omega = Math.acos(cosOmega);
    const sinOmega = Math.sqrt(1.0 - cosOmega * cosOmega); // Compute the sine of the angle using the identity sin^2 + cos^2 = 1

    const ratioA = Math.sin((1 - t) * omega) / sinOmega;
    const ratioB = Math.sin(t * omega) / sinOmega;

    return quatSet(
        out,
        a.x * ratioA + bx * ratioB,
        a.y * ratioA + by * ratioB,
        a.z * ratioA + bz * ratioB,
        a.w * ratioA + bw * ratioB,
    );
}
