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
    // acos returns NaN if its parameter is even slightly outside [-1,1]
    let rad = Math.acos(Math.min(Math.max(quat.w, -1), 1)) * 2;
    const s = Math.sin(rad / 2.0);
    if (s > EPSILON) {
        vec3Set(out, quat.x / s, quat.y / s, quat.z / s);
    } else {
        // If s is close to zero, return any axis (not a valid rotation)
        vec3Set(out, 1, 0, 0);
        rad = 0; // No rotation
    }
    return rad;
}