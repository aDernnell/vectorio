import { describe, expect, it } from 'vitest';
import { mat2, MAT2_IDENTITY, mat2Equals } from '../../mat2/mat2-core';
import { mat2Adjugate, mat2Invert, mat2Transpose } from '../../mat2/mat2-unary-ops';
import { mat2Multiply } from '../../mat2/mat2-binary-ops';

describe('mat2-unary-ops', function () {
    it('transposes', function () {
        const out = mat2();
        mat2Transpose(out, mat2(1, 2, 3, 4));
        expect(out).toEqual(mat2(1, 3, 2, 4));
    });

    it('computes adjugate', function () {
        const out = mat2();
        mat2Adjugate(out, mat2(1, 2, 3, 4));
        expect(out).toEqual(mat2(4, -2, -3, 1));
    });

    it('inverts invertible matrices', function () {
        const inv = mat2();
        mat2Invert(inv, mat2(2, 0, 0, 4));
        expect(mat2Equals(inv, mat2(0.5, 0, 0, 0.25))).toBe(true);

        const id = mat2();
        mat2Multiply(id, mat2(2, 0, 0, 4), inv);
        expect(mat2Equals(id, MAT2_IDENTITY)).toBe(true);

        // returns null for singular matrices
        expect(mat2Invert(mat2(), mat2(1, 2, 2, 4))).toBeNull();
    });
});
