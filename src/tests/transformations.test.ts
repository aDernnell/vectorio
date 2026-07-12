import { beforeEach, describe, expect, it } from 'vitest';
import { mat2ExtractAngle, mat2ExtractScaling, mat2Rotate, mat2Scale, mat2 } from '../mat2';
import {
    mat3Equals,
    mat3ExtractAngle,
    mat3ExtractScaling,
    mat3ExtractTranslation,
    mat3FillRotation,
    mat3FillScale,
    mat3FillTranslation,
    mat3Rotate,
    mat3Scale,
    mat3Translate,
    mat3,
} from '../mat3';
import {
    mat4Equals,
    mat4ExtractEulerAngles,
    mat4ExtractScaling,
    mat4ExtractTranslation,
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
    mat4,
} from '../mat4';
import { vec2, vec2Equals } from '../vec2';
import { VEC3_FORWARD, VEC3_RIGHT, VEC3_UP, vec3, vec3Equals, vec3Normalize } from '../vec3';

const m3A = mat3();
const m3B = mat3();

const m4A = mat4();
const m4B = mat4();
const m4C = mat4();

describe('transform consistency', function () {
    beforeEach(function () {
        mat3FillTranslation(m3A, vec2(0, 0));
        mat3FillTranslation(m3B, vec2(0, 0));
        mat4FillTranslation(m4A, vec3(0, 0, 0));
        mat4FillTranslation(m4B, vec3(0, 0, 0));
        mat4FillTranslation(m4C, vec3(0, 0, 0));
    });

    it('checks mat3 transformations', function () {
        mat3FillTranslation(m3A, vec2(2, 3));
        mat3Translate(m3B, m3B, vec2(2, 3));
        expect(mat3Equals(m3A, m3B)).toBe(true);

        mat3FillRotation(m3A, 0.2);
        mat3Rotate(m3B, mat3(), 0.2);
        expect(mat3Equals(m3A, m3B)).toBe(true);

        mat3FillScale(m3A, vec2(2, 3));
        mat3Scale(m3B, mat3(), vec2(2, 3));
        expect(mat3Equals(m3A, m3B)).toBe(true);
    });

    it('checks mat4 rotation', function () {
        mat4FillRotationX(m4A, 0.1);
        mat4RotateX(m4B, m4B, 0.1);
        mat4Rotate(m4C, m4C, VEC3_RIGHT as any, 0.1);
        expect(mat4Equals(m4A, m4B)).toBe(true);
        expect(mat4Equals(m4B, m4C)).toBe(true);

        mat4FillRotationY(m4A, 0.1);
        mat4RotateY(m4B, mat4(), 0.1);
        mat4Rotate(m4C, mat4(), VEC3_UP as any, 0.1);
        expect(mat4Equals(m4A, m4B)).toBe(true);
        expect(mat4Equals(m4B, m4C)).toBe(true);

        mat4FillRotationZ(m4A, 0.1);
        mat4RotateZ(m4B, mat4(), 0.1);
        mat4Rotate(m4C, mat4(), VEC3_FORWARD as any, 0.1);
        expect(mat4Equals(m4A, m4B)).toBe(true);
        expect(mat4Equals(m4B, m4C)).toBe(true);

        const radXYZ = vec3(0.1, 0.2, 0.3);
        mat4FillRotationZYX(m4A, radXYZ);
        mat4RotateZYX(m4B, mat4(), radXYZ);
        mat4RotateZ(m4C, mat4(), radXYZ.z);
        mat4RotateY(m4C, m4C, radXYZ.y);
        mat4RotateX(m4C, m4C, radXYZ.x);
        expect(mat4Equals(m4A, m4B)).toBe(true);
        expect(mat4Equals(m4B, m4C)).toBe(true);

        const axis = vec3Normalize(vec3(), vec3(1, 2, 3));
        expect(mat4Rotate(mat4(), mat4(), axis, 0.1)).not.toBeNull();
    });

    it('checks mat4 translation and scaling', function () {
        mat4FillTranslation(m4A, vec3(2, 3, 4));
        mat4Translate(m4B, mat4(), vec3(2, 3, 4));
        expect(mat4Equals(m4A, m4B)).toBe(true);

        mat4FillScale(m4A, vec3(2, 3, 4));
        mat4Scale(m4B, mat4(), vec3(2, 3, 4));
        expect(mat4Equals(m4A, m4B)).toBe(true);
    });

    it('checks TRS decomposition', function () {
        const m2 = mat2();
        mat2Rotate(m2, m2, 0.1);
        mat2Scale(m2, m2, vec2(2, 3));

        expect(mat2ExtractAngle(m2)).toBeCloseTo(0.1, 6);
        expect(vec2Equals(mat2ExtractScaling(vec2(), m2), vec2(2, 3))).toBe(true);

        const m3 = mat3();
        mat3FillTranslation(m3, vec2(2, 3));
        mat3Rotate(m3, m3, 0.1);
        mat3Scale(m3, m3, vec2(2, 3));
        expect(vec2Equals(mat3ExtractTranslation(vec2(), m3), vec2(2, 3))).toBe(true);
        expect(mat3ExtractAngle(m3)).toBeCloseTo(0.1, 6);
        expect(vec2Equals(mat3ExtractScaling(vec2(), m3), vec2(2, 3))).toBe(true);

        const m4 = mat4();
        mat4FillTranslation(m4, vec3(2, 3, 4));
        mat4RotateZYX(m4, m4, vec3(0.1, 0.2, 0.3));
        mat4Scale(m4, m4, vec3(2, 3, 4));
        expect(vec3Equals(mat4ExtractTranslation(vec3(), m4), vec3(2, 3, 4))).toBe(true);
        expect(vec3Equals(mat4ExtractEulerAngles(vec3(), m4), vec3(0.1, 0.2, 0.3))).toBe(true);
        expect(vec3Equals(mat4ExtractScaling(vec3(), m4), vec3(2, 3, 4))).toBe(true);
    });

    
});
