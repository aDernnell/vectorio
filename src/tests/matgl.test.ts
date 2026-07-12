import { describe, expect, it } from 'vitest';
import { mat3Projection, mat4Frustrum, mat4LookAt, mat4Ortho, mat4Perspective } from '../matgl';
import { mat3, mat3Equals } from '../mat3';
import { MAT4_IDENTITY, mat4, mat4Equals, mat4StrictEquals } from '../mat4';
import { vec3, vec3Set } from '../vec3';

describe('matgl helpers', function () {
    it('builds a 2D projection matrix', function () {
        const out = mat3();
        mat3Projection(out, 100, 200);
        expect(mat3Equals(out, mat3(0.02, 0, 0, 0, -0.01, 0, -1, 1, 1))).toBe(true);
    });

    it('builds a 3D frustum matrix', function () {
        const frustum = mat4();
        mat4Frustrum(frustum, -1, 1, -1, 1, -1, 1);
        expect(mat4Equals(frustum, mat4(-1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, -1, 0, 0, 1, 0))).toBe(true);
    });

    it('builds 3D perspective projection matrices', function () {
        const out = mat4();
        mat4Perspective(out, Math.PI / 2, 1, 0, 1);
        expect(mat4Equals(out, mat4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, -1, 0, 0, 0, 0))).toBe(true);

        // nonzero near, 45deg fovy, and realistic aspect ratio
        mat4Perspective(out, Math.PI / 4, 16 / 9, 0.1, 100);
        expect(
            mat4Equals(out, mat4(1.357995, 0, 0, 0, 0, 2.414213, 0, 0, 0, 0, -1.002002, -1, 0, 0, -0.2002002, 0)),
        ).toBe(true);

        // no far plane, 45deg fovy, and realistic aspect ratio
        mat4Perspective(out, Math.PI / 4, 640 / 480, 0.1, Infinity);
        expect(mat4Equals(out, mat4(1.81066, 0, 0, 0, 0, 2.414213, 0, 0, 0, 0, -1, -1, 0, 0, -0.2, 0))).toBe(true);
    });

    it('builds 3D orthographic projection matrix', function () {
        const ortho = mat4();

        mat4Ortho(ortho, -1, 1, -1, 1, -1, 1);
        expect(mat4Equals(ortho, mat4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1))).toBe(true);

        mat4Ortho(ortho, -2, 2, -1, 1, 0.1, 10);
        expect(mat4Equals(ortho, mat4(0.5, 0, 0, 0, 0, 1, 0, 0, 0, 0, -0.2020202, 0, 0, 0, -1.020202, 1))).toBe(true);
    });

    it('builds 3D lookAt matrix', function () {
        const lookAt = mat4();
        const eye = vec3(1, 2, 3);
        const target = vec3(1, 2, 3);
        const up = vec3(0, 1, 0);

        // eye == target
        mat4LookAt(lookAt, eye, target, up);
        expect(mat4StrictEquals(lookAt, MAT4_IDENTITY)).toBe(true);

        // eye and target aligned with the up vector
        vec3Set(eye, 2, 3, 2);
        vec3Set(target, 2, 7, 2);
        vec3Set(up, 0, 1, 0);
        mat4LookAt(lookAt, eye, target, up);
        expect(mat4Equals(lookAt, mat4(0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 3, 1))).toBe(true);

        // nominal (and simple) case
        vec3Set(eye, 0, 0, 1);
        vec3Set(target, 0, 0, -1);
        vec3Set(up, 0, 1, 0);
        mat4LookAt(lookAt, eye, target, up);
        expect(mat4StrictEquals(lookAt, mat4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, -1, 1))).toBe(true);

        
    });
});
