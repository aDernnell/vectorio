import { describe, expect, it } from 'vitest';
import {
    vec2,
    vec2Clone,
    vec2FillWith,
    vec2Set,
    vec2StrictEquals,
    vec2Stringify,
    vec2Equals,
} from '../../src/vec2/vec2-core';

describe('vec2-core', function () {
    it('creates and sets a vector', function () {
        const v = vec2();
        vec2Set(v, 1, 2);
        expect(v).toEqual(vec2(1, 2));
    });

    it('fills a vector from an array', function () {
        const v = vec2();
        vec2FillWith(v, [3, 4]);
        expect(v).toEqual(vec2(3, 4));

        // throws when filling with fewer than two values
        expect(() => vec2FillWith(vec2(), [1])).toThrow('Array must have at least two elements to fill a Vec2.');
    });

    it('compares vectors', function () {
        expect(vec2StrictEquals(vec2(1, 2), vec2(1, 2))).toBe(true);
        // with epsilon tolerance
        expect(vec2Equals(vec2(1, 2), vec2(1 + 5e-7, 2 - 5e-7))).toBe(true);
    });

    it('stringifies a vector', function () {
        expect(vec2Stringify(vec2(1, 2))).toBe('vec2([1, 2])');
    });

    it('clones a vector', function () {
        const v1 = vec2(5, 6);
        const v2 = vec2();
        vec2Clone(v2, v1);
        expect(v2).toEqual(v1);
    });
});
