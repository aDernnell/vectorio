import { describe, expect, it } from 'vitest';
import {
    mat3,
    MAT3_IDENTITY,
    mat3Clone,
    mat3Equals,
    mat3FillArr,
    mat3FillPad,
    mat3FillTrunc,
    mat3Reset,
    mat3Set,
    mat3StrictEquals,
    mat3Stringify,
} from '../../src/mat3/mat3-core';
import { mat2 } from '../../src/mat2/mat2-core';
import { mat4 } from '../../src/mat4/mat4-core';

describe('mat3-core', function () {
    it('creates an identity matrix', function () {
        const m = mat3();
        expect(m).toEqual(MAT3_IDENTITY);
    });

    it('creates a matrix with values', function () {
        const m = mat3(1, 2, 3, 4, 5, 6, 7, 8, 9);
        expect(m).toEqual({ m00: 1, m01: 2, m02: 3, m10: 4, m11: 5, m12: 6, m20: 7, m21: 8, m22: 9 });
    });

    it('sets matrix values', function () {
        const m = mat3();
        mat3Set(m, 1, 2, 3, 4, 5, 6, 7, 8, 9);
        expect(m).toEqual({ m00: 1, m01: 2, m02: 3, m10: 4, m11: 5, m12: 6, m20: 7, m21: 8, m22: 9 });
    });

    it('clones a matrix', function () {
        const m = mat3(1, 2, 3, 4, 5, 6, 7, 8, 9);
        const copy = mat3Clone(m);
        expect(copy).not.toBe(m);
        expect(copy).toEqual(m);
    });

    it('resets a matrix to identity', function () {
        const m = mat3(1, 2, 3, 4, 5, 6, 7, 8, 9);
        mat3Reset(m);
        expect(m).toEqual(MAT3_IDENTITY);
    });

    it('fills from padding', function () {
        const m = mat3();
        mat3FillPad(m, mat2(1, 2, 3, 4));
        expect(m).toEqual(mat3(1, 2, 0, 3, 4, 0, 0, 0, 1));
    });

    it('fills from truncation', function () {
        const m = mat3();
        mat3FillTrunc(m, mat4(1, 2, 3, 9, 4, 5, 6, 9, 7, 8, 9, 9, 9, 9, 9, 9));
        expect(m).toEqual(mat3(1, 2, 3, 4, 5, 6, 7, 8, 9));
    });

    it('fills from array', function () {
        const m = mat3();
        mat3FillArr(m, [1, 4, 7, 2, 5, 8, 3, 6, 9]);
        expect(m).toEqual(mat3(1, 2, 3, 4, 5, 6, 7, 8, 9));

        // throws when filling with fewer than nine values
        expect(() => mat3FillArr(m, [1, 2])).toThrow('Array must have at least 9 elements');
    });

    it('compares matrices with strict equality', function () {
        const a = mat3(1, 2, 3, 4, 5, 6, 7, 8, 9);
        const b = mat3(1 + 1e-7, 2, 3, 4, 5, 6, 7, 8, 9 - 1e-7);
        expect(mat3StrictEquals(a, a)).toBe(true);
        expect(mat3StrictEquals(a, b)).toBe(false);
    });

    it('compares matrices with epsilon equality', function () {
        const a = mat3(1, 2, 3, 4, 5, 6, 7, 8, 9);
        const b = mat3(1 + 1e-7, 2, 3, 4, 5, 6, 7, 8, 9 - 1e-7);
        const c = mat3(1 + 5e-6, 2, 3, 4, 5, 6, 7, 8, 9 - 5e-6);
        expect(mat3Equals(a, a)).toBe(true);
        expect(mat3Equals(a, b)).toBe(true);
        expect(mat3Equals(a, c)).toBe(false);
    });

    it('stringifies a matrix', function () {
        const a = mat3(1, 2, 3, 4, 5, 6, 7, 8, 9);
        expect(mat3Stringify(a)).toBe('mat3x3(1, 2, 3, 4, 5, 6, 7, 8, 9)');
    });
});
