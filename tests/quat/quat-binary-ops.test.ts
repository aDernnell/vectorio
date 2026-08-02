import { describe, expect, it } from 'vitest';
import { quatAdd, quatAngle, quatDot, quatLerp, quatMultiply, quatSlerp } from '../../src/quat/quat-binary-ops';
import { quat, QUAT_IDENTITY, quatSet } from '../../src/quat/quat-core';
import { quatFillRotation } from '../../src/quat/quat-rot';
import { vec3, VEC3_RIGHT, VEC3_UP, vec3Normalize } from '../../src/vec3';

describe('quat-binary-ops', () => {
    const out = quat();

    describe('multiplication', () => {

        it('multiplies two quaternions', () => {
            const quatA = quat(1, 2, 3, 4);
            const quatB = quat(5, 6, 7, 8);
            quatMultiply(out, quatA, quatB);
            expect(out).toEqual({
                x: 24,
                y: 48,
                z: 48,
                w: -6,
            });
        });

        it('output a modified parameter', () => {
            const quatA = quat(1, 2, 3, 4);
            const quatB = quat(5, 6, 7, 8);
            quatMultiply(quatA, quatA, quatB);
            expect(quatA).toEqual({
                x: 24,
                y: 48,
                z: 48,
                w: -6,
            });
            quatSet(quatA, 1, 2, 3, 4);
            quatMultiply(quatB, quatA, quatB);
            expect(quatB).toEqual({
                x: 24,
                y: 48,
                z: 48,
                w: -6,
            });
        });

        it('multiplies with identity', () => {
            const q = quat(0.5, 0.5, 0.5, 0.5);
            quatMultiply(out, q, QUAT_IDENTITY);
            expect(out).toEqual(q);

            quatMultiply(out, QUAT_IDENTITY, q);
            expect(out).toEqual(q);
        });

        it('multiplies with zero', () => {
            const q = quat(0.5, 0.5, 0.5, 0.5);
            const zeroQuat = quat(0, 0, 0, 0);
            quatMultiply(out, q, zeroQuat);
            expect(out).toEqual(zeroQuat);
        });

        it('is associative', () => {
            const a = quat(1, 2, 3, 4);
            const b = quat(5, 6, 7, 8);
            const c = quat(9, 10, 11, 12);
            const out1 = quat();
            const out2 = quat();
            quatMultiply(out1, a, quatMultiply(out2, b, c));
            quatMultiply(out2, quatMultiply(out2, a, b), c);
            expect(out1).toEqual(out2);
        });

        it('applies the standard Hamilton algebra', () => {
            const qx = quat(Math.SQRT1_2, 0, 0, Math.SQRT1_2); // 90 degrees around X axis
            const qy = quat(0, Math.SQRT1_2, 0, Math.SQRT1_2); // 90 degrees around Y axis
            quatMultiply(out, qx, qy);
            const expected = quat(0.5, 0.5, 0.5, 0.5); // 120 degrees around (1, 1, 1) axis
            // qy first, then qx: v' = qx * qy * v
            expect(out).toEqualQuat(expected);
        });

        // same test as above, but more verbose and with more details about the math behind it
        it('combines rotations in right-to-left order', () => {
            const angleA = Math.PI / 2;
            const angleB = Math.PI / 2;
            const axisA = VEC3_RIGHT; // Rotate around the X axis
            const axisB = VEC3_UP; // Rotate around the Y axis
            const cosHalfAngleA = Math.cos(angleA / 2);
            const sinHalfAngleA = Math.sin(angleA / 2);
            const cosHalfAngleB = Math.cos(angleB / 2);
            const sinHalfAngleB = Math.sin(angleB / 2);
            const quatA = quat(
                axisA.x * sinHalfAngleA,
                axisA.y * sinHalfAngleA,
                axisA.z * sinHalfAngleA,
                cosHalfAngleA,
            );
            const quatB = quat(
                axisB.x * sinHalfAngleB,
                axisB.y * sinHalfAngleB,
                axisB.z * sinHalfAngleB,
                cosHalfAngleB,
            );
            quatMultiply(out, quatA, quatB);

            const expectedAngle = 120 * (Math.PI / 180); // 120 degrees in radians
            const expectedAxis = vec3Normalize(vec3(), vec3(1, 1, 1));
            const sinHalfExpectedAngle = Math.sin(expectedAngle / 2);
            const cosHalfExpectedAngle = Math.cos(expectedAngle / 2);
            const expected = quat(
                expectedAxis.x * sinHalfExpectedAngle,
                expectedAxis.y * sinHalfExpectedAngle,
                expectedAxis.z * sinHalfExpectedAngle,
                cosHalfExpectedAngle,
            );
            expect(out).toEqualQuat(expected);
        });
    });

    it('adds two quaternions component-wise', function () {
        quatAdd(out, quat(1, 2, 3, 4), quat(4, 3, 2, 1));
        expect(out).toEqual(quat(5, 5, 5, 5));
    });

    it('computes quaternion dot product', function () {
        expect(quatDot(quat(1, 2, 3, 4), quat(5, 6, 7, 8))).toBe(70);
    });

    it('computes angular distance between unit quaternions', function () {
        const a = quat(0, 0, 0, 1);
        const b = quatFillRotation(quat(), VEC3_UP, Math.PI / 2);

        expect(quatAngle(a, b)).toBeCloseTo(Math.PI / 2, 6);
    });

    it('handles double-cover quaternions consistently in angle helper', function () {
        const q = quat(0.5, 0.5, 0.5, 0.5);
        const minusQ = quat(-0.5, -0.5, -0.5, -0.5);

        expect(quatAngle(q, minusQ)).toBeCloseTo(0, 6);
    });

    it('linearly interpolates quaternions', function () {
        quatLerp(out, quat(0, 0, 0, 1), quat(0, 0, 1, 0), 0.25);
        expect(out).toEqual(quat(0, 0, 0.25, 0.75));
    });

    it('slerps along the shortest path for opposite hemispheres', function () {
        quatSlerp(out, quat(0, 0, 0, 1), quat(0, 0, 0, -1), 0.25);
        expect(out).toEqualQuat(quat(0, 0, 0, 1));
    });

    it('slerps between distant rotations', function () {
        const a = quat(0, 0, 0, 1);
        const b = quatFillRotation(quat(), VEC3_UP, Math.PI);
        quatSlerp(out, a, b, 0.5);
        const expected = quatFillRotation(quat(), VEC3_UP, Math.PI / 2);

        expect(out).toEqualQuat(expected);
    });
});
