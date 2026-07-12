import { describe, expect, it } from 'vitest';
import { vec4 } from '../../vec4/vec4-core';
import { vec4Apply, vec4Normalize } from '../../vec4/vec4-unary-ops';

describe('vec4-unary-ops', function () {
    it('applies unary operators and normalizes (including zero vector)', function () {
        const out = vec4();
        vec4Apply(out, vec4(1.2, 2.8, 3.2, 4.6), Math.round);
        expect(out).toEqual(vec4(1, 3, 3, 5));

        vec4Normalize(out, vec4(0, 3, 0, 4));
        expect(out.y).toBeCloseTo(0.6, 6);
        expect(out.w).toBeCloseTo(0.8, 6);

        vec4Normalize(out, vec4(0, 0, 0, 0));
        expect(out).toEqual(vec4(0, 0, 0, 0));
    });
});
