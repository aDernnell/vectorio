import { describe, expect, it } from 'vitest';
import { mat3, MAT3_IDENTITY } from '../../src/mat3/mat3-core';
import { mat3Adjugate, mat3Invert, mat3Transpose } from '../../src/mat3/mat3-unary-ops';
import { mat3Multiply } from '../../src/mat3/mat3-binary-ops';

describe('mat3-unary-ops', function () {

    it('transposes', function () {
        const out = mat3();
        mat3Transpose(out, mat3(1, 2, 3, 4, 5, 6, 7, 8, 9));
        expect(out).toEqual(mat3(1, 4, 7, 2, 5, 8, 3, 6, 9));
    });

    it('computes adjugate', function () {
        const out = mat3();
        mat3Adjugate(out, mat3(1, 2, 3, 0, 1, 4, 5, 6, 0));
        expect(out).toEqual(mat3(-24, 18, 5, 20, -15, -4, -5, 4, 1));
    });

    it('inverts invertible matrices', function () {
        const a = mat3(1, 2, 3, 0, 1, 4, 5, 6, 0);
        const inv = mat3();
        mat3Invert(inv, a);
        expect(inv).toEqualMat(mat3(-24, 18, 5, 20, -15, -4, -5, 4, 1));

        const id = mat3();
        mat3Multiply(id, a, inv);
        expect(id).toEqualMat(MAT3_IDENTITY);

        // returns null for singular matrices
        expect(mat3Invert(mat3(), mat3(1, 2, 3, 2, 4, 6, 3, 6, 9))).toBeNull();
    });
});
