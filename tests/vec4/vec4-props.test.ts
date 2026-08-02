import { describe, expect, it } from 'vitest';
import { vec4 } from '../../src/vec4/vec4-core';
import { vec4Magnitude, vec4SquaredMagnitude } from '../../src/vec4/vec4-props';

describe('vec4-props', function () {
    it('computes magnitude', function () {
        expect(vec4Magnitude(vec4(0, 3, 0, 4))).toBe(5);
    });

    it('computes squared magnitude', function () {
        expect(vec4SquaredMagnitude(vec4(0, 3, 0, 4))).toBe(25);
    });
});
