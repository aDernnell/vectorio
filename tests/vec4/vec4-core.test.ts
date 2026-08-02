import { describe, expect, it } from 'vitest';
import { vec4, vec4Clone, vec4FillWith, vec4FillPad, vec4Set, vec4StrictEquals, vec4Stringify, vec4Equals } from '../../src/vec4/vec4-core';
import { vec3 } from '../../src/vec3/vec3-core';

describe('vec4-core', function () {
    it('creates and sets a vector', function () {
        const v = vec4();
        vec4Set(v, 1, 2, 3, 4);
        expect(v).toEqual(vec4(1, 2, 3, 4));
    });

    it('fills a vector from an array', function () {
        const v = vec4();
        vec4FillWith(v, [5, 6, 7, 8]);
        expect(v).toEqual(vec4(5, 6, 7, 8));

        // throws when filling with fewer than four values
        expect(() => vec4FillWith(vec4(), [1, 2, 3])).toThrow('Array must have at least four elements to fill a Vec4.');
    });

    it('pads a Vec3 into a Vec4', function () {
        const v = vec4();
        vec4FillPad(v, vec3(1, 2, 3), 9);
        expect(v).toEqual(vec4(1, 2, 3, 9));
    });

    it('compares vectors', function () {
        expect(vec4StrictEquals(vec4(1, 2, 3, 4), vec4(1, 2, 3, 4))).toBe(true);
        // with epsilon tolerance
        expect(vec4Equals(vec4(1, 2, 3, 4), vec4(1 + 5e-7, 2, 3, 4 - 5e-7))).toBe(true);
    });

    it('stringifies a vector', function () {
        expect(vec4Stringify(vec4(1, 2, 3, 4))).toBe('vec4([1, 2, 3, 4])');
    });

    it('clones a vector', function () {
        const v1 = vec4(5, 6, 7, 8);
        const v2 = vec4();
        vec4Clone(v2, v1);
        expect(v2).toEqual(v1);
    });
});
