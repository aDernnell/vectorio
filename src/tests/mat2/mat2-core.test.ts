import { describe, expect, it } from 'vitest';
import { mat2, MAT2_IDENTITY, mat2Clone, mat2Equals, mat2FillArr, mat2FillTrunc, mat2Reset, mat2Set, mat2StrictEquals, mat2Stringify } from '../../mat2/mat2-core';
import { mat3 } from '../../mat3/mat3-core';

describe('mat2-core', function () {
    it('creates, sets, resets and clones', function () {
        const m = mat2();
        expect(m).toEqual({ m00: 1, m01: 0, m10: 0, m11: 1 });

        mat2Set(m, 1, 2, 3, 4);
        expect(m).toEqual({ m00: 1, m01: 2, m10: 3, m11: 4 });

        const copy = mat2Clone(m);
        expect(copy).not.toBe(m);
        expect(mat2StrictEquals(copy, m)).toBe(true);

        mat2Reset(m);
        expect(mat2StrictEquals(m, MAT2_IDENTITY)).toBe(true);

        const m2 = mat2(1, 2, 3, 4);
        expect(m2.m00).toBe(1);
        expect(m2.m01).toBe(2);
        expect(m2.m10).toBe(3);
        expect(m2.m11).toBe(4);
    });

    it('fills from truncation or array', function () {
        const m = mat2();
        mat2FillTrunc(m, mat3(1, 2, 9, 3, 4, 9, 9, 9, 9));
        expect(m).toEqual(mat2(1, 2, 3, 4));

        mat2FillArr(m, [1, 3, 2, 4]);
        expect(m).toEqual(mat2(1, 2, 3, 4));

        expect(() => mat2FillArr(m, [1, 2, 3])).toThrow('Array must have at least 4 elements');
    });

    it('compares and stringifies', function () {
        const a = mat2(1, 2, 3, 4);
        const b = mat2(1 + 5e-7, 2, 3, 4 - 5e-7);
        expect(mat2StrictEquals(a, b)).toBe(false);
        expect(mat2Equals(a, b)).toBe(true);
        expect(mat2Stringify(a)).toBe('mat2x2(1, 2, 3, 4)');
    });
});
