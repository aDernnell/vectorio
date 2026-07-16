import { describe, expect, it } from 'vitest';
import { mat3, mat3Equals } from '../../mat3';
import { mat3Projection } from '../../mat3/mat3-gl';

describe('mat3-gl', function () {
    it('builds a 2D projection matrix', function () {
        const out = mat3();
        mat3Projection(out, 100, 200);
        expect(mat3Equals(out, mat3(0.02, 0, 0, 0, -0.01, 0, -1, 1, 1))).toBe(true);
    });
});
