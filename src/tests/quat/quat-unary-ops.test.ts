import { describe, expect, it } from 'vitest';
import { quatMultiply } from '../../quat/quat-binary-ops';
import { QUAT_IDENTITY, quat, quatEquals } from '../../quat/quat-core';
import {
    quatConjugate,
    quatExp,
    quatInvert,
    quatLn,
    quatNegate,
    quatNormalize,
    quatPow,
    quatScale,
} from '../../quat/quat-unary-ops';

describe('quat-unary-ops', function () {
    const out = quat();
    describe('quatInvert', function () {
        it('inverts a non-zero quaternion', function () {
            const q = quat(1, 2, 3, 4);
            quatInvert(out, q);

            expect(out).toEqual({
                x: -1 / 30,
                y: -2 / 30,
                z: -3 / 30,
                w: 4 / 30,
            });
        });

        it('returns zero quaternion when inverting zero', function () {
            expect(quatInvert(out, quat(0, 0, 0, 0))).toEqual(quat(0, 0, 0, 0));
        });

        it('produces identity when multiplying a quaternion by its inverse', function () {
            const q = quat(0.5, 0.5, 0.5, 0.5);
            quatInvert(out, q);
            quatMultiply(out, q, out);
            expect(quatEquals(out, QUAT_IDENTITY)).toBe(true);
        });

        it('inverts non-normalized quaternion', function () {
            const q = quat(2, 0, 0, 0);
            quatInvert(out, q);
            // cannot use quatEquals here because the quaternions are not normalized
            expect(out.x).toBeCloseTo(-0.5, 6);
            expect(out.y).toBeCloseTo(0, 6);
            expect(out.z).toBeCloseTo(0, 6);
            expect(out.w).toBeCloseTo(0, 6);

            quatMultiply(out, q, out);
            expect(quatEquals(out, QUAT_IDENTITY)).toBe(true);
        });

        it('outputs a modified parameter', function () {
            const q = quat(1, 2, 3, 4);
            quatInvert(q, q);
            expect(q).toEqual({
                x: -1 / 30,
                y: -2 / 30,
                z: -3 / 30,
                w: 4 / 30,
            });
        });
    });

    describe('quatNegate', function () {
        it('negates a quaternion', function () {
            expect(quatNegate(quat(), quat(1, -2, 3, -4))).toEqual(quat(-1, 2, -3, 4));
        });

        it('outputs a modified parameter', function () {
            const q = quat(1, 2, 3, 4);
            quatNegate(q, q);
            expect(q).toEqual(quat(-1, -2, -3, -4));
        });
    });

    describe('quatConjugate', function () {
        it('conjugates a quaternion', function () {
            expect(quatConjugate(quat(), quat(1, -2, 3, -4))).toEqual(quat(-1, 2, -3, -4));
        });

        it('is same as quatInvert for normalized quaternion', function () {
            const q = quatNormalize(quat(), quat(1, 2, 3, 4));
            const inv = quatInvert(quat(), q);
            const conj = quatConjugate(quat(), q);
            expect(quatEquals(inv, conj)).toBe(true);
        });

        it('outputs a modified parameter', function () {
            const q = quat(1, 2, 3, 4);
            quatConjugate(q, q);
            expect(q).toEqual(quat(-1, -2, -3, 4));
        });
    });

    describe('quatNormalize', function () {
        it('normalizes a quaternion to unit length', function () {
            const normalized = quatNormalize(quat(), quat(2, 0, 0, 0));
            expect(normalized).toEqual(quat(1, 0, 0, 0));
        });

        it('does not modify out when normalizing zero input', function () {
            const out = quat(9, 8, 7, 6);
            const returned = quatNormalize(out, quat(0, 0, 0, 0));

            expect(returned).toBe(out);
            expect(out).toEqual(quat(9, 8, 7, 6));
        });

        it('output a modified parameter', function () {
            const q = quat(2, 0, 0, 0);
            quatNormalize(q, q);
            expect(q).toEqual(quat(1, 0, 0, 0));
        });
    });

    it('computes quaternion exponential', function () {
        const out = quatExp(quat(), quat(0, 0, 0, Math.log(2)));
        expect(out).toEqual(quat(0, 0, 0, 2));
    });

    it('computes quaternion natural logarithm', function () {
        const out = quatLn(quat(), quat(0, 0, 0, 2));
        expect(out).toEqual(quat(0, 0, 0, Math.log(2)));
    });

    it('raises quaternion to the power of zero', function () {
        const q = quat(0.5, 0.5, 0.5, 0.5);
        const out = quatPow(quat(), q, 0);
        expect(quatEquals(out, QUAT_IDENTITY)).toBe(true);
    });

    it('raises quaternion to the power of one', function () {
        const q = quat(0.5, 0.5, 0.5, 0.5);
        const out = quatPow(quat(), q, 1);
        expect(quatEquals(out, q)).toBe(true);
    });

    it('scales quaternion by a scalar', function () {
        expect(quatScale(quat(), quat(1, 2, 3, 4), 2)).toEqual(quat(2, 4, 6, 8));
    });
});
