import { describe, expect, it } from 'vitest';
import { mat4 } from '../../src/mat4/mat4-core';
import { mat4Add, mat4Multiply, mat4MultiplyScalar, mat4Subtract } from '../../src/mat4/mat4-binary-ops';

describe('mat4-binary-ops', function () {
    it('adds', function () {
        const a = mat4(1, 2, 3, 4, 5, 6, 7, 8, 2, 3, 4, 5, 0, 1, 2, 1);
        const b = mat4(2, 0, 1, 0, 1, 2, 0, 1, 0, 1, 2, 0, 1, 0, 1, 2);
        const out = mat4();

        mat4Add(out, a, b);
        expect(out).toEqualMat(mat4(3, 2, 4, 4, 6, 8, 7, 9, 2, 4, 6, 5, 1, 1, 3, 3));
    });

    it('subtracts', function () {
        const a = mat4(1, 2, 3, 4, 5, 6, 7, 8, 2, 3, 4, 5, 0, 1, 2, 1);
        const b = mat4(2, 0, 1, 0, 1, 2, 0, 1, 0, 1, 2, 0, 1, 0, 1, 2);
        const out = mat4();

        mat4Subtract(out, a, b);
        expect(out).toEqualMat(mat4(-1, 2, 2, 4, 4, 4, 7, 7, 2, 2, 2, 5, -1, 1, 1, -1));
    });

    it('multiplies', function () {
        const a = mat4(1, 2, 3, 4, 5, 6, 7, 8, 2, 3, 4, 5, 0, 1, 2, 1);
        const b = mat4(2, 0, 1, 0, 1, 2, 0, 1, 0, 1, 2, 0, 1, 0, 1, 2);
        const out = mat4();

        mat4Multiply(out, a, b);
        expect(out).toEqualMat(mat4(8, 7, 11, 10, 24, 19, 27, 22, 12, 10, 15, 13, 2, 4, 5, 3));
    });

    it('multiplies by a scalar', function () {
        const a = mat4(1, 2, 3, 4, 5, 6, 7, 8, 2, 3, 4, 5, 0, 1, 2, 1);
        const out = mat4();

        mat4MultiplyScalar(out, a, 2);
        expect(out).toEqualMat(mat4(2, 4, 6, 8, 10, 12, 14, 16, 4, 6, 8, 10, 0, 2, 4, 2));
    });
});
