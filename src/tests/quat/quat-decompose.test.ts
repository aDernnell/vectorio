import { describe, expect, it } from 'vitest';
import { extractAxisAngle } from '../../quat/quat-decompose';
import { quat, quatEquals } from '../../quat/quat-core';
import { quatFillRotation } from '../../quat/quat-rot';
import { VEC3_DOWN, VEC3_UP, vec3, vec3Equals } from '../../vec3';
import { quatNegate } from '../../quat/quat-unary-ops';

describe('quat-decompose', function () {
	it('extracts axis-angle from a regular rotation quaternion', function () {
		const q = quatFillRotation(quat(), VEC3_UP, Math.PI / 3);
		const axis = vec3();
		const angle = extractAxisAngle(axis, q);

		expect(vec3Equals(axis, VEC3_UP)).toBe(true);
		expect(angle).toBeCloseTo(Math.PI / 3, 6);
	});

    it('favors the positive angle', function () {
        const q = quat();
        quatNegate(q, quatFillRotation(q, VEC3_UP, Math.PI / 2));
        
        const equivalent = quatFillRotation(quat(), VEC3_DOWN, - Math.PI / 2);
        expect(quatEquals(q, equivalent)).toBe(true);

        const axis = vec3();
        const angle = extractAxisAngle(axis, q);
        console.log('axis', axis, 'angle', angle);
        console.log(3 * Math.PI / 2);

        // same axis, but positive angle (3π/2 instead of -π/2)
        expect(vec3Equals(axis, VEC3_DOWN)).toBe(true);
        expect(angle).toBeCloseTo(3 * Math.PI / 2, 6);
    });

	it('returns fallback axis for no rotation', function () {
		const axis = vec3();
		const angle = extractAxisAngle(axis, quat(0, 0, 0, 1));

		expect(vec3Equals(axis, vec3(1, 0, 0))).toBe(true);
		expect(angle).toBe(0);

        const angle2 = extractAxisAngle(axis, quat(0, 0, 0, -1));
        expect(vec3Equals(axis, vec3(1, 0, 0))).toBe(true);
        expect(angle2).toBe(0);
	});

	it('clamps invalid w values before acos', function () {
		const axis = vec3();
		const angle = extractAxisAngle(axis, quat(0, 0, 0, 2));

        // angle != NaN implies that the acos was clamped to [-1, 1] and returned a valid angle
        // if the angle were NaN, sin(angle/2) would be NaN, however NaN < 1e-6 is false, 
        // so the fallback axis would not be used and the returned angle would be NaN
		expect(Number.isFinite(angle)).toBe(true);
        // fallback axis is used because cos(1) or cos(-1) represent a rotation of 0
		expect(angle).toBe(0);
		expect(vec3Equals(axis, vec3(1, 0, 0))).toBe(true);
	});
});
