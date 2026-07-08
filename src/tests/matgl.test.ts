import { describe, expect, it } from 'vitest';
import { MatGL } from '../matgl';
import { Matrix3x3 } from '../matrix3x3';
import { Matrix4x4 } from '../matrix4x4';
import { Vector3 } from '../vector3';

describe('MatGL', function () {
    it('builds a 2D projection matrix', function () {
        const out = new Matrix3x3();
        expect(MatGL.projection(out, 200, 100)).toBe(out);

        expect(out.m00).toBeCloseTo(0.01, 6);
        expect(out.m11).toBeCloseTo(-0.02, 6);
        expect(out.m20).toBeCloseTo(-1, 6);
        expect(out.m21).toBeCloseTo(1, 6);
        expect(out.m22).toBeCloseTo(1, 6);
    });

    it('builds a frustum matrix', function () {
        const out = new Matrix4x4();
        expect(MatGL.frustrum(out, -1, 1, -1, 1, 1, 10)).toBe(out);

        expect(out.m00).toBeCloseTo(1, 6);
        expect(out.m11).toBeCloseTo(1, 6);
        expect(out.m22).toBeCloseTo(-1.222222, 6);
        expect(out.m23).toBeCloseTo(-1, 6);
        expect(out.m32).toBeCloseTo(-2.222222, 6);
        expect(out.m33).toBeCloseTo(0, 6);
    });

    it('builds perspective matrices for finite and infinite far planes', function () {
        const finite = new Matrix4x4();
        const infinite = new Matrix4x4();

        expect(MatGL.perspective(finite, Math.PI / 2, 2, 1, 100)).toBe(finite);
        expect(MatGL.perspective(infinite, Math.PI / 2, 2, 1, Infinity)).toBe(infinite);

        expect(finite[0]).toBeCloseTo(0.5, 6);
        expect(finite[5]).toBeCloseTo(1, 6);
        expect(finite.m22).toBeCloseTo(-1.020202, 6);
        expect(finite.m23).toBeCloseTo(-1, 6);
        expect(finite.m32).toBeCloseTo(-2.020202, 6);

        expect(infinite.m22).toBe(-1);
        expect(infinite.m23).toBe(-1);
        expect(infinite.m32).toBe(-2);
    });

    it('builds an orthographic matrix', function () {
        const out = new Matrix4x4();
        expect(MatGL.ortho(out, -2, 2, -1, 1, 0.1, 10)).toBe(out);

        expect(out[0]).toBeCloseTo(0.5, 6);
        expect(out[5]).toBeCloseTo(1, 6);
        expect(out[10]).toBeCloseTo(-0.20202, 6);
        expect(out[15]).toBe(1);
    });

    it('lookAt returns identity when eye and center are equal', function () {
        const out = new Matrix4x4();
        const eye = new Vector3(1, 2, 3);

        expect(MatGL.lookAt(out, eye, eye.clone(), new Vector3(0, 1, 0))).toBe(out);
        expect(out.strictEquals(Matrix4x4.IDENTITY as Matrix4x4)).toBe(true);
    });

    it('lookAt handles degenerate up vectors and regular cases', function () {
        const degenerate = new Matrix4x4();
        const regular = new Matrix4x4();

        expect(MatGL.lookAt(degenerate, new Vector3(0, 0, 1), new Vector3(0, 0, 0), new Vector3(0, 0, 1))).toBe(
            degenerate,
        );
        expect(degenerate.m00).toBe(0);
        expect(degenerate.m11).toBe(0);
        expect(degenerate.m22).toBe(1);
        expect(degenerate.m32).toBe(-1);
        expect(degenerate.m33).toBe(1);

        expect(MatGL.lookAt(regular, new Vector3(0, 0, 1), new Vector3(0, 0, 0), new Vector3(0, 1, 0))).toBe(regular);
        expect(regular.m00).toBeCloseTo(1, 6);
        expect(regular.m11).toBeCloseTo(1, 6);
        expect(regular.m22).toBeCloseTo(1, 6);
        expect(regular.m32).toBeCloseTo(-1, 6);
        expect(regular.m33).toBeCloseTo(1, 6);
    });
});
