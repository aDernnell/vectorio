import { describe, expect, it } from 'vitest';
import { vec4, vec4Equals, vec4FillWith, vec4FillWithVec3, vec4Set, vec4StrictEquals, vec4Stringify } from '../../vec4/vec4-core';
import { vec3 } from '../../vec3/vec3-core';

describe('vec4-core', function () {
    it('creates, sets, fills, compares and stringifies vectors', function () {
        const v = vec4();
        vec4Set(v, 1, 2, 3, 4);
        expect(v).toEqual(vec4(1, 2, 3, 4));

        vec4FillWith(v, [5, 6, 7, 8]);
        expect(v).toEqual(vec4(5, 6, 7, 8));
        expect(() => vec4FillWith(v, [1, 2, 3])).toThrow('Array must have at least four elements to fill a Vec4.');

        vec4FillWithVec3(v, vec3(1, 2, 3), 9);
        expect(v).toEqual(vec4(1, 2, 3, 9));

        expect(vec4StrictEquals(vec4(1, 2, 3, 4), vec4(1, 2, 3, 4))).toBe(true);
        expect(vec4Equals(vec4(1, 2, 3, 4), vec4(1 + 5e-7, 2, 3, 4 - 5e-7))).toBe(true);
        expect(vec4Stringify(vec4(1, 2, 3, 4))).toBe('vec4([1, 2, 3, 4])');
    });
});
