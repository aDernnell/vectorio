import { describe, expect, it } from 'vitest';
import { clamp, lerp, round } from '../utils';

describe('utils.round', function () {
    it('rounds positive half values toward positive infinity', function () {
        expect(round(0.5)).toBe(1);
        expect(round(1.5)).toBe(2);
        expect(round(2.5)).toBe(3);
        expect(round(3.5)).toBe(4);
    });

	it('rounds to closest integer for positive non-half values', function () {
		expect(round(0)).toBe(0);
		expect(round(+0)).toBe(0);
		expect(round(1.2)).toBe(1);
        expect(round(1.6)).toBe(2);
		expect(round(2.49)).toBe(2);
    });

	it('rounds negative half values toward negative infinity', function () {
		expect(round(-0.5)).toBe(-1);
		expect(round(-1.5)).toBe(-2);
		expect(round(-2.5)).toBe(-3);
		expect(round(-3.5)).toBe(-4);
	});

	it('rounds to closest integer for negative non-half values', function () {
        expect(round(-0)).toBe(-0);
		expect(round(-1.2)).toBe(-1);
		expect(round(-1.6)).toBe(-2);
		expect(round(-2.49)).toBe(-2);
		expect(round(-2.51)).toBe(-3);
	});
});

describe('utils.clamp', function () {
    it('returns the min value if the input is less than min', function () {
        expect(clamp(-5, 0, 10)).toBe(0);
        expect(clamp(0, 1, 10)).toBe(1);
    });

    it('returns the max value if the input is greater than max', function () {
        expect(clamp(15, 1, 10)).toBe(10);
    });

    it('returns the input value if it is within the range', function () {
        expect(clamp(5, 0, 10)).toBe(5);
    });
});

describe('utils.lerp', function () {
    it('returns the start value when t is 0', function () {
        expect(lerp(0, 10, 0)).toBe(0);
    });

    it('returns the end value when t is 1', function () {
        expect(lerp(0, 10, 1)).toBe(10);
    });

    it('returns the interpolated value for t between 0 and 1', function () {
        expect(lerp(0, 10, 0.5)).toBe(5);
        expect(lerp(10, 20, 0.25)).toBe(12.5);
    });

    it('returns the correct value for t outside the range [0, 1]', function () {
        expect(lerp(0, 10, -0.5)).toBe(-5);
        expect(lerp(0, 10, 1.5)).toBe(15);
    });
});
