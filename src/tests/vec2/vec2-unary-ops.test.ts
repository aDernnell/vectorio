import { describe, expect, it } from 'vitest';
import { vec2 } from '../../vec2/vec2-core';
import { vec2Apply, vec2Normalize } from '../../vec2/vec2-unary-ops';

describe('vec2-unary-ops', function () {
    it('applies unary operators and normalizes (including zero vector)', function () {
        const out = vec2();
        vec2Apply(out, vec2(1.2, 2.8), Math.round);
        expect(out).toEqual(vec2(1, 3));

        vec2Normalize(out, vec2(3, 4));
        expect(out.x).toBeCloseTo(0.6, 6);
        expect(out.y).toBeCloseTo(0.8, 6);

        vec2Normalize(out, vec2(0, 0));
        expect(out).toEqual(vec2(0, 0));
    });
});
