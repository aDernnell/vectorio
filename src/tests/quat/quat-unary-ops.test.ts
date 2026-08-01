import { describe, expect, it } from 'vitest';
import { quatAdd, quatMultiply } from '../../quat/quat-binary-ops';
import { QUAT_IDENTITY, quat, quatEquals, quatSet } from '../../quat/quat-core';
import { quatMagnitude } from '../../quat/quat-props';
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
        it('inverts a quaternion', function () {
            const q = quat(1, 2, 3, 4);
            quatInvert(out, q);

            expect(out).toEqual({
                x: -1 / 30,
                y: -2 / 30,
                z: -3 / 30,
                w: 4 / 30,
            });
        });

        it('handles zero quaternion', function () {
            // should return zero quaternion when inverting a zero quaternion
            expect(quatInvert(out, quat(0, 0, 0, 0))).toEqual(quat(0, 0, 0, 0));
        });

        it('produces identity when multiplying a quaternion by its inverse', function () {
            const q = quat(0.5, 0.5, 0.5, 0.5);
            const inv = quatInvert(quat(), q);
            quatMultiply(out, q, inv);
            expect(quatEquals(out, QUAT_IDENTITY)).toBe(true);
            quatMultiply(out, inv, q);
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

        it('satisfies the relation q⁻¹ = q* / |q|²', function () {
            const q = quat(1, 2, 3, 4);
            quatInvert(out, q);
            const expected = quatConjugate(quat(), q);
            const squaredMagQ = quatMagnitude(q) ** 2;
            // quaternions must be normalized for quatEquals to work, so we normalize both sides before comparing
            quatNormalize(out, out);
            quatNormalize(expected, quatScale(expected, expected, 1 / squaredMagQ));
            expect(quatEquals(out, expected)).toBe(true);
        });

        it('returns the original when applied twice', function () {
            const q = quat(1, 2, 3, 4);
            // the invert is a unit quaternion
            quatInvert(out, q);
            quatInvert(out, out);
            expect(quatEquals(out, q)).toBe(true);
        });

        it('distributes over negation: (-q)⁻¹ = -(q⁻¹)', function () {
            const q = quat(1, 2, 3, 4);
            quatNormalize(q, q);
            const negQ = quatNegate(quat(), q);
            const invQ = quatInvert(quat(), q);
            const invNegQ = quatInvert(quat(), negQ);
            expect(quatEquals(invNegQ, quatNegate(quat(), invQ))).toBe(true);
        });

        it('outputs a modified parameter', function () {
            const q = quat(1, 2, 3, 4);
            const out = quatInvert(q, q);
            expect(out).toBe(q);
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

        it('returns the original when applied twice', function () {
            const q = quat(1, 2, 3, 4);
            quatNegate(out, q);
            quatNegate(out, out);
            expect(quatEquals(out, q)).toBe(true);
        });

        it('keeps magnitude', function () {
            const q = quat(1, 2, 3, 4);
            quatNegate(out, q);
            expect(quatMagnitude(out)).toBeCloseTo(quatMagnitude(q), 6);
        });

        it('outputs a modified parameter', function () {
            const q = quat(1, 2, 3, 4);
            const out = quatNegate(q, q);
            expect(out).toBe(q);
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

        it('returns the original when applied twice', function () {
            const q = quat(1, 2, 3, 4);
            quatConjugate(out, q);
            quatConjugate(out, out);
            expect(quatEquals(out, q)).toBe(true);
        });

        it('keeps magnitude', function () {
            const q = quat(1, 2, 3, 4);
            quatConjugate(out, q);
            expect(quatMagnitude(out)).toBeCloseTo(quatMagnitude(q), 6);
        });

        it('distributes over negation: (-q)* = -(q*)', function () {
            const q = quat(1, 2, 3, 4);
            quatNormalize(q, q);
            const negQ = quatNegate(quat(), q);
            const conjQ = quatConjugate(quat(), q);
            const conjNegQ = quatConjugate(quat(), negQ);
            expect(quatEquals(conjNegQ, quatNegate(quat(), conjQ))).toBe(true);
        });

        it('commutes with normalization', function () {
            const q = quat(1, 2, 3, 4);
            quatConjugate(out, quatNormalize(out, q));
            const out2 = quat();
            quatNormalize(out2, quatConjugate(out2, q));
            expect(quatEquals(out, out2)).toBe(true);
        });

        it('satisfies the equality: q * q* = |q|²', function () {
            const q = quat(1, 2, 3, 4);
            quatConjugate(out, q);
            const squaredMagQ = quatMagnitude(q) ** 2;
            quatMultiply(out, q, out);
            expect(quatEquals(out, quatScale(quat(), QUAT_IDENTITY, squaredMagQ))).toBe(true);
        });

        it('outputs a modified parameter', function () {
            const q = quat(1, 2, 3, 4);
            const out = quatConjugate(q, q);
            expect(out).toBe(q);
            expect(q).toEqual(quat(-1, -2, -3, 4));
        });
    });

    describe('quatNormalize', function () {
        it('normalizes a quaternion to unit length', function () {
            const normalized = quatNormalize(quat(), quat(2, 0, 0, 0));
            expect(normalized).toEqual(quat(1, 0, 0, 0));
        });

        it('handles zero quaternion', function () {
            quatNormalize(out, quat(0, 0, 0, 0));
            // should fallback to identity
            expect(out).toEqual(QUAT_IDENTITY);
        });

        it('preserves direction', function () {
            const q = quat(1, 2, 3, 4);
            quatNormalize(out, q);
            const scale = quatMagnitude(q);
            // every component should be scaled by the same factor,
            // so the normalized quaternion should be equal to the original scaled by 1/scale
            expect(quatEquals(quatScale(quat(), out, scale), q)).toBe(true);
        });

        it('does not modify already normalized quaternions', function () {
            const q1 = quat(1, 0, 0, 0);
            const q2 = quat(0, 1, 0, 0);
            const q3 = quat(0, 0, 1, 0);
            const q4 = quat(0.5, 0.5, 0.5, 0.5);
            expect(quatEquals(quatNormalize(quat(), q1), q1)).toBe(true);
            expect(quatEquals(quatNormalize(quat(), q2), q2)).toBe(true);
            expect(quatEquals(quatNormalize(quat(), q3), q3)).toBe(true);
            expect(quatEquals(quatNormalize(quat(), q4), q4)).toBe(true);
            expect(quatEquals(quatNormalize(quat(), QUAT_IDENTITY), QUAT_IDENTITY)).toBe(true);
        });

        it('is idempotent', function () {
            const q = quat(1, 2, 3, 4);
            quatNormalize(out, q);
            quatNormalize(out, out);
            // normalizing a normalized quaternion should yield the same quaternion
            expect(quatEquals(out, quatNormalize(quat(), q))).toBe(true);
        });

        it('commutes with negation: normalize(-q) = -normalize(q)', function () {
            const q = quat(1, 2, 3, 4);
            quatNegate(out, quatNormalize(out, q));
            const out2 = quat();
            quatNormalize(out2, quatNegate(out2, q));
            expect(quatEquals(out, out2)).toBe(true);
        });

        it('output a modified parameter', function () {
            const q = quat(2, 0, 0, 0);
            const out = quatNormalize(q, q);
            expect(out).toBe(q);
            expect(q).toEqual(quat(1, 0, 0, 0));
        });
    });

    describe('quatExp', function () {
        it('computes quaternion exponential', function () {
            const q = quat(0, Math.PI / 2, 0, 0);
            quatExp(out, q);
            expect(quatEquals(out, quat(0, 1, 0, 0))).toBe(true);

            quatSet(q, 0, Math.PI, 0, 0);
            quatExp(out, q);
            expect(quatEquals(out, quat(0, 0, 0, -1))).toBe(true);
        });

        it('handles zero quaternion', function () {
            quatExp(out, quat(0, 0, 0, 0));
            expect(quatEquals(out, QUAT_IDENTITY)).toBe(true);
        });

        it('handles unit basis quaternions', function () {
            quatExp(out, quat(1, 0, 0, 0));
            expect(quatEquals(out, quat(Math.sin(1), 0, 0, Math.cos(1)))).toBe(true);
            quatExp(out, quat(0, 1, 0, 0));
            expect(quatEquals(out, quat(0, Math.sin(1), 0, Math.cos(1)))).toBe(true);
            quatExp(out, quat(0, 0, 1, 0));
            expect(quatEquals(out, quat(0, 0, Math.sin(1), Math.cos(1)))).toBe(true);
        });

        it('handles pure sclarar quaternions', function () {
            const q = quat(0, 0, 0, Math.PI);
            quatExp(out, q);
            expect(out).toEqual(quat(0, 0, 0, Math.exp(Math.PI)));

            quatSet(q, 0, 0, 0, Math.log(2));
            quatExp(out, q);
            expect(out).toEqual(quat(0, 0, 0, 2));
        });

        it('satisfies arithmetic properties', function () {
            const q = quat(6, 5, 4, 3);
            quatNormalize(q, q);

            // mag(exp(q)) == exp(real(q))
            const expQ = quatExp(quat(), q);
            const magExpQ = quatMagnitude(expQ);
            const expRealQ = Math.exp(q.w);
            expect(magExpQ).toBeCloseTo(expRealQ, 6);

            // exp(log(q)) == q for q with positive real part
            const logQ = quatLn(quat(), q);
            const expLogQ = quatExp(quat(), logQ);
            expect(quatEquals(quatNormalize(quat(), expLogQ), quatNormalize(quat(), q))).toBe(true);

            // log(exp(q)) == q for q with zero real part
            const q1 = quat(1, 2, 3, 0);
            quatNormalize(q1, q1);
            const expQ1 = quatExp(quat(), q1);
            const logExpQ1 = quatLn(quat(), expQ1);
            expect(quatEquals(quatNormalize(quat(), logExpQ1), quatNormalize(quat(), q1))).toBe(true);

            // conj(exp(q)) == exp(conj(q))
            const conjExpQ = quatConjugate(quat(), expQ);
            const expConjQ = quatExp(quat(), quatConjugate(quat(), q));
            expect(quatEquals(quatNormalize(quat(), conjExpQ), quatNormalize(quat(), expConjQ))).toBe(true);

            // exp(-q) == inv(exp(q))
            const negQ = quatNegate(quat(), q);
            const expNegQ = quatExp(quat(), negQ);
            const invExpQ = quatInvert(quat(), expQ);
            expect(quatEquals(quatNormalize(quat(), expNegQ), quatNormalize(quat(), invExpQ))).toBe(true);

            // exp(q) * exp(-q) == identity
            const expQexpNegQ = quatMultiply(quat(), expQ, expNegQ);
            expect(quatEquals(quatNormalize(quat(), expQexpNegQ), QUAT_IDENTITY)).toBe(true);

            // exp(p+q) == exp(p)exp(q) for commuting p and q
            const p = quat(2, 0, 0, 1);
            const q2 = quat(4, 0, 0, 3); // lie along the same axis as p, so p and q2 commute
            const expPplusQ = quatExp(quat(), quatAdd(quat(), p, q2));
            const expPexpQ = quatMultiply(quat(), quatExp(quat(), p), quatExp(quat(), q2));
            expect(quatEquals(quatNormalize(quat(), expPplusQ), quatNormalize(quat(), expPexpQ))).toBe(true);

            // exp(a+v) == exp(a)exp(v) for scalar a and vector v
            const a = quat(0, 0, 0, 2); // scalar quaternion
            const v = quat(1, 2, 3, 0); // vector quaternion
            const expAplusV = quatExp(quat(), quatAdd(quat(), a, v));
            const expAexpV = quatMultiply(quat(), quatExp(quat(), a), quatExp(quat(), v));
            expect(quatEquals(quatNormalize(quat(), expAplusV), quatNormalize(quat(), expAexpV))).toBe(true);
        });

        it('output a modified parameter', function () {
            const q = quat(0, Math.PI / 2, 0, 0);
            const out = quatExp(q, q);
            expect(out).toBe(q);
            expect(quatEquals(q, quat(0, 1, 0, 0))).toBe(true);
        });
    });

    describe('quatLn', function () {
        it('handles identity quaternion', function () {
            const out = quatLn(quat(), QUAT_IDENTITY);
            expect(out).toEqual(quat(0, 0, 0, 0));
        });

        it('handles positive scalar quaternions', function () {
            const out = quatLn(quat(), quat(0, 0, 0, 2));
            expect(out).toEqual(quat(0, 0, 0, Math.log(2)));
        });

        it('handles unit basis quaternions', function () {
            const out = quatLn(quat(), quat(1, 0, 0, 0));
            expect(out).toEqual(quat(Math.PI / 2, 0, 0, 0));

            quatLn(out, quat(0, 1, 0, 0));
            expect(out).toEqual(quat(0, Math.PI / 2, 0, 0));

            quatLn(out, quat(0, 0, 1, 0));
            expect(out).toEqual(quat(0, 0, Math.PI / 2, 0));
        });

        it('respects geometric rotation interpretation', function () {
            const axis = quatNormalize(quat(), quat(1, 2, 3, 0));
            const angle = Math.PI / 3;
            const q = quatSet(
                quat(),
                axis.x * Math.sin(angle / 2),
                axis.y * Math.sin(angle / 2),
                axis.z * Math.sin(angle / 2),
                Math.cos(angle / 2),
            );
            quatNormalize(q, q);
            const lnQ = quatLn(quat(), q);
            expect(
                quatEquals(
                    quatNormalize(quat(), lnQ),
                    quatNormalize(quat(), quat((axis.x * angle) / 2, (axis.y * angle) / 2, (axis.z * angle) / 2, 0)),
                ),
            ).toBe(true);
        });

        it('handles small vector part', function () {
            const q = quat(1e-6, 1e-6, 1e-6, 1);
            quatNormalize(q, q);
            const lnQ = quatLn(quat(), q);
            expect(quatEquals(quatNormalize(quat(), lnQ), quatNormalize(quat(), quat(1e-6, 1e-6, 1e-6, 0)))).toBe(true);
        });

        it('satisfies arithmetic properties', function () {
            const q = quat(6, 5, 4, 3);
            quatNormalize(q, q);

            // norm property: real(ln(q)) = ln(|q|)
            const lnQ = quatLn(quat(), q);
            const lnMagQ = Math.log(quatMagnitude(q));
            expect(lnQ.w).toBeCloseTo(lnMagQ, 6);

            // scaling identity: ln(a * q) = ln(a) + ln(q) for a > 0
            const a = 2;
            const lnAq = quatLn(quat(), quatScale(quat(), q, a));
            const lnAplusLnQ = quatAdd(quat(), quat(0, 0, 0, Math.log(a)), lnQ);
            expect(quatEquals(quatNormalize(quat(), lnAq), quatNormalize(quat(), lnAplusLnQ))).toBe(true);

            // inverse identity: ln(inv(q)) = neg(ln(q)) with q normalized
            const invQ = quatInvert(quat(), q);
            const lnInvQ = quatLn(quat(), invQ);
            const negLnQ = quatNegate(quat(), lnQ);
            expect(quatEquals(quatNormalize(quat(), lnInvQ), quatNormalize(quat(), negLnQ))).toBe(true);
        });

        it('output a modified parameter', function () {
            const q = quat(1, 0, 0, 0);
            const out = quatLn(q, q);
            expect(out).toBe(q);
            expect(quatEquals(q, quat(Math.PI / 2, 0, 0, 0))).toBe(true);
        });
    });

    describe('quatPow', function () {
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

        it('raises quaternion to a positive integer power', function () {
            const q = quat(0.5, 0.5, 0.5, 0.5);
            const out = quatPow(quat(), q, 3);
            const expected = quatMultiply(quat(), quatMultiply(quat(), q, q), q);
            expect(quatEquals(out, expected)).toBe(true);
        });

        it('raises quaternion to a negative integer power', function () {
            const q = quat(0.5, 0.5, 0.5, 0.5);
            const out = quatPow(quat(), q, -2);
            const invQ = quatInvert(quat(), q);
            const expected = quatMultiply(quat(), invQ, invQ);
            expect(quatEquals(out, expected)).toBe(true);
        });

        it('raises quaternion to a fractional power', function () {
            const q = quat(0.5, 0.5, 0.5, 0.5);
            const s = quatPow(quat(), q, 0.5);
            const squared = quatMultiply(quat(), s, s);
            expect(quatEquals(squared, q)).toBe(true);
        });

        it('handles positive scalar quaternions', function () {
            const q = quat(0, 0, 0, 2);
            const out = quatPow(quat(), q, 3);
            expect(quatEquals(out, quat(0, 0, 0, 8))).toBe(true);
        });

        it('handles unit basis quaternions', function () {
            const q = quat(1, 0, 0, 0);
            const squared = quatPow(quat(), q, 2);
            const pow4 = quatPow(quat(), q, 4);
            const powHalf = quatPow(quat(), q, 0.5);
            expect(quatEquals(squared, quat(0, 0, 0, -1))).toBe(true);
            expect(quatEquals(pow4, quat(0, 0, 0, 1))).toBe(true);
            expect(quatEquals(powHalf, quat(Math.sqrt(2) / 2, 0, 0, Math.sqrt(2) / 2))).toBe(true);

            quatPow(squared, quat(0, 1, 0, 0), 2);
            quatPow(pow4, quat(0, 1, 0, 0), 4);
            quatPow(powHalf, quat(0, 1, 0, 0), 0.5);
            expect(quatEquals(squared, quat(0, 0, 0, -1))).toBe(true);
            expect(quatEquals(pow4, quat(0, 0, 0, 1))).toBe(true);
            expect(quatEquals(powHalf, quat(0, Math.sqrt(2) / 2, 0, Math.sqrt(2) / 2))).toBe(true);

            quatPow(squared, quat(0, 0, 1, 0), 2);
            quatPow(pow4, quat(0, 0, 1, 0), 4);
            quatPow(powHalf, quat(0, 0, 1, 0), 0.5);
            expect(quatEquals(squared, quat(0, 0, 0, -1))).toBe(true);
            expect(quatEquals(pow4, quat(0, 0, 0, 1))).toBe(true);
            expect(quatEquals(powHalf, quat(0, 0, Math.sqrt(2) / 2, Math.sqrt(2) / 2))).toBe(true);
        });

        it('respects geometric rotation interpretation', function () {
            const axis = quatNormalize(quat(), quat(1, 2, 3, 0));
            const angle = Math.PI / 3;
            const q = quatSet(
                quat(),
                axis.x * Math.sin(angle / 2),
                axis.y * Math.sin(angle / 2),
                axis.z * Math.sin(angle / 2),
                Math.cos(angle / 2),
            );
            quatNormalize(q, q);
            const powQ = quatPow(quat(), q, 2);
            const expected = quatSet(
                quat(),
                axis.x * Math.sin(angle),
                axis.y * Math.sin(angle),
                axis.z * Math.sin(angle),
                Math.cos(angle),
            );
            expect(quatEquals(quatNormalize(quat(), powQ), quatNormalize(quat(), expected))).toBe(true);
        });

        it('satisfies arithmetic properties', function () {
            const q = quat(6, 5, 4, 3);
            quatNormalize(q, q);

            // pow(q, a + b) == pow(q, a) * pow(q, b)
            const a = 2;
            const b = 3;
            const powQab = quatPow(quat(), q, a + b);
            const powQa = quatPow(quat(), q, a);
            const powQb = quatPow(quat(), q, b);
            const powQaQb = quatMultiply(quat(), powQa, powQb);
            expect(quatEquals(quatNormalize(quat(), powQab), quatNormalize(quat(), powQaQb))).toBe(true);

            // inverse consistency: pow(q,-1) * q == identity
            const powQneg1 = quatPow(quat(), q, -1);
            const powQneg1Q = quatMultiply(quat(), powQneg1, q);
            expect(quatEquals(quatNormalize(quat(), powQneg1Q), QUAT_IDENTITY)).toBe(true);

            // norm identity: |pow(q, a)| == |q|^a
            const a2 = 2.5;
            quatPow(powQa, q, a2);
            const magPowQa = quatMagnitude(powQa);
            const magQa = quatMagnitude(q) ** a2;
            expect(magPowQa).toBeCloseTo(magQa, 6);

            // pow(q, a) == exp(a * log(q))
            const logQ = quatLn(quat(), q);
            const aLogQ = quatScale(quat(), logQ, a);
            const expALogQ = quatExp(quat(), aLogQ);
            quatPow(powQa, q, a);
            expect(quatEquals(quatNormalize(quat(), expALogQ), quatNormalize(quat(), powQa))).toBe(true);
        });

        it('output a modified parameter', function () {
            const q = quat(0.5, 0.5, 0.5, 0.5);
            const out = quatPow(q, q, 2);
            expect(out).toBe(q);
            expect(quatEquals(q, quat(0.5, 0.5, 0.5, -0.5))).toBe(true);
        });
    });

    it('scales quaternion by a scalar', function () {
        expect(quatScale(quat(), quat(1, 2, 3, 4), 2)).toEqual(quat(2, 4, 6, 8));
    });
});
