import { describe, expect, it } from 'vitest';
import { vec3, vec3Equals } from '../../vec3/vec3-core';
import { vec3MatTransform, vec3RotateX, vec3RotateY, vec3RotateZ, vec3Scale } from '../../vec3/vec3-affine';
import { mat3 } from '../../mat3/mat3-core';

describe('vec3-affine', function () {
    it('transforms, rotates and scales vectors', function () {
        const out = vec3();
        const origin = vec3(0, 0, 0);

        vec3RotateX(out, vec3(0, 1, 0), origin, Math.PI / 2);
        expect(out.y).toBeCloseTo(0, 6);
        expect(out.z).toBeCloseTo(1, 6);

        vec3RotateY(out, vec3(1, 0, 0), origin, Math.PI / 2);
        expect(out.x).toBeCloseTo(0, 6);
        expect(out.z).toBeCloseTo(-1, 6);

        vec3RotateZ(out, vec3(1, 0, 0), origin, Math.PI / 2);
        expect(out.x).toBeCloseTo(0, 6);
        expect(out.y).toBeCloseTo(1, 6);

        vec3MatTransform(out, vec3(1, 2, 3), mat3(2, 0, 0, 0, 3, 0, 0, 0, 4));
        expect(vec3Equals(out, vec3(2, 6, 12))).toBe(true);

        vec3Scale(out, vec3(2, -4, 1), 2);
        expect(vec3Equals(out, vec3(4, -8, 2))).toBe(true);
    });
});
