import { describe, expect, it } from 'vitest';
import { quatMultiply } from '../../src/quat/quat-binary-ops';
import { quat, QUAT_IDENTITY } from '../../src/quat/quat-core';
import { quatFillEuler, quatFillRotation, quatFillRotationTo, quatRotateX, quatRotateY, quatRotateZ } from '../../src/quat/quat-rot';
import { vec3, VEC3_X, VEC3_Y, VEC3_Z, vec3Normalize, vec3QuatTransform } from '../../src/vec3';

describe('quat-rot', () => {
    const out = quat();

    describe('fillRotation', () => {
        it('returns the output quaternion', () => {
            const result = quatFillRotation(out, VEC3_Y, Math.PI / 2);
            expect(result).toBe(out);
        });

        it('fills a quaternion from axis-angle', () => {
            quatFillRotation(out,VEC3_Y, Math.PI / 2);
            expect(out).toEqual({
                x: 0,
                y: Math.sin(Math.PI / 4),
                z: 0,
                w: Math.cos(Math.PI / 4),
            });
        });

        it('fills a quaternion with no angle', () => {
            quatFillRotation(out, vec3(1,2,3), 0);
            expect(out).toEqual(QUAT_IDENTITY);
        });
    });

    describe('rotateX', () => {
        it('returns the output quaternion', () => {
            const result = quatRotateX(out, quat(), Math.PI / 2);
            expect(result).toBe(out);
        });

        it('rotates the identity quaternion around the X axis', () => {
            quatRotateX(out, quat(), Math.PI / 2);
            const expected = quatFillRotation(quat(), VEC3_X, Math.PI / 2);
            expect(out).toEqualQuat(expected);
        });

        it('leaves the quaternion unchanged when rotating by 0', () => {
            const source = quatFillRotation(quat(), VEC3_Y, Math.PI / 4);
            quatRotateX(out, source, 0);
            expect(out).toEqualQuat(source);
        });

        it('composes rotations in correct order', () => {
            const qy = quatFillRotation(quat(), VEC3_Y, Math.PI / 4);
            const qx = quatFillRotation(quat(), VEC3_X, Math.PI / 3);
            quatRotateX(out, qy, Math.PI / 3);
            const expected = quatMultiply(quat(), qy, qx); // qx first, then qy: v' = qy * qx * v
            expect(out).toEqualQuat(expected);
        });

        it('output a modified parameter', () => {
            const q = quatFillRotation(quat(), VEC3_X, Math.PI / 4);
            const out = quatRotateX(q, q, Math.PI / 4);
            expect(out).toBe(q);
            expect(q).toEqualQuat(quatFillRotation(quat(), VEC3_X, Math.PI / 2));
        });
    });

    describe('rotateY', () => {
        it('returns the output quaternion', () => {
            const result = quatRotateY(out, quat(), Math.PI / 2);
            expect(result).toBe(out);
        });

        it('rotates the identity quaternion around the Y axis', () => {
            quatRotateY(out, quat(), Math.PI / 2);
            const expected = quatFillRotation(quat(), VEC3_Y, Math.PI / 2);
            expect(out).toEqualQuat(expected);
        });

        it('leaves the quaternion unchanged when rotating by 0', () => {
            const source = quatFillRotation(quat(), VEC3_X, Math.PI / 4);
            quatRotateY(out, source, 0);
            expect(out).toEqualQuat(source);
        });

        it('composes rotations in correct order', () => {
            const qx = quatFillRotation(quat(), VEC3_X, Math.PI / 4);
            const qy = quatFillRotation(quat(), VEC3_Y, Math.PI / 3);
            quatRotateY(out, qx, Math.PI / 3);
            const expected = quatMultiply(quat(), qx, qy);
            expect(out).toEqualQuat(expected);
        });

        it('output a modified parameter', () => {
            const q = quatFillRotation(quat(), VEC3_Y, Math.PI / 4);
            const out = quatRotateY(q, q, Math.PI / 4);
            expect(out).toBe(q);
            expect(q).toEqualQuat(quatFillRotation(quat(), VEC3_Y, Math.PI / 2));
        });
    });

    describe('rotateZ', () => {
        it('returns the output quaternion', () => {
            const result = quatRotateZ(out, quat(), Math.PI / 2);
            expect(result).toBe(out);
        });

        it('rotates the identity quaternion around the Z axis', () => {
            quatRotateZ(out, quat(), Math.PI / 2);
            const expected = quatFillRotation(quat(), VEC3_Z, Math.PI / 2);
            expect(out).toEqualQuat(expected);
        });

        it('leaves the quaternion unchanged when rotating by 0', () => {
            const source = quatFillRotation(quat(), VEC3_X, Math.PI / 4);
            quatRotateZ(out, source, 0);
            expect(out).toEqualQuat(source);
        });

        it('composes rotations in correct order', () => {
            const qx = quatFillRotation(quat(), VEC3_X, Math.PI / 4);
            const qz = quatFillRotation(quat(), VEC3_Z, Math.PI / 3);
            quatRotateZ(out, qx, Math.PI / 3);
            const expected = quatMultiply(quat(), qx, qz);
            expect(out).toEqualQuat(expected);
        });

        it('output a modified parameter', () => {
            const q = quatFillRotation(quat(), VEC3_Z, Math.PI / 4);
            const out = quatRotateZ(q, q, Math.PI / 4);
            expect(out).toBe(q);
            expect(q).toEqualQuat(quatFillRotation(quat(), VEC3_Z, Math.PI / 2));
        });
    });

    describe('fillEuler', () => {
        it('returns the output quaternion', () => {
            const result = quatFillEuler(out, 0, 0, 0);
            expect(result).toBe(out);
        });

        it('produces the identity quaternion when all angles are zero', () => {
            quatFillEuler(out, 0, 0, 0);
            expect(out).toEqual({ x: 0, y: 0, z: 0, w: 1 });
        });

        it('matches individual axis rotations for single angles', () => {
            const angle = Math.PI / 4;

            quatFillEuler(out, angle, 0, 0);
            expect(out).toEqualQuat(quatFillRotation(quat(), VEC3_X, angle));

            quatFillEuler(out, 0, angle, 0);
            expect(out).toEqualQuat(quatFillRotation(quat(), VEC3_Y, angle));

            quatFillEuler(out, 0, 0, angle);
            expect(out).toEqualQuat(quatFillRotation(quat(), VEC3_Z, angle));
        });

        it('applies rotation in ZYX extrinsic order', () => {
            const x = Math.PI / 3;
            const y = Math.PI / 5;
            const z = Math.PI / 7;

            const qx = quatFillRotation(quat(), VEC3_X, x);
            const qy = quatFillRotation(quat(), VEC3_Y, y);
            const qz = quatFillRotation(quat(), VEC3_Z, z);

            // expected = qx * qy * qz => rotates in order: qz first, then qy, then qx
            quatFillEuler(out, x, y, z);
            const qxqy = quatMultiply(quat(), qx, qy);
            const expected = quatMultiply(quat(), qxqy, qz);
            expect(out).toEqualQuat(expected);
        });

        it('overwrites the output quaternion', () => {
            out.x = 1;
            out.y = 2;
            out.z = 3;
            out.w = 4;

            const result = quatFillEuler(out, 0, 0, 0);
            expect(result).toBe(out);
            expect(out).toEqual({ x: 0, y: 0, z: 0, w: 1 });
        });
    });

    describe('fillRotationTo', () => {
        it('returns the output quaternion', () => {
            const result = quatFillRotationTo(out, VEC3_X, VEC3_Y);
            expect(result).toBe(out);
        });

        it('rotates from X to Y axis', () => {
            const v = vec3();
            quatFillRotationTo(out, VEC3_X, VEC3_Y);
            vec3QuatTransform(v, VEC3_X, out);
            expect(v).toEqualVec(VEC3_Y);
        });

        it('rotates from Y to Z axis', () => {
            const v = vec3();
            quatFillRotationTo(out, VEC3_Y, VEC3_Z);
            vec3QuatTransform(v, VEC3_Y, out);
            expect(v).toEqualVec(VEC3_Z);
        });

        it('rotates from Z to X axis', () => {
            const v = vec3();
            quatFillRotationTo(out, VEC3_Z, VEC3_X);
            vec3QuatTransform(v, VEC3_Z, out);
            expect(v).toEqualVec(VEC3_X);
        });

        it('transforms arbitrary normalized vectors to their target', () => {
            const a = vec3Normalize(vec3(), vec3(1, 2, 3));
            const b = vec3Normalize(vec3(), vec3(-2, 1, -1));
            const v = vec3();
            quatFillRotationTo(out, a, b);
            vec3QuatTransform(v, a, out);
            expect(v).toEqualVec(b);

            vec3Normalize(a, vec3(1, 1, 1));
            vec3Normalize(b, vec3(-1, -2, -1));
            quatFillRotationTo(out, a, b);
            vec3QuatTransform(v, a, out);
            expect(v).toEqualVec(b);

            vec3Normalize(a, vec3(1, 1, 1));
            vec3Normalize(b, vec3(1, 2, 1));
            quatFillRotationTo(out, a, b);
            vec3QuatTransform(v, a, out);
            expect(v).toEqualVec(b);
        });

        it('produces a normalized quaternion', () => {
            const a = vec3Normalize(vec3(), vec3(1, 2, 3));
            const b = vec3Normalize(vec3(), vec3(-2, 1, -1));
            quatFillRotationTo(out, a, b);
            const length = Math.sqrt(out.x * out.x + out.y * out.y + out.z * out.z + out.w * out.w);
            expect(length).toBeCloseTo(1);
        });

        it('returns identity when vectors are identical', () => {
            quatFillRotationTo(out, VEC3_X, VEC3_X);
            expect(out).toEqual(QUAT_IDENTITY);
        });

        it('returns identity within epsilon when vectors are nearly identical', () => {
            const a = vec3(1, 0, 0);
            const b = vec3Normalize(vec3(), vec3(1, 1e-7, 0));
            quatFillRotationTo(out, a, b);
            expect(out).toEqual(QUAT_IDENTITY);
        });

        it('handles opposite vectors', () => {
            const a = vec3Normalize(vec3(), vec3(1, 2, 3));
            const b = vec3Normalize(vec3(), vec3(-1, -2, -3));
            const v = vec3();
            quatFillRotationTo(out, a, b);
            vec3QuatTransform(v, a, out);
            expect(v).toEqualVec(b);
        });

        it('handles nearly opposite vectors', () => {
            const a = vec3Normalize(vec3(), vec3(3, 2, 1));
            const b = vec3Normalize(vec3(), vec3(-3, -2, -1));
            b.y += 1e-7;
            const v = vec3();
            quatFillRotationTo(out, a, b);
            vec3QuatTransform(v, a, out);
            expect(v).toEqualVec(b);
        });

        it('overwrites the output quaternion', () => {
            out.x = 1;
            out.y = 2;
            out.z = 3;
            out.w = 4;

            const result = quatFillRotationTo(out, VEC3_X, VEC3_Y);
            expect(result).toBe(out);
            expect(out).not.toEqual({ x: 1, y: 2, z: 3, w: 4 });
        });
    });
});
