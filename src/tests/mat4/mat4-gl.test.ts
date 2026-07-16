import { describe, expect, it } from 'vitest';
import { MAT3_IDENTITY, mat3, mat3Det, mat3Equals, mat3Invert, mat3Multiply } from '../../mat3';
import { MAT4_IDENTITY, mat4, mat4Clone, mat4Equals, mat4Set, mat4StrictEquals, mat4Stringify } from '../../mat4';
import { mat4Frustum, mat4LookAt, mat4Ortho, mat4Perspective, mat4TargetTo } from '../../mat4/mat4-gl';
import {
    vec3,
    vec3Angle,
    vec3Cross,
    vec3Dot,
    vec3Equals,
    vec3FillTrunc,
    vec3MatTransform,
    vec3Set,
    vec3SquaredMagnitude,
} from '../../vec3';
import { vec4, vec4Apply, vec4FillPad, vec4MatTransform } from '../../vec4';

describe('mat4-gl', function () {
    describe('3D frustum projection', function () {
        // Assumes:
        // Left-handed view space (+Z forward)
        // WebGL/OpenGL NDC (z ∈ [-1,1])
        // Column vectors / post-multiplication (v' = M * v)
        const frustum = mat4();

        it('builds left-handed frustum matrix', function () {
            mat4Frustum(frustum, -1, 1, -1, 1, -1, 1);
            const p = vec4(0.2, 0.2, 0.7, 1);
            vec4MatTransform(p, p, frustum);
            // For a left-handed matrix, clip.w = z
            expect(p.w).toBeCloseTo(0.7);
        });

        it('handles symmetric frustum', function () {
            mat4Frustum(frustum, -1, 1, -1, 1, -1, 1);
            expect(mat4Equals(frustum, mat4(-1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0))).toBe(true);

            mat4Frustum(frustum, -1, 1, -1, 1, 1, 10);
            expect(mat4Equals(frustum, mat4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 11 / 9, -20 / 9, 0, 0, 1, 0))).toBe(true);
        });

        it('handles asymmetric frustum', function () {
            mat4Frustum(frustum, -2, 1, -1, 2, 1, 10);
            const p = vec4(-0.5, 0.5, 1, 1);
            vec4MatTransform(p, p, frustum);
            vec4Apply(p, p, (v) => v / p.w);
            expect(p.x).toBeCloseTo(0);
            expect(p.y).toBeCloseTo(0);
        });

        it('project bounds to clip edges', function () {
            const left = -1;
            const right = 1;
            const bottom = -1;
            const top = 1;
            const near = 1;
            const far = 10;
            const vec = vec4();
            mat4Frustum(frustum, left, right, bottom, top, near, far);

            // point on near plane
            vec4MatTransform(vec, vec4FillPad(vec, vec3(0, 0, near)), frustum);
            vec4Apply(vec, vec, (v) => v / vec.w);
            expect(vec3Equals(vec3FillTrunc(vec3(), vec), vec3(0, 0, -1))).toBe(true);

            // point on far plane
            vec4MatTransform(vec, vec4FillPad(vec, vec3(0, 0, far)), frustum);
            vec4Apply(vec, vec, (v) => v / vec.w);
            expect(vec3Equals(vec3FillTrunc(vec3(), vec), vec3(0, 0, 1))).toBe(true);

            // The frustum maps the following world-space points to the expected normalized device coordinates (NDC):
            // World-space point	Expected NDC
            // (left, 0, near)	    (-1, 0, -1)
            // (right, 0, near)	    (1, 0, -1)
            // (0, bottom, near)	(0, -1, -1)
            // (0, top, near)	    (0, 1, -1)

            vec4MatTransform(vec, vec4FillPad(vec, vec3(left, 0, near)), frustum);
            vec4Apply(vec, vec, (v) => v / vec.w);
            expect(vec3Equals(vec3FillTrunc(vec3(), vec), vec3(-1, 0, -1))).toBe(true);

            vec4MatTransform(vec, vec4FillPad(vec, vec3(right, 0, near)), frustum);
            vec4Apply(vec, vec, (v) => v / vec.w);
            expect(vec3Equals(vec3FillTrunc(vec3(), vec), vec3(1, 0, -1))).toBe(true);

            vec4MatTransform(vec, vec4FillPad(vec, vec3(0, bottom, near)), frustum);
            vec4Apply(vec, vec, (v) => v / vec.w);
            expect(vec3Equals(vec3FillTrunc(vec3(), vec), vec3(0, -1, -1))).toBe(true);

            vec4MatTransform(vec, vec4FillPad(vec, vec3(0, top, near)), frustum);
            vec4Apply(vec, vec, (v) => v / vec.w);
            expect(vec3Equals(vec3FillTrunc(vec3(), vec), vec3(0, 1, -1))).toBe(true);
        });

        it('projects view center to clip center', function () {
            const vec = vec4();
            mat4Frustum(frustum, -1, 1, -1, 1, 1, 10);

            vec4MatTransform(vec, vec4FillPad(vec, vec3(0, 0, 5)), frustum);
            expect(vec.x / vec.w).toBeCloseTo(0);
            expect(vec.y / vec.w).toBeCloseTo(0);
        });

        it('apply perspective', function () {
            mat4Frustum(frustum, -1, 1, -1, 1, 1, 10);

            // Two points with the same world-space x but different depth:
            const near = vec4(1, 0, 1, 1);
            const far = vec4(1, 0, 5, 1);

            const a = vec4MatTransform(vec4(), near, frustum);
            vec4Apply(a, a, (v) => v / a.w);
            const b = vec4MatTransform(vec4(), far, frustum);
            vec4Apply(b, b, (v) => v / b.w);

            expect(Math.abs(b.x)).toBeLessThan(Math.abs(a.x));
        });
    });

    describe('3D perspective projection', function () {
        // Assumes:
        // Left-handed view space (+Z forward)
        // WebGL/OpenGL NDC (z ∈ [-1,1])
        // Column vectors / post-multiplication (v' = M * v)
        const perspective = mat4();

        it('builds 3D perspective projection matrix', function () {
            mat4Perspective(perspective, Math.PI / 2, 1, 1, 2);
            expect(mat4Equals(perspective, mat4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 3, -4, 0, 0, 1, 0))).toBe(true);

            // nonzero near, 45deg fovy, and 16:9 aspect ratio
            mat4Perspective(perspective, Math.PI / 4, 16 / 9, 0.1, 100);
            expect(
                mat4Equals(
                    perspective,
                    mat4(1.357995, 0, 0, 0, 0, 2.414213, 0, 0, 0, 0, 1.002002, -0.2002002, 0, 0, 1, 0),
                ),
            ).toBe(true);

            // no far plane, 45deg fovy, and 4:3 aspect ratio
            mat4Perspective(perspective, Math.PI / 4, 640 / 480, 0.1, Infinity);
            expect(mat4Equals(perspective, mat4(1.81066, 0, 0, 0, 0, 2.414213, 0, 0, 0, 0, 1, -0.2, 0, 0, 1, 0))).toBe(
                true,
            );
        });

        it('projects view center to clip center', function () {
            const vec = vec4();
            mat4Perspective(perspective, Math.PI / 2, 1, 0, 1);
            vec4MatTransform(vec, vec4FillPad(vec, vec3(0, 0, 1)), perspective);
            expect(vec.x / vec.w).toBeCloseTo(0);
            expect(vec.y / vec.w).toBeCloseTo(0);
        });

        it('maps near/far planes to clip edges', function () {
            const vec = vec4();
            mat4Perspective(perspective, Math.PI / 2, 1, 0.1, 10);
            vec4MatTransform(vec, vec4FillPad(vec, vec3(0, 0, 0.1)), perspective);
            expect(vec.z / vec.w).toBeCloseTo(-1);
            vec4MatTransform(vec, vec4FillPad(vec, vec3(0, 0, 10)), perspective);
            expect(vec.z / vec.w).toBeCloseTo(1);
        });

        it('projects edges of the near plane correctly', function () {
            const fov = Math.PI / 2;
            const aspect = 1;
            const near = 1;
            const vec = vec4();
            mat4Perspective(perspective, fov, aspect, near, 10);
            // clip left/right edges should be at x = -1 and x = 1 for a point on the near plane
            vec4MatTransform(vec, vec4FillPad(vec, vec3(1, 0, 1)), perspective);
            expect(vec.x / vec.w).toBeCloseTo(1);
            vec4MatTransform(vec, vec4FillPad(vec, vec3(-1, 0, 1)), perspective);
            expect(vec.x / vec.w).toBeCloseTo(-1);

            // clip top/bottom edges should be at y = -1 and y = 1 for a point on the near plane
            vec4MatTransform(vec, vec4FillPad(vec, vec3(0, 1, 1)), perspective);
            expect(vec.y / vec.w).toBeCloseTo(1);
            vec4MatTransform(vec, vec4FillPad(vec, vec3(0, -1, 1)), perspective);
            expect(vec.y / vec.w).toBeCloseTo(-1);
        });

        it('handles perspective shrinking', function () {
            const fov = Math.PI / 2;
            const aspect = 1;
            const near = 1;
            const vec = vec4();
            mat4Perspective(perspective, fov, aspect, near, 10);
            const a = vec4MatTransform(vec4(), vec4FillPad(vec, vec3(1, 0, 1)), perspective);
            const b = vec4MatTransform(vec4(), vec4FillPad(vec, vec3(1, 0, 5)), perspective);
            vec4Apply(a, a, (v) => v / a.w);
            vec4Apply(b, b, (v) => v / b.w);

            // object further away from the camera should appear closer to the center
            expect(Math.abs(b.x)).toBeLessThan(Math.abs(a.x));
        });

        it('handles wide aspect ratio', function () {
            const fov = Math.PI / 2;
            const aspect = 20; // 20:1 aspect ratio
            const vec = vec4();
            mat4Perspective(perspective, fov, aspect, 1, 10);
            // right edge of the frustum should map to clip x = 1
            vec4MatTransform(vec, vec4FillPad(vec, vec3(20, 0, 1)), perspective);
            expect(vec.x / vec.w).toBeCloseTo(1);
            // top edge of the frustum should map to clip y = 1
            vec4MatTransform(vec, vec4FillPad(vec, vec3(0, 1, 1)), perspective);
            expect(vec.y / vec.w).toBeCloseTo(1);
        });

        it('handles tall aspect ratio', function () {
            const fov = Math.PI / 2;
            const aspect = 1 / 20; // 1:20 aspect ratio
            const vec = vec4();
            mat4Perspective(perspective, fov, aspect, 1, 10);

            // top edge of the frustum should map to clip y = 1
            const top = Math.tan(Math.PI / 4); // near * tan(fov/2)
            vec4MatTransform(vec, vec4FillPad(vec, vec3(0, top, 1)), perspective);
            expect(vec.y / vec.w).toBeCloseTo(1);

            // right edge of the frustum should map to clip x = 1
            const right = top * aspect;
            vec4MatTransform(vec, vec4FillPad(vec, vec3(right, 0, 1)), perspective);
            expect(vec.x / vec.w).toBeCloseTo(1);
        });

        it('is equivalent to frustum', function () {
            const fov = Math.PI / 2;
            const aspect = 1;
            const near = 1;
            const far = 10;
            const frustum = mat4();
            mat4Perspective(perspective, fov, aspect, near, far);
            const halfHeight = near * Math.tan(fov / 2);
            const halfWidth = halfHeight * aspect;
            mat4Frustum(frustum, -halfWidth, halfWidth, -halfHeight, halfHeight, near, far);
            expect(mat4Equals(perspective, frustum)).toBe(true);
        });

        it('handles FOV magnification', function () {
            const narrow = mat4Perspective(mat4(), Math.PI / 4, 1, 1, 10);
            const wide = mat4Perspective(mat4(), Math.PI / 2, 1, 1, 10);

            const p1 = vec4MatTransform(vec4(), vec4FillPad(vec4(), vec3(1, 0, 5)), narrow);
            const p2 = vec4MatTransform(vec4(), vec4FillPad(vec4(), vec3(1, 0, 5)), wide);
            vec4Apply(p1, p1, (v) => v / p1.w);
            vec4Apply(p2, p2, (v) => v / p2.w);

            // A narrower field of view magnifies the scene by a greater amount,
            // so the same world-space point should appear further from the center of the screen.
            expect(Math.abs(p1.x)).toBeGreaterThan(Math.abs(p2.x));
        });

        it('handles near-plane size consistently', function () {
            const fov = Math.PI / 2;
            const aspect = 1;
            const near1 = 1;
            const near2 = 2;
            const far = 10;
            const perspective1 = mat4Perspective(mat4(), fov, aspect, near1, far);
            const perspective2 = mat4Perspective(mat4(), fov, aspect, near2, far);

            // Both points lie on the right edge of their respective near planes.
            const p1 = vec4MatTransform(vec4(), vec4FillPad(vec4(), vec3(near1, 0, near1)), perspective1);
            const p2 = vec4MatTransform(vec4(), vec4FillPad(vec4(), vec3(near2, 0, near2)), perspective2);
            vec4Apply(p1, p1, (v) => v / p1.w);
            vec4Apply(p2, p2, (v) => v / p2.w);

            expect(p1.x).toBeCloseTo(1);
            expect(p2.x).toBeCloseTo(1);
        });
    });

    describe('3D orthographic projection', function () {
        // Assumes:
        // Left-handed view space (+Z forward)
        // WebGL/OpenGL NDC (z ∈ [-1,1])
        // Column vectors / post-multiplication (v' = M * v)
        const ortho = mat4();

        it('builds 3D orthographic projection matrix', function () {
            mat4Ortho(ortho, -1, 1, -1, 1, -1, 1);
            expect(mat4Equals(ortho, MAT4_IDENTITY)).toBe(true);

            mat4Ortho(ortho, -2, 2, -1, 1, 1, 11);
            expect(mat4Equals(ortho, mat4(0.5, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0.2, -1.2, 0, 0, 0, 1))).toBe(true);
        });

        it('projects bounds to clip edges', function () {
            const left = -2,
                right = 2,
                bottom = -1,
                top = 1,
                near = 1,
                far = 11;
            const vec = vec4();
            mat4Ortho(ortho, left, right, bottom, top, near, far);

            vec4MatTransform(vec, vec4FillPad(vec, vec3(left, 0, 6)), ortho);
            vec4Apply(vec, vec, (v) => v / vec.w);
            expect(vec3Equals(vec3FillTrunc(vec3(), vec), vec3(-1, 0, 0))).toBe(true);

            vec4MatTransform(vec, vec4FillPad(vec, vec3(right, 0, 6)), ortho);
            vec4Apply(vec, vec, (v) => v / vec.w);
            expect(vec3Equals(vec3FillTrunc(vec3(), vec), vec3(1, 0, 0))).toBe(true);

            vec4MatTransform(vec, vec4FillPad(vec, vec3(0, bottom, 6)), ortho);
            vec4Apply(vec, vec, (v) => v / vec.w);
            expect(vec3Equals(vec3FillTrunc(vec3(), vec), vec3(0, -1, 0))).toBe(true);

            vec4MatTransform(vec, vec4FillPad(vec, vec3(0, top, 6)), ortho);
            vec4Apply(vec, vec, (v) => v / vec.w);
            expect(vec3Equals(vec3FillTrunc(vec3(), vec), vec3(0, 1, 0))).toBe(true);

            vec4MatTransform(vec, vec4FillPad(vec, vec3(0, 0, near)), ortho);
            vec4Apply(vec, vec, (v) => v / vec.w);
            expect(vec3Equals(vec3FillTrunc(vec3(), vec), vec3(0, 0, -1))).toBe(true);

            vec4MatTransform(vec, vec4FillPad(vec, vec3(0, 0, far)), ortho);
            vec4Apply(vec, vec, (v) => v / vec.w);
            expect(vec3Equals(vec3FillTrunc(vec3(), vec), vec3(0, 0, 1))).toBe(true);
        });

        it('has no depth perspective', function () {
            const near = 1;
            const far = 10;
            mat4Ortho(ortho, -1, 1, -1, 1, near, far);

            // Two points with the same world-space x but different depth:
            const p1 = vec4(1, 0, near, 1);
            const p2 = vec4(1, 0, far, 1);
            vec4MatTransform(p1, p1, ortho);
            vec4MatTransform(p2, p2, ortho);

            vec4Apply(p1, p1, (v) => v / p1.w);
            vec4Apply(p2, p2, (v) => v / p2.w);

            // no perspective shrinking
            expect(p1.x).toBeCloseTo(p2.x);
            expect(p1.y).toBeCloseTo(p2.y);
        });
    });

    describe('3D lookAt matrix', function () {
        // Assumes:
        // left-handed world space (+Z forward)
        // Column vectors / post-multiplication (v' = M * v)
        const lookAt = mat4();
        const eye = vec3();
        const target = vec3();
        const up = vec3(0, 1, 0);

        it('handles eye equal to target with noop', function () {
            mat4Set(lookAt, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
            vec3Set(eye, 1, 2, 3);
            vec3Set(target, 1, 2, 3);
            vec3Set(up, 0, 1, 0);

            // eye == target
            const initialLookAt = mat4Clone(lookAt);
            mat4LookAt(lookAt, eye, target, up); // noop
            expect(mat4StrictEquals(lookAt, initialLookAt)).toBe(true);
        });

        it('build identity view', function () {
            vec3Set(eye, 0, 0, 0);
            vec3Set(target, 0, 0, 1);
            mat4LookAt(lookAt, eye, target, up);
            expect(mat4Equals(lookAt, MAT4_IDENTITY)).toBe(true);
        });

        it('handles translation only', function () {
            vec3Set(eye, 5, 2, -3);
            vec3Set(target, 5, 2, -2);
            mat4LookAt(lookAt, eye, target, up);
            // prettier-ignore
            expect(mat4Equals(lookAt, mat4(
                1, 0, 0, -5, 
                0, 1, 0, -2, 
                0, 0, 1, 3, 
                0, 0, 0, 1
            ))).toBe(true);
        });

        it('handles looking along +X axis', function () {
            vec3Set(eye, 0, 0, 0);
            vec3Set(target, 1, 0, 0);
            mat4LookAt(lookAt, eye, target, up);
            // prettier-ignore
            expect(mat4Equals(lookAt, mat4(
                0, 0, -1, 0, 
                0, 1, 0, 0, 
                1, 0, 0, 0, 
                0, 0, 0, 1
            ))).toBe(true);
        });

        it('handles looking along -Z axis', function () {
            vec3Set(eye, 0, 0, 1);
            vec3Set(target, 0, 0, -1);
            mat4LookAt(lookAt, eye, target, up);
            // prettier-ignore
            expect(mat4Equals(lookAt, mat4(
                -1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, -1, 1,
                0, 0, 0, 1
            ))).toBe(true);
        });

        it('satisfies invariants', function () {
            vec3Set(eye, 5, 20, -3);
            vec3Set(target, 10, -7, 100);
            mat4LookAt(lookAt, eye, target, up);

            // camera position maps to origin
            const transformedEye = vec4MatTransform(vec4(), vec4(eye.x, eye.y, eye.z, 1), lookAt);
            expect(vec3Equals(transformedEye, vec3(0, 0, 0))).toBe(true);

            // target lies on the camera's forward axis
            const transformedTarget = vec4MatTransform(vec4(), vec4(target.x, target.y, target.z, 1), lookAt);
            expect(transformedTarget.x).toBeCloseTo(0);
            expect(transformedTarget.y).toBeCloseTo(0);
            expect(transformedTarget.z).toBeGreaterThan(0);

            // rotation is orthonormal
            // prettier-ignore
            const rot = mat3(
                lookAt.m00, lookAt.m01, lookAt.m02, 
                lookAt.m10, lookAt.m11, lookAt.m12, 
                lookAt.m20, lookAt.m21, lookAt.m22
            );
            const result = mat3();
            expect(mat3Equals(mat3Multiply(result, mat3Invert(result, rot)!, rot), MAT3_IDENTITY)).toBe(true);
            expect(mat3Det(rot)).toBeCloseTo(1);

            // right, up, and forward axes are orthogonal and normalized
            const right = vec3(lookAt.m00, lookAt.m01, lookAt.m02);
            const correctedUp = vec3(lookAt.m10, lookAt.m11, lookAt.m12);
            const forward = vec3(lookAt.m20, lookAt.m21, lookAt.m22);
            expect(vec3Dot(right, correctedUp)).toBeCloseTo(0);
            expect(vec3Dot(right, forward)).toBeCloseTo(0);
            expect(vec3Dot(correctedUp, forward)).toBeCloseTo(0);
            expect(vec3SquaredMagnitude(right)).toBeCloseTo(1);
            expect(vec3SquaredMagnitude(correctedUp)).toBeCloseTo(1);
            expect(vec3SquaredMagnitude(forward)).toBeCloseTo(1);
        });

        it('handles up parallel to forward vector', function () {
            // up parallel to forward
            vec3Set(eye, 2, 3, 2);
            vec3Set(target, 2, 7, 2);
            mat4LookAt(lookAt, eye, target, up);

            // rotation is orthonormal
            // prettier-ignore
            const rot = mat3(
                lookAt.m00, lookAt.m01, lookAt.m02, 
                lookAt.m10, lookAt.m11, lookAt.m12, 
                lookAt.m20, lookAt.m21, lookAt.m22
            );
            const result = mat3();
            expect(mat3Equals(mat3Multiply(result, mat3Invert(result, rot)!, rot), MAT3_IDENTITY)).toBe(true);
            expect(mat3Det(rot)).toBeCloseTo(1);

            // check that the right, correctedUp, and forward vectors are forming an orthonormal basis
            const right = vec3(lookAt.m00, lookAt.m01, lookAt.m02);
            const correctedUp = vec3(lookAt.m10, lookAt.m11, lookAt.m12);
            const forward = vec3(lookAt.m20, lookAt.m21, lookAt.m22);
            expect(vec3Angle(right, correctedUp)).toBeCloseTo(Math.PI / 2);
            expect(vec3Angle(right, forward)).toBeCloseTo(Math.PI / 2);
            expect(vec3Angle(correctedUp, forward)).toBeCloseTo(Math.PI / 2);
            expect(vec3SquaredMagnitude(right)).toBeCloseTo(1);
            expect(vec3SquaredMagnitude(correctedUp)).toBeCloseTo(1);
            expect(vec3SquaredMagnitude(forward)).toBeCloseTo(1);
        });

        it('handles up anti-parallel to forward vector', function () {
            vec3Set(eye, 2, 3, 2);
            vec3Set(target, 2, -1, 2);
            mat4LookAt(lookAt, eye, target, up);

            // prettier-ignore
            const rot = mat3(
                lookAt.m00, lookAt.m01, lookAt.m02, 
                lookAt.m10, lookAt.m11, lookAt.m12, 
                lookAt.m20, lookAt.m21, lookAt.m22
            );
            const result = mat3();
            expect(mat3Equals(mat3Multiply(result, mat3Invert(result, rot)!, rot), MAT3_IDENTITY)).toBe(true);
            expect(mat3Det(rot)).toBeCloseTo(1);

            // check that the right, correctedUp, and forward vectors are forming an orthonormal basis
            const right = vec3(lookAt.m00, lookAt.m01, lookAt.m02);
            const correctedUp = vec3(lookAt.m10, lookAt.m11, lookAt.m12);
            const forward = vec3(lookAt.m20, lookAt.m21, lookAt.m22);
            expect(vec3Angle(right, correctedUp)).toBeCloseTo(Math.PI / 2);
            expect(vec3Angle(right, forward)).toBeCloseTo(Math.PI / 2);
            expect(vec3Angle(correctedUp, forward)).toBeCloseTo(Math.PI / 2);
            expect(vec3SquaredMagnitude(right)).toBeCloseTo(1);
            expect(vec3SquaredMagnitude(correctedUp)).toBeCloseTo(1);
            expect(vec3SquaredMagnitude(forward)).toBeCloseTo(1);
        });

        it('handles fallback right vector', function () {
            // Branch 2 in fallbackRight: |z0| is not the smallest and |z1| <= |z2|
            vec3Set(eye, 0, 0, 0);
            vec3Set(target, 2, 1, 3);
            mat4LookAt(lookAt, eye, target, vec3(2, 1, 3));

            let right = vec3(lookAt.m00, lookAt.m01, lookAt.m02);
            expect(right.y).toBeCloseTo(0);
            expect(right.x).toBeLessThan(0);
            expect(right.z).toBeGreaterThan(0);
            expect(vec3SquaredMagnitude(right)).toBeCloseTo(1);

            // Branch 3 in fallbackRight: |z1| > |z2|
            vec3Set(target, 3, 2, 1);
            mat4LookAt(lookAt, eye, target, vec3(3, 2, 1));
            right = vec3(lookAt.m00, lookAt.m01, lookAt.m02);
            expect(right.z).toBeCloseTo(0);
            expect(right.x).toBeGreaterThan(0);
            expect(right.y).toBeLessThan(0);
            expect(vec3SquaredMagnitude(right)).toBeCloseTo(1);
        });

        it('handles up not normalized', function () {
            vec3Set(eye, 2, 3, 2);
            vec3Set(target, 2, -1, 2);
            mat4LookAt(lookAt, eye, target, up);

            const previousLookAt = mat4Clone(lookAt);
            vec3Set(up, 0, 1000, 0);
            mat4LookAt(lookAt, eye, target, up);
            expect(mat4Equals(lookAt, previousLookAt)).toBe(true);
        });
    });

    describe('3D targetTo matrix', function () {
        // Assumes
        // left-handed world space (+Z forward)
        // Column vectors / post-multiplication (v' = M * v)
        const targetTo = mat4();
        const source = vec3();
        const target = vec3();
        const up = vec3(0, 1, 0);

        let right, correctedUp, forward, translation, cross;

        it('handles identity orientation', function () {
            vec3Set(source, 0, 0, 0);
            vec3Set(target, 0, 0, 1);
            // Identity orientation
            mat4TargetTo(targetTo, source, target, up);
            expect(mat4Equals(targetTo, MAT4_IDENTITY)).toBe(true);
        });

        it('handles source already facing the target', function () {
            // same orientation, translated
            vec3Set(source, 5, 2, -3);
            vec3Set(target, 5, 2, -2);
            mat4TargetTo(targetTo, source, target, up);
            expect(mat4Equals(targetTo, mat4(1, 0, 0, 5, 0, 1, 0, 2, 0, 0, 1, -3, 0, 0, 0, 1))).toBe(true);
        });

        it('orient along +X axis', function () {
            vec3Set(source, 0, 0, 0);
            vec3Set(target, 1, 0, 0);
            mat4TargetTo(targetTo, source, target, up);
            expect(mat4Equals(targetTo, mat4(0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 0, 1))).toBe(true);

            right = vec3(targetTo.m00, targetTo.m10, targetTo.m20);
            correctedUp = vec3(targetTo.m01, targetTo.m11, targetTo.m21);
            forward = vec3(targetTo.m02, targetTo.m12, targetTo.m22);
            expect(vec3Equals(right, vec3(0, 0, -1))).toBe(true);
            expect(vec3Equals(correctedUp, vec3(0, 1, 0))).toBe(true);
            expect(vec3Equals(forward, vec3(1, 0, 0))).toBe(true);
            // verify basis: right × correctedUp should be forward 
            cross = vec3();
            vec3Cross(cross, right, correctedUp);
            expect(vec3Equals(cross, forward)).toBe(true); 

            const modelLeft = vec3(-1, 0, 0);
            const modelRight = vec3(1, 0, 0);
            const modelTop = vec3(0, 1, 0);
            const modelBottom = vec3(0, -1, 0);
            const modelForward = vec3(0, 0, 1);
            const modelBack = vec3(0, 0, -1);
            const worldLeft = vec4MatTransform(vec4(), vec4FillPad(vec4(), modelLeft), targetTo);
            const worldRight = vec4MatTransform(vec4(), vec4FillPad(vec4(), modelRight), targetTo);
            const worldTop = vec4MatTransform(vec4(), vec4FillPad(vec4(), modelTop), targetTo);
            const worldBottom = vec4MatTransform(vec4(), vec4FillPad(vec4(), modelBottom), targetTo);
            const worldForward = vec4MatTransform(vec4(), vec4FillPad(vec4(), modelForward), targetTo);
            const worldBack = vec4MatTransform(vec4(), vec4FillPad(vec4(), modelBack), targetTo);
            // left becomes +Z
            expect(vec3Equals(worldLeft, vec3(0, 0, 1))).toBe(true);
            // right becomes -Z
            expect(vec3Equals(worldRight, vec3(0, 0, -1))).toBe(true);
            // top stays +Y
            expect(vec3Equals(worldTop, vec3(0, 1, 0))).toBe(true);
            // bottom stays -Y
            expect(vec3Equals(worldBottom, vec3(0, -1, 0))).toBe(true);
            // forward becomes +X
            expect(vec3Equals(worldForward, vec3(1, 0, 0))).toBe(true);
            // back becomes -X
            expect(vec3Equals(worldBack, vec3(-1, 0, 0))).toBe(true);
        });

        it('orient diagonally', function () {
            vec3Set(source, 0, 0, 0);
            vec3Set(target, 1, 1, 1);
            mat4TargetTo(targetTo, source, target, up);
            // prettier-ignore
            expect(mat4Equals(targetTo,mat4(
                0.7071068, -0.4082483, 0.5773503, 0,
                0, 0.8164966, 0.5773503, 0,
                -0.7071068, -0.4082483, 0.5773503, 0,
                0, 0, 0, 1
            ))).toBe(true);
        });

        it('handles source equal to target', function () {
            vec3Set(source, 1, 2, 3);
            vec3Set(target, 1, 2, 3);
            mat4TargetTo(targetTo, source, target, up);
            expect(mat4StrictEquals(targetTo, MAT4_IDENTITY)).toBe(true);
        });

        it('handles up parallel to source-target', function () {
            vec3Set(source, 0, 0, 0);
            vec3Set(target, 0, 1, 0);
            mat4TargetTo(targetTo, source, target, up);
            right = vec3(targetTo.m00, targetTo.m10, targetTo.m20);
            correctedUp = vec3(targetTo.m01, targetTo.m11, targetTo.m21);
            forward = vec3(targetTo.m02, targetTo.m12, targetTo.m22);
            translation = vec3(targetTo.m03, targetTo.m13, targetTo.m23);
            // check that the right, correctedUp, and forward vectors are forming an orthonormal basis
            expect(vec3Angle(right, correctedUp)).toBeCloseTo(Math.PI / 2);
            expect(vec3Angle(right, forward)).toBeCloseTo(Math.PI / 2);
            expect(vec3Angle(correctedUp, forward)).toBeCloseTo(Math.PI / 2);
            expect(vec3Equals(translation, source)).toBe(true);
            expect(vec3SquaredMagnitude(right)).toBeCloseTo(1);
            expect(vec3SquaredMagnitude(correctedUp)).toBeCloseTo(1);
            expect(vec3SquaredMagnitude(forward)).toBeCloseTo(1);
            // right × correctedUp should be forward 
            cross = vec3();
            vec3Cross(cross, right, correctedUp);
            expect(vec3Equals(cross, forward)).toBe(true);
            // check that the forward vector is pointing in the right direction (toward the target)
            expect(vec3Angle(forward, target)).toBeCloseTo(0);
        });

        it('handles up anti-parallel to source-target', function () {
            vec3Set(source, 0, 0, 0);
            vec3Set(target, 0, -2, 0);
            mat4TargetTo(targetTo, source, target, up);
            right = vec3(targetTo.m00, targetTo.m10, targetTo.m20);
            correctedUp = vec3(targetTo.m01, targetTo.m11, targetTo.m21);
            forward = vec3(targetTo.m02, targetTo.m12, targetTo.m22);
            translation = vec3(targetTo.m03, targetTo.m13, targetTo.m23);
            // check that the right, correctedUp, and forward vectors are forming an orthonormal basis
            expect(vec3Angle(right, correctedUp)).toBeCloseTo(Math.PI / 2);
            expect(vec3Angle(right, forward)).toBeCloseTo(Math.PI / 2);
            expect(vec3Angle(correctedUp, forward)).toBeCloseTo(Math.PI / 2);
            expect(vec3Equals(translation, source)).toBe(true);
            expect(vec3SquaredMagnitude(right)).toBeCloseTo(1);
            expect(vec3SquaredMagnitude(correctedUp)).toBeCloseTo(1);
            expect(vec3SquaredMagnitude(forward)).toBeCloseTo(1);
            // right × correctedUp should be forward
            cross = vec3();
            vec3Cross(cross, right, correctedUp);
            expect(vec3Equals(cross, forward)).toBe(true);
            // check that the forward vector is pointing in the right direction (toward the target)
            expect(vec3Angle(forward, target)).toBeCloseTo(0);
        });

        it('handles fallback right vector', function () {
            // Branch 2 in fallbackRight: |z0| is not the smallest and |z1| <= |z2|
            vec3Set(source, 0, 0, 0);
            vec3Set(target, 2, 1, 3);
            mat4TargetTo(targetTo, source, target, vec3(2, 1, 3));
            let right = vec3(targetTo.m00, targetTo.m10, targetTo.m20);
            expect(right.y).toBeCloseTo(0);
            expect(right.x).toBeLessThan(0);
            expect(right.z).toBeGreaterThan(0);
            expect(vec3SquaredMagnitude(right)).toBeCloseTo(1);

            // Branch 3 in fallbackRight: |z1| > |z2|
            vec3Set(target, 3, 2, 1);
            mat4TargetTo(targetTo, source, target, vec3(3, 2, 1));
            right = vec3(targetTo.m00, targetTo.m10, targetTo.m20);
            expect(right.z).toBeCloseTo(0);
            expect(right.x).toBeGreaterThan(0);
            expect(right.y).toBeLessThan(0);
            expect(vec3SquaredMagnitude(right)).toBeCloseTo(1);
        });

        it('handles up vector not normalized', function () {
            // up not normalized
            vec3Set(source, 0, 0, 0);
            vec3Set(target, 0, 0, 1);
            vec3Set(up, 0, 10, 0);
            mat4TargetTo(targetTo, source, target, up);
            expect(mat4Equals(targetTo, MAT4_IDENTITY)).toBe(true);
        });

        it('handles up vector not a world basis axis', function () {
            vec3Set(source, 0, 0, 0);
            vec3Set(target, 0, 0, 1);
            vec3Set(up, 1, 1, 0);
            mat4TargetTo(targetTo, source, target, up);
            console.log(mat4Stringify(targetTo));
            expect(
                mat4Equals(
                    targetTo,
                    mat4(0.7071068, 0.7071068, 0, 0, -0.7071068, 0.7071068, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1),
                ),
            ).toBe(true);
        });
    });
});
