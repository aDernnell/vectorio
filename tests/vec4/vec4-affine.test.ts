import { describe, expect, it } from 'vitest';
import {
    mat4,
    mat4FillRotationX,
    mat4FillRotationY,
    mat4FillRotationZ,
    mat4FillRotationZYX,
    mat4FillScale,
    mat4FillTranslation,
    mat4RotateX,
    mat4Scale,
    mat4Translate
} from '../../src/mat4';
import { vec3, VEC3_X, VEC3_Z, vec3FillTrunc } from '../../src/vec3/vec3-core';
import { vec4MatTransform } from '../../src/vec4/vec4-affine';
import { vec4, vec4FillPad } from '../../src/vec4/vec4-core';

describe('vec4-affine', function () {
    const out = vec4();

    describe('scale', function () {
        it('transforms a vector by a 3D scale matrix', () => {
            const m = mat4FillScale(mat4(), vec4(2, 3, 4, 1));
            vec4MatTransform(out, vec4(1, 2, 3, 1), m);
            expect(out).toEqualVec(vec4(2, 6, 12, 1));
        });
    });

    describe('rotation', function () {
        it('transforms a 3D vector by a 3D rotation matrix', () => {
            const euler = vec3(Math.PI / 2, 0, Math.PI / 2); // 90° around X, 0° around Y, 90° around Z
            const m = mat4FillRotationZYX(mat4(), vec4FillPad(vec4(), euler));

            vec4MatTransform(out, vec4FillPad(vec4(), VEC3_Z), m);
            expect(vec3FillTrunc(vec3(), out)).toEqualVec(VEC3_X);
        });

        it('interprets 3D rotation matrices as left-handed', () => {
            const m = mat4();

            // rotation is left-handed:
            // clockwise when looking from the tip of the rotation axis towards the origin

            mat4FillRotationX(m, Math.PI / 2); // 90° around X axis
            // transforms Y -> Z
            vec4MatTransform(out, vec4(0, 1, 0, 1), m);
            expect(out).toEqualVec(vec4(0, 0, 1, 1));

            mat4FillRotationY(m, Math.PI / 2); // 90° around Y axis
            // transforms Z -> X
            vec4MatTransform(out, vec4(0, 0, 1, 1), m);
            expect(out).toEqualVec(vec4(1, 0, 0, 1));

            mat4FillRotationZ(m, Math.PI / 2); // 90° around Z axis
            // transforms X -> Y
            vec4MatTransform(out, vec4(1, 0, 0, 1), m);
            expect(out).toEqualVec(vec4(0, 1, 0, 1));
        });
    });

    describe('translation', function () {
        it('transforms a 3D vector by a 3D translation matrix', () => {
            const m = mat4FillTranslation(mat4(), vec3(2, 3, 4));

            vec4MatTransform(out, vec4(1, 1, 1, 1), m);
            expect(out).toEqualVec(vec4(3, 4, 5, 1));
        });
    });

    describe('composed transformation', function () {
        it('transforms a 3D vector by a 3D transformation matrix', () => {
            const m = mat4();
            // M = T * R * S
            // scale first, then rotate, then translate
            mat4Translate(m, m, vec3(1, 1, 1));
            mat4RotateX(m, m, Math.PI / 2);
            mat4Scale(m, m, vec4(2, 3, 4, 1));

            vec4MatTransform(out, vec4(1, 1, 1, 1), m); // v' = T * R * S * v
            expect(out).toEqualVec(vec4(3, -3, 4, 1));
        });
    });
});
