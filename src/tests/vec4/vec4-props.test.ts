import { describe, expect, it } from 'vitest';
import { vec4 } from '../../vec4/vec4-core';
import { vec4Magnitude, vec4SquaredMagnitude } from '../../vec4/vec4-props';

describe('vec4-props', function () {
    it('computes magnitude metrics', function () {
        expect(vec4Magnitude(vec4(0, 3, 0, 4))).toBe(5);
        expect(vec4SquaredMagnitude(vec4(0, 3, 0, 4))).toBe(25);
    });
});
