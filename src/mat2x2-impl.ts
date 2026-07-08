import { Matrix2x2 } from './matrix2x2';
import { Matrix3x3 } from './matrix3x3';
import { Matrix4x4 } from './matrix4x4';
import { Vector2 } from './vector2';

export const Mat2x2Impl = {

    fromMat(mat: Matrix3x3 | Matrix4x4): Matrix2x2 {
        if (mat instanceof Matrix3x3) {
            // prettier-ignore
            return new Matrix2x2(
                mat[0], mat[3],
                mat[1], mat[4]
            );
        } else if (mat instanceof Matrix4x4) {
            // prettier-ignore
            return new Matrix2x2(
                mat[0], mat[4],
                mat[1], mat[5]
            );
        } else {
            throw new Error('Invalid matrix type');
        }
    },

    fromArr(arr: Array<number>): Matrix2x2 {
        // prettier-ignore
        return new Matrix2x2(
            arr[0], arr[2],
            arr[1], arr[3]
        );
    },

    determinant(a: Readonly<Matrix2x2>): number {
        return a[0] * a[3] - a[1] * a[2];
    },

    frob(a: Readonly<Matrix2x2>): number {
        return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2] + a[3] * a[3]);
    },

    strictEquals(a: Readonly<Matrix2x2>, b: Readonly<Matrix2x2>): boolean {
        return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
    },

    equals(a: Readonly<Matrix2x2>, b: Readonly<Matrix2x2>, epsilon: number): boolean {
        return (
            Math.abs(a[0] - b[0]) <= epsilon &&
            Math.abs(a[1] - b[1]) <= epsilon &&
            Math.abs(a[2] - b[2]) <= epsilon &&
            Math.abs(a[3] - b[3]) <= epsilon
        );
    },

    stringify(a: Readonly<Matrix2x2>): string {
        return `mat2x2([${a.join(', ')}])`;
    },

    // #region Unary operations
    transpose(out: Matrix2x2, a: Readonly<Matrix2x2>): Matrix2x2 {
        // prettier-ignore
        return out.set(
            a[0], a[1],
            a[2], a[3]
        );
    },

    invert(out: Matrix2x2, a: Readonly<Matrix2x2>): Matrix2x2 | null {
        let det = a[0] * a[3] - a[1] * a[2];
        if (det == 0) {
            return null;
        }
        det = 1.0 / det;

        // prettier-ignore
        return out.set(
             a[3] * det, -a[2] * det,
            -a[1] * det,  a[0] * det
        );
    },

    adjoint(out: Matrix2x2, a: Readonly<Matrix2x2>): Matrix2x2 {
        // prettier-ignore
        return out.set(
             a[3], -a[2],
            -a[1],  a[0]
        );
    },
    // #endregion

    // #region Binary operations    
    add(out: Matrix2x2, a: Readonly<Matrix2x2>, b: Readonly<Matrix2x2>): Matrix2x2 {
        // prettier-ignore
        return out.set(
            a[0] + b[0], a[2] + b[2],
            a[1] + b[1], a[3] + b[3]
        );
    },

    subtract(out: Matrix2x2, a: Readonly<Matrix2x2>, b: Readonly<Matrix2x2>): Matrix2x2 {
        // prettier-ignore
        return out.set(
            a[0] - b[0], a[2] - b[2], 
            a[1] - b[1], a[3] - b[3]
        );
    },

    multiply(out: Matrix2x2, a: Readonly<Matrix2x2>, b: Readonly<Matrix2x2>): Matrix2x2 {
        // prettier-ignore
        return out.set(
            a[0] * b[0] + a[2] * b[1], a[0] * b[2] + a[2] * b[3], 
            a[1] * b[0] + a[3] * b[1], a[1] * b[2] + a[3] * b[3]
        );
    },

    multiplyScalar(out: Matrix2x2, a: Readonly<Matrix2x2>, scalar: number): Matrix2x2 {
        // prettier-ignore
        return out.set(
            a[0] * scalar, a[2] * scalar,
            a[1] * scalar, a[3] * scalar
        );
    },
    // #endregion

    // #region Affine transformations
    rotate(out: Matrix2x2, a: Readonly<Matrix2x2>, rad: number): Matrix2x2 {
        const s = Math.sin(rad);
        const c = Math.cos(rad);

        // prettier-ignore
        return out.set(
            a[0] * c + a[2] * s, a[2] * c - a[0] * s,
            a[1] * c + a[3] * s, a[3] * c - a[1] * s
        );
    },

    scale(out: Matrix2x2, a: Readonly<Matrix2x2>, v: Readonly<Vector2>): Matrix2x2 {
        // prettier-ignore
        return out.set(
            a[0] * v.x, a[2] * v.x,
            a[1] * v.y, a[3] * v.y
        );
    },
    // #endregion
};
