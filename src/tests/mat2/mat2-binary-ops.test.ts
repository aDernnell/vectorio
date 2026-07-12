import { describe, expect, it } from 'vitest';
import { Mat2, mat2 } from '../../mat2';
import { mat2Add, mat2Multiply, mat2MultiplyScalar, mat2Subtract } from '../../mat2/mat2-binary-ops';

const a: Mat2 = mat2(1, 2, 3, 4);
const b: Mat2 = mat2(5, 6, 7, 8);
const out: Mat2 = mat2();

describe('mat2-binary-ops', function () {
    it('adds', function () {
        mat2Add(out, a, b);
        expect(out).toEqual(mat2(6, 8, 10, 12));
    });

    it('subtracts', function () {
        mat2Subtract(out, b, a);
        expect(out).toEqual(mat2(4, 4, 4, 4));
    });

    it('multiplies', function () {
        mat2Multiply(out, a, b);
        expect(out).toEqual(mat2(19, 22, 43, 50));
    });

    it('multiplies by a scalar', function () {
        mat2MultiplyScalar(out, a, 2);
        expect(out).toEqual(mat2(2, 4, 6, 8));
    });
});
