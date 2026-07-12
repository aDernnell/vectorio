import { describe, expect, it } from 'vitest';
import { vec2, vec2Equals } from '../../vec2/vec2-core';
import { vec2MatTransform, vec2Rotate, vec2Scale } from '../../vec2/vec2-affine';
import { mat2 } from '../../mat2/mat2-core';

describe('vec2-affine', function () {
    it('transforms, rotates and scales vectors', function () {
        const out = vec2();

        vec2MatTransform(out, vec2(1, 2), mat2(2, 0, 0, 3));
        expect(vec2Equals(out, vec2(2, 6))).toBe(true);

        vec2Rotate(out, vec2(1, 0), vec2(0, 0), Math.PI / 2);
        expect(out.x).toBeCloseTo(0, 6);
        expect(out.y).toBeCloseTo(1, 6);

        vec2Scale(out, vec2(2, -4), 2);
        expect(vec2Equals(out, vec2(4, -8))).toBe(true);
    });
});
