import { describe, expect, it } from 'vitest';
import {
    mat3,
    mat3Clone,
    mat3Equals,
    mat3FillArr,
    mat3FillPad,
    mat3FillTrunc,
    mat3Reset,
    mat3Set,
    mat3StrictEquals,
    mat3Stringify,
} from '../../mat3/mat3-core';
import { mat2 } from '../../mat2/mat2-core';
import { mat4 } from '../../mat4/mat4-core';

describe('mat3-core', function () {
    it('creates, sets, resets and clones', function () {
        const m = mat3();
        expect(m).toEqual(mat3(1, 0, 0, 0, 1, 0, 0, 0, 1));

        mat3Set(m, 1, 2, 3, 4, 5, 6, 7, 8, 9);
        expect(m).toEqual(mat3(1, 2, 3, 4, 5, 6, 7, 8, 9));

        const copy = mat3Clone(m);
        expect(copy).not.toBe(m);
        expect(mat3StrictEquals(copy, m)).toBe(true);

        mat3Reset(m);
        expect(mat3StrictEquals(m, mat3())).toBe(true);
    });

    it('fills from padding/truncation or array', function () {
        const m = mat3();
        mat3FillPad(m, mat2(1, 2, 3, 4));
        expect(m).toEqual(mat3(1, 2, 0, 3, 4, 0, 0, 0, 1));

        mat3FillTrunc(m, mat4(1, 2, 3, 9, 4, 5, 6, 9, 7, 8, 9, 9, 9, 9, 9, 9));
        expect(m).toEqual(mat3(1, 2, 3, 4, 5, 6, 7, 8, 9));

        mat3FillArr(m, [1, 4, 7, 2, 5, 8, 3, 6, 9]);
        expect(m).toEqual(mat3(1, 2, 3, 4, 5, 6, 7, 8, 9));
        expect(() => mat3FillArr(m, [1, 2])).toThrow('Array must have at least 9 elements');
    });

    it('compares and stringifies', function () {
        const a = mat3(1, 2, 3, 4, 5, 6, 7, 8, 9);
        const b = mat3(1 + 1e-7, 2, 3, 4, 5, 6, 7, 8, 9 - 1e-7);
        expect(mat3StrictEquals(a, b)).toBe(false);
        expect(mat3Equals(a, b)).toBe(true);
        expect(mat3Stringify(a)).toBe('mat3x3(1, 2, 3, 4, 5, 6, 7, 8, 9)');
    });
});
