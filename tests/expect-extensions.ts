import { expect } from 'vitest';
import type { Mat2 } from '../src/mat2/mat2-core';
import type { Mat3 } from '../src/mat3/mat3-core';
import type { Mat4 } from '../src/mat4/mat4-core';
import { quat, quatEquals, type Quat } from '../src/quat/quat-core';
import { quatNormalize } from '../src/quat/quat-unary-ops';
import type { Vec2 } from '../src/vec2/vec2-core';
import type { Vec3 } from '../src/vec3/vec3-core';
import type { Vec4 } from '../src/vec4/vec4-core';

type VecComparable = Vec2 | Vec3 | Vec4;
type MatComparable = Mat2 | Mat3 | Mat4;
type EpsilonComparable = VecComparable | MatComparable;

function components(value: EpsilonComparable): readonly number[] {
    // Mat4
    if ('m33' in value)
        return [
            value.m00,
            value.m01,
            value.m02,
            value.m03,
            value.m10,
            value.m11,
            value.m12,
            value.m13,
            value.m20,
            value.m21,
            value.m22,
            value.m23,
            value.m30,
            value.m31,
            value.m32,
            value.m33,
        ];
    // Mat3
    if ('m22' in value)
        return [value.m00, value.m01, value.m02, value.m10, value.m11, value.m12, value.m20, value.m21, value.m22];
    // Mat2
    if ('m11' in value) return [value.m00, value.m01, value.m10, value.m11];
    // Vec4
    if ('w' in value) return [value.x, value.y, value.z, value.w];
    // Vec3
    if ('z' in value) return [value.x, value.y, value.z];
    // Vec2
    if ('y' in value) return [value.x, value.y];

    return [];
}

function compareComponentWiseWithEpsilon(
    received: EpsilonComparable,
    expected: EpsilonComparable,
    epsilon: number,
): boolean {
    const a = components(received);
    const b = components(expected);
    return a.length === b.length && a.every((v, i) => Math.abs(v - b[i]) <= epsilon);
}

expect.extend({
    toEqualVec(received: VecComparable, expected: VecComparable, epsilon = 1e-6) {
        const pass = compareComponentWiseWithEpsilon(received, expected, epsilon);

        return {
            pass,
            actual: received,
            expected,
            message: () => `Expected vector values to be equal within ε=${epsilon}` };
    },
    toEqualMat(received: MatComparable, expected: MatComparable, epsilon = 1e-6) {
        const pass = compareComponentWiseWithEpsilon(received, expected, epsilon);

        return {
            pass,
            actual: received,
            expected,
            message: () => `Expected matrix values to be equal within ε=${epsilon}` };
    },
    toEqualQuat(received: Quat, expected: Quat, epsilon = 1e-6) {
        const a = quatNormalize(quat(), received);
        const b = quatNormalize(quat(), expected);

        const pass = quatEquals(a, b, epsilon);

        return {
            pass,
            actual: received,
            expected,
            message: () => `Expected quaternion to represent same rotation within ε=${epsilon}` };
    } });
