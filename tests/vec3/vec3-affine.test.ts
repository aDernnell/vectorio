import { describe, expect, it } from 'vitest';
import { vec3, VEC3_X, VEC3_Y, VEC3_Z, VEC3_ZERO } from '../../src/vec3/vec3-core';
import { vec3MatTransform, vec3QuatTransform, vec3RotateX, vec3RotateY, vec3RotateZ } from '../../src/vec3/vec3-affine';
import { quatFillRotation } from '../../src/quat/quat-rot';
import { mat3 } from '../../src/mat3/mat3-core';
import { quat } from '../../src/quat/quat-core';
import { mat3FillRotation, mat3FillScale, mat3Scale, mat3Translate, mat3Rotate } from '../../src/mat3';
import { vec2 } from '../../src/vec2';

describe('vec3-affine', function () {
    const out = vec3();

    describe('scale', function () {
        it('transforms a vector by a 2D scale matrix', () => {
            const m = mat3FillScale(mat3(), vec2(2, 3));
            vec3MatTransform(out, vec3(1, 2, 1), m);
            expect(out).toEqualVec(vec3(2, 6, 1));
        });
    });

    describe('rotation', function () {
        it('rotates a 3D vector around the X axis', () => {
            // rotation is left-handed:
            // clockwise when looking from the tip of the rotation axis towards the origin
            vec3RotateX(out, VEC3_Y, VEC3_ZERO, Math.PI / 2);
            expect(out).toEqualVec(VEC3_Z);
        });

        it('rotates a 3D vector around the Y axis', () => {
            // rotation is left-handed:
            // clockwise when looking from the tip of the rotation axis towards the origin
            vec3RotateY(out, VEC3_Z, VEC3_ZERO, Math.PI / 2);
            expect(out).toEqualVec(VEC3_X);
        });

        it('rotates a 3D vector around the Z axis', () => {
            // rotation is left-handed:
            // clockwise when looking from the tip of the rotation axis towards the origin
            vec3RotateZ(out, VEC3_X, VEC3_ZERO, Math.PI / 2);
            expect(out).toEqualVec(VEC3_Y);
        });

        it('transforms a 2D vector by a 2D rotation matrix', () => {
            const m = mat3FillRotation(mat3(), Math.PI / 2);
            // 2D rotations are counter-clockwise when the origin is the bottom-left corner of the screen (X right, Y up),
            // so a 90° rotation transforms X -> Y
            // This is equivalent to a left-handed rotation around the Z axis in 3D space
            vec3MatTransform(out, vec3(1, 0, 0), m);
            expect(out).toEqualVec(vec3(0, 1, 0));
        });

        it('transforms a 3D vector by a quaternion', () => {
            const q = quat();
            quatFillRotation(q, VEC3_X, Math.PI / 2);
            vec3QuatTransform(out, vec3(1, 2, 3), q);
            expect(out).toEqualVec(vec3(1, -3, 2));
        });

        it('interprets quaternion rotations as left-handed', () => {
            const q = quat();

            // rotation is left-handed:
            // clockwise when looking from the tip of the rotation axis towards the origin

            quatFillRotation(q, VEC3_X, Math.PI / 2); // 90° around X axis
            // transforms Y -> Z
            vec3QuatTransform(out, VEC3_Y, q);
            expect(out).toEqualVec(VEC3_Z);

            quatFillRotation(q, VEC3_Y, Math.PI / 2); // 90° around Y axis
            // transforms Z -> X
            vec3QuatTransform(out, VEC3_Z, q);
            expect(out).toEqualVec(VEC3_X);

            quatFillRotation(q, VEC3_Z, Math.PI / 2); // 90° around Z axis
            // transforms X -> Y
            vec3QuatTransform(out, VEC3_X, q);
            expect(out).toEqualVec(VEC3_Y);
        });
    });

    describe('translation', function () {
        it('transforms a 2D vector by a 2D translation matrix', () => {
            const m = mat3();
            mat3Translate(m, m, vec2(2, 3));
            vec3MatTransform(out, vec3(1, 1, 1), m);
            expect(out).toEqualVec(vec3(3, 4, 1));
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
            expect(out).toEqualVec(vec3(-3, 3, 1));
        });
    });
});
