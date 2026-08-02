import { describe, expect, it } from 'vitest';
import { mat4, MAT4_IDENTITY } from '../../src/mat4/mat4-core';
import { mat4Adjugate, mat4Invert, mat4Transpose } from '../../src/mat4/mat4-unary-ops';
import { mat4Multiply } from '../../src/mat4/mat4-binary-ops';

describe('mat4-unary-ops', function () {
    it('transposes', function () {
        const out = mat4();
        mat4Transpose(out, mat4(1, 2, 3, 4, 0, 1, 4, 5, 5, 6, 0, 7, 1, 0, 0, 1));
        expect(out).toEqual(mat4(1, 0, 5, 1, 2, 1, 6, 0, 3, 4, 0, 0, 4, 5, 7, 1));
    });

    it('computes adjugate', function () {
        const out = mat4();
        mat4Adjugate(out, mat4(1, 2, 3, 4, 0, 1, 4, 5, 5, 6, 0, 7, 1, 0, 0, 1));
        expect(out).toEqual(mat4(-24, 18, 5, -29, -8, 6, -3, 23, -28, 14, 7, -7, 24, -18, -5, 1));
    });

    it('inverts invertible matrices', function () {
        const a = mat4(1, 2, 3, 4, 0, 1, 4, 5, 5, 6, 0, 7, 1, 0, 0, 1);
        const inv = mat4();
        mat4Invert(inv, a);
        // prettier-ignore
        expect(inv).toEqualMat(mat4(
            6 / 7, -9 / 14, -5 / 28, 29 / 28,
            2 / 7, -3 / 14, 3 / 28, -23 / 28,
            1, -1 / 2, -1 / 4, 1 / 4,
            -6 / 7, 9 / 14, 5 / 28, -1 / 28,
        ));

        const id = mat4();
        mat4Multiply(id, a, inv);
        expect(id).toEqualMat(MAT4_IDENTITY);

        // returns null for singular matrices
        expect(mat4Invert(mat4(), mat4(1, 2, 3, 4, 2, 4, 6, 8, 0, 0, 1, 0, 0, 0, 0, 1))).toBeNull();
    });
});
