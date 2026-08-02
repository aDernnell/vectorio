import { describe, expect, it } from 'vitest';
import { mat4 } from '../../src/mat4/mat4-core';
import { mat4FillRotationY, mat4FillTranslation, mat4RotateY, mat4RotateZYX, mat4Scale, mat4Translate } from '../../src/mat4/mat4-affine';
import { mat4ExtractEulerAngles, mat4ExtractScaling, mat4ExtractTranslation } from '../../src/mat4/mat4-decompose';
import { vec3 } from '../../src/vec3/vec3-core';

describe('mat4-decompose', function () {
    it('extracts translation', function () {
        const m = mat4();
        mat4Translate(m, m, vec3(2, 3, 4));
        expect(mat4ExtractTranslation(vec3(), m)).toEqualVec(vec3(2, 3, 4));
    });

    it('extracts euler angles', function () {
        const m = mat4();
        mat4RotateY(m, m, 0.1);
        expect(mat4ExtractEulerAngles(vec3(), m)).toEqualVec(vec3(0, 0.1, 0));
    });

    it('extracts scaling', function () {
        const m = mat4();
        mat4Scale(m, m, vec3(2, 3, 4));
        const scaling = mat4ExtractScaling(vec3(), m);
        expect(scaling).toEqualVec(vec3(2, 3, 4));
    });

    it('extracts translation, euler angles and scaling from a composed transformation', function () {
        const m = mat4();
        mat4Translate(m, m, vec3(2, 3, 4));
        mat4RotateZYX(m, m, vec3(0.1, 0.2, 0.3));
        mat4Scale(m, m, vec3(2, 3, 4));

        expect(mat4ExtractTranslation(vec3(), m)).toEqualVec(vec3(2, 3, 4));
        expect(mat4ExtractEulerAngles(vec3(), m)).toEqualVec(vec3(0.1, 0.2, 0.3));
        expect(mat4ExtractScaling(vec3(), m)).toEqualVec(vec3(2, 3, 4));
    });

    it('throws on zero scale axis for euler angles extraction', function () {
        const m = mat4(0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        expect(() => mat4ExtractEulerAngles(vec3(), m)).toThrow(
            'Cannot extract Euler angles from matrix with zero scale axis',
        );
    });

    it('handles euler extraction gimbal-lock branches', function () {
        const yNegHalfPi = mat4();
        mat4FillRotationY(yNegHalfPi, -Math.PI / 2);
        const outNeg = mat4ExtractEulerAngles(vec3(), yNegHalfPi);
        expect(outNeg.y).toBeCloseTo(-Math.PI / 2, 6);

        const yPosHalfPi = mat4();
        mat4FillRotationY(yPosHalfPi, Math.PI / 2);
        const outPos = mat4ExtractEulerAngles(vec3(), yPosHalfPi);
        expect(outPos.y).toBeCloseTo(Math.PI / 2, 6);
    });
});
