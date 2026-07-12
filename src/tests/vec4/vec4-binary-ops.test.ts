import { describe, expect, it } from 'vitest';
import { vec4, vec4Equals } from '../../vec4/vec4-core';
import {
    vec4Add,
    vec4Angle,
    vec4Distance,
    vec4Divide,
    vec4Dot,
    vec4Lerp,
    vec4Multiply,
    vec4SquaredDistance,
    vec4Subtract,
} from '../../vec4/vec4-binary-ops';

describe('vec4-binary-ops', function () {
    it('runs arithmetic, metrics and angle helpers', function () {
        const out = vec4();

        vec4Add(out, vec4(1, 2, 3, 4), vec4(4, 3, 2, 1));
        expect(vec4Equals(out, vec4(5, 5, 5, 5))).toBe(true);

        vec4Subtract(out, vec4(4, 3, 2, 1), vec4(1, 2, 3, 4));
        expect(vec4Equals(out, vec4(3, 1, -1, -3))).toBe(true);

        vec4Multiply(out, vec4(2, 3, 4, 5), vec4(5, 4, 3, 2));
        expect(vec4Equals(out, vec4(10, 12, 12, 10))).toBe(true);

        vec4Divide(out, vec4(8, 6, 4, 2), vec4(2, 3, 4, 2));
        expect(vec4Equals(out, vec4(4, 2, 1, 1))).toBe(true);

        expect(vec4Distance(vec4(0, 0, 0, 0), vec4(1, 2, 2, 1))).toBeCloseTo(3.16227766, 6);
        expect(vec4SquaredDistance(vec4(0, 0, 0, 0), vec4(1, 2, 2, 1))).toBe(10);
        expect(vec4Dot(vec4(1, 2, 3, 4), vec4(5, 6, 7, 8))).toBe(70);

        vec4Lerp(out, vec4(0, 0, 0, 0), vec4(10, 20, 30, 40), 0.25);
        expect(vec4Equals(out, vec4(2.5, 5, 7.5, 10))).toBe(true);

        expect(vec4Angle(vec4(1, 0, 0, 0), vec4(0, 1, 0, 0))).toBeCloseTo(Math.PI / 2, 6);
        expect(vec4Angle(vec4(0, 0, 0, 0), vec4(1, 0, 0, 0))).toBe(0);
    });
});
