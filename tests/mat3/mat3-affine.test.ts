import { describe, expect, it } from 'vitest';
import { mat3 } from '../../src/mat3/mat3-core';
import { mat3FillRotation, mat3FillScale, mat3FillTranslation, mat3Rotate, mat3Scale, mat3Translate } from '../../src/mat3/mat3-affine';
import { vec2 } from '../../src/vec2/vec2-core';
import { mat3Multiply } from '../../src/mat3';

describe('mat3-affine', function () {
    it('translates', function () {
        const m = mat3();
        mat3Translate(m, m, vec2(2, 3));
        expect(m).toEqualMat(mat3(1, 0, 2, 0, 1, 3, 0, 0, 1));
    });

    it('fills translation', function () {
        const m = mat3();
        mat3FillTranslation(m, vec2(2, 3));
        expect(m).toEqualMat(mat3(1, 0, 2, 0, 1, 3, 0, 0, 1));
    });

    it('rotates', function () {
        const m = mat3();
        mat3Rotate(m, m, Math.PI / 2);
        expect(m).toEqualMat(mat3(0, -1, 0, 1, 0, 0, 0, 0, 1));
    });

    it('fills rotation', function () {
        const m = mat3();
        mat3FillRotation(m, Math.PI / 2);
        expect(m).toEqualMat(mat3(0, -1, 0, 1, 0, 0, 0, 0, 1));
    });

    it('scales', function () {
        const m = mat3();
        mat3Scale(m, m, vec2(2, 3));
        expect(m).toEqualMat(mat3(2, 0, 0, 0, 3, 0, 0, 0, 1));
    });

    it('fills scale', function () {
        const m = mat3();
        mat3FillScale(m, vec2(2, 3));
        expect(m).toEqualMat(mat3(2, 0, 0, 0, 3, 0, 0, 0, 1));
    });

    it('composes translation, rotation and scale', function () {
        const m = mat3(); // m = I
        mat3Translate(m, m, vec2(2, 3)); // m * T
        mat3Rotate(m, m, Math.PI / 2); // (m * T) * R
        mat3Scale(m, m, vec2(2, 3)); // (m * T * R) * S

        /*
         *         | 1 0 2 |   | 0 -1 0 |   | 2 0 0 |   | 0 -3 2 |
         * T*R*S = | 0 1 3 | * | 1  0 0 | * | 0 3 0 | = | 2  0 3 |
         *         | 0 0 1 |   | 0  0 1 |   | 0 0 1 |   | 0  0 1 |
         */

        const TRS = mat3();
        const T = mat3FillTranslation(mat3(), vec2(2, 3));
        const R = mat3FillRotation(mat3(), Math.PI / 2);
        const S = mat3FillScale(mat3(), vec2(2, 3));
        mat3Multiply(TRS, mat3Multiply(TRS, T, R), S);
        expect(m).toEqualMat(TRS);
        expect(m).toEqualMat(mat3(0, -3, 2, 2, 0, 3, 0, 0, 1));
    });
});
