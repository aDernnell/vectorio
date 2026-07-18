import type { Quat } from './quat-core';
import { vec3Set, type Vec3 } from '../vec3/vec3-core';
import { EPSILON } from '../utils';

/**
 * Extracts the axis and angle of rotation from a quaternion.
 * This method favors positive angles (exemple: 270° instead of -90°).
 * If the quaternion represents no rotation, the axis will be set to (1, 0, 0) and the angle will be 0.
 * @param out The output axis of rotation.
 * @param quat The input quaternion.
 * @returns The angle of rotation in radians.
 */
export function extractAxisAngle(out: Vec3, quat: Readonly<Quat>): number {
    // acos returns NaN if its parameter is even slightly outside [-1,1], hence the clamping to [-1,1].
    let theta = 2 * Math.acos(Math.min(Math.max(quat.w, -1), 1)); // w = cos(theta/2)
    const sinHalfTheta = Math.sin(theta * 0.5);

    // If sin is close to zero, the quaternion represent an invalid rotation or no rotation,
    if (sinHalfTheta < EPSILON) {
        vec3Set(out, 1, 0, 0); // we can set the axis to any arbitrary unit vector.
        return 0; // No rotation
    }

    vec3Set(out, quat.x / sinHalfTheta, quat.y / sinHalfTheta, quat.z / sinHalfTheta);
    return theta;
}
