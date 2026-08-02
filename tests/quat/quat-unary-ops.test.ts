import { describe, expect, it } from 'vitest';
import { quatAdd, quatMultiply } from '../../src/quat/quat-binary-ops';
import { QUAT_IDENTITY, quat, quatSet } from '../../src/quat/quat-core';
import { quatMagnitude } from '../../src/quat/quat-props';
import { quatConjugate, quatExp, quatInvert, quatLn, quatNegate, quatNormalize, quatPow, quatScale } from '../../src/quat/quat-unary-ops';

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
            expect(out).toEqualQuat(QUAT_IDENTITY);
            quatMultiply(out, inv, q);
            expect(out).toEqualQuat(QUAT_IDENTITY);
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
            expect(out).toEqualQuat(QUAT_IDENTITY);
        });

        it('satisfies the relation q⁻¹ = q* / |q|²', function () {
            const q = quat(1, 2, 3, 4);
            quatInvert(out, q);
            const expected = quatConjugate(quat(), q);
            const squaredMagQ = quatMagnitude(q) ** 2;
            expect(out).toEqualQuat(quatScale(expected, expected, 1 / squaredMagQ));
        });

        it('returns the original when applied twice', function () {
            const q = quat(1, 2, 3, 4);
            // the invert is a unit quaternion
            quatInvert(out, q);
            quatInvert(out, out);
            expect(out).toEqualQuat(q);
        });

        it('distributes over negation: (-q)⁻¹ = -(q⁻¹)', function () {
            const q = quat(1, 2, 3, 4);
            quatNormalize(q, q);
            const negQ = quatNegate(quat(), q);
            const invQ = quatInvert(quat(), q);
            const invNegQ = quatInvert(quat(), negQ);
            expect(invNegQ).toEqualQuat(quatNegate(quat(), invQ));
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
            expect(out).toEqualQuat(q);
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
            expect(inv).toEqualQuat(conj);
        });

        it('returns the original when applied twice', function () {
            const q = quat(1, 2, 3, 4);
            quatConjugate(out, q);
            quatConjugate(out, out);
            expect(out).toEqualQuat(q);
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
            expect(conjNegQ).toEqualQuat(quatNegate(quat(), conjQ));
        });

        it('commutes with normalization', function () {
            const q = quat(1, 2, 3, 4);
            quatConjugate(out, quatNormalize(out, q));
            const out2 = quat();
            quatNormalize(out2, quatConjugate(out2, q));
            expect(out).toEqualQuat(out2);
        });

        it('satisfies the equality: q * q* = |q|²', function () {
            const q = quat(1, 2, 3, 4);
            quatConjugate(out, q);
            const squaredMagQ = quatMagnitude(q) ** 2;
            quatMultiply(out, q, out);
            expect(out).toEqualQuat(quatScale(quat(), QUAT_IDENTITY, squaredMagQ));
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
            expect(quatScale(quat(), out, scale)).toEqualQuat(q);
        });

        it('does not modify already normalized quaternions', function () {
            const q1 = quat(1, 0, 0, 0);
            const q2 = quat(0, 1, 0, 0);
            const q3 = quat(0, 0, 1, 0);
            const q4 = quat(0.5, 0.5, 0.5, 0.5);
            expect(quatNormalize(quat(), q1)).toEqual(q1);
            expect(quatNormalize(quat(), q2)).toEqual(q2);
            expect(quatNormalize(quat(), q3)).toEqual(q3);
            expect(quatNormalize(quat(), q4)).toEqual(q4);
            expect(quatNormalize(quat(), QUAT_IDENTITY)).toEqual(QUAT_IDENTITY);
        });

        it('is approximately idempotent', function () {
            const q = quat(1, 2, 3, 4);
            quatNormalize(out, q);
            quatNormalize(out, out);
            // normalizing a normalized quaternion should yield the same quaternion,
            // but due to floating point precision it's not one hundred percent accurate.
            // Note: the tolerance comparison (toEqualQuat) internally normalizes both quaternions before comparing them,
            // so a bit of accuracy is lost in the process.
            expect(out).toEqualQuat(quatNormalize(quat(), q), 1e-12);
        });

        it('commutes with negation: normalize(-q) = -normalize(q)', function () {
            const q = quat(1, 2, 3, 4);
            quatNegate(out, quatNormalize(out, q));
            const out2 = quat();
            quatNormalize(out2, quatNegate(out2, q));
            expect(out).toEqualQuat(out2);
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
            expect(out).toEqualQuat(quat(0, 1, 0, 0));

            quatSet(q, 0, Math.PI, 0, 0);
            quatExp(out, q);
            expect(out).toEqualQuat(quat(0, 0, 0, -1));
        });

        it('handles zero quaternion', function () {
            quatExp(out, quat(0, 0, 0, 0));
            expect(out).toEqualQuat(QUAT_IDENTITY);
        });

        it('handles unit basis quaternions', function () {
            quatExp(out, quat(1, 0, 0, 0));
            expect(out).toEqualQuat(quat(Math.sin(1), 0, 0, Math.cos(1)));
            quatExp(out, quat(0, 1, 0, 0));
            expect(out).toEqualQuat(quat(0, Math.sin(1), 0, Math.cos(1)));
            quatExp(out, quat(0, 0, 1, 0));
            expect(out).toEqualQuat(quat(0, 0, Math.sin(1), Math.cos(1)));
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
            expect(expLogQ).toEqualQuat(q);

            // log(exp(q)) == q for q with zero real part
            const q1 = quat(1, 2, 3, 0);
            quatNormalize(q1, q1);
            const expQ1 = quatExp(quat(), q1);
            const logExpQ1 = quatLn(quat(), expQ1);
            expect(logExpQ1).toEqualQuat(q1);

            // conj(exp(q)) == exp(conj(q))
            const conjExpQ = quatConjugate(quat(), expQ);
            const expConjQ = quatExp(quat(), quatConjugate(quat(), q));
            expect(conjExpQ).toEqualQuat(expConjQ);

            // exp(-q) == inv(exp(q))
            const negQ = quatNegate(quat(), q);
            const expNegQ = quatExp(quat(), negQ);
            const invExpQ = quatInvert(quat(), expQ);
            expect(expNegQ).toEqualQuat(invExpQ);

            // exp(q) * exp(-q) == identity
            const expQexpNegQ = quatMultiply(quat(), expQ, expNegQ);
            expect(expQexpNegQ).toEqualQuat(QUAT_IDENTITY);

            // exp(p+q) == exp(p)exp(q) for commuting p and q
            const p = quat(2, 0, 0, 1);
            const q2 = quat(4, 0, 0, 3); // lie along the same axis as p, so p and q2 commute
            const expPplusQ = quatExp(quat(), quatAdd(quat(), p, q2));
            const expPexpQ = quatMultiply(quat(), quatExp(quat(), p), quatExp(quat(), q2));
            expect(expPplusQ).toEqualQuat(expPexpQ);

            // exp(a+v) == exp(a)exp(v) for scalar a and vector v
            const a = quat(0, 0, 0, 2); // scalar quaternion
            const v = quat(1, 2, 3, 0); // vector quaternion
            const expAplusV = quatExp(quat(), quatAdd(quat(), a, v));
            const expAexpV = quatMultiply(quat(), quatExp(quat(), a), quatExp(quat(), v));
            expect(expAplusV).toEqualQuat(expAexpV);
        });

        it('output a modified parameter', function () {
            const q = quat(0, Math.PI / 2, 0, 0);
            const out = quatExp(q, q);
            expect(out).toBe(q);
            expect(q).toEqualQuat(quat(0, 1, 0, 0));
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
            expect(lnQ).toEqualQuat(quat((axis.x * angle) / 2, (axis.y * angle) / 2, (axis.z * angle) / 2, 0));
        });

        it('handles small vector part', function () {
            const q = quat(1e-6, 1e-6, 1e-6, 1);
            quatNormalize(q, q);
            const lnQ = quatLn(quat(), q);
            expect(lnQ).toEqualQuat(quat(1e-6, 1e-6, 1e-6, 0));
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
            expect(lnAq).toEqualQuat(lnAplusLnQ);

            // inverse identity: ln(inv(q)) = neg(ln(q)) with q normalized
            const invQ = quatInvert(quat(), q);
            const lnInvQ = quatLn(quat(), invQ);
            const negLnQ = quatNegate(quat(), lnQ);
            expect(lnInvQ).toEqualQuat(negLnQ);
        });

        it('output a modified parameter', function () {
            const q = quat(1, 0, 0, 0);
            const out = quatLn(q, q);
            expect(out).toBe(q);
            expect(q).toEqualQuat(quat(Math.PI / 2, 0, 0, 0));
        });
    });

    describe('quatPow', function () {
        it('raises quaternion to the power of zero', function () {
            const q = quat(0.5, 0.5, 0.5, 0.5);
            const out = quatPow(quat(), q, 0);
            expect(out).toEqualQuat(QUAT_IDENTITY);
        });

        it('raises quaternion to the power of one', function () {
            const q = quat(0.5, 0.5, 0.5, 0.5);
            const out = quatPow(quat(), q, 1);
            expect(out).toEqualQuat(q);
        });

        it('raises quaternion to a positive integer power', function () {
            const q = quat(0.5, 0.5, 0.5, 0.5);
            const out = quatPow(quat(), q, 3);
            const expected = quatMultiply(quat(), quatMultiply(quat(), q, q), q);
            expect(out).toEqualQuat(expected);
        });

        it('raises quaternion to a negative integer power', function () {
            const q = quat(0.5, 0.5, 0.5, 0.5);
            const out = quatPow(quat(), q, -2);
            const invQ = quatInvert(quat(), q);
            const expected = quatMultiply(quat(), invQ, invQ);
            expect(out).toEqualQuat(expected);
        });

        it('raises quaternion to a fractional power', function () {
            const q = quat(0.5, 0.5, 0.5, 0.5);
            const s = quatPow(quat(), q, 0.5);
            const squared = quatMultiply(quat(), s, s);
            expect(squared).toEqualQuat(q);
        });

        it('handles positive scalar quaternions', function () {
            const q = quat(0, 0, 0, 2);
            const out = quatPow(quat(), q, 3);
            expect(out).toEqualQuat(quat(0, 0, 0, 8));
        });

        it('handles unit basis quaternions', function () {
            const q = quat(1, 0, 0, 0);
            const squared = quatPow(quat(), q, 2);
            const pow4 = quatPow(quat(), q, 4);
            const powHalf = quatPow(quat(), q, 0.5);
            expect(squared).toEqualQuat(quat(0, 0, 0, -1));
            expect(pow4).toEqualQuat(quat(0, 0, 0, 1));
            expect(powHalf).toEqualQuat(quat(Math.sqrt(2) / 2, 0, 0, Math.sqrt(2) / 2));

            quatPow(squared, quat(0, 1, 0, 0), 2);
            quatPow(pow4, quat(0, 1, 0, 0), 4);
            quatPow(powHalf, quat(0, 1, 0, 0), 0.5);
            expect(squared).toEqualQuat(quat(0, 0, 0, -1));
            expect(pow4).toEqualQuat(quat(0, 0, 0, 1));
            expect(powHalf).toEqualQuat(quat(0, Math.sqrt(2) / 2, 0, Math.sqrt(2) / 2));

            quatPow(squared, quat(0, 0, 1, 0), 2);
            quatPow(pow4, quat(0, 0, 1, 0), 4);
            quatPow(powHalf, quat(0, 0, 1, 0), 0.5);
            expect(squared).toEqualQuat(quat(0, 0, 0, -1));
            expect(pow4).toEqualQuat(quat(0, 0, 0, 1));
            expect(powHalf).toEqualQuat(quat(0, 0, Math.sqrt(2) / 2, Math.sqrt(2) / 2));
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
            expect(powQ).toEqualQuat(expected);
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
            expect(powQab).toEqualQuat(powQaQb);

            // inverse consistency: pow(q,-1) * q == identity
            const powQneg1 = quatPow(quat(), q, -1);
            const powQneg1Q = quatMultiply(quat(), powQneg1, q);
            expect(powQneg1Q).toEqualQuat(QUAT_IDENTITY);

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
            expect(expALogQ).toEqualQuat(powQa);
        });

        it('output a modified parameter', function () {
            const q = quat(0.5, 0.5, 0.5, 0.5);
            const out = quatPow(q, q, 2);
            expect(out).toBe(q);
            expect(q).toEqualQuat(quat(0.5, 0.5, 0.5, -0.5));
        });
    });

    it('scales quaternion by a scalar', function () {
        expect(quatScale(quat(), quat(1, 2, 3, 4), 2)).toEqual(quat(2, 4, 6, 8));
    });
});
