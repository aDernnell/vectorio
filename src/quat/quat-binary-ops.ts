import { quat, quatSet, type Quat } from './quat-core';
import type { Vec4 } from '../vec4/vec4-core';
import { vec4Dot } from '../vec4/vec4-binary-ops';

/**
 * Multiplies two quaternions.
 * @param out The quaternion to store the result in.
 * @param a The first quaternion to multiply.
 * @param b The second quaternion to multiply.
 * @returns The out quaternion with the result.
 */
export function quatMultiply(out: Quat, a: Readonly<Quat>, b: Readonly<Quat>): Quat {
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
 * Same as vec4Add(a as Vec4, b as Vec4) or vec4Add(vec4(a.x, a.y, a.z, a.w), vec4(b.x, b.y, b.z, b.w)).
 * @param out The quaternion to store the result in.
 * @param a The first quaternion to add.
 * @param b The second quaternion to add.
 * @returns The out quaternion with the result.
 */
export function quatAdd(out: Quat, a: Readonly<Quat>, b: Readonly<Quat>): Quat {
    return quatSet(out, a.x + b.x, a.y + b.y, a.z + b.z, a.w + b.w);
}

/**
 * Calculates the dot product of two quaternions.
 * Gives the cosine of the angle between them if they are unit (normalized) quaternions in the same hemisphere.
 * Counter-exemple: q and -q represent the same rotation, but are in opposite hemispheres.
 * quatDot(q, -q) = -1 and acos(-1) = π, but the angle between them is 0.
 *
 * @remarks
 * Same as vec4Dot(vec4(a.x, a.y, a.z, a.w), vec4(b.x, b.y, b.z, b.w))
 * or vec4Dot(a as Vec4, b as Vec4).
 *
 * @param a The first quaternion.
 * @param b The second quaternion.
 * @returns The dot product of the two quaternions.
 */
export function quatDot(a: Readonly<Quat>, b: Readonly<Quat>): number {
    return vec4Dot(a as Readonly<Vec4>, b as Readonly<Vec4>);
}

/**
 * Gets the angular distance between two unit (normalized) quaternions
 *
 * @param a Origin unit quaternion
 * @param b Destination unit quaternion
 * @returns The angle, in radians, between the two quaternions
 */
export function quatAngle(a: Readonly<Quat>, b: Readonly<Quat>): number {
    let cosHalfTheta = quatDot(a, b);

    // double cover issue, the angle between q and -q is 0, not 180 degrees
    // acos returns NaN if its parameter is even slightly outside [-1,1]
    // TODO understand
    return Math.acos(Math.min(Math.max(2 * cosHalfTheta * cosHalfTheta - 1, -1), 1));
}

/**
 * Performs a spherical linear interpolation between two quaternions.
 *
 * @param out the receiving quaternion
 * @param a the first operand
 * @param b the second operand
 * @param t interpolation amount, in the range [0-1], between the two inputs
 * @returns out
 */
export function quatSlerp(out: Quat, a: Readonly<Quat>, b: Readonly<Quat>, t: number): Quat {
    // Compute the cosine of the angle between the two quaternions
    let cosHalfTheta = quatDot(a, b);
    let bx = b.x, by = b.y, bz = b.z, bw = b.w;

    // If the dot product is negative, negate one quaternion to take the shorter path (double cover issue)
    if (cosHalfTheta < 0) {
        bx = -bx;
        by = -by;
        bz = -bz;
        bw = -bw;
        cosHalfTheta = -cosHalfTheta;
    }

    if (cosHalfTheta >= 1.0) {
        return quatSet(out, a.x, a.y, a.z, a.w);
    }

    const halfTheta = Math.acos(cosHalfTheta);
    const sinHalfTheta = Math.sqrt(1.0 - cosHalfTheta * cosHalfTheta); // Compute the sine of the angle using the identity sin^2 + cos^2 = 1

    if (Math.abs(sinHalfTheta) < 0.001) {
        return quatSet(
            out,
            0.5 * (a.x + b.x),
            0.5 * (a.y + b.y),
            0.5 * (a.z + b.z),
            0.5 * (a.w + b.w),
        );
    }

    const ratioA = Math.sin((1 - t) * halfTheta) / sinHalfTheta;
    const ratioB = Math.sin(t * halfTheta) / sinHalfTheta;

    return quatSet(
        out,
        a.x * ratioA + b.x * ratioB,
        a.y * ratioA + b.y * ratioB,
        a.z * ratioA + b.z * ratioB,
        a.w * ratioA + b.w * ratioB,
    );
}

