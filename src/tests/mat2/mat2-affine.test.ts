import { describe, expect, it } from 'vitest';
import { mat2, MAT2_IDENTITY, mat2Equals } from '../../mat2/mat2-core';
import { mat2FillRotation, mat2FillScale, mat2Rotate, mat2Scale } from '../../mat2/mat2-affine';
import { vec2 } from '../../vec2/vec2-core';

describe('mat2-affine', function () {
    it('rotates', function () {
        const m = mat2();
        mat2Rotate(m, m, Math.PI / 2);
        expect(mat2Equals(m, mat2(0, -1, 1, 0))).toBe(true);
    });

    it('fills rotation', function () {
        const m = mat2();
        mat2FillRotation(m, Math.PI / 2);
        expect(mat2Equals(m, mat2(0, -1, 1, 0))).toBe(true);
    });
    
    it('scales', function () {
        const m = mat2();
        mat2Scale(m, m, vec2(2, 3));
        expect(mat2Equals(m, mat2(2, 0, 0, 3))).toBe(true);
    });

    it('fills scale', function () {
        const m = mat2();
        mat2FillScale(m, vec2(2, 3));
        expect(mat2Equals(m, mat2(2, 0, 0, 3))).toBe(true);
    });

    it('composes rotation and scaling', function () {
        const m = mat2(); // m = I
        mat2Rotate(m, m, Math.PI / 2); // m = m * R
        mat2Scale(m, m, vec2(2, 3)); // m = (m * R) * S

        /*
         *         | 0 -1 |   | 2 0 |   | 0 -3 |
         * R*S =   | 1  0 | * | 0 3 | = | 2  0 |
         */
        expect(mat2Equals(m, mat2(0, -3, 2, 0))).toBe(true);
    });
});
