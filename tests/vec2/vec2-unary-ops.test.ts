import { describe, expect, it } from 'vitest';
import { vec2, VEC2_ZERO } from '../../src/vec2/vec2-core';
import { vec2Apply, vec2Invert, vec2Negate, vec2Normalize, vec2Scale } from '../../src/vec2/vec2-unary-ops';

describe('vec2-unary-ops', function () {
    it('applies a unary operator component-wise', function () {
        const out = vec2();
        vec2Apply(out, vec2(1.2, 2.8), Math.round);
        expect(out).toEqual(vec2(1, 3));
    });

    it('scales a vector', () => {
        const out = vec2();
        vec2Scale(out, vec2(2, -4), 2);
        expect(out).toEqualVec(vec2(4, -8));
    });

    it('negates a vector', () => {
        const out = vec2();
        vec2Negate(out, vec2(1, -2));
        expect(out).toEqualVec(vec2(-1, 2));
    });

    it('inverts a vector', () => {
        const out = vec2();
        vec2Invert(out, vec2(2, -4));
        expect(out).toEqualVec(vec2(0.5, -0.25));
    });

    it('normalizes a vector', function () {
        const out = vec2();
        vec2Normalize(out, vec2(3, 4));
        expect(out.x).toBeCloseTo(0.6, 6);
        expect(out.y).toBeCloseTo(0.8, 6);

        // Normalizing a zero vector should return a zero vector
        vec2Normalize(out, VEC2_ZERO);
        expect(out).toEqual(VEC2_ZERO);
    });
});
