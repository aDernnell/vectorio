import { describe, expect, it } from 'vitest';
import { quatMultiply } from '../../quat/quat-binary-ops';
import { quat } from '../../quat/quat-core';
import { quatFillRotation } from '../../quat/quat-rot';
import { vec3, VEC3_FORWARD, VEC3_RIGHT, VEC3_UP, vec3Equals, vec3QuatTransform } from '../../vec3';

describe('quat-rot', () => {
    const out = quat();

    describe('fillRotation', () => {
        it('fills a quaternion from axis-angle', () => {
            quatFillRotation(out, VEC3_UP, Math.PI / 2);
            expect(out).toEqual({
                x: 0,
                y: Math.sin(Math.PI / 4),
                z: 0,
                w: Math.cos(Math.PI / 4),
            });
        });

        it('rotates in left-handed direction', () => {
            const v = vec3();

            // rotation should be clockwise when looking from the tip of the axis vector towards the origin (left-handed rotation)

            quatFillRotation(out, VEC3_RIGHT, Math.PI / 2); // 90° around X axis
            // transforms UP -> FORWARD
            vec3QuatTransform(v, VEC3_UP, out);
            expect(vec3Equals(v, VEC3_FORWARD)).toBe(true);

            quatFillRotation(out, VEC3_UP, Math.PI / 2); // 90° around Y axis
            // transforms FORWARD -> RIGHT
            vec3QuatTransform(v, VEC3_FORWARD, out);
            expect(vec3Equals(v, VEC3_RIGHT)).toBe(true);

            quatFillRotation(out, VEC3_FORWARD, Math.PI / 2); // 90° around Z axis
            // transforms RIGHT -> UP
            vec3QuatTransform(v, VEC3_RIGHT, out);
            expect(vec3Equals(v, VEC3_UP)).toBe(true);
        });

        it('rotates composed rotations in left-handed direction', () => {
            const qx = quatFillRotation(quat(), VEC3_RIGHT, Math.PI / 2); // 90° around X axis
            const qy = quatFillRotation(quat(), VEC3_UP, Math.PI / 2); // 90° around Y axis
            quatMultiply(out, qy, qx); // qx first, then qy: v' = qy * qx * v

            const v = vec3();

            // transforms UP -> FORWARD -> RIGHT
            vec3QuatTransform(v, VEC3_UP, out);
            expect(vec3Equals(v, VEC3_RIGHT)).toBe(true);
        });
    });
});
