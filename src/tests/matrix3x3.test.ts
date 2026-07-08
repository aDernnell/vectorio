import { describe, expect, it } from 'vitest';
import { Mat3x3Impl } from '../mat3x3-impl';
import { Matrix2x2 } from '../matrix2x2';
import { Matrix3x3 } from '../matrix3x3';
import { Matrix4x4 } from '../matrix4x4';
import { Vector2 } from '../vector2';

function expectMat3(
    m: Matrix3x3,
    m00: number,
    m01: number,
    m02: number,
    m10: number,
    m11: number,
    m12: number,
    m20: number,
    m21: number,
    m22: number,
    precision = 6,
): void {
    expect(m.m00).toBeCloseTo(m00, precision);
    expect(m.m01).toBeCloseTo(m01, precision);
    expect(m.m02).toBeCloseTo(m02, precision);
    expect(m.m10).toBeCloseTo(m10, precision);
    expect(m.m11).toBeCloseTo(m11, precision);
    expect(m.m12).toBeCloseTo(m12, precision);
    expect(m.m20).toBeCloseTo(m20, precision);
    expect(m.m21).toBeCloseTo(m21, precision);
    expect(m.m22).toBeCloseTo(m22, precision);
}

describe('Matrix3x3', function () {
    it('supports constructor and mxx getters/setters', function () {
        const m = new Matrix3x3();
        expectMat3(m, 1, 0, 0, 0, 1, 0, 0, 0, 1);

        m.m00 = 1;
        m.m01 = 2;
        m.m02 = 3;
        m.m10 = 4;
        m.m11 = 5;
        m.m12 = 6;
        m.m20 = 7;
        m.m21 = 8;
        m.m22 = 9;
        expectMat3(m, 1, 2, 3, 4, 5, 6, 7, 8, 9);
    });

    it('supports clone, set and fillWith', function () {
        const a = new Matrix3x3(1, 2, 3, 4, 5, 6, 7, 8, 9);
        const b = a.clone();
        expect(b).not.toBe(a);
        expectMat3(b, 1, 2, 3, 4, 5, 6, 7, 8, 9);

        a.set(9, 8, 7, 6, 5, 4, 3, 2, 1);
        expectMat3(a, 9, 8, 7, 6, 5, 4, 3, 2, 1);

        b.fillWith(a);
        expectMat3(b, 9, 8, 7, 6, 5, 4, 3, 2, 1);
    });

    it('supports unary, binary and affine instance operations', function () {
        const a = new Matrix3x3(1, 2, 3, 4, 5, 6, 7, 8, 9);
        const b = new Matrix3x3(9, 8, 7, 6, 5, 4, 3, 2, 1);

        a.transpose();
        expectMat3(a, 1, 4, 7, 2, 5, 8, 3, 6, 9);

        a.adjoint();
        expectMat3(a, -3, 6, -3, 6, -12, 6, -3, 6, -3);

        a.add(b);
        expectMat3(a, 6, 14, 4, 12, -7, 10, 0, 8, -2);

        a.subtract(b);
        expectMat3(a, -3, 6, -3, 6, -12, 6, -3, 6, -3);

        a.multiply(b);
        expect(a).toBeInstanceOf(Matrix3x3);

        a.multiplyScalar(0.5);
        expect(a).toBeInstanceOf(Matrix3x3);

        const t = new Matrix3x3(1, 0, 0, 0, 1, 0, 0, 0, 1);
        t.translate(new Vector2(2, -1));
        expectMat3(t, 1, 0, 2, 0, 1, -1, 0, 0, 1);

        const r = new Matrix3x3(1, 0, 0, 0, 1, 0, 0, 0, 1);
        r.rotate(Math.PI / 2);
        expectMat3(r, 0, -1, 0, 1, 0, 0, 0, 0, 1);

        const s = new Matrix3x3(1, 2, 3, 4, 5, 6, 7, 8, 9);
        s.scale(new Vector2(2, 3));
        expectMat3(s, 2, 6, 3, 8, 15, 6, 14, 24, 9);
    });

    it('supports determinant/frob/equality/toString', function () {
        const a = new Matrix3x3(2, 0, 0, 0, 3, 0, 0, 0, 4);
        const b = new Matrix3x3(2 + 1e-7, 0, 0, 0, 3, 0, 0, 0, 4 - 1e-7);

        expect(a.determinant()).toBe(24);
        expect(a.frob()).toBeCloseTo(Math.sqrt(29));
        expect(a.strictEquals(new Matrix3x3(2, 0, 0, 0, 3, 0, 0, 0, 4))).toBe(true);
        expect(a.strictEquals(b)).toBe(false);
        expect(a.equals(b)).toBe(true);
        expect(a.equals(b, 1e-8)).toBe(false);
        expect(a.toString()).toBe('mat3x3([2, 0, 0, 0, 3, 0, 0, 0, 4])');
    });

    it('instance invert succeeds and throws on non-invertible matrix', function () {
        const inv = new Matrix3x3(2, 0, 0, 0, 4, 0, 0, 0, 5);
        inv.invert();
        expectMat3(inv, 0.5, 0, 0, 0, 0.25, 0, 0, 0, 0.2);

        const singular = new Matrix3x3(1, 2, 3, 2, 4, 6, 0, 0, 0);
        expect(() => singular.invert()).toThrow('Matrix is not invertible');
    });

    it('exposes static proxies and identity', function () {
        const out = new Matrix3x3();
        const a = new Matrix3x3(1, 2, 3, 4, 5, 6, 7, 8, 9);
        const b = new Matrix3x3(9, 8, 7, 6, 5, 4, 3, 2, 1);

        expectMat3(Matrix3x3.IDENTITY as Matrix3x3, 1, 0, 0, 0, 1, 0, 0, 0, 1);
        expectMat3(Matrix3x3.identity(), 1, 0, 0, 0, 1, 0, 0, 0, 1);

        expectMat3(Matrix3x3.fromArr([1, 4, 7, 2, 5, 8, 3, 6, 9]), 1, 2, 3, 4, 5, 6, 7, 8, 9);
        expectMat3(Matrix3x3.fromMat(new Matrix2x2(1, 2, 3, 4)), 1, 2, 0, 3, 4, 0, 0, 0, 1);
        expectMat3(
            Matrix3x3.fromMat(new Matrix4x4(1, 2, 3, 9, 4, 5, 6, 9, 7, 8, 9, 9, 9, 9, 9, 9)),
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
        );

        expect(Matrix3x3.transpose(out, a)).toBe(out);
        expectMat3(out, 1, 4, 7, 2, 5, 8, 3, 6, 9);

        expect(Matrix3x3.adjoint(out, new Matrix3x3(1, 2, 3, 0, 1, 4, 5, 6, 0))).toBe(out);
        expect(out.m00).toBeCloseTo(-24, 6);
        expect(out.m22).toBeCloseTo(1, 6);

        expect(Matrix3x3.add(out, a, b)).toBe(out);
        expectMat3(out, 10, 10, 10, 10, 10, 10, 10, 10, 10);

        expect(Matrix3x3.subtract(out, a, b)).toBe(out);
        expectMat3(out, -8, -6, -4, -2, 0, 2, 4, 6, 8);

        expect(Matrix3x3.multiply(out, a, Matrix3x3.identity())).toBe(out);
        expectMat3(out, 1, 2, 3, 4, 5, 6, 7, 8, 9);

        expect(Matrix3x3.multiplyScalar(out, a, 2)).toBe(out);
        expectMat3(out, 2, 4, 6, 8, 10, 12, 14, 16, 18);

        expect(Matrix3x3.translate(out, new Matrix3x3(1, 0, 0, 0, 1, 0, 0, 0, 1), new Vector2(2, 3))).toBe(out);
        expectMat3(out, 1, 0, 2, 0, 1, 3, 0, 0, 1);

        expect(Matrix3x3.rotate(out, new Matrix3x3(1, 0, 0, 0, 1, 0, 0, 0, 1), Math.PI / 2)).toBe(out);
        expectMat3(out, 0, -1, 0, 1, 0, 0, 0, 0, 1);

        expect(Matrix3x3.scale(out, new Matrix3x3(1, 2, 3, 4, 5, 6, 7, 8, 9), new Vector2(2, 3))).toBe(out);
        expectMat3(out, 2, 6, 3, 8, 15, 6, 14, 24, 9);

        expect(Matrix3x3.invert(out, new Matrix3x3(2, 0, 0, 0, 4, 0, 0, 0, 5))).toBe(out);
        expectMat3(out, 0.5, 0, 0, 0, 0.25, 0, 0, 0, 0.2);

        expect(Matrix3x3.invert(out, new Matrix3x3(1, 2, 3, 2, 4, 6, 0, 0, 0))).toBeNull();
    });

    it('covers invalid matrix type branch in impl', function () {
        expect(() => Mat3x3Impl.fromMat({} as Matrix2x2)).toThrow('Invalid matrix type');
    });
});
