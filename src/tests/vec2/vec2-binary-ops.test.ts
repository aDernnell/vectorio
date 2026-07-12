import { describe, expect, it } from 'vitest';
import { vec2, vec2Equals } from '../../vec2/vec2-core';
import {
    vec2Add,
    vec2Angle,
    vec2Cross,
    vec2Distance,
    vec2Divide,
    vec2Dot,
    vec2Lerp,
    vec2Multiply,
    vec2SignedAngle,
    vec2SquaredDistance,
    vec2Subtract,
} from '../../vec2/vec2-binary-ops';

describe('vec2-binary-ops', function () {
    it('runs arithmetic, metrics and angle helpers', function () {
        const out = vec2();
        vec2Add(out, vec2(1, 2), vec2(3, 4));
        expect(vec2Equals(out, vec2(4, 6))).toBe(true);

        vec2Subtract(out, vec2(3, 4), vec2(1, 2));
        expect(vec2Equals(out, vec2(2, 2))).toBe(true);

        vec2Multiply(out, vec2(2, 3), vec2(4, 5));
        expect(vec2Equals(out, vec2(8, 15))).toBe(true);

        vec2Divide(out, vec2(8, 6), vec2(2, 3));
        expect(vec2Equals(out, vec2(4, 2))).toBe(true);

        expect(vec2Distance(vec2(0, 0), vec2(3, 4))).toBe(5);
        expect(vec2SquaredDistance(vec2(0, 0), vec2(3, 4))).toBe(25);
        expect(vec2Dot(vec2(1, 2), vec2(3, 4))).toBe(11);
        expect(vec2Cross(vec2(1, 0), vec2(0, 1))).toBe(1);

        vec2Lerp(out, vec2(0, 0), vec2(10, 20), 0.25);
        expect(vec2Equals(out, vec2(2.5, 5))).toBe(true);

        expect(vec2Angle(vec2(1, 0), vec2(0, 1))).toBeCloseTo(Math.PI / 2, 6);
        expect(vec2SignedAngle(vec2(1, 0), vec2(0, 1))).toBeCloseTo(Math.PI / 2, 6);
    });
});
