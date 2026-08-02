import { describe, expect, it } from 'vitest';
import { vec2, VEC2_RIGHT, VEC2_UP, VEC2_ZERO } from '../../src/vec2/vec2-core';
import { vec2MatTransform, vec2Rotate } from '../../src/vec2/vec2-affine';
import { mat2, mat2FillRotation, mat2FillScale, mat2Rotate, mat2Scale } from '../../src/mat2';

describe('vec2-affine', function () {
    const out = vec2();

    describe('scale', function () {
        it('transforms a vector by a 2D scale matrix', () => {
            const m = mat2FillScale(mat2(), vec2(2, 3));
            vec2MatTransform(out, vec2(1, 2), m);
            expect(out).toEqualVec(vec2(2, 6));
        });
    });

    describe('rotation', function () {
        it('rotates a 2D vector around a point', () => {
            // rotation is counter-clockwise when X points right and Y points up
            vec2Rotate(out, VEC2_RIGHT, VEC2_ZERO, Math.PI / 2);
            expect(out).toEqualVec(VEC2_UP);
        });

        it('transforms a 2D vector by a 2D rotation matrix', () => {
            const m = mat2FillRotation(mat2(), Math.PI / 2);
            // 2D rotations are counter-clockwise when X points right and Y points up,
            // so a 90° rotation transforms X -> Y
            vec2MatTransform(out, VEC2_RIGHT, m);
            expect(out).toEqualVec(VEC2_UP);
        });
    });

    describe('composed transformation', function () {
        it('transforms a 2D vector by a composed rotation and scale matrix', () => {
            const m = mat2();
            // M = R * S
            // scale first, then rotate
            mat2Rotate(m, m, Math.PI / 2);
            mat2Scale(m, m, vec2(2, 4));

            vec2MatTransform(out, vec2(1, 1), m); // v' = R * S * v
            expect(out).toEqualVec(vec2(-4, 2));
        });
    });
});
