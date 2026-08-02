import { describe, expect, it } from 'vitest';
import { mat4 } from '../../src/mat4/mat4-core';
import { mat4Det, mat4Frob } from '../../src/mat4/mat4-props';

describe('mat4-props', function () {

    it('computes determinant', function () {
        expect(mat4Det(mat4(1, 2, 3, 4, 0, 1, 4, 5, 5, 6, 0, 7, 1, 0, 0, 1))).toBe(-28);
        expect(mat4Det(mat4())).toBe(1);
    });

    it('computes frobenius norm', function () {
        expect(mat4Frob(mat4(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16))).toBeCloseTo(Math.sqrt(1496), 6);
    });
});
