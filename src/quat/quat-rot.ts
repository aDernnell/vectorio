import type { Quat } from './quat-core';
import { quatReset, quatSet } from './quat-core';
import { vec3, vec3Set, type Vec3 } from '../vec3/vec3-core';
import { vec3Cross, vec3Dot } from '../vec3';
import { quatNormalize } from './quat-unary-ops';
import { EPSILON } from '../utils';

/**
 * Fills a quaternion with a rotation defined by an axis and an angle.
 * @param out The output quaternion.
 * @param axis The axis of rotation (should be normalized).
 * @param rad The angle of rotation in radians.
 * @returns The output quaternion with values set to represent the rotation.
 */
export function quatFillRotation(out: Quat, axis: Readonly<Vec3>, rad: number): Quat {
    const halfAngle = rad * 0.5;
    const s = Math.sin(halfAngle);
    const c = Math.cos(halfAngle);

    return quatSet(out, axis.x * s, axis.y * s, axis.z * s, c);
}

/**
 * Rotates a quaternion by the given angle about the X axis
 *
 * @param out The output quaternion to apply the rotation to.
 * @param a quat to rotate
 * @param rad angle (in radians) to rotate
 * @returns The output quaternion with the rotation applied.
 */
export function quatRotateX(out: Quat, a: Readonly<Quat>, rad: number): Quat {
    rad *= 0.5;

    let bx = Math.sin(rad),
        bw = Math.cos(rad);

    return quatSet(out, a.x * bw + a.w * bx, a.y * bw + a.z * bx, a.z * bw - a.y * bx, a.w * bw - a.x * bx);
}

/**
 * Rotates a quaternion by the given angle about the Y axis
 *
 * @param out The output quaternion to apply the rotation to.
 * @param a quat to rotate
 * @param rad angle (in radians) to rotate
 * @returns The output quaternion with the rotation applied.
 */
export function quatRotateY(out: Quat, a: Readonly<Quat>, rad: number): Quat {
    rad *= 0.5;

    let by = Math.sin(rad),
        bw = Math.cos(rad);

    return quatSet(out, a.x * bw - a.z * by, a.y * bw + a.w * by, a.z * bw + a.x * by, a.w * bw - a.y * by);
}

/**
 * Rotates a quaternion by the given angle about the Z axis
 *
 * @param out The output quaternion to apply the rotation to.
 * @param a quat to rotate
 * @param rad angle (in radians) to rotate
 * @returns The output quaternion with the rotation applied.
 */
export function quatRotateZ(out: Quat, a: Readonly<Quat>, rad: number): Quat {
    rad *= 0.5;

    let bz = Math.sin(rad),
        bw = Math.cos(rad);

    return quatSet(out, a.x * bw + a.y * bz, a.y * bw - a.x * bz, a.z * bw + a.w * bz, a.w * bw - a.z * bz);
}

/**
 * Creates a quaternion from Euler angles (in radians).
 * The extrinsic order of rotations is ZYX:
 * v' = qz * qy * qx * v
 * Yaw is applied first (world X axis), then pitch (world Y axis), then roll (world Z axis).
 * @param out The output quaternion.
 * @param x The rotation angle around the X axis in radians.
 * @param y The rotation angle around the Y axis in radians.
 * @param z The rotation angle around the Z axis in radians.
 * @returns The output quaternion with values set to represent the rotation.
 */
export function quatFillEuler(out: Quat, x: number, y: number, z: number): Quat {
    const halfX = x * 0.5;
    const halfY = y * 0.5;
    const halfZ = z * 0.5;

    const sinX = Math.sin(halfX);
    const cosX = Math.cos(halfX);
    const sinY = Math.sin(halfY);
    const cosY = Math.cos(halfY);
    const sinZ = Math.sin(halfZ);
    const cosZ = Math.cos(halfZ);

    return quatSet(
        out,
        sinX * cosY * cosZ + cosX * sinY * sinZ,
        cosX * sinY * cosZ - sinX * cosY * sinZ,
        cosX * cosY * sinZ + sinX * sinY * cosZ,
        cosX * cosY * cosZ - sinX * sinY * sinZ,
    );
}

/**
 * Fills a quaternion with the rotation required to rotate vector a to vector b.
 * The output quaternion is normalized and represents the shortest rotation from a to b.
 *
 * @param out The output quaternion.
 * @param a The starting vector (should be normalized).
 * @param b The target vector (should be normalized).
 * @returns The output quaternion with values set to represent the rotation.
 */
export const quatFillRotationTo = (function () {
    // We define a global temporary axis vector, scoped to the function, to avoid allocating a new one on each call.
    const tmpAxis = vec3(0, 0, 0);

    return function (out: Quat, a: Readonly<Vec3>, b: Readonly<Vec3>): Quat {
        const dot = vec3Dot(a, b);

        if (dot < -1 + EPSILON) {
            // If the vectors are nearly opposite, we need to find an orthogonal vector to use as the rotation axis.
            if (Math.abs(a.x) > Math.abs(a.z)) {
                vec3Set(tmpAxis, -a.y, a.x, 0);
            } else {
                vec3Set(tmpAxis, 0, -a.z, a.y);
            }
            // normalize axis
            const len = Math.sqrt(tmpAxis.x * tmpAxis.x + tmpAxis.y * tmpAxis.y + tmpAxis.z * tmpAxis.z);
            if (len > 0) {
                tmpAxis.x /= len;
                tmpAxis.y /= len;
                tmpAxis.z /= len;
            }
            return quatFillRotation(out, tmpAxis, Math.PI);
        }
        if (dot > 1 - EPSILON) {
            // If the vectors are nearly identical, the rotation is zero, so we can return the identity quaternion.
            return quatReset(out);
        }

        vec3Cross(tmpAxis, a, b);
        quatSet(out, tmpAxis.x, tmpAxis.y, tmpAxis.z, 1 + dot);
        return quatNormalize(out, out);

        /**
         * Explanation of the math behind this function:
         * Shortest arc quaternion formula: q = normalize([cross(a, b), 1 + dot(a, b)])
         * 
         * a and b are normalized, so:
         *  dot(a, b) = cos(theta)
         *  length(cross(a, b)) = sin(theta)
         * 
         * length of the quaternion can be computed as:
         *  mag = sqrt(length(cross(a, b))^2 + (1 + dot(a, b))^2) 
         *  mag = sqrt(sin(theta)^2 + (1 + cos(theta))^2)
         * Since sin(theta)^2 + cos(theta)^2 = 1
         *  mag = sqrt(2 + 2cos(theta)) 
         *  mag = sqrt(2 * (1 + cos(theta)))
         * Since 2 and (1 + cos(theta)) are always positive, we can take the square root of each factor separately:
         *  mag = sqrt(4) * sqrt((1 + cos(theta)) / 2)
         * 
         * Using the half-angle identities:
         *  mag = 2 * cosHalfTheta
         *  1 + cos(theta) = 2 * cosHalfTheta^2
         *  sinHalfTheta * cosHalfTheta = sqrt((1 - cos(theta)) / 2) * sqrt((1 + cos(theta)) / 2)
         * Since 1 + cos(theta) and 1 - cos(theta) are always positive, we can merge the square root of each factor:
         *  sinHalfTheta * cosHalfTheta = sqrt((1 - cos(theta)^2) / 4) = sqrt(sin(theta)^2 / 4) = sin(theta) / 2
         * So, sin(theta) = 2 * sinHalfTheta * cosHalfTheta
         * 
         * Therefore, the normalized quaternion is:
         *  q = [cross(a, b) / mag, (1 + dot(a, b)) / mag]
         *  q = [axis * sin(theta) / mag, (1 + cos(theta)) / mag]
         *  q = [sinHalfTheta * axis, cosHalfTheta]
         * 
         * https://gabormakesgames.com/blog_quats_create.html
         */
        
        
    };
})();
