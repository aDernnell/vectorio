import { describe, expect, it } from 'vitest';
import { mat3 } from '../../src/mat3/mat3-core';
import { mat3Add, mat3Multiply, mat3MultiplyScalar, mat3Subtract } from '../../src/mat3/mat3-binary-ops';

describe('mat3-binary-ops', function () {

    it('adds', function () {
        const a = mat3(1, 2, 3, 4, 5, 6, 7, 8, 9);
        const b = mat3(9, 8, 7, 6, 5, 4, 3, 2, 1);
        const out = mat3();

        mat3Add(out, a, b);
        expect(out).toEqual(mat3(10, 10, 10, 10, 10, 10, 10, 10, 10));
    });

    it('subtracts', function () {
        const a = mat3(1, 2, 3, 4, 5, 6, 7, 8, 9);
        const b = mat3(9, 8, 7, 6, 5, 4, 3, 2, 1);
        const out = mat3();

        mat3Subtract(out, a, b);
        expect(out).toEqual(mat3(-8, -6, -4, -2, 0, 2, 4, 6, 8));
    });

    it('multiplies', function () {
        const a = mat3(1, 2, 3, 4, 5, 6, 7, 8, 9);
        const b = mat3(9, 8, 7, 6, 5, 4, 3, 2, 1);
        const out = mat3();

        mat3Multiply(out, a, b);
        expect(out).toEqual(mat3(30, 24, 18, 84, 69, 54, 138, 114, 90));
    });

    it('multiplies by a scalar', function () {
        const a = mat3(1, 2, 3, 4, 5, 6, 7, 8, 9);
        const out = mat3();

        mat3MultiplyScalar(out, a, 2);
        expect(out).toEqual(mat3(2, 4, 6, 8, 10, 12, 14, 16, 18));
    });
});
