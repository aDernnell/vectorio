import { describe, expect, it } from 'vitest';
import { mat3 } from '../../src/mat3/mat3-core';
import { mat3FillTranslation, mat3Rotate, mat3Scale, mat3Translate } from '../../src/mat3/mat3-affine';
import { mat3ExtractAngle, mat3ExtractScaling, mat3ExtractTranslation } from '../../src/mat3/mat3-decompose';
import { vec2 } from '../../src/vec2/vec2-core';

describe('mat3-decompose', function () {

    it('extracts translation', function () {
        const m = mat3();
        mat3Translate(m, m, vec2(2, 3));
        expect(mat3ExtractTranslation(vec2(), m)).toEqualVec(vec2(2, 3));
    });

    it('extracts angle', function () {
        const m = mat3();
        mat3Rotate(m, m, 0.1);
        expect(mat3ExtractAngle(m)).toBeCloseTo(0.1, 6);
    });

    it('extracts scaling', function () {
        const m = mat3();
        mat3Scale(m, m, vec2(2, 3));
        const scaling = mat3ExtractScaling(vec2(), m);
        expect(scaling).toEqualVec(vec2(2, 3));
    });

    it('extracts translation, angle and scaling from composed transformation', function () {
        const m = mat3();
        mat3Translate(m, m, vec2(2, 3));
        mat3Rotate(m, m, 0.1);
        mat3Scale(m, m, vec2(2, 3));

        expect(mat3ExtractTranslation(vec2(), m)).toEqualVec(vec2(2, 3));
        expect(mat3ExtractAngle(m)).toBeCloseTo(0.1, 6);
        expect(mat3ExtractScaling(vec2(), m)).toEqualVec(vec2(2, 3));
    });
});
