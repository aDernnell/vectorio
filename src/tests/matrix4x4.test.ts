import { describe, expect, it } from 'vitest';
import { Mat4x4Impl } from '../mat4x4-impl';
import { Matrix2x2 } from '../matrix2x2';
import { Matrix3x3 } from '../matrix3x3';
import { Matrix4x4 } from '../matrix4x4';
import { Vector3 } from '../vector3';

function expectMat4(
    m: Matrix4x4,
    m00: number,
    m01: number,
    m02: number,
    m03: number,
    m10: number,
    m11: number,
    m12: number,
    m13: number,
    m20: number,
    m21: number,
    m22: number,
    m23: number,
    m30: number,
    m31: number,
    m32: number,
    m33: number,
    precision = 6,
): void {
    expect(m.m00).toBeCloseTo(m00, precision);
    expect(m.m01).toBeCloseTo(m01, precision);
    expect(m.m02).toBeCloseTo(m02, precision);
    expect(m.m03).toBeCloseTo(m03, precision);
    expect(m.m10).toBeCloseTo(m10, precision);
    expect(m.m11).toBeCloseTo(m11, precision);
    expect(m.m12).toBeCloseTo(m12, precision);
    expect(m.m13).toBeCloseTo(m13, precision);
    expect(m.m20).toBeCloseTo(m20, precision);
    expect(m.m21).toBeCloseTo(m21, precision);
    expect(m.m22).toBeCloseTo(m22, precision);
    expect(m.m23).toBeCloseTo(m23, precision);
    expect(m.m30).toBeCloseTo(m30, precision);
    expect(m.m31).toBeCloseTo(m31, precision);
    expect(m.m32).toBeCloseTo(m32, precision);
    expect(m.m33).toBeCloseTo(m33, precision);
}

describe('Matrix4x4', function () {
    it('supports constructor and mxx getters/setters', function () {
        const m = new Matrix4x4();
        expectMat4(m, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);

        m.m00 = 1;
        m.m01 = 2;
        m.m02 = 3;
        m.m03 = 4;
        m.m10 = 5;
        m.m11 = 6;
        m.m12 = 7;
        m.m13 = 8;
        m.m20 = 9;
        m.m21 = 10;
        m.m22 = 11;
        m.m23 = 12;
        m.m30 = 13;
        m.m31 = 14;
        m.m32 = 15;
        m.m33 = 16;

        expectMat4(m, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
    });

    it('supports clone, set and fillWith', function () {
        const a = new Matrix4x4(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
        const b = a.clone();
        expect(b).not.toBe(a);
        expectMat4(b, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);

        a.set(16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1);
        expectMat4(a, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1);

        b.fillWith(a);
        expectMat4(b, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1);
    });

    it('supports unary, binary and affine instance operations', function () {
        const a = new Matrix4x4(1, 2, 3, 4, 5, 6, 7, 8, 2, 3, 4, 5, 0, 1, 2, 1);
        const b = new Matrix4x4(2, 0, 1, 0, 1, 2, 0, 1, 0, 1, 2, 0, 1, 0, 1, 2);

        a.transpose();
        expectMat4(a, 1, 5, 2, 0, 2, 6, 3, 1, 3, 7, 4, 2, 4, 8, 5, 1);

        a.adjoint();
        expect(a).toBeInstanceOf(Matrix4x4);

        a.add(b);
        a.subtract(b);

        a.multiply(b);
        a.multiplyScalar(0.5);

        a.translate(new Vector3(1, 2, 3));
        expect(a).toBeInstanceOf(Matrix4x4);

        a.rotate(new Vector3(0, 1, 0), Math.PI / 2);
        expect(a).toBeInstanceOf(Matrix4x4);

        a.scale(new Vector3(2, 3, 4));
        expect(a).toBeInstanceOf(Matrix4x4);
    });

    it('supports determinant/frob/equality/toString', function () {
        const a = new Matrix4x4(2, 0, 0, 0, 0, 3, 0, 0, 0, 0, 4, 0, 0, 0, 0, 5);
        const b = new Matrix4x4(2 + 1e-7, 0, 0, 0, 0, 3, 0, 0, 0, 0, 4, 0, 0, 0, 0, 5 - 1e-7);

        expect(a.determinant()).toBe(120);
        expect(a.frob()).toBeCloseTo(Math.sqrt(54));
        expect(a.strictEquals(new Matrix4x4(2, 0, 0, 0, 0, 3, 0, 0, 0, 0, 4, 0, 0, 0, 0, 5))).toBe(true);
        expect(a.strictEquals(b)).toBe(false);
        expect(a.equals(b)).toBe(true);
        expect(a.equals(b, 1e-8)).toBe(false);
        expect(a.toString()).toBe('mat4x4([2, 0, 0, 0, 0, 3, 0, 0, 0, 0, 4, 0, 0, 0, 0, 5])');
    });

    it('instance invert and rotate throw on invalid cases', function () {
        const inv = new Matrix4x4(2, 0, 0, 0, 0, 3, 0, 0, 0, 0, 4, 0, 0, 0, 0, 5);
        inv.invert();
        expect(inv).toBeInstanceOf(Matrix4x4);
        expect(Number.isFinite(inv.frob())).toBe(true);

        const singular = new Matrix4x4(1, 2, 3, 4, 2, 4, 6, 8, 0, 0, 1, 0, 0, 0, 0, 1);
        expect(() => singular.invert()).toThrow('Matrix is not invertible');

        const rot = new Matrix4x4();
        expect(() => rot.rotate(new Vector3(0, 0, 0), 1)).toThrow('Rotation axis is degenerate');
    });

    it('exposes static proxies and identity', function () {
        const out = new Matrix4x4();
        const a = new Matrix4x4(1, 2, 3, 4, 0, 1, 4, 5, 5, 6, 0, 7, 1, 0, 0, 1);
        const b = new Matrix4x4(2, 0, 1, 0, 1, 2, 0, 1, 0, 1, 2, 0, 1, 0, 1, 2);

        expectMat4(Matrix4x4.IDENTITY as Matrix4x4, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        expectMat4(Matrix4x4.identity(), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);

        expectMat4(Matrix4x4.fromArr([1, 0, 0, 0, 2, 1, 0, 0, 3, 4, 1, 0, 5, 6, 7, 1]), 1, 2, 3, 5, 0, 1, 4, 6, 0, 0, 1, 7, 0, 0, 0, 1);
        expectMat4(Matrix4x4.fromMat(new Matrix2x2(1, 2, 3, 4)), 1, 2, 0, 0, 3, 4, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        expectMat4(Matrix4x4.fromMat(new Matrix3x3(1, 2, 3, 4, 5, 6, 7, 8, 9)), 1, 2, 3, 0, 4, 5, 6, 0, 7, 8, 9, 0, 0, 0, 0, 1);

        expect(Matrix4x4.transpose(out, a)).toBe(out);
        expect(Matrix4x4.adjoint(out, a)).toBe(out);

        expect(Matrix4x4.add(out, a, b)).toBe(out);
        expect(Matrix4x4.subtract(out, a, b)).toBe(out);
        expect(Matrix4x4.multiply(out, a, b)).toBe(out);
        expect(Matrix4x4.multiplyScalar(out, a, 2)).toBe(out);
        expect(Matrix4x4.translate(out, a, new Vector3(1, 2, 3))).toBe(out);
        expect(Matrix4x4.scale(out, a, new Vector3(2, 3, 4))).toBe(out);

        expect(Matrix4x4.rotate(out, a, new Vector3(1, 0, 0), Math.PI / 2)).toBe(out);
        expect(Matrix4x4.rotate(out, a, new Vector3(0, 0, 0), 1)).toBeNull();

        expect(Matrix4x4.invert(out, new Matrix4x4(2, 0, 0, 0, 0, 3, 0, 0, 0, 0, 4, 0, 0, 0, 0, 5))).toBe(out);
        expect(Matrix4x4.invert(out, new Matrix4x4(1, 2, 3, 4, 2, 4, 6, 8, 0, 0, 1, 0, 0, 0, 0, 1))).toBeNull();
    });

    it('covers invalid matrix type branch in impl', function () {
        expect(() => Mat4x4Impl.fromMat({} as Matrix2x2)).toThrow('Invalid input for Mat4x4.fromMat');
    });
});
