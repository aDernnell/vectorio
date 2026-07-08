import { Matrix2x2 } from './matrix2x2';
import { Matrix3x3 } from './matrix3x3';
import { Matrix4x4 } from './matrix4x4';
import { EPSILON } from './utils';
import { Vector3 } from './vector3';

export const Mat4x4Impl = {
    fromMat(mat: Matrix2x2 | Matrix3x3): Matrix4x4 {
        if (mat instanceof Matrix2x2) {
            // prettier-ignore
            return new Matrix4x4(
                mat.m00, mat.m01, 0, 0,
                mat.m10, mat.m11, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            );
        }

        if (mat instanceof Matrix3x3) {
            // prettier-ignore
            return new Matrix4x4(
                mat.m00, mat.m01, mat.m02, 0,
                mat.m10, mat.m11, mat.m12, 0,
                mat.m20, mat.m21, mat.m22, 0,
                0, 0, 0, 1
            );
        }

        throw new Error('Invalid input for Mat4x4.fromMat');
    },

    fromArr(arr: Array<number>): Matrix4x4 {
        // prettier-ignore
        return new Matrix4x4(
            arr[0], arr[4], arr[8], arr[12],
            arr[1], arr[5], arr[9], arr[13],
            arr[2], arr[6], arr[10], arr[14],
            arr[3], arr[7], arr[11], arr[15]
        );
    },

    determinant(a: Readonly<Matrix4x4>): number {
        const b0 = a[0] * a[5] - a[1] * a[4];
        const b1 = a[0] * a[6] - a[2] * a[4];
        const b2 = a[1] * a[6] - a[2] * a[5];
        const b3 = a[8] * a[13] - a[9] * a[12];
        const b4 = a[8] * a[14] - a[10] * a[12];
        const b5 = a[9] * a[14] - a[10] * a[13];

        const c1 = a[0] * b5 - a[1] * b4 + a[2] * b3;
        const c2 = a[4] * b5 - a[5] * b4 + a[6] * b3;
        const c3 = a[8] * b2 - a[9] * b1 + a[10] * b0;
        const c4 = a[12] * b2 - a[13] * b1 + a[14] * b0;

        return a[7] * c1 - a[3] * c2 + a[15] * c3 - a[11] * c4;
    },

    frob(a: Readonly<Matrix4x4>): number {
        return Math.sqrt(
            a[0] * a[0] +
                a[1] * a[1] +
                a[2] * a[2] +
                a[3] * a[3] +
                a[4] * a[4] +
                a[5] * a[5] +
                a[6] * a[6] +
                a[7] * a[7] +
                a[8] * a[8] +
                a[9] * a[9] +
                a[10] * a[10] +
                a[11] * a[11] +
                a[12] * a[12] +
                a[13] * a[13] +
                a[14] * a[14] +
                a[15] * a[15],
        );
    },

    strictEquals(a: Readonly<Matrix4x4>, b: Readonly<Matrix4x4>): boolean {
        return (
            a[0] === b[0] &&
            a[1] === b[1] &&
            a[2] === b[2] &&
            a[3] === b[3] &&
            a[4] === b[4] &&
            a[5] === b[5] &&
            a[6] === b[6] &&
            a[7] === b[7] &&
            a[8] === b[8] &&
            a[9] === b[9] &&
            a[10] === b[10] &&
            a[11] === b[11] &&
            a[12] === b[12] &&
            a[13] === b[13] &&
            a[14] === b[14] &&
            a[15] === b[15]
        );
    },

    equals(a: Readonly<Matrix4x4>, b: Readonly<Matrix4x4>, epsilon: number): boolean {
        return (
            Math.abs(a[0] - b[0]) <= epsilon &&
            Math.abs(a[1] - b[1]) <= epsilon &&
            Math.abs(a[2] - b[2]) <= epsilon &&
            Math.abs(a[3] - b[3]) <= epsilon &&
            Math.abs(a[4] - b[4]) <= epsilon &&
            Math.abs(a[5] - b[5]) <= epsilon &&
            Math.abs(a[6] - b[6]) <= epsilon &&
            Math.abs(a[7] - b[7]) <= epsilon &&
            Math.abs(a[8] - b[8]) <= epsilon &&
            Math.abs(a[9] - b[9]) <= epsilon &&
            Math.abs(a[10] - b[10]) <= epsilon &&
            Math.abs(a[11] - b[11]) <= epsilon &&
            Math.abs(a[12] - b[12]) <= epsilon &&
            Math.abs(a[13] - b[13]) <= epsilon &&
            Math.abs(a[14] - b[14]) <= epsilon &&
            Math.abs(a[15] - b[15]) <= epsilon
        );
    },

    stringify(a: Readonly<Matrix4x4>): string {
        return `mat4x4([${a.join(', ')}])`;
    },

    // #region Unary operations
    transpose(out: Matrix4x4, a: Readonly<Matrix4x4>): Matrix4x4 {
        // prettier-ignore
        return out.set(
            a[0], a[1], a[2], a[3],
            a[4], a[5], a[6], a[7],
            a[8], a[9], a[10], a[11],
            a[12], a[13], a[14], a[15]
        );
    },

    invert(out: Matrix4x4, a: Readonly<Matrix4x4>): Matrix4x4 | null {
        const b00 = a[0] * a[5] - a[1] * a[4];
        const b01 = a[0] * a[6] - a[2] * a[4];
        const b02 = a[0] * a[7] - a[3] * a[4];
        const b03 = a[1] * a[6] - a[2] * a[5];
        const b04 = a[1] * a[7] - a[3] * a[5];
        const b05 = a[2] * a[7] - a[3] * a[6];
        const b06 = a[8] * a[13] - a[9] * a[12];
        const b07 = a[8] * a[14] - a[10] * a[12];
        const b08 = a[8] * a[15] - a[11] * a[12];
        const b09 = a[9] * a[14] - a[10] * a[13];
        const b10 = a[9] * a[15] - a[11] * a[13];
        const b11 = a[10] * a[15] - a[11] * a[14];

        let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
        if (det == 0) {
            return null;
        }

        det = 1.0 / det;

        out[0] = (a[5] * b11 - a[6] * b10 + a[7] * b09) * det;
        out[1] = (a[2] * b10 - a[1] * b11 - a[3] * b09) * det;
        out[2] = (a[13] * b05 - a[14] * b04 + a[15] * b03) * det;
        out[3] = (a[10] * b04 - a[9] * b05 - a[11] * b03) * det;
        out[4] = (a[6] * b08 - a[4] * b11 - a[7] * b07) * det;
        out[5] = (a[0] * b11 - a[2] * b08 + a[3] * b07) * det;
        out[6] = (a[14] * b02 - a[12] * b05 - a[15] * b01) * det;
        out[7] = (a[8] * b05 - a[10] * b02 + a[11] * b01) * det;
        out[8] = (a[4] * b10 - a[5] * b08 + a[7] * b06) * det;
        out[9] = (a[1] * b08 - a[0] * b10 - a[3] * b06) * det;
        out[10] = (a[12] * b04 - a[13] * b02 + a[15] * b00) * det;
        out[11] = (a[9] * b02 - a[8] * b04 - a[11] * b00) * det;
        out[12] = (a[5] * b07 - a[4] * b09 - a[6] * b06) * det;
        out[13] = (a[0] * b09 - a[1] * b07 + a[2] * b06) * det;
        out[14] = (a[13] * b01 - a[12] * b03 - a[14] * b00) * det;
        out[15] = (a[8] * b03 - a[9] * b01 + a[10] * b00) * det;
        return out;
    },

    adjoint(out: Matrix4x4, a: Readonly<Matrix4x4>): Matrix4x4 {
        const b00 = a[0] * a[5] - a[1] * a[4];
        const b01 = a[0] * a[6] - a[2] * a[4];
        const b02 = a[0] * a[7] - a[3] * a[4];
        const b03 = a[1] * a[6] - a[2] * a[5];
        const b04 = a[1] * a[7] - a[3] * a[5];
        const b05 = a[2] * a[7] - a[3] * a[6];
        const b06 = a[8] * a[13] - a[9] * a[12];
        const b07 = a[8] * a[14] - a[10] * a[12];
        const b08 = a[8] * a[15] - a[11] * a[12];
        const b09 = a[9] * a[14] - a[10] * a[13];
        const b10 = a[9] * a[15] - a[11] * a[13];
        const b11 = a[10] * a[15] - a[11] * a[14];

        out[0] = a[5] * b11 - a[6] * b10 + a[7] * b09;
        out[1] = a[2] * b10 - a[1] * b11 - a[3] * b09;
        out[2] = a[13] * b05 - a[14] * b04 + a[15] * b03;
        out[3] = a[10] * b04 - a[9] * b05 - a[11] * b03;
        out[4] = a[6] * b08 - a[4] * b11 - a[7] * b07;
        out[5] = a[0] * b11 - a[2] * b08 + a[3] * b07;
        out[6] = a[14] * b02 - a[12] * b05 - a[15] * b01;
        out[7] = a[8] * b05 - a[10] * b02 + a[11] * b01;
        out[8] = a[4] * b10 - a[5] * b08 + a[7] * b06;
        out[9] = a[1] * b08 - a[0] * b10 - a[3] * b06;
        out[10] = a[12] * b04 - a[13] * b02 + a[15] * b00;
        out[11] = a[9] * b02 - a[8] * b04 - a[11] * b00;
        out[12] = a[5] * b07 - a[4] * b09 - a[6] * b06;
        out[13] = a[0] * b09 - a[1] * b07 + a[2] * b06;
        out[14] = a[13] * b01 - a[12] * b03 - a[14] * b00;
        out[15] = a[8] * b03 - a[9] * b01 + a[10] * b00;
        return out;
    },
    // #endregion

    // #region Binary operations
    add(out: Matrix4x4, a: Readonly<Matrix4x4>, b: Readonly<Matrix4x4>): Matrix4x4 {
        // prettier-ignore
        return out.set(
            a[0] + b[0], a[4] + b[4], a[8]  + b[8],  a[12] + b[12],
            a[1] + b[1], a[5] + b[5], a[9]  + b[9],  a[13] + b[13],
            a[2] + b[2], a[6] + b[6], a[10] + b[10], a[14] + b[14],
            a[3] + b[3], a[7] + b[7], a[11] + b[11], a[15] + b[15]
        );
    },

    subtract(out: Matrix4x4, a: Readonly<Matrix4x4>, b: Readonly<Matrix4x4>): Matrix4x4 {
        // prettier-ignore
        return out.set(
            a[0] - b[0], a[4] - b[4], a[8]  - b[8],  a[12] - b[12],
            a[1] - b[1], a[5] - b[5], a[9]  - b[9],  a[13] - b[13],
            a[2] - b[2], a[6] - b[6], a[10] - b[10], a[14] - b[14],
            a[3] - b[3], a[7] - b[7], a[11] - b[11], a[15] - b[15]
        );
    },

    multiply(out: Matrix4x4, a: Readonly<Matrix4x4>, b: Readonly<Matrix4x4>): Matrix4x4 {
        out[0] = b[0] * a[0] + b[1] * a[4] + b[2] * a[8] + b[3] * a[12];
        out[1] = b[0] * a[1] + b[1] * a[5] + b[2] * a[9] + b[3] * a[13];
        out[2] = b[0] * a[2] + b[1] * a[6] + b[2] * a[10] + b[3] * a[14];
        out[3] = b[0] * a[3] + b[1] * a[7] + b[2] * a[11] + b[3] * a[15];

        out[4] = b[4] * a[0] + b[5] * a[4] + b[6] * a[8] + b[7] * a[12];
        out[5] = b[4] * a[1] + b[5] * a[5] + b[6] * a[9] + b[7] * a[13];
        out[6] = b[4] * a[2] + b[5] * a[6] + b[6] * a[10] + b[7] * a[14];
        out[7] = b[4] * a[3] + b[5] * a[7] + b[6] * a[11] + b[7] * a[15];

        out[8] = b[8] * a[0] + b[9] * a[4] + b[10] * a[8] + b[11] * a[12];
        out[9] = b[8] * a[1] + b[9] * a[5] + b[10] * a[9] + b[11] * a[13];
        out[10] = b[8] * a[2] + b[9] * a[6] + b[10] * a[10] + b[11] * a[14];
        out[11] = b[8] * a[3] + b[9] * a[7] + b[10] * a[11] + b[11] * a[15];

        out[12] = b[12] * a[0] + b[13] * a[4] + b[14] * a[8] + b[15] * a[12];
        out[13] = b[12] * a[1] + b[13] * a[5] + b[14] * a[9] + b[15] * a[13];
        out[14] = b[12] * a[2] + b[13] * a[6] + b[14] * a[10] + b[15] * a[14];
        out[15] = b[12] * a[3] + b[13] * a[7] + b[14] * a[11] + b[15] * a[15];
        return out;
    },

    multiplyScalar(out: Matrix4x4, a: Readonly<Matrix4x4>, scalar: number): Matrix4x4 {
        // prettier-ignore
        return out.set(
            a[0] * scalar, a[4] * scalar, a[8]  * scalar, a[12] * scalar,
            a[1] * scalar, a[5] * scalar, a[9]  * scalar, a[13] * scalar,
            a[2] * scalar, a[6] * scalar, a[10] * scalar, a[14] * scalar,
            a[3] * scalar, a[7] * scalar, a[11] * scalar, a[15] * scalar
        );
    },
    // #endregion

    // #region Affine transformations
    translate(out: Matrix4x4, a: Readonly<Matrix4x4>, v: Readonly<Vector3>): Matrix4x4 {
        // prettier-ignore
        return out.set(
            a[0], a[4], a[8],  a[0] * v.x + a[4] * v.y + a[8]  * v.z + a[12],
            a[1], a[5], a[9],  a[1] * v.x + a[5] * v.y + a[9]  * v.z + a[13],
            a[2], a[6], a[10], a[2] * v.x + a[6] * v.y + a[10] * v.z + a[14],
            a[3], a[7], a[11], a[3] * v.x + a[7] * v.y + a[11] * v.z + a[15]
        );
    },

    rotate(out: Matrix4x4, a: Readonly<Matrix4x4>, axis: Readonly<Vector3>, rad: number): Matrix4x4 | null {
        let x = axis.x;
        let y = axis.y;
        let z = axis.z;
        let len = Math.sqrt(x * x + y * y + z * z);

        if (len < EPSILON) {
            return null;
        }

        len = 1 / len;
        x *= len;
        y *= len;
        z *= len;

        const s = Math.sin(rad);
        const c = Math.cos(rad);
        const t = 1 - c;

        const b00 = x * x * t + c;
        const b01 = y * x * t + z * s;
        const b02 = z * x * t - y * s;

        const b10 = x * y * t - z * s;
        const b11 = y * y * t + c;
        const b12 = z * y * t + x * s;

        const b20 = x * z * t + y * s;
        const b21 = y * z * t - x * s;
        const b22 = z * z * t + c;

        const c00 = a[0] * b00 + a[4] * b01 + a[8] * b02;
        const c10 = a[1] * b00 + a[5] * b01 + a[9] * b02;
        const c20 = a[2] * b00 + a[6] * b01 + a[10] * b02;
        const c30 = a[3] * b00 + a[7] * b01 + a[11] * b02;

        const c01 = a[0] * b10 + a[4] * b11 + a[8] * b12;
        const c11 = a[1] * b10 + a[5] * b11 + a[9] * b12;
        const c21 = a[2] * b10 + a[6] * b11 + a[10] * b12;
        const c31 = a[3] * b10 + a[7] * b11 + a[11] * b12;

        const c02 = a[0] * b20 + a[4] * b21 + a[8] * b22;
        const c12 = a[1] * b20 + a[5] * b21 + a[9] * b22;
        const c22 = a[2] * b20 + a[6] * b21 + a[10] * b22;
        const c32 = a[3] * b20 + a[7] * b21 + a[11] * b22;

        // prettier-ignore
        return out.set(
            c00, c01, c02, a[12],
            c10, c11, c12, a[13],
            c20, c21, c22, a[14],
            c30, c31, c32, a[15]
        );
    },

    scale(out: Matrix4x4, a: Readonly<Matrix4x4>, v: Readonly<Vector3>): Matrix4x4 {
        // prettier-ignore
        return out.set(
            a[0] * v.x, a[4] * v.y, a[8] * v.z, a[12],
            a[1] * v.x, a[5] * v.y, a[9] * v.z, a[13],
            a[2] * v.x, a[6] * v.y, a[10] * v.z, a[14],
            a[3] * v.x, a[7] * v.y, a[11] * v.z, a[15]
        );
    },
    // #endregion
};
