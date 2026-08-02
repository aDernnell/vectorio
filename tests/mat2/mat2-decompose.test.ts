import { describe, expect, it } from 'vitest';
import { mat2Rotate, mat2Scale } from '../../src/mat2/mat2-affine';
import { mat2 } from '../../src/mat2/mat2-core';
import { mat2ExtractAngle, mat2ExtractScaling } from '../../src/mat2/mat2-decompose';
import { vec2 } from '../../src/vec2/vec2-core';

describe('mat2-decompose', function () {
    it('extracts angle', function () {
        const m = mat2();
        mat2Rotate(m, m, 0.1);
        expect(mat2ExtractAngle(m)).toBeCloseTo(0.1, 6);
    });

    it('extracts scaling', function () {
        const m = mat2();
        mat2Scale(m, m, vec2(2, 3));
        const scaling = mat2ExtractScaling(vec2(), m);
        expect(scaling.x).toBeCloseTo(2, 6);
        expect(scaling.y).toBeCloseTo(3, 6);
    });

    it('extracts angle and scaling from composed transformation', function () {
        const m = mat2();
        mat2Rotate(m, m, 0.1);
        mat2Scale(m, m, vec2(2, 2));

        const angle = mat2ExtractAngle(m);
        expect(angle).toBeCloseTo(0.1, 6);

        const scaling = mat2ExtractScaling(vec2(), m);
        expect(scaling.x).toBeCloseTo(2, 6);
        expect(scaling.y).toBeCloseTo(2, 6);
    });
});
