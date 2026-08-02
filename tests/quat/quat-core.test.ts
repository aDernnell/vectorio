import { describe, expect, it } from 'vitest';
import { QUAT_IDENTITY, quat, quatClone, quatEquals, quatReset, quatSet, quatStrictEquals, quatStringify } from '../../src/quat/quat-core';
import { quatNormalize } from '../../src/quat/quat-unary-ops';

describe('quat-core', function () {
    it('creates identity by default', function () {
        expect(quat()).toEqual(QUAT_IDENTITY);
    });

    it('creates a quaternion with explicit components', function () {
        expect(quat(1, 2, 3, 4)).toEqual({ x: 1, y: 2, z: 3, w: 4 });
    });

    it('sets quaternion components in place', function () {
        const out = quat();
        const returned = quatSet(out, 1, -2, 3, -4);

        expect(returned).toBe(out);
        expect(out).toEqual({ x: 1, y: -2, z: 3, w: -4 });
    });

    it('resets a quaternion to identity', function () {
        const out = quat(1, 2, 3, 4);
        quatReset(out);
        expect(out).toEqual(QUAT_IDENTITY);
    });

    it('clones quaternion', function () {
        const source = quat(1, 2, 3, 4);
        const clone = quatClone(source);

        expect(clone).toEqual(source);
        expect(clone).not.toBe(source);
    });

    describe('strict equality check', function () {
        it('checks strict equality component-wise', function () {
            expect(quatStrictEquals(quat(1, 2, 3, 4), quat(1, 2, 3, 4))).toBe(true);
            expect(quatStrictEquals(quat(1, 2, 3, 4), quat(1, 2, 3, 4 + 1e-10))).toBe(false);
        });
    });

    describe('approximate equality check', function () {
        it('checks approximate equality with default tolerance', function () {
            const a = quat(0.5, 0.5, 0.5, 0.5);
            const b = quatNormalize(quat(), quat(0.5, 0.5, 0.5 + 0.001, 0.5));
            const c = quatNormalize(quat(), quat(0.5, 0.5, 0.5 + 0.01, 0.5));
            expect(quatEquals(a, b)).toBe(true);
            expect(quatEquals(a, c)).toBe(false);

            const theta1 = Math.PI / 4;
            const theta2 = Math.PI / 4 + 0.001;
            const theta3 = Math.PI / 4 + 0.01;
            const q1 = quat(0, Math.sin(theta1 / 2), 0, Math.cos(theta1 / 2));
            const q2 = quat(0, Math.sin(theta2 / 2), 0, Math.cos(theta2 / 2));
            const q3 = quat(0, Math.sin(theta3 / 2), 0, Math.cos(theta3 / 2));
            expect(quatEquals(q1, q2)).toBe(true);
            expect(quatEquals(q1, q3)).toBe(false);
        });

        it('allow to specify tolerance', function () {
            const theta1 = Math.PI / 4;
            const theta2 = Math.PI / 4 + 0.01;
            const theta3 = Math.PI / 4 + 0.1;
            const q1 = quat(0, Math.sin(theta1 / 2), 0, Math.cos(theta1 / 2));
            const q2 = quat(0, Math.sin(theta2 / 2), 0, Math.cos(theta2 / 2));
            const q3 = quat(0, Math.sin(theta3 / 2), 0, Math.cos(theta3 / 2));
            expect(quatEquals(q1, q2, 0.001)).toBe(true);
            expect(quatEquals(q1, q3, 0.001)).toBe(false);
        });

        it('treats opposite unit quaternions as equal rotations', function () {
            const q = quat(0.5, 0.5, 0.5, 0.5);
            const minusQ = quat(-0.5, -0.5, -0.5, -0.5);

            expect(quatEquals(q, minusQ)).toBe(true);
        });

        it('fails for non-unit quaternions', function () {
            const q1 = quat(1, 2, 3, 4);
            const q2 = quat(4, 3, 2, 1);
            // not the same rotation, but equality check will fail because they are not unit quaternions
            expect(quatEquals(q1, q2)).toBe(true);

            quatNormalize(q1, q1);
            quatNormalize(q2, q2);
            // after normalization, they are no longer equal
            expect(quatEquals(q1, q2)).toBe(false);
        });
    });

    it('stringifies', function () {
        expect(quatStringify(quat(1, 2, 3, 4))).toBe('quat(1, 2, 3, 4)');
    });
});
