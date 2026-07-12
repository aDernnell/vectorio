import { describe, expect, it } from 'vitest';
import { mat4, mat4Clone, mat4Equals, mat4FillArr, mat4FillPad, mat4Reset, mat4Set, mat4StrictEquals, mat4Stringify } from '../../mat4/mat4-core';
import { mat3 } from '../../mat3/mat3-core';

describe('mat4-core', function () {
    it('creates, sets, resets and clones matrices', function () {
        const m = mat4();
        expect(m).toEqual(mat4());

        mat4Set(m, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
        expect(m.m33).toBe(16);

        const copy = mat4Clone(m);
        expect(copy).not.toBe(m);
        expect(mat4StrictEquals(copy, m)).toBe(true);

        mat4Reset(m);
        expect(mat4StrictEquals(m, mat4())).toBe(true);
    });

    it('fills from padding or array', function () {
        const m = mat4();
        mat4FillPad(m, mat3(1, 2, 3, 4, 5, 6, 7, 8, 9));
        expect(m).toEqual(mat4(1, 2, 3, 0, 4, 5, 6, 0, 7, 8, 9, 0, 0, 0, 0, 1));

        mat4FillArr(m, [1, 5, 9, 13, 2, 6, 10, 14, 3, 7, 11, 15, 4, 8, 12, 16]);
        expect(m).toEqual(mat4(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16));

        expect(() => mat4FillArr(m, [1, 2, 3])).toThrow('Array must have at least 16 elements');
    });

    it('compares and stringifies', function () {
        const a = mat4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        const b = mat4(1 + 1e-7, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 - 1e-7);
        expect(mat4StrictEquals(a, b)).toBe(false);
        expect(mat4Equals(a, b)).toBe(true);
        expect(mat4Stringify(a)).toBe('mat4x4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)');
    });
});
