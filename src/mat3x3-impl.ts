import { Matrix2x2 } from './matrix2x2';
import { Matrix3x3 } from './matrix3x3';
import { Matrix4x4 } from './matrix4x4';
import { Vector2 } from './vector2';

export const Mat3x3Impl = {

    fromMat(values: Matrix2x2 | Matrix4x4): Matrix3x3 {
        if (values instanceof Matrix2x2) {
            // prettier-ignore
            return new Matrix3x3(
                values.m00, values.m01, 0,
                values.m10, values.m11, 0,
                0, 0, 1
            );
        } else if (values instanceof Matrix4x4) {
            // prettier-ignore
            return new Matrix3x3(
                values.m00, values.m01, values.m02,
                values.m10, values.m11, values.m12,
                values.m20, values.m21, values.m22
            );
        }

        throw new Error('Invalid matrix type');
    },

    fromArr(arr: Array<number>): Matrix3x3 {
        // prettier-ignore
        return new Matrix3x3(
            arr[0], arr[3], arr[6],
            arr[1], arr[4], arr[7],
            arr[2], arr[5], arr[8]
        );
    },

    determinant(a: Readonly<Matrix3x3>): number {
        return a[0] * (a[8] * a[4] - a[5] * a[7]) + a[1] * (-a[8] * a[3] + a[5] * a[6]) + a[2] * (a[7] * a[3] - a[4] * a[6]);
    },

    frob(a: Readonly<Matrix3x3>): number {
        return Math.sqrt(
            a[0] * a[0] +
                a[1] * a[1] +
                a[2] * a[2] +
                a[3] * a[3] +
                a[4] * a[4] +
                a[5] * a[5] +
                a[6] * a[6] +
                a[7] * a[7] +
                a[8] * a[8],
        );
    },

    strictEquals(a: Readonly<Matrix3x3>, b: Readonly<Matrix3x3>): boolean {
        return (
            a[0] === b[0] &&
            a[1] === b[1] &&
            a[2] === b[2] &&
            a[3] === b[3] &&
            a[4] === b[4] &&
            a[5] === b[5] &&
            a[6] === b[6] &&
            a[7] === b[7] &&
            a[8] === b[8]
        );
    },

    equals(a: Readonly<Matrix3x3>, b: Readonly<Matrix3x3>, epsilon: number): boolean {
        return (
            Math.abs(a[0] - b[0]) <= epsilon &&
            Math.abs(a[1] - b[1]) <= epsilon &&
            Math.abs(a[2] - b[2]) <= epsilon &&
            Math.abs(a[3] - b[3]) <= epsilon &&
            Math.abs(a[4] - b[4]) <= epsilon &&
            Math.abs(a[5] - b[5]) <= epsilon &&
            Math.abs(a[6] - b[6]) <= epsilon &&
            Math.abs(a[7] - b[7]) <= epsilon &&
            Math.abs(a[8] - b[8]) <= epsilon
        );
    },

    stringify(a: Readonly<Matrix3x3>): string {
        return `mat3x3([${a.join(', ')}])`;
    },

    // #region Unary operations
    transpose(out: Matrix3x3, a: Readonly<Matrix3x3>): Matrix3x3 {
        // prettier-ignore
        return out.set(
            a[0], a[1], a[2],
            a[3], a[4], a[5],
            a[6], a[7], a[8]
        );
    },

    invert(out: Matrix3x3, a: Readonly<Matrix3x3>): Matrix3x3 | null {
        const b0 = a[8] * a[4] - a[5] * a[7];
        const b1 = -a[8] * a[3] + a[5] * a[6];
        const b2 = a[7] * a[3] - a[4] * a[6];

        let det = a[0] * b0 + a[1] * b1 + a[2] * b2;
        if (det == 0) {
            return null;
        }

        det = 1.0 / det;

        // prettier-ignore
        return out.set(
            b0 * det, (-a[8] * a[1] + a[2] * a[7]) * det, (a[5] * a[1] - a[2] * a[4]) * det,
            b1 * det, (a[8] * a[0] - a[2] * a[6]) * det, (-a[5] * a[0] + a[2] * a[3]) * det,
            b2 * det, (-a[7] * a[0] + a[1] * a[6]) * det, (a[4] * a[0] - a[1] * a[3]) * det
        );
    },

    adjoint(out: Matrix3x3, a: Readonly<Matrix3x3>): Matrix3x3 {
        // prettier-ignore
        return out.set(
            a[4] * a[8] - a[5] * a[7], a[2] * a[7] - a[1] * a[8], a[1] * a[5] - a[2] * a[4],
            a[5] * a[6] - a[3] * a[8], a[0] * a[8] - a[2] * a[6], a[2] * a[3] - a[0] * a[5],
            a[3] * a[7] - a[4] * a[6], a[1] * a[6] - a[0] * a[7], a[0] * a[4] - a[1] * a[3]
        );
    },
    // #endregion

    // #region Binary operations
    add(out: Matrix3x3, a: Readonly<Matrix3x3>, b: Readonly<Matrix3x3>): Matrix3x3 {
        // prettier-ignore
        return out.set(
            a[0] + b[0], a[3] + b[3], a[6] + b[6],
            a[1] + b[1], a[4] + b[4], a[7] + b[7],
            a[2] + b[2], a[5] + b[5], a[8] + b[8]
        );
    },

    subtract(out: Matrix3x3, a: Readonly<Matrix3x3>, b: Readonly<Matrix3x3>): Matrix3x3 {
        // prettier-ignore
        return out.set(
            a[0] - b[0], a[3] - b[3], a[6] - b[6],
            a[1] - b[1], a[4] - b[4], a[7] - b[7],
            a[2] - b[2], a[5] - b[5], a[8] - b[8]
        );
    },

    multiply(out: Matrix3x3, a: Readonly<Matrix3x3>, b: Readonly<Matrix3x3>): Matrix3x3 {
        const c00 = b[0] * a[0] + b[1] * a[3] + b[2] * a[6];
        const c10 = b[0] * a[1] + b[1] * a[4] + b[2] * a[7];
        const c20 = b[0] * a[2] + b[1] * a[5] + b[2] * a[8];

        const c01 = b[3] * a[0] + b[4] * a[3] + b[5] * a[6];
        const c11 = b[3] * a[1] + b[4] * a[4] + b[5] * a[7];
        const c21 = b[3] * a[2] + b[4] * a[5] + b[5] * a[8];

        const c02 = b[6] * a[0] + b[7] * a[3] + b[8] * a[6];
        const c12 = b[6] * a[1] + b[7] * a[4] + b[8] * a[7];
        const c22 = b[6] * a[2] + b[7] * a[5] + b[8] * a[8];

        // prettier-ignore
        return out.set(
            c00, c01, c02,
            c10, c11, c12,
            c20, c21, c22
        );
    },

    multiplyScalar(out: Matrix3x3, a: Readonly<Matrix3x3>, scalar: number): Matrix3x3 {
        // prettier-ignore
        return out.set(
            a[0] * scalar, a[3] * scalar, a[6] * scalar,
            a[1] * scalar, a[4] * scalar, a[7] * scalar,
            a[2] * scalar, a[5] * scalar, a[8] * scalar
        );
    },
    // #endregion

    // #region Affine transformations
    translate(out: Matrix3x3, a: Readonly<Matrix3x3>, v: Readonly<Vector2>): Matrix3x3 {
        // prettier-ignore
        return out.set(
            a[0], a[3], v.x * a[0] + v.y * a[3] + a[6],
            a[1], a[4], v.x * a[1] + v.y * a[4] + a[7],
            a[2], a[5], v.x * a[2] + v.y * a[5] + a[8]
        );
    },

    rotate(out: Matrix3x3, a: Readonly<Matrix3x3>, rad: number): Matrix3x3 {
        const s = Math.sin(rad);
        const c = Math.cos(rad);

        // prettier-ignore
        return out.set(
            c * a[0] + s * a[3], c * a[3] - s * a[0], a[6],
            c * a[1] + s * a[4], c * a[4] - s * a[1], a[7],
            c * a[2] + s * a[5], c * a[5] - s * a[2], a[8]
        );
    },

    scale(out: Matrix3x3, a: Readonly<Matrix3x3>, v: Readonly<Vector2>): Matrix3x3 {
        // prettier-ignore
        return out.set(
            v.x * a[0], v.y * a[3], a[6],
            v.x * a[1], v.y * a[4], a[7],
            v.x * a[2], v.y * a[5], a[8]
        );
    },
    // #endregion
};