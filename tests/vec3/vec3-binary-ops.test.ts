import { describe, expect, it } from 'vitest';
import { vec3, VEC3_X, VEC3_Y, VEC3_Z } from '../../src/vec3/vec3-core';
import { vec3Add, vec3Angle, vec3Cross, vec3Distance, vec3Divide, vec3Dot, vec3Lerp, vec3Multiply, vec3SquaredDistance, vec3Subtract } from '../../src/vec3/vec3-binary-ops';

describe('vec3-binary-ops', function () {
    it('adds two vectors', function () {
        const out = vec3();
        vec3Add(out, vec3(1, 2, 3), vec3(4, 5, 6));
        expect(out).toEqualVec(vec3(5, 7, 9));
    });

    it('subtracts two vectors', function () {
        const out = vec3();
        vec3Subtract(out, vec3(4, 5, 6), vec3(1, 2, 3));
        expect(out).toEqualVec(vec3(3, 3, 3));
    });

    it('multiplies two vectors component-wise', function () {
        const out = vec3();
        vec3Multiply(out, vec3(2, 3, 4), vec3(5, 6, 7));
        expect(out).toEqualVec(vec3(10, 18, 28));
    });

    it('divides two vectors component-wise', function () {
        const out = vec3();
        vec3Divide(out, vec3(8, 6, 4), vec3(2, 3, 4));
        expect(out).toEqualVec(vec3(4, 2, 1));
    });

    it('computes distance between two vectors', function () {
        expect(vec3Distance(vec3(0, 0, 0), vec3(1, 2, 2))).toBe(3);
    });

    it('computes squared distance between two vectors', function () {
        expect(vec3SquaredDistance(vec3(0, 0, 0), vec3(1, 2, 2))).toBe(9);
    });

    it('computes dot product', function () {
        expect(vec3Dot(vec3(1, 2, 3), vec3(4, 5, 6))).toBe(32);
    });

    it('linearly interpolates between two vectors', function () {
        const out = vec3();
        vec3Lerp(out, vec3(0, 0, 0), vec3(10, 20, 30), 0.25);
        expect(out).toEqualVec(vec3(2.5, 5, 7.5));
    });

    it('computes the angle between two vectors', function () {
        expect(vec3Angle(vec3(1, 0, 0), vec3(0, 1, 0))).toBeCloseTo(Math.PI / 2, 6);

        // computes zero angle for a zero vector
        expect(vec3Angle(vec3(0, 0, 0), vec3(1, 0, 0))).toBe(0);
    });

    it('calculates the cross product of two Vec3', function () {
        const out = vec3();

        // Standard cross product: x × y = z
        vec3Cross(out, VEC3_X, VEC3_Y);
        expect(out).toEqualVec(VEC3_Z);

        vec3Cross(out, VEC3_Y, VEC3_Z);
        expect(out).toEqualVec(VEC3_X);

        vec3Cross(out, VEC3_Z, VEC3_X);
        expect(out).toEqualVec(VEC3_Y);
    });
});
