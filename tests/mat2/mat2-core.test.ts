import { describe, expect, it } from 'vitest';
import { mat2, MAT2_IDENTITY, mat2Clone, mat2FillArr, mat2FillTrunc, mat2Reset, mat2Set, mat2StrictEquals, mat2Stringify, mat2Equals } from '../../src/mat2/mat2-core';
import { mat3 } from '../../src/mat3/mat3-core';

describe('mat2-core', function () {
    it('creates an identity matrix', function () {
        const m = mat2();
        expect(m).toEqual(MAT2_IDENTITY);
    });

    it('creates a matrix with values', function () {
        const m = mat2(1, 2, 3, 4);
        expect(m).toEqual({ m00: 1, m01: 2, m10: 3, m11: 4 });
    });

    it('sets matrix values', function () {
        const m = mat2();
        mat2Set(m, 1, 2, 3, 4);
        expect(m).toEqual({ m00: 1, m01: 2, m10: 3, m11: 4 });
    });

    it('clones a matrix', function () {
        const m = mat2(1, 2, 3, 4);
        const copy = mat2Clone(m);
        expect(copy).not.toBe(m);
        expect(copy).toEqual(m);
    });

    it('resets a matrix to identity', function () {
        const m = mat2(1, 2, 3, 4);
        mat2Reset(m);
        expect(m).toEqual(MAT2_IDENTITY);
    });

    it('fills from truncation', function () {
        const m = mat2();
        mat2FillTrunc(m, mat3(1, 2, 9, 3, 4, 9, 9, 9, 9));
        expect(m).toEqual(mat2(1, 2, 3, 4));
    });

    it('fills from array', function () {
        const m = mat2();
        mat2FillArr(m, [1, 3, 2, 4]);
        expect(m).toEqual(mat2(1, 2, 3, 4));

        // throws when filling with fewer than four values
        expect(() => mat2FillArr(m, [1, 2, 3])).toThrow('Array must have at least 4 elements');
    });

    it('compares matrices with strict equality', function () {
        const a = mat2(1, 2, 3, 4);
        const b = mat2(1 + 5e-7, 2, 3, 4 - 5e-7);
        expect(mat2StrictEquals(a, a)).toBe(true);
        expect(mat2StrictEquals(a, b)).toBe(false);
    });

    it('compares matrices with epsilon equality', function () {
        const a = mat2(1, 2, 3, 4);
        const b = mat2(1 + 5e-7, 2, 3, 4 - 5e-7);
        const c = mat2(1 + 5e-6, 2, 3, 4 - 5e-6);
        expect(mat2Equals(a, a)).toBe(true);
        expect(mat2Equals(a, b)).toBe(true);
        expect(mat2Equals(a, c)).toBe(false);
    });

    it('stringifies a matrix', function () {
        const a = mat2(1, 2, 3, 4);
        expect(mat2Stringify(a)).toBe('mat2x2(1, 2, 3, 4)');
    });
});
