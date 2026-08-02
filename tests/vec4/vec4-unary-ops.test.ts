import { describe, expect, it } from 'vitest';
import { vec4, VEC4_ZERO } from '../../src/vec4/vec4-core';
import { vec4Apply, vec4Invert, vec4Negate, vec4Normalize, vec4Scale } from '../../src/vec4/vec4-unary-ops';

describe('vec4-unary-ops', function () {
    it('applies a unary operator component-wise', function () {
        const out = vec4();
        vec4Apply(out, vec4(1.2, 2.8, 3.2, 4.6), Math.round);
        expect(out).toEqual(vec4(1, 3, 3, 5));
    });

    it('scales a vector', () => {
        const out = vec4();
        vec4Scale(out, vec4(1, -2, 3, -4), 2);
        expect(out).toEqualVec(vec4(2, -4, 6, -8));
    });

    it('negates a vector', () => {
        const out = vec4();
        vec4Negate(out, vec4(1, -2, 3, -4));
        expect(out).toEqualVec(vec4(-1, 2, -3, 4));
    });

    it('inverts a vector', () => {
        const out = vec4();
        vec4Invert(out, vec4(2, -4, 1, -0.5));
        expect(out).toEqualVec(vec4(0.5, -0.25, 1, -2));
    });

    it('normalizes a vector', function () {
        const out = vec4();
        vec4Normalize(out, vec4(0, 3, 0, 4));
        expect(out.y).toBeCloseTo(0.6, 6);
        expect(out.w).toBeCloseTo(0.8, 6);

        // Normalizing a zero vector should return a zero vector
        vec4Normalize(out, VEC4_ZERO);
        expect(out).toEqual(VEC4_ZERO);
    });
});
