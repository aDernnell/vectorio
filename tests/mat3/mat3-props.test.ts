import { describe, expect, it } from 'vitest';
import { mat3 } from '../../src/mat3/mat3-core';
import { mat3Det, mat3Frob } from '../../src/mat3/mat3-props';

describe('mat3-props', function () {

    it('computes determinant', function () {
        expect(mat3Det(mat3(1, 2, 3, 4, 5, 6, 7, 8, 9))).toBe(0);
        expect(mat3Det(mat3())).toBe(1);
    });

    it('computes frobenius norm', function () {
        expect(mat3Frob(mat3(1, 2, 3, 4, 5, 6, 7, 8, 9))).toBeCloseTo(Math.sqrt(285), 6);
    });
});
