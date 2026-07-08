import { describe, expect, it } from 'vitest';
import { Mat2x2Impl } from '../mat2x2-impl';
import { Matrix2x2 } from '../matrix2x2';
import { Matrix3x3 } from '../matrix3x3';
import { Matrix4x4 } from '../matrix4x4';
import { Vector2 } from '../vector2';

function expectMat2(m: Matrix2x2, m00: number, m01: number, m10: number, m11: number, precision = 6): void {
    expect(m.m00).toBeCloseTo(m00, precision);
    expect(m.m01).toBeCloseTo(m01, precision);
    expect(m.m10).toBeCloseTo(m10, precision);
    expect(m.m11).toBeCloseTo(m11, precision);
}

describe('Matrix2x2', function () {
    it('supports constructor and mxx getters/setters', function () {
        const m = new Matrix2x2();
        expectMat2(m, 1, 0, 0, 1);

        m.m00 = 2;
        m.m01 = 3;
        m.m10 = 4;
        m.m11 = 5;
        expectMat2(m, 2, 3, 4, 5);
    });

    it('supports clone, set and fillWith', function () {
        const a = new Matrix2x2(1, 2, 3, 4);
        const b = a.clone();
        expect(b).not.toBe(a);
        expectMat2(b, 1, 2, 3, 4);

        a.set(5, 6, 7, 8);
        expectMat2(a, 5, 6, 7, 8);

        b.fillWith(a);
        expectMat2(b, 5, 6, 7, 8);
    });

    it('supports unary, binary and affine instance operations', function () {
        const a = new Matrix2x2(1, 2, 3, 4);
        const b = new Matrix2x2(5, 6, 7, 8);

        a.transpose();
        expectMat2(a, 1, 3, 2, 4);

        a.adjoint();
        expectMat2(a, 4, -3, -2, 1);

        a.add(b);
        expectMat2(a, 9, 3, 5, 9);

        a.subtract(b);
        expectMat2(a, 4, -3, -2, 1);

        a.multiply(b);
        expectMat2(a, -1, 0, -3, -4);

        a.multiplyScalar(0.5);
        expectMat2(a, -0.5, 0, -1.5, -2);

        const r = new Matrix2x2(1, 0, 0, 1);
        r.rotate(Math.PI / 2);
        expectMat2(r, 0, -1, 1, 0);

        const s = new Matrix2x2(1, 2, 3, 4);
        s.scale(new Vector2(2, 3));
        expectMat2(s, 2, 4, 9, 12);
    });

    it('supports determinant/frob/equality/toString', function () {
        const a = new Matrix2x2(2, 0, 0, 3);
        const b = new Matrix2x2(2 + 1e-7, 0, 0, 3 - 1e-7);

        expect(a.determinant()).toBe(6);
        expect(a.frob()).toBeCloseTo(Math.sqrt(13));
        expect(a.strictEquals(new Matrix2x2(2, 0, 0, 3))).toBe(true);
        expect(a.strictEquals(b)).toBe(false);
        expect(a.equals(b)).toBe(true);
        expect(a.equals(b, 1e-8)).toBe(false);
        expect(a.toString()).toBe('mat2x2([2, 0, 0, 3])');
    });

    it('instance invert succeeds and throws on non-invertible matrix', function () {
        const inv = new Matrix2x2(2, 0, 0, 4);
        inv.invert();
        expectMat2(inv, 0.5, 0, 0, 0.25);

        const singular = new Matrix2x2(1, 2, 2, 4);
        expect(() => singular.invert()).toThrow('Matrix is not invertible');
    });

    it('exposes static proxies and identity', function () {
        const out = new Matrix2x2();
        const a = new Matrix2x2(1, 2, 3, 4);
        const b = new Matrix2x2(5, 6, 7, 8);

        expectMat2(Matrix2x2.IDENTITY as Matrix2x2, 1, 0, 0, 1);
        expectMat2(Matrix2x2.identity(), 1, 0, 0, 1);

        expectMat2(Matrix2x2.fromArr([1, 3, 2, 4]), 1, 2, 3, 4);
        expectMat2(Matrix2x2.fromMat(new Matrix3x3(1, 2, 9, 3, 4, 9, 9, 9, 9)), 1, 2, 3, 4);
        expectMat2(Matrix2x2.fromMat(new Matrix4x4(1, 2, 9, 9, 3, 4, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9)), 1, 2, 3, 4);

        expect(Matrix2x2.transpose(out, a)).toBe(out);
        expectMat2(out, 1, 3, 2, 4);

        expect(Matrix2x2.adjoint(out, a)).toBe(out);
        expectMat2(out, 4, -2, -3, 1);

        expect(Matrix2x2.add(out, a, b)).toBe(out);
        expectMat2(out, 6, 8, 10, 12);

        expect(Matrix2x2.subtract(out, a, b)).toBe(out);
        expectMat2(out, -4, -4, -4, -4);

        expect(Matrix2x2.multiply(out, a, b)).toBe(out);
        expectMat2(out, 19, 22, 43, 50);

        expect(Matrix2x2.multiplyScalar(out, a, 2)).toBe(out);
        expectMat2(out, 2, 4, 6, 8);

        expect(Matrix2x2.rotate(out, new Matrix2x2(1, 0, 0, 1), Math.PI / 2)).toBe(out);
        expectMat2(out, 0, -1, 1, 0);

        expect(Matrix2x2.scale(out, new Matrix2x2(1, 2, 3, 4), new Vector2(2, 3))).toBe(out);
        expectMat2(out, 2, 4, 9, 12);

        expect(Matrix2x2.invert(out, new Matrix2x2(2, 0, 0, 4))).toBe(out);
        expectMat2(out, 0.5, 0, 0, 0.25);

        expect(Matrix2x2.invert(out, new Matrix2x2(1, 2, 2, 4))).toBeNull();
    });

    it('covers invalid matrix type branch in impl', function () {
        expect(() => Mat2x2Impl.fromMat({} as Matrix3x3)).toThrow('Invalid matrix type');
    });
});
