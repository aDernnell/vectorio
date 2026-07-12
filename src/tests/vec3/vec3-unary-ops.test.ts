import { describe, expect, it } from 'vitest';
import { vec3 } from '../../vec3/vec3-core';
import { vec3Apply, vec3Normalize } from '../../vec3/vec3-unary-ops';

describe('vec3-unary-ops', function () {
    it('applies unary operators and normalizes (including zero vector)', function () {
        const out = vec3();
        vec3Apply(out, vec3(1.2, 2.8, 3.2), Math.round);
        expect(out).toEqual(vec3(1, 3, 3));

        vec3Normalize(out, vec3(3, 0, 4));
        expect(out.x).toBeCloseTo(0.6, 6);
        expect(out.z).toBeCloseTo(0.8, 6);

        vec3Normalize(out, vec3(0, 0, 0));
        expect(out).toEqual(vec3(0, 0, 0));
    });
});
