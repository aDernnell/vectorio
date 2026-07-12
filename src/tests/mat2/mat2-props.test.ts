import { describe, expect, it } from 'vitest';
import { mat2, mat2Set } from '../../mat2/mat2-core';
import { mat2Det, mat2Frob } from '../../mat2/mat2-props';

describe('mat2-props', function () {
    it('computes determinant', function () {
        const m = mat2();
        expect(mat2Det(m)).toBe(1);

        mat2Set(m, 1, 2, 3, 4);
        expect(mat2Det(m)).toBe(-2);
    });

    it('computes frobenius norm', function () {
        const m = mat2();
        expect(mat2Frob(m)).toBeCloseTo(Math.sqrt(2), 6);

        mat2Set(m, 1, 2, 3, 4);
        expect(mat2Frob(m)).toBeCloseTo(Math.sqrt(30), 6);
    });
});
