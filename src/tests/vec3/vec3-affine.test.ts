import { describe, expect, it } from 'vitest';
import { vec3, VEC3_X, VEC3_Y, VEC3_Z, VEC3_ZERO, vec3Equals } from '../../vec3/vec3-core';
import {
    vec3MatTransform,
    vec3QuatTransform,
    vec3RotateX,
    vec3RotateY,
    vec3RotateZ,
    vec3Scale,
} from '../../vec3/vec3-affine';
import { quatFillRotation } from '../../quat/quat-rot';
import { mat3 } from '../../mat3/mat3-core';
import { quat } from '../../quat/quat-core';
import { mat3FillRotation, mat3FillScale, mat3Scale, mat3Translate, mat3Rotate } from '../../mat3';
import { vec2 } from '../../vec2';

describe('vec3-affine', function () {
    const out = vec3();

    describe('scale', function () {
        it('scales a vector', () => {
            vec3Scale(out, vec3(2, -4, 1), 2);
            expect(vec3Equals(out, vec3(4, -8, 2))).toBe(true);
        });
        it('transforms a vector by a 2D scale matrix', () => {
            const m = mat3FillScale(mat3(), vec2(2, 3));
            vec3MatTransform(out, vec3(1, 2, 1), m);
            expect(vec3Equals(out, vec3(2, 6, 1))).toBe(true);
        });
    });

    describe('rotation', function () {
        it('rotates a 3D vector around the X axis', () => {
            // rotation is left-handed:
            // clockwise when looking from the tip of the rotation axis towards the origin
            vec3RotateX(out, VEC3_Y, VEC3_ZERO, Math.PI / 2);
            expect(vec3Equals(out, VEC3_Z)).toBe(true);
        });

        it('rotates a 3D vector around the Y axis', () => {
            // rotation is left-handed:
            // clockwise when looking from the tip of the rotation axis towards the origin
            vec3RotateY(out, VEC3_Z, VEC3_ZERO, Math.PI / 2);
            expect(vec3Equals(out, VEC3_X)).toBe(true);
        });

        it('rotates a 3D vector around the Z axis', () => {
            // rotation is left-handed:
            // clockwise when looking from the tip of the rotation axis towards the origin
            vec3RotateZ(out, VEC3_X, VEC3_ZERO, Math.PI / 2);
            expect(vec3Equals(out, VEC3_Y)).toBe(true);
        });

        it('transforms a 2D vector by a 2D rotation matrix', () => {
            const m = mat3FillRotation(mat3(), Math.PI / 2);
            // 2D rotations are counter-clockwise when the origin is the bottom-left corner of the screen (X right, Y up),
            // so a 90° rotation transforms X -> Y
            // This is equivalent to a left-handed rotation around the Z axis in 3D space
            vec3MatTransform(out, vec3(1, 0, 0), m);
            expect(vec3Equals(out, vec3(0, 1, 0))).toBe(true);
        });

        it('transforms a 3D vector by a quaternion', () => {
            const q = quat();
            quatFillRotation(q, VEC3_X, Math.PI / 2);
            vec3QuatTransform(out, vec3(1, 2, 3), q);
            expect(vec3Equals(out, vec3(1, -3, 2))).toBe(true);
        });

        it('interprets quaternion rotations as left-handed', () => {
            const q = quat();

            // rotation is left-handed:
            // clockwise when looking from the tip of the rotation axis towards the origin

            quatFillRotation(q, VEC3_X, Math.PI / 2); // 90° around X axis
            // transforms Y -> Z
            vec3QuatTransform(out, VEC3_Y, q);
            expect(vec3Equals(out, VEC3_Z)).toBe(true);

            quatFillRotation(q, VEC3_Y, Math.PI / 2); // 90° around Y axis
            // transforms Z -> X
            vec3QuatTransform(out, VEC3_Z, q);
            expect(vec3Equals(out, VEC3_X)).toBe(true);

            quatFillRotation(q, VEC3_Z, Math.PI / 2); // 90° around Z axis
            // transforms X -> Y
            vec3QuatTransform(out, VEC3_X, q);
            expect(vec3Equals(out, VEC3_Y)).toBe(true);
        });
    });

    describe('composed transformation', function () {
        it('transforms a 2D vector by a 2D transformation matrix', () => {
            const m = mat3();
            // M = T * R * S
            // scale first, then rotate, then translate 
            mat3Translate(m, m, vec2(1, 1)); 
            mat3Rotate(m, m, Math.PI / 2);        
            mat3Scale(m, m, vec2(2, 4));

            vec3MatTransform(out, vec3(1, 1, 1), m); // v' = T * R * S * v
            expect(vec3Equals(out, vec3(-3, 3, 1))).toBe(true);
        });
    });
});
