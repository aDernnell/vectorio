import type { Quat } from './quat-core';
import { quatReset, quatSet } from './quat-core';
import { vec3, vec3Set, type Vec3 } from '../vec3/vec3-core';
import { vec3Cross, vec3Dot } from '../vec3';
import { quatNormalize } from './quat-unary-ops';
import { EPSILON } from '../utils';

/**
 * Fills a quaternion with a rotation defined by an axis and an angle.
 * @param out The output quaternion.
 * @param axis The axis of rotation (must be normalized).
 * @param rad The angle of rotation in radians.
 * @returns The output quaternion with values set to represent the rotation.
 */
export function quatFillRotation(out: Quat, axis: Readonly<Vec3>, rad: number): Quat {
    // https://gabormakesgames.com/blog_quats_create.html
    const halfAngle = rad * 0.5;
    const sinHalfTheta = Math.sin(halfAngle);
    const cosHalfTheta = Math.cos(halfAngle);

    return quatSet(out, axis.x * sinHalfTheta, axis.y * sinHalfTheta, axis.z * sinHalfTheta, cosHalfTheta);
}

/**
 * Rotates a quaternion by the given angle about the X axis.
 * 
 * If q already represents a rotation, the resulting quaternion will represent 
 * the rotation around the X axis followed by the rotation represented by q.
 * 
 * out = q * qx
 *
 * @param out The output quaternion to apply the rotation to.
 * @param q quat to rotate
 * @param rad angle (in radians) to rotate
 * @returns The output quaternion with the rotation applied.
 */
export function quatRotateX(out: Quat, q: Readonly<Quat>, rad: number): Quat {
    const halfAngle = rad * 0.5;
    const sinHalfTheta = Math.sin(halfAngle);
    const cosHalfTheta = Math.cos(halfAngle);

    return quatSet(
        out,
        q.x * cosHalfTheta + q.w * sinHalfTheta,
        q.y * cosHalfTheta + q.z * sinHalfTheta,
        q.z * cosHalfTheta - q.y * sinHalfTheta,
        q.w * cosHalfTheta - q.x * sinHalfTheta,
    );
}

/**
 * Rotates a quaternion by the given angle about the Y axis.
 * 
 * If q already represents a rotation, the resulting quaternion will represent 
 * the rotation around the Y axis followed by the rotation represented by q.
 * 
 * out = q * qy
 *
 * @param out The output quaternion to apply the rotation to.
 * @param q quat to rotate
 * @param rad angle (in radians) to rotate
 * @returns The output quaternion with the rotation applied.
 */
export function quatRotateY(out: Quat, q: Readonly<Quat>, rad: number): Quat {
    const halfAngle = rad * 0.5;
    const sinHalfTheta = Math.sin(halfAngle);
    const cosHalfTheta = Math.cos(halfAngle);

    return quatSet(
        out,
        q.x * cosHalfTheta - q.z * sinHalfTheta,
        q.y * cosHalfTheta + q.w * sinHalfTheta,
        q.z * cosHalfTheta + q.x * sinHalfTheta,
        q.w * cosHalfTheta - q.y * sinHalfTheta,
    );
}

/**
 * Rotates a quaternion by the given angle about the Z axis.
 * 
 * If q already represents a rotation, the resulting quaternion will represent 
 * the rotation around the Z axis followed by the rotation represented by q.
 * 
 * out = q * qz
 *
 * @param out The output quaternion to apply the rotation to.
 * @param q quat to rotate
 * @param rad angle (in radians) to rotate
 * @returns The output quaternion with the rotation applied.
 */
export function quatRotateZ(out: Quat, q: Readonly<Quat>, rad: number): Quat {
    const halfAngle = rad * 0.5;
    const sinHalfTheta = Math.sin(halfAngle);
    const cosHalfTheta = Math.cos(halfAngle);

    return quatSet(
        out,
        q.x * cosHalfTheta + q.y * sinHalfTheta,
        q.y * cosHalfTheta - q.x * sinHalfTheta,
        q.z * cosHalfTheta + q.w * sinHalfTheta,
        q.w * cosHalfTheta - q.z * sinHalfTheta,
    );
}

/**
 * Creates a quaternion from Euler angles (in radians).
 * 
 * Rotations are applied in ZYX extrinsic order:
 * ```
 * 1. rotates around world Z axis
 * 2. rotates around world Y axis
 * 3. rotates around world X axis
 * ```
 * This is equivalent to applying the rotations in XYZ intrinsic order:
 * ```
 * 1. rotates around local X axis
 * 2. rotates around previously rotated local Y axis
 * 3. rotates around previously rotated local Z axis
 * ```
 * In a left-handed coordinate system, it means: 
 * ```
 * 1. pitch (Nose up/down)
 * 2. yaw (Turn left/right)
 * 3. roll (Tilts left/right: wings up/down)
 * ```
 * Result corresponds to the following quaternion multiplication:
 * `out = qx * qy * qz`
 * where qx, qy, qz are the quaternions representing the rotations around the X, Y and Z world axes respectively.
 * 
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
 * @param a The starting vector (must be normalized).
 * @param b The target vector (must be normalized).
 * @returns The output quaternion with values set to represent the rotation.
 */
export const quatFillRotationTo = (function () {
    // We define a global temporary axis vector, scoped to the function, to avoid allocating a new one on each call.
    const tmpAxis = vec3(0, 0, 0);

    return function (out: Quat, q1: Readonly<Vec3>, q2: Readonly<Vec3>): Quat {
        const dot = vec3Dot(q1, q2);

        if (dot < -1 + EPSILON) {
            // If the vectors are nearly opposite, we need to find an orthogonal vector to use as the rotation axis.
            if (Math.abs(q1.x) > Math.abs(q1.z)) {
                vec3Set(tmpAxis, -q1.y, q1.x, 0);
            } else {
                vec3Set(tmpAxis, 0, -q1.z, q1.y);
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

        vec3Cross(tmpAxis, q1, q2);
        quatSet(out, tmpAxis.x, tmpAxis.y, tmpAxis.z, 1 + dot);
        return quatNormalize(out, out);

        /**
         * Explanation of the math behind this function:
         * Shortest arc quaternion formula: q = normalize([cross(q1, q2), 1 + dot(q1, q2)])
         * theta is the angle between q1 and q2, and axis is the normalized cross product of q1 and q2.
         *
         * q1 and q2 are normalized, so:
         *  dot(q1, q2) = cos(theta)
         *  length(cross(q1, q2)) = sin(theta)
         *
         * length of the quaternion can be computed as:
         *  mag = sqrt(length(cross(q1, q2))^2 + (1 + dot(q1, q2))^2)
         *  mag = sqrt(sin(theta)^2 + (1 + cos(theta))^2)
         * Since sin(theta)^2 + cos(theta)^2 = 1
         *  mag = sqrt(2 + 2cos(theta))
         *  mag = sqrt(2 * (1 + cos(theta)))
         * Since (1 + cos(theta)) is always positive, we can take the square root of each factor separately:
         *  mag = sqrt(4) * sqrt((1 + cos(theta)) / 2)
         *
         * Using the half-angle identities:
         *  mag = 2 * cosHalfTheta
         *  1 + cos(theta) = 2 * cosHalfTheta^2
         *  sinHalfTheta * cosHalfTheta = sqrt((1 - cos(theta)) / 2) * sqrt((1 + cos(theta)) / 2)
         * Since 1 + cos(theta) and 1 - cos(theta) are always positive, we can merge the square root of each factor:
         *  sinHalfTheta * cosHalfTheta = sqrt((1 - cos(theta)^2) / 4) = sqrt(sin(theta)^2 / 4) = sin(theta) / 2
         * So,
         *  sin(theta) = 2 * sinHalfTheta * cosHalfTheta
         *
         * Therefore, the normalized quaternion is:
         *  q = [cross(q1, q2) / mag, (1 + dot(q1, q2)) / mag]
         *  q = [axis * sin(theta) / mag, (1 + cos(theta)) / mag]
         *  q = [sinHalfTheta * axis, cosHalfTheta]
         *
         * https://gabormakesgames.com/blog_quats_create.html
         */
    };
})();
