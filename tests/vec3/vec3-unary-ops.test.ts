import { describe, expect, it } from 'vitest';
import { vec3, VEC3_ZERO } from '../../src/vec3/vec3-core';
import { vec3Apply, vec3Invert, vec3Negate, vec3Normalize, vec3Scale } from '../../src/vec3/vec3-unary-ops';

describe('vec3-unary-ops', function () {
    it('applies a unary operator component-wise', function () {
        const out = vec3();
        vec3Apply(out, vec3(1.2, 2.8, 3.2), Math.round);
        expect(out).toEqual(vec3(1, 3, 3));
    });

    it('scales a vector', () => {
        const out = vec3();
        vec3Scale(out, vec3(2, -4, 1), 2);
        expect(out).toEqualVec(vec3(4, -8, 2));
    });

    it('negates a vector', () => {
        const out = vec3();
        vec3Negate(out, vec3(1, -2, 3));
        expect(out).toEqualVec(vec3(-1, 2, -3));
    });

    it('inverts a vector', () => {
        const out = vec3();
        vec3Invert(out, vec3(2, -4, 1));
        expect(out).toEqualVec(vec3(0.5, -0.25, 1));
    });

    it('normalizes a vector', function () {
        const out = vec3();
        vec3Normalize(out, vec3(3, 0, 4));
        expect(out.x).toBeCloseTo(0.6, 6);
        expect(out.z).toBeCloseTo(0.8, 6);

        // Normalizing a zero vector should return a zero vector
        vec3Normalize(out, VEC3_ZERO);
        expect(out).toEqual(VEC3_ZERO);
    });
});
