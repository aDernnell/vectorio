import { describe, expect, it } from 'vitest';
import { Vector3 } from '../vector3';

function expectVector(v: Vector3, x: number, y: number, z: number, precision = 6): void {
    expect(v.x).toBeCloseTo(x, precision);
    expect(v.y).toBeCloseTo(y, precision);
    expect(v.z).toBeCloseTo(z, precision);
}

describe('Vector3', function () {
    describe('constructor and accessors', function () {
        it('defaults to (0, 0, 0)', function () {
            const v = new Vector3();
            expectVector(v, 0, 0, 0);
        });

        it('supports x/y/z setters', function () {
            const v = new Vector3();
            v.x = 4;
            v.y = -5;
            v.z = 6;

            expectVector(v, 4, -5, 6);
        });

        it('supports x/y/z and r/g/b aliases', function () {
            const v = new Vector3(1, 2, 3);

            expect(v.r).toBe(1);
            expect(v.g).toBe(2);
            expect(v.b).toBe(3);

            v.r = 7;
            v.g = -2;
            v.b = 9;
            expectVector(v, 7, -2, 9);
        });
    });

    describe('magnitude operations', function () {
        it('computes magnitude and squaredMagnitude', function () {
            const v = new Vector3(2, 3, 6);
            expect(v.squaredMagnitude()).toBe(49);
            expect(v.magnitude()).toBe(7);
        });
    });

    describe('mutating operations', function () {
        it('clone creates a distinct copy', function () {
            const v = new Vector3(1, 2, 3);
            const cloned = v.clone();
            expect(cloned).not.toBe(v);
            expectVector(cloned, 1, 2, 3);
        });

        it('fill sets all components', function () {
            const v = new Vector3(1, 2, 3);
            const out = v.fill(8);
            expect(out).toBe(v);
            expectVector(v, 8, 8, 8);
        });

        it('supports component-wise add/subtract/multiply/divide', function () {
            const a = new Vector3(8, 6, 4);
            const b = new Vector3(2, 3, 4);

            a.add(b);
            expectVector(a, 10, 9, 8);

            a.subtract(b);
            expectVector(a, 8, 6, 4);

            a.multiply(b);
            expectVector(a, 16, 18, 16);

            a.divide(b);
            expectVector(a, 8, 6, 4);
        });

        it('supports scale, negated and inversed', function () {
            const v = new Vector3(1, -2, 4);

            v.scale(2);
            expectVector(v, 2, -4, 8);

            v.negated();
            expectVector(v, -2, 4, -8);

            v.inversed();
            expectVector(v, -0.5, 0.25, -0.125);
        });

        it('normalised keeps zero vector unchanged', function () {
            const v = new Vector3(0, 0, 0);
            v.normalised();
            expectVector(v, 0, 0, 0);
        });

        it('normalised makes non-zero vectors unit length', function () {
            const v = new Vector3(3, 0, 4);
            v.normalised();
            expect(v.magnitude()).toBeCloseTo(1, 6);
            expectVector(v, 0.6, 0, 0.8);
        });
    });

    it('toString returns a stable representation', function () {
        const v = new Vector3(1, 2, 3);
        expect(v.toString()).toBe('vec3([1, 2, 3])');
    });

    it('supports strictEquals', function () {
        const a = new Vector3(1, 2, 3);
        const b = new Vector3(1, 2, 3);
        const c = new Vector3(1, 2, 4);

        expect(a.strictEquals(b)).toBe(true);
        expect(a.strictEquals(c)).toBe(false);
    });

    it('supports strict equality', function () {
        const a = new Vector3(1, 2, 3);
        const b = new Vector3(1, 2, 3);
        const c = new Vector3(1, 2, 3 + 1e-5);

        expect(a.equals(b)).toBe(true);
        expect(a.equals(c)).toBe(false);
    });

    it('supports equals with configurable epsilon', function () {
        const a = new Vector3(1, 2, 3);
        const b = new Vector3(1 + 5e-7, 2 - 5e-7, 3 + 5e-7);

        expect(a.equals(b)).toBe(true);
        expect(a.equals(b, 1e-8)).toBe(false);
    });

    it('fromValues throws on invalid arguments', function () {
        expect(() => (Vector3.fromValues as (...args: unknown[]) => Vector3)(1)).toThrow();
    });

    it('exposes expected constants', function () {
        expectVector(Vector3.ZERO as Vector3, 0, 0, 0);
        expectVector(Vector3.ONE as Vector3, 1, 1, 1);
        expectVector(Vector3.RIGHT as Vector3, 1, 0, 0);
        expectVector(Vector3.LEFT as Vector3, -1, 0, 0);
        expectVector(Vector3.UP as Vector3, 0, 1, 0);
        expectVector(Vector3.DOWN as Vector3, 0, -1, 0);
        expectVector(Vector3.FORWARD as Vector3, 0, 0, 1);
        expectVector(Vector3.BACK as Vector3, 0, 0, -1);
    });

    it('exposes static proxies for Vec3 operations', function () {
        const a = Vector3.fromValues(1, 2, 3);
        const b = Vector3.fromValues([4, 5, 6]);
        const out = new Vector3();

        expectVector(Vector3.add(out, a, b), 5, 7, 9);
        expectVector(Vector3.subtract(out, a, b), -3, -3, -3);
        expectVector(Vector3.multiply(out, a, b), 4, 10, 18);
        expectVector(Vector3.divide(out, b, a), 4, 2.5, 2);
        expectVector(Vector3.ceil(out, new Vector3(1.1, -1.9, 0.2)), 2, -1, 1);
        expectVector(Vector3.floor(out, new Vector3(1.9, -1.1, 0.8)), 1, -2, 0);
        expectVector(Vector3.round(out, new Vector3(1.5, -1.5, 0.5)), 2, -2, 1);
        expectVector(Vector3.scale(out, a, 2), 2, 4, 6);
        expectVector(Vector3.negate(out, a), -1, -2, -3);
        expectVector(Vector3.inverse(out, a), 1, 0.5, 1 / 3);
        expectVector(Vector3.normalize(out, new Vector3(0, 0, 5)), 0, 0, 1);
        expect(Vector3.distance(a, b)).toBeCloseTo(Math.sqrt(27));
        expect(Vector3.squaredDistance(a, b)).toBe(27);
        expect(Vector3.dot(a, b)).toBe(32);
        expectVector(Vector3.cross(out, new Vector3(1, 0, 0), new Vector3(0, 1, 0)), 0, 0, 1);
        expectVector(Vector3.lerp(out, a, b, 0.5), 2.5, 3.5, 4.5);
        expect(Vector3.angle(new Vector3(1, 0, 0), new Vector3(0, 1, 0))).toBeCloseTo(Math.PI / 2);
        expect(Vector3.angle(Vector3.ZERO, Vector3.UP)).toBe(0);
    });
});