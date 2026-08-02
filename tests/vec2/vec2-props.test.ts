import { describe, expect, it } from 'vitest';
import { vec2 } from '../../src/vec2/vec2-core';
import { vec2Magnitude, vec2SquaredMagnitude } from '../../src/vec2/vec2-props';

describe('vec2-props', function () {
    it('computes magnitude', function () {
        expect(vec2Magnitude(vec2(3, 4))).toBe(5);
    });

    it('computes squared magnitude', function () {
        expect(vec2SquaredMagnitude(vec2(3, 4))).toBe(25);
    });
});
