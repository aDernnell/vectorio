import { describe, expect, it } from 'vitest';
import { vec3, vec3Clone, vec3Equals, vec3FillWith, vec3FillPad, vec3FillTrunc, vec3Set, vec3StrictEquals, vec3Stringify } from '../../vec3/vec3-core';
import { vec4 } from '../../vec4/vec4-core';
import { vec2 } from '../../vec2/vec2-core';

describe('vec3-core', function () {
    it('creates, sets, fills, compares and stringifies vectors', function () {
        const v = vec3();
        vec3Set(v, 1, 2, 3);
        expect(v).toEqual(vec3(1, 2, 3));

        vec3FillWith(v, [4, 5, 6]);
        expect(v).toEqual(vec3(4, 5, 6));
        expect(() => vec3FillWith(v, [1, 2])).toThrow('Array must have at least three elements to fill a Vec3.');

        vec3FillPad(v, vec2(7, 8), 9);
        expect(v).toEqual(vec3(7, 8, 9));

        vec3FillTrunc(v, vec4(10, 11, 12, 13));
        expect(v).toEqual(vec3(10, 11, 12));

        expect(vec3StrictEquals(vec3(1, 2, 3), vec3(1, 2, 3))).toBe(true);
        expect(vec3Equals(vec3(1, 2, 3), vec3(1 + 5e-7, 2, 3 - 5e-7))).toBe(true);
        expect(vec3Stringify(vec3(1, 2, 3))).toBe('vec3([1, 2, 3])');
    });

    it('clones', function () {
        const v1 = vec3(5, 6, 7);
        const v2 = vec3();
        vec3Clone(v2, v1);
        expect(v2).toEqual(v1);
    });
});
