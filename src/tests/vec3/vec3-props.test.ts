import { describe, expect, it } from 'vitest';
import { vec3 } from '../../vec3/vec3-core';
import { vec3Magnitude, vec3SquaredMagnitude } from '../../vec3/vec3-props';

describe('vec3-props', function () {
    it('computes magnitude metrics', function () {
        expect(vec3Magnitude(vec3(3, 0, 4))).toBe(5);
        expect(vec3SquaredMagnitude(vec3(3, 0, 4))).toBe(25);
    });
});
