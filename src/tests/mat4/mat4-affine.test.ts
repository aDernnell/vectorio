import { describe, expect, it } from 'vitest';
import {
    mat4FillRotation,
    mat4FillRotationX,
    mat4FillRotationY,
    mat4FillRotationZ,
    mat4FillRotationZYX,
    mat4FillScale,
    mat4FillTranslation,
    mat4Rotate,
    mat4RotateX,
    mat4RotateY,
    mat4RotateZ,
    mat4RotateZYX,
    mat4Scale,
    mat4Translate,
} from '../../mat4/mat4-affine';
import { mat4, mat4Equals } from '../../mat4/mat4-core';
import { vec3, VEC3_BACK, VEC3_DOWN, VEC3_FORWARD, VEC3_LEFT, VEC3_RIGHT, VEC3_UP } from '../../vec3/vec3-core';
import { vec3Normalize } from '../../vec3/vec3-unary-ops';
import { mat4Multiply } from '../../mat4';
import { vec4, vec4Equals, vec4FillPad, vec4MatTransform } from '../../vec4';

describe('mat4-affine', function () {
    it('translates', function () {
        const out = mat4();
        mat4Translate(out, out, vec3(2, 3, 4));
        expect(mat4Equals(out, mat4(1, 0, 0, 2, 0, 1, 0, 3, 0, 0, 1, 4, 0, 0, 0, 1))).toBe(true);
    });

    it('fills translation', function () {
        const out = mat4();
        mat4FillTranslation(out, vec3(2, 3, 4));
        expect(mat4Equals(out, mat4(1, 0, 0, 2, 0, 1, 0, 3, 0, 0, 1, 4, 0, 0, 0, 1))).toBe(true);
    });

    describe('rotation transformation', function () {
        it('rotates around arbitrary axis', function () {
            const axis = vec3Normalize(vec3(), vec3(1, 2, 3));
            const out = mat4();
            mat4Rotate(out, out, axis, 0.1);

            expect(
                mat4Equals(
                    out,
                    mat4(
                        0.995361,
                        -0.079331,
                        0.054434,
                        0,

                        0.080758,
                        0.996431,
                        -0.02454,
                        0,

                        -0.052292,
                        0.028823,
                        0.998216,
                        0,

                        0,
                        0,
                        0,
                        1,
                    ),
                ),
            ).toBe(true);

            // returns null for degenerate axis rotation
            expect(mat4Rotate(mat4(), mat4(), vec3(0, 0, 0), 1)).toBeNull();
        });

        it('fills rotation around arbitrary axis', function () {
            const axis = vec3Normalize(vec3(), vec3(1, 2, 3));
            const out = mat4();
            mat4FillRotation(out, axis, 0.1);

            expect(
                mat4Equals(
                    out,
                    mat4(
                        0.995361,
                        -0.079331,
                        0.054434,
                        0,

                        0.080758,
                        0.996431,
                        -0.02454,
                        0,

                        -0.052292,
                        0.028823,
                        0.998216,
                        0,

                        0,
                        0,
                        0,
                        1,
                    ),
                ),
            ).toBe(true);

            // returns null for degenerate axis rotation
            expect(mat4FillRotation(mat4(), vec3(0, 0, 0), 1)).toBeNull();
        });

        it('rotates around X, Y, Z axes and ZYX Euler', function () {
            const xRot = mat4();
            mat4RotateX(xRot, xRot, 0.1);
            expect(
                mat4Equals(xRot, mat4(1, 0, 0, 0, 0, 0.995004, -0.099833, 0, 0, 0.099833, 0.995004, 0, 0, 0, 0, 1)),
            ).toBe(true);

            const yRot = mat4();
            mat4RotateY(yRot, yRot, 0.2);
            expect(
                mat4Equals(yRot, mat4(0.980067, 0, 0.198669, 0, 0, 1, 0, 0, -0.198669, 0, 0.980067, 0, 0, 0, 0, 1)),
            ).toBe(true);

            const zRot = mat4();
            mat4RotateZ(zRot, zRot, 0.3);
            expect(
                mat4Equals(zRot, mat4(0.955336, -0.29552, 0, 0, 0.29552, 0.955336, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)),
            ).toBe(true);

            const euler = vec3(0.1, 0.2, 0.3);
            const zyxRot = mat4();
            mat4RotateZYX(zyxRot, zyxRot, euler);
            expect(
                mat4Equals(
                    zyxRot,
                    mat4(
                        0.936293,
                        -0.275095,
                        0.21835,
                        0,
                        0.289629,
                        0.956425,
                        -0.036957,
                        0,
                        -0.198669,
                        0.097843,
                        0.97517,
                        0,
                        0,
                        0,
                        0,
                        1,
                    ),
                ),
            ).toBe(true);
        });

        it('fills rotation around X, Y, Z axes and ZYX Euler', function () {
            const xRot = mat4();
            mat4FillRotationX(xRot, 0.1);
            expect(
                mat4Equals(xRot, mat4(1, 0, 0, 0, 0, 0.995004, -0.099833, 0, 0, 0.099833, 0.995004, 0, 0, 0, 0, 1)),
            ).toBe(true);

            const yRot = mat4();
            mat4FillRotationY(yRot, 0.2);
            expect(
                mat4Equals(yRot, mat4(0.980067, 0, 0.198669, 0, 0, 1, 0, 0, -0.198669, 0, 0.980067, 0, 0, 0, 0, 1)),
            ).toBe(true);

            const zRot = mat4();
            mat4FillRotationZ(zRot, 0.3);
            expect(
                mat4Equals(zRot, mat4(0.955336, -0.29552, 0, 0, 0.29552, 0.955336, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)),
            ).toBe(true);

            const euler = vec3(0.1, 0.2, 0.3);
            const zyxRot = mat4();
            mat4FillRotationZYX(zyxRot, euler);
            expect(
                mat4Equals(
                    zyxRot,
                    mat4(
                        0.936293,
                        -0.275095,
                        0.21835,
                        0,
                        0.289629,
                        0.956425,
                        -0.036957,
                        0,
                        -0.198669,
                        0.097843,
                        0.97517,
                        0,
                        0,
                        0,
                        0,
                        1,
                    ),
                ),
            ).toBe(true);
        });

        it('produces the same matrices for rotate and fill', function () {
            const rotX = mat4RotateX(mat4(), mat4(), 2.56);
            const rotY = mat4RotateY(mat4(), mat4(), 1.23);
            const rotZ = mat4RotateZ(mat4(), mat4(), 0.78);
            const rotZYX = mat4RotateZYX(mat4(), mat4(), vec3(2.56, 1.23, 0.78));

            expect(mat4Equals(rotX, mat4FillRotationX(mat4(), 2.56))).toBe(true);
            expect(mat4Equals(rotY, mat4FillRotationY(mat4(), 1.23))).toBe(true);
            expect(mat4Equals(rotZ, mat4FillRotationZ(mat4(), 0.78))).toBe(true);
            expect(mat4Equals(rotZYX, mat4FillRotationZYX(mat4(), vec3(2.56, 1.23, 0.78)))).toBe(true);
        });

        it('satisfies invariants', function () {
            const rotX = mat4RotateX(mat4(), mat4(), 2.56);
            const rotY = mat4RotateY(mat4(), mat4(), 1.23);
            const rotZ = mat4RotateZ(mat4(), mat4(), 0.78);

            const vec = vec4();
            // Right axis unchanged by rotation around X axis
            vec4MatTransform(vec, vec4FillPad(vec, VEC3_RIGHT), rotX);
            expect(vec4Equals(vec, vec4FillPad(vec, VEC3_RIGHT))).toBe(true);

            // Up axis unchanged by rotation around Y axis
            vec4MatTransform(vec, vec4FillPad(vec, VEC3_UP), rotY);
            expect(vec4Equals(vec, vec4FillPad(vec, VEC3_UP))).toBe(true);

            // Forward axis unchanged by rotation around Z axis
            vec4MatTransform(vec, vec4FillPad(vec, VEC3_FORWARD), rotZ);
            expect(vec4Equals(vec, vec4FillPad(vec, VEC3_FORWARD))).toBe(true);
        });

        it('follows left-handed rotation convention', function () {
            const rot = mat4();
            const vec = vec4();

            // Rotations are clockwise when looking from the tip of the axis vector towards the origin

            mat4RotateY(rot, rot, Math.PI / 2);
            vec4MatTransform(vec, vec4FillPad(vec, VEC3_FORWARD), rot);
            expect(vec4Equals(vec, vec4FillPad(vec, VEC3_RIGHT))).toBe(true);
            vec4MatTransform(vec, vec4FillPad(vec, VEC3_RIGHT), rot);
            expect(vec4Equals(vec, vec4FillPad(vec, VEC3_BACK))).toBe(true);
            vec4MatTransform(vec, vec4FillPad(vec, VEC3_BACK), rot);
            expect(vec4Equals(vec, vec4FillPad(vec, VEC3_LEFT))).toBe(true);

            mat4RotateX(rot, rot, Math.PI / 2);
            vec4MatTransform(vec, vec4FillPad(vec, VEC3_FORWARD), rot);
            expect(vec4Equals(vec, vec4FillPad(vec, VEC3_DOWN))).toBe(true);
            vec4MatTransform(vec, vec4FillPad(vec, VEC3_DOWN), rot);
            expect(vec4Equals(vec, vec4FillPad(vec, VEC3_BACK))).toBe(true);
            vec4MatTransform(vec, vec4FillPad(vec, VEC3_BACK), rot);
            expect(vec4Equals(vec, vec4FillPad(vec, VEC3_UP))).toBe(true);

            mat4RotateZ(rot, rot, Math.PI / 2);
            vec4MatTransform(vec, vec4FillPad(vec, VEC3_RIGHT), rot);
            expect(vec4Equals(vec, vec4FillPad(vec, VEC3_UP))).toBe(true);
            vec4MatTransform(vec, vec4FillPad(vec, VEC3_UP), rot);
            expect(vec4Equals(vec, vec4FillPad(vec, VEC3_LEFT))).toBe(true);
            vec4MatTransform(vec, vec4FillPad(vec, VEC3_LEFT), rot);
            expect(vec4Equals(vec, vec4FillPad(vec, VEC3_DOWN))).toBe(true);

            // around arbitrary axis
            const axis = vec3Normalize(vec3(), vec3(1, 1, 0));
            mat4Rotate(rot, rot, axis, Math.PI / 2);
            vec4MatTransform(vec, vec4FillPad(vec, VEC3_FORWARD), rot);
            expect(vec4Equals(vec, vec4FillPad(vec, vec3Normalize(vec3(), vec3(1, -1, 0))))).toBe(true);
        });

    });

    it('scales', function () {
        const out = mat4();
        mat4Scale(out, out, vec3(2, 3, 4));
        expect(mat4Equals(out, mat4(2, 0, 0, 0, 0, 3, 0, 0, 0, 0, 4, 0, 0, 0, 0, 1))).toBe(true);
    });

    it('fills scaling', function () {
        const out = mat4();
        mat4FillScale(out, vec3(2, 3, 4));
        expect(mat4Equals(out, mat4(2, 0, 0, 0, 0, 3, 0, 0, 0, 0, 4, 0, 0, 0, 0, 1))).toBe(true);
    });

    it('composes translation, rotation and scale', function () {
        const m = mat4(); // m = I
        mat4Translate(m, m, vec3(4, 4, 4)); // m * T
        mat4RotateZ(m, m, Math.PI / 2); // (m * T) * R
        mat4Scale(m, m, vec3(2, 3, 1)); // (m * T * R) * S

        /*
         *         | 1 0 0 4 |   | 0 -1 0 0 |   | 2 0 0 0 |   | 0 -3 0 4 |
         * T*R*S = | 0 1 0 4 | * | 1  0 0 0 | * | 0 3 0 0 | = | 2  0 0 4 |
         *         | 0 0 1 4 |   | 0  0 1 0 |   | 0 0 1 0 |   | 0  0 1 4 |
         *         | 0 0 0 1 |   | 0  0 0 1 |   | 0 0 0 1 |   | 0  0 0 1 |
         */

        const TRS = mat4();
        const T = mat4FillTranslation(mat4(), vec3(4, 4, 4));
        const R = mat4FillRotationZ(mat4(), Math.PI / 2);
        const S = mat4FillScale(mat4(), vec3(2, 3, 1));
        mat4Multiply(TRS, mat4Multiply(TRS, T, R), S);
        expect(mat4Equals(m, TRS)).toBe(true);
        expect(mat4Equals(m, mat4(0, -3, 0, 4, 2, 0, 0, 4, 0, 0, 1, 4, 0, 0, 0, 1))).toBe(true);
    });
});
