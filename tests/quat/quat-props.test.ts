import { describe, expect, it } from 'vitest';
import { quat } from '../../src/quat/quat-core';
import { quatMagnitude, quatSquaredMagnitude } from '../../src/quat/quat-props';

describe('quat-props', function () {
	it('computes squared magnitude', function () {
		expect(quatSquaredMagnitude(quat(1, 2, 3, 4))).toBe(30);
	});

	it('computes magnitude', function () {
		expect(quatMagnitude(quat(1, 2, 3, 4))).toBeCloseTo(Math.sqrt(30), 6);
	});
});
