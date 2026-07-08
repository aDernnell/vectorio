import { describe, expect, it } from 'vitest';
import { Vector4 } from '../vector4';

function expectVector(v: Vector4, x: number, y: number, z: number, w: number, precision = 6): void {
    expect(v.x).toBeCloseTo(x, precision);
    expect(v.y).toBeCloseTo(y, precision);
    expect(v.z).toBeCloseTo(z, precision);
    expect(v.w).toBeCloseTo(w, precision);
}

describe('Vector4', function () {
    it('supports constructor and x/y/z/w accessors', function () {
        const v = new Vector4(1, 2, 3, 4);
        expectVector(v, 1, 2, 3, 4);

        v.x = 9;
        v.y = 8;
        v.z = 7;
        v.w = 6;
        expectVector(v, 9, 8, 7, 6);
    });

    it('supports r/g/b/a aliases', function () {
        const v = new Vector4();
        v.r = 1;
        v.g = 2;
        v.b = 3;
        v.a = 4;
        expect(v.r).toBe(1);
        expect(v.g).toBe(2);
        expect(v.b).toBe(3);
        expect(v.a).toBe(4);
        expectVector(v, 1, 2, 3, 4);
    });

    it('supports magnitude and squaredMagnitude', function () {
        const v = new Vector4(2, 3, 6, 0);
        expect(v.squaredMagnitude()).toBe(49);
        expect(v.magnitude()).toBe(7);
    });

    it('supports arithmetic and affine operations', function () {
        const v = new Vector4(1, 2, 3, 4);
        const u = new Vector4(5, 6, 7, 8);

        v.add(u);
        expectVector(v, 6, 8, 10, 12);

        v.subtract(u);
        expectVector(v, 1, 2, 3, 4);

        v.multiply(u);
        expectVector(v, 5, 12, 21, 32);

        v.divide(u);
        expectVector(v, 1, 2, 3, 4);

        v.scale(2);
        expectVector(v, 2, 4, 6, 8);
    });

    it('supports negated, inversed and normalised', function () {
        const v = new Vector4(2, -4, 1, -2);

        v.negated();
        expectVector(v, -2, 4, -1, 2);

        v.inversed();
        expectVector(v, -0.5, 0.25, -1, 0.5);

        v.normalised();
        expect(v.magnitude()).toBeCloseTo(1, 6);
    });

    it('normalised keeps zero vectors unchanged', function () {
        const v = new Vector4();
        v.normalised();
        expectVector(v, 0, 0, 0, 0);
    });

    it('clone and fill behave as expected', function () {
        const v = new Vector4(1, 2, 3, 4);
        const c = v.clone();
        expect(c).not.toBe(v);
        expectVector(c, 1, 2, 3, 4);

        v.fill(5);
        expectVector(v, 5, 5, 5, 5);
    });

    it('toString returns a stable representation', function () {
        expect(new Vector4(1, 2, 3, 4).toString()).toBe('vec4([1, 2, 3, 4])');
    });

    it('supports strictEquals', function () {
        const a = new Vector4(1, 2, 3, 4);
        const b = new Vector4(1, 2, 3, 4);
        const c = new Vector4(1, 2, 3, 5);

        expect(a.strictEquals(b)).toBe(true);
        expect(a.strictEquals(c)).toBe(false);
    });

    it('supports strict equality', function () {
        const a = new Vector4(1, 2, 3, 4);
        const b = new Vector4(1, 2, 3, 4);
        const c = new Vector4(1, 2, 3, 4 + 1e-5);

        expect(a.equals(b)).toBe(true);
        expect(a.equals(c)).toBe(false);
    });

    it('supports equals with configurable epsilon', function () {
        const a = new Vector4(1, 2, 3, 4);
        const b = new Vector4(1 + 5e-7, 2 - 5e-7, 3 + 5e-7, 4 - 5e-7);

        expect(a.equals(b)).toBe(true);
        expect(a.equals(b, 1e-8)).toBe(false);
    });

    it('fromValues throws on invalid arguments', function () {
        expect(() => (Vector4.fromValues as (...args: unknown[]) => Vector4)(1)).toThrow();
    });

    it('exposes expected constants', function () {
        expectVector(Vector4.ZERO as Vector4, 0, 0, 0, 0);
        expectVector(Vector4.ONE as Vector4, 1, 1, 1, 1);
    });

    it('exposes static proxies for Vec4 operations', function () {
        const a = Vector4.fromValues(1, 2, 3, 4);
        const b = Vector4.fromValues([5, 6, 7, 8]);
        const out = new Vector4();

        expectVector(Vector4.add(out, a, b), 6, 8, 10, 12);
        expectVector(Vector4.subtract(out, a, b), -4, -4, -4, -4);
        expectVector(Vector4.multiply(out, a, b), 5, 12, 21, 32);
        expectVector(Vector4.divide(out, b, a), 5, 3, 7 / 3, 2);
        expectVector(Vector4.ceil(out, new Vector4(1.1, -1.9, 0.2, 5.01)), 2, -1, 1, 6);
        expectVector(Vector4.floor(out, new Vector4(1.9, -1.1, 0.8, 5.99)), 1, -2, 0, 5);
        expectVector(Vector4.round(out, new Vector4(1.5, -1.5, 0.5, 2.5)), 2, -2, 1, 3);
        expectVector(Vector4.scale(out, a, 2), 2, 4, 6, 8);
        expectVector(Vector4.negate(out, a), -1, -2, -3, -4);
        expectVector(Vector4.inverse(out, a), 1, 0.5, 1 / 3, 0.25);
        expectVector(Vector4.normalize(out, new Vector4(0, 0, 0, 5)), 0, 0, 0, 1);
        expect(Vector4.distance(a, b)).toBeCloseTo(8);
        expect(Vector4.squaredDistance(a, b)).toBe(64);
        expect(Vector4.dot(a, b)).toBe(70);
        expectVector(Vector4.lerp(out, a, b, 0.5), 3, 4, 5, 6);
        expect(Vector4.angle(new Vector4(1, 0, 0, 0), new Vector4(0, 1, 0, 0))).toBeCloseTo(Math.PI / 2);
        expect(Vector4.angle(Vector4.ZERO, Vector4.ONE)).toBe(0);
    });
});