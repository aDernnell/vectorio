import { describe, expect, it } from 'vitest';
import { Vector2 } from '../vector2';

function expectVector(v: Vector2, x: number, y: number, precision = 6): void {
    expect(v.x).toBeCloseTo(x, precision);
    expect(v.y).toBeCloseTo(y, precision);
}

describe('Vector2', function () {
    it('supports constructor and x/y accessors', function () {
        const v = new Vector2(1, 2);
        expectVector(v, 1, 2);

        v.x = 9;
        v.y = 8;
        expectVector(v, 9, 8);
    });

    it('supports magnitude and squaredMagnitude', function () {
        const v = new Vector2(3, 4);
        expect(v.squaredMagnitude()).toBe(25);
        expect(v.magnitude()).toBe(5);
    });

    it('supports arithmetic and affine operations', function () {
        const v = new Vector2(1, 2);
        const u = new Vector2(3, 4);

        v.add(u);
        expectVector(v, 4, 6);

        v.subtract(u);
        expectVector(v, 1, 2);

        v.multiply(u);
        expectVector(v, 3, 8);

        v.divide(u);
        expectVector(v, 1, 2);

        v.scale(2);
        expectVector(v, 2, 4);
    });

    it('supports rotate around origin and custom pivot', function () {
        const aroundOrigin = new Vector2(1, 0);
        aroundOrigin.rotate(new Vector2(0, 0), Math.PI / 2);
        expectVector(aroundOrigin, 0, 1);

        const aroundPivot = new Vector2(2, 1);
        aroundPivot.rotate(new Vector2(1, 1), Math.PI / 2);
        expectVector(aroundPivot, 1, 2);
    });

    it('supports negated, inversed and normalised', function () {
        const v = new Vector2(2, -4);

        v.negated();
        expectVector(v, -2, 4);

        v.inversed();
        expectVector(v, -0.5, 0.25);

        v.normalised();
        expect(v.magnitude()).toBeCloseTo(1, 6);
    });

    it('normalised keeps zero vectors unchanged', function () {
        const v = new Vector2();
        v.normalised();
        expectVector(v, 0, 0);
    });

    it('clone and fill behave as expected', function () {
        const v = new Vector2(1, 2);
        const c = v.clone();
        expect(c).not.toBe(v);
        expectVector(c, 1, 2);

        v.fill(5);
        expectVector(v, 5, 5);
    });

    it('divide follows JS semantics when dividing by zero', function () {
        const v = new Vector2(1, -1);
        v.divide(new Vector2(0, 0));

        expect(v.x).toBe(Infinity);
        expect(v.y).toBe(-Infinity);
    });

    it('toString returns a stable representation', function () {
        expect(new Vector2(1, 2).toString()).toBe('vec2([1, 2])');
    });

    it('supports strictEquals', function () {
        const a = new Vector2(1, 2);
        const b = new Vector2(1, 2);
        const c = new Vector2(1, 3);

        expect(a.strictEquals(b)).toBe(true);
        expect(a.strictEquals(c)).toBe(false);
    });

    it('supports strict equality', function () {
        const a = new Vector2(1, 2);
        const b = new Vector2(1, 2);
        const c = new Vector2(1, 2 + 1e-5);

        expect(a.equals(b)).toBe(true);
        expect(a.equals(c)).toBe(false);
    });

    it('supports equals with configurable epsilon', function () {
        const a = new Vector2(1, 2);
        const b = new Vector2(1 + 5e-7, 2 - 5e-7);

        expect(a.equals(b)).toBe(true);
        expect(a.equals(b, 1e-8)).toBe(false);
    });

    it('fromValues throws on invalid arguments', function () {
        expect(() => (Vector2.fromValues as (...args: unknown[]) => Vector2)(1)).toThrow();
    });

    it('exposes expected constants', function () {
        expectVector(Vector2.ZERO as Vector2, 0, 0);
        expectVector(Vector2.ONE as Vector2, 1, 1);
        expectVector(Vector2.RIGHT as Vector2, 1, 0);
        expectVector(Vector2.LEFT as Vector2, -1, 0);
        expectVector(Vector2.UP as Vector2, 0, 1);
        expectVector(Vector2.DOWN as Vector2, 0, -1);
    });

    it('exposes static proxies for Vec2 operations', function () {
        const a = Vector2.fromValues(1, 2);
        const b = Vector2.fromValues([3, 4]);
        const out = new Vector2();

        expectVector(Vector2.add(out, a, b), 4, 6);
        expectVector(Vector2.subtract(out, a, b), -2, -2);
        expectVector(Vector2.multiply(out, a, b), 3, 8);
        expectVector(Vector2.divide(out, b, a), 3, 2);
        expectVector(Vector2.ceil(out, new Vector2(1.1, -1.9)), 2, -1);
        expectVector(Vector2.floor(out, new Vector2(1.9, -1.1)), 1, -2);
        expectVector(Vector2.round(out, new Vector2(1.5, -1.5)), 2, -2);
        expectVector(Vector2.scale(out, a, 3), 3, 6);
        expectVector(Vector2.rotate(out, new Vector2(1, 0), Vector2.ZERO, Math.PI / 2), 0, 1);
        expectVector(Vector2.negate(out, a), -1, -2);
        expectVector(Vector2.inverse(out, a), 1, 0.5);
        expectVector(Vector2.normalize(out, new Vector2(0, 5)), 0, 1);
        expect(Vector2.distance(a, b)).toBeCloseTo(Math.sqrt(8));
        expect(Vector2.squaredDistance(a, b)).toBe(8);
        expect(Vector2.dot(a, b)).toBe(11);
        expect(Vector2.cross(a, b)).toBe(-2);
        expectVector(Vector2.lerp(out, a, b, 0.5), 2, 3);
        expect(Vector2.angle(new Vector2(1, 0), new Vector2(0, 1))).toBeCloseTo(Math.PI / 2);
        expect(Vector2.signedAngle(new Vector2(1, 0), new Vector2(0, 1))).toBeCloseTo(Math.PI / 2);
    });
});
