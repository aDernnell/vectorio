import { describe, expect, it } from 'vitest';
import { vec2 } from '../../src/vec2/vec2-core';
import { vec2Add, vec2Angle, vec2Cross, vec2Distance, vec2Divide, vec2Dot, vec2Lerp, vec2Multiply, vec2SignedAngle, vec2SquaredDistance, vec2Subtract } from '../../src/vec2/vec2-binary-ops';

describe('vec2-binary-ops', function () {
    it('adds two vectors', function () {
        const out = vec2();
        vec2Add(out, vec2(1, 2), vec2(3, 4));
        expect(out).toEqualVec(vec2(4, 6));
    });

    it('subtracts two vectors', function () {
        const out = vec2();
        vec2Subtract(out, vec2(3, 4), vec2(1, 2));
        expect(out).toEqualVec(vec2(2, 2));
    });

    it('multiplies two vectors component-wise', function () {
        const out = vec2();
        vec2Multiply(out, vec2(2, 3), vec2(4, 5));
        expect(out).toEqualVec(vec2(8, 15));
    });

    it('divides two vectors component-wise', function () {
        const out = vec2();
        vec2Divide(out, vec2(8, 6), vec2(2, 3));
        expect(out).toEqualVec(vec2(4, 2));
    });

    it('computes distance between two vectors', function () {
        expect(vec2Distance(vec2(0, 0), vec2(3, 4))).toBe(5);
    });

    it('computes squared distance between two vectors', function () {
        expect(vec2SquaredDistance(vec2(0, 0), vec2(3, 4))).toBe(25);
    });

    it('computes dot product', function () {
        expect(vec2Dot(vec2(1, 2), vec2(3, 4))).toBe(11);
    });

    it('computes cross product', function () {
        expect(vec2Cross(vec2(1, 0), vec2(0, 1))).toBe(1);
    });

    it('linearly interpolates between two vectors', function () {
        const out = vec2();
        vec2Lerp(out, vec2(0, 0), vec2(10, 20), 0.25);
        expect(out).toEqualVec(vec2(2.5, 5));
    });

    it('computes the unsigned angle between two vectors', function () {
        expect(vec2Angle(vec2(1, 0), vec2(0, 1))).toBeCloseTo(Math.PI / 2, 6);
    });

    it('computes the signed angle between two vectors', function () {
        expect(vec2SignedAngle(vec2(1, 0), vec2(0, 1))).toBeCloseTo(Math.PI / 2, 6);
    });
});
