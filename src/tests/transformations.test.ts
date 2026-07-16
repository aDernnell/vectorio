import { beforeEach, describe, expect, it } from 'vitest';
import * as mat2 from '../mat2/namespace';
import * as mat3 from '../mat3/namespace';
import * as mat4 from '../mat4/namespace';
import * as vec2 from '../vec2/namespace';
import * as vec3 from '../vec3/namespace';
import { Mat3 } from '../mat3';
import { Mat4 } from '../mat4';

const m3A: Mat3 = mat3.create();
const m3B: Mat3 = mat3.create();

const m4A: Mat4 = mat4.create();
const m4B: Mat4 = mat4.create();
const m4C: Mat4 = mat4.create();

describe('transform consistency', function () {
    beforeEach(function () {
        mat3.reset(m3A);
        mat3.reset(m3B);
        mat4.reset(m4A);
        mat4.reset(m4B);
        mat4.reset(m4C);
    });

    it('checks mat3 transformations', function () {
        mat3.fillTranslation(m3A, vec2.of(2, 3));
        mat3.translate(m3B, m3B, vec2.of(2, 3));
        expect(mat3.equals(m3A, m3B)).toBe(true);

        mat3.fillRotation(m3A, 0.2);
        mat3.rotate(m3B, mat3.create(), 0.2);
        expect(mat3.equals(m3A, m3B)).toBe(true);

        mat3.fillScale(m3A, vec2.of(2, 3));
        mat3.scale(m3B, mat3.create(), vec2.of(2, 3));
        expect(mat3.equals(m3A, m3B)).toBe(true);
    });

    it('checks mat4 rotation', function () {
        mat4.fillRotationX(m4A, 0.1);
        mat4.rotateX(m4B, m4B, 0.1);
        mat4.rotate(m4C, m4C, vec3.RIGHT as any, 0.1);
        expect(mat4.equals(m4A, m4B)).toBe(true);
        expect(mat4.equals(m4B, m4C)).toBe(true);

        mat4.fillRotationY(m4A, 0.1);
        mat4.rotateY(m4B, mat4.create(), 0.1);
        mat4.rotate(m4C, mat4.create(), vec3.UP as any, 0.1);
        expect(mat4.equals(m4A, m4B)).toBe(true);
        expect(mat4.equals(m4B, m4C)).toBe(true);

        mat4.fillRotationZ(m4A, 0.1);
        mat4.rotateZ(m4B, mat4.create(), 0.1);
        mat4.rotate(m4C, mat4.create(), vec3.FORWARD as any, 0.1);
        expect(mat4.equals(m4A, m4B)).toBe(true);
        expect(mat4.equals(m4B, m4C)).toBe(true);

        const radXYZ = vec3.of(0.1, 0.2, 0.3);
        mat4.fillRotationZYX(m4A, radXYZ);
        mat4.rotateZYX(m4B, mat4.create(), radXYZ);
        mat4.rotateZ(m4C, mat4.create(), radXYZ.z);
        mat4.rotateY(m4C, m4C, radXYZ.y);
        mat4.rotateX(m4C, m4C, radXYZ.x);
        expect(mat4.equals(m4A, m4B)).toBe(true);
        expect(mat4.equals(m4B, m4C)).toBe(true);

        const axis = vec3.normalize(vec3.create(), vec3.of(1, 2, 3));
        expect(mat4.rotate(mat4.create(), mat4.create(), axis, 0.1)).not.toBeNull();
    });

    it('checks mat4 translation and scaling', function () {
        mat4.fillTranslation(m4A, vec3.of(2, 3, 4));
        mat4.translate(m4B, mat4.create(), vec3.of(2, 3, 4));
        expect(mat4.equals(m4A, m4B)).toBe(true);

        mat4.fillScale(m4A, vec3.of(2, 3, 4));
        mat4.scale(m4B, mat4.create(), vec3.of(2, 3, 4));
        expect(mat4.equals(m4A, m4B)).toBe(true);
    });

    it('checks TRS decomposition', function () {
        const m2 = mat2.create();
        mat2.rotate(m2, m2, 0.1);
        mat2.scale(m2, m2, vec2.of(2, 3));

        expect(mat2.extractAngle(m2)).toBeCloseTo(0.1, 6);
        expect(vec2.equals(mat2.extractScaling(vec2.create(), m2), vec2.of(2, 3))).toBe(true);

        const m3 = mat3.create();
        mat3.fillTranslation(m3, vec2.of(2, 3));
        mat3.rotate(m3, m3, 0.1);
        mat3.scale(m3, m3, vec2.of(2, 3));
        expect(vec2.equals(mat3.extractTranslation(vec2.create(), m3), vec2.of(2, 3))).toBe(true);
        expect(mat3.extractAngle(m3)).toBeCloseTo(0.1, 6);
        expect(vec2.equals(mat3.extractScaling(vec2.create(), m3), vec2.of(2, 3))).toBe(true);

        const m4 = mat4.create();
        mat4.fillTranslation(m4, vec3.of(2, 3, 4));
        mat4.rotateZYX(m4, m4, vec3.of(0.1, 0.2, 0.3));
        mat4.scale(m4, m4, vec3.of(2, 3, 4));
        expect(vec3.equals(mat4.extractTranslation(vec3.create(), m4), vec3.of(2, 3, 4))).toBe(true);
        expect(vec3.equals(mat4.extractEulerAngles(vec3.create(), m4), vec3.of(0.1, 0.2, 0.3))).toBe(true);
        expect(vec3.equals(mat4.extractScaling(vec3.create(), m4), vec3.of(2, 3, 4))).toBe(true);
    });

    
});
