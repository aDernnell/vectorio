import { describe, expect, it } from 'vitest';
import { mat3Projection, mat4Frustrum, mat4LookAt, mat4Ortho, mat4Perspective } from '../matgl';
import { mat3 } from '../mat3';
import { MAT4_IDENTITY, mat4, mat4StrictEquals } from '../mat4';
import { vec3 } from '../vec3';

describe('matgl helpers', function () {
    it('builds a 2D projection matrix', function () {
        const out = mat3();
        expect(mat3Projection(out, 200, 100)).toBe(out);

        // TODO
        expect(out.m00).toBeCloseTo(0.01, 6);
        expect(out.m11).toBeCloseTo(-0.02, 6);
        expect(out.m20).toBeCloseTo(-1, 6);
        expect(out.m21).toBeCloseTo(1, 6);
        expect(out.m22).toBeCloseTo(1, 6);
    });

    it('builds a 3D frustum matrix', function () {
        const frustum = mat4();
        expect(mat4Frustrum(frustum, -1, 1, -1, 1, 1, 10)).toBe(frustum);

        // TODO
        expect(frustum.m22).toBeCloseTo(-1.222222, 6);
        expect(frustum.m23).toBeCloseTo(-1, 6);
        expect(frustum.m32).toBeCloseTo(-2.222222, 6);
    });

    it('builds 3D perspective projection matrices', function () {
        const finite = mat4();
        const infinite = mat4();
        expect(mat4Perspective(finite, Math.PI / 2, 2, 1, 100)).toBe(finite);
        expect(mat4Perspective(infinite, Math.PI / 2, 2, 1, Infinity)).toBe(infinite);

        // TODO
        expect(finite.m00).toBeCloseTo(0.5, 6);
        expect(finite.m11).toBeCloseTo(1, 6);
        expect(finite.m23).toBeCloseTo(-1, 6);
        expect(infinite.m22).toBe(-1);
        expect(infinite.m32).toBe(-2);
    });

    it('builds 3D orthographic projection matrix', function () {
        const ortho = mat4();

        // TODO
        expect(mat4Ortho(ortho, -2, 2, -1, 1, 0.1, 10)).toBe(ortho);
        expect(ortho.m00).toBeCloseTo(0.5, 6);
        expect(ortho.m11).toBeCloseTo(1, 6);
        expect(ortho.m22).toBeCloseTo(-0.20202, 5);
        expect(ortho.m33).toBe(1);
    });

    it('builds 3D lookAt matrix', function () {
        const lookAt = mat4();
        const eye = vec3(1, 2, 3);
        const target = vec3(1, 2, 3);
        const up = vec3(0, 1, 0);

        // TODO
        expect(mat4LookAt(lookAt, eye, target, up)).toBe(lookAt);
        expect(mat4StrictEquals(lookAt, MAT4_IDENTITY)).toBe(true);

    });
});
