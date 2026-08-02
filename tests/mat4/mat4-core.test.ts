import { describe, expect, it } from 'vitest';
import {
    mat4,
    MAT4_IDENTITY,
    mat4Clone,
    mat4Equals,
    mat4FillArr,
    mat4FillPad,
    mat4Reset,
    mat4Set,
    mat4StrictEquals,
    mat4Stringify,
} from '../../src/mat4/mat4-core';
import { mat3 } from '../../src/mat3/mat3-core';

describe('mat4-core', function () {
    it('creates an identity matrix', function () {
        const m = mat4();
        expect(m).toEqual(MAT4_IDENTITY);
    });

    it('creates a matrix with values', function () {
        const m = mat4(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
        // prettier-ignore
        expect(m).toEqual({
            m00: 1, m01: 2, m02: 3, m03: 4,
            m10: 5, m11: 6, m12: 7, m13: 8,
            m20: 9, m21: 10, m22: 11, m23: 12,
            m30: 13, m31: 14, m32: 15, m33: 16,
        });
    });

    it('sets matrix values', function () {
        const m = mat4();
        mat4Set(m, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
        // prettier-ignore
        expect(m).toEqual({
            m00: 1, m01: 2, m02: 3, m03: 4,
            m10: 5, m11: 6, m12: 7, m13: 8,
            m20: 9, m21: 10, m22: 11, m23: 12,
            m30: 13, m31: 14, m32: 15, m33: 16,
        });
    });

    it('clones a matrix', function () {
        const m = mat4(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
        const copy = mat4Clone(m);
        expect(copy).not.toBe(m);
        expect(copy).toEqual(m);
    });

    it('resets a matrix to identity', function () {
        const m = mat4(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
        mat4Reset(m);
        expect(m).toEqual(MAT4_IDENTITY);
    });

    it('fills from padding', function () {
        const m = mat4();
        mat4FillPad(m, mat3(1, 2, 3, 4, 5, 6, 7, 8, 9));
        expect(m).toEqual(mat4(1, 2, 3, 0, 4, 5, 6, 0, 7, 8, 9, 0, 0, 0, 0, 1));
    });

    it('fills from array', function () {
        const m = mat4();
        mat4FillArr(m, [1, 5, 9, 13, 2, 6, 10, 14, 3, 7, 11, 15, 4, 8, 12, 16]);
        expect(m).toEqual(mat4(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16));

        // throws when filling with fewer than sixteen values
        expect(() => mat4FillArr(m, [1, 2, 3])).toThrow('Array must have at least 16 elements');
    });

    it('compares matrices with strict equality', function () {
        const a = mat4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        const b = mat4(1 + 1e-7, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 - 1e-7);
        expect(mat4StrictEquals(a, a)).toBe(true);
        expect(mat4StrictEquals(a, b)).toBe(false);
    });

    it('compares matrices with epsilon equality', function () {
        const a = mat4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        const b = mat4(1 + 1e-7, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 - 1e-7);
        const c = mat4(1 + 5e-6, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 - 5e-6);
        expect(mat4Equals(a, a)).toBe(true);
        expect(mat4Equals(a, b)).toBe(true);
        expect(mat4Equals(a, c)).toBe(false);
    });

    it('stringifies a matrix', function () {
        const a = mat4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        expect(mat4Stringify(a)).toBe('mat4x4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)');
    });
});
