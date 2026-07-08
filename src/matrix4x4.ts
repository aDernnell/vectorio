import { Mat4x4Impl } from './mat4x4-impl';
import { Matrix2x2 } from './matrix2x2';
import { Matrix3x3 } from './matrix3x3';
import { EPSILON } from './utils';
import { Vector3 } from './vector3';

/**
 * Matrix4x4 stores values in column-major order:
 * ```
 * | m00  m01  m02  m03 |
 * | m10  m11  m12  m13 |
 * | m20  m21  m22  m23 |
 * | m30  m31  m32  m33 |
 * ```
 * layout = [m00, m10, m20, m30, m01, m11, m21, m31, m02, m12, m22, m32, m03, m13, m23, m33]
 *
 * Exemple for a 3D affine transformation matrix (translation only):
 * ```
 * | 1  0  0  tx |
 * | 0  1  0  ty |
 * | 0  0  1  tz |
 * | 0  0  0  1  |
 * ```
 * layout = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, tx, ty, tz, 1]
 */

export class Matrix4x4 extends Array<number> {
    // prettier-ignore
    static IDENTITY: Readonly<Matrix4x4> = new Matrix4x4(
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    );

    /**
     * Create a new 4x4 matrix.
     * Data is provided in row-major order, but stored in column-major order.
     * If no parameters are provided, the identity matrix is created.
     * ```
     * | m00  m01  m02  m03 |
     * | m10  m11  m12  m13 |
     * | m20  m21  m22  m23 |
     * | m30  m31  m32  m33 |
     * ```
     * @param m00 The value for the first row, first column.
     * @param m01 The value for the first row, second column.
     * @param m02 The value for the first row, third column.
     * @param m03 The value for the first row, fourth column.
     * @param m10 The value for the second row, first column.
     * @param m11 The value for the second row, second column.
     * @param m12 The value for the second row, third column.
     * @param m13 The value for the second row, fourth column.
     * @param m20 The value for the third row, first column.
     * @param m21 The value for the third row, second column.
     * @param m22 The value for the third row, third column.
     * @param m23 The value for the third row, fourth column.
     * @param m30 The value for the fourth row, first column.
     * @param m31 The value for the fourth row, second column.
     * @param m32 The value for the fourth row, third column.
     * @param m33 The value for the fourth row, fourth column.
     */
    // prettier-ignore
    constructor(
        m00: number = 1, m01: number = 0, m02: number = 0, m03: number = 0, // first row
        m10: number = 0, m11: number = 1, m12: number = 0, m13: number = 0, // second row
        m20: number = 0, m21: number = 0, m22: number = 1, m23: number = 0, // third row
        m30: number = 0, m31: number = 0, m32: number = 0, m33: number = 1 // fourth row
    ) {
        // prettier-ignore
        super(
            m00, m10, m20, m30, // first column
            m01, m11, m21, m31, // second column
            m02, m12, m22, m32, // third column
            m03, m13, m23, m33 // fourth column
        );
    }

    // #region mxx getters and setters
    /** [0] */
    get m00(): number {
        return this[0];
    }

    /** [0] */
    set m00(value: number) {
        this[0] = value;
    }

    /** [4] */
    get m01(): number {
        return this[4];
    }

    /** [4] */
    set m01(value: number) {
        this[4] = value;
    }

    /** [8] */
    get m02(): number {
        return this[8];
    }

    /** [8] */
    set m02(value: number) {
        this[8] = value;
    }

    /** [12] */
    get m03(): number {
        return this[12];
    }

    /** [12] */
    set m03(value: number) {
        this[12] = value;
    }

    /** [1] */
    get m10(): number {
        return this[1];
    }

    /** [1] */
    set m10(value: number) {
        this[1] = value;
    }

    /** [5] */
    get m11(): number {
        return this[5];
    }

    /** [5] */
    set m11(value: number) {
        this[5] = value;
    }

    /** [9] */
    get m12(): number {
        return this[9];
    }

    /** [9] */
    set m12(value: number) {
        this[9] = value;
    }

    /** [13] */
    get m13(): number {
        return this[13];
    }

    /** [13] */
    set m13(value: number) {
        this[13] = value;
    }

    /** [2] */
    get m20(): number {
        return this[2];
    }

    /** [2] */
    set m20(value: number) {
        this[2] = value;
    }

    /** [6] */
    get m21(): number {
        return this[6];
    }

    /** [6] */
    set m21(value: number) {
        this[6] = value;
    }

    /** [10] */
    get m22(): number {
        return this[10];
    }

    /** [10] */
    set m22(value: number) {
        this[10] = value;
    }

    /** [14] */
    get m23(): number {
        return this[14];
    }

    /** [14] */
    set m23(value: number) {
        this[14] = value;
    }

    /** [3] */
    get m30(): number {
        return this[3];
    }

    /** [3] */
    set m30(value: number) {
        this[3] = value;
    }

    /** [7] */
    get m31(): number {
        return this[7];
    }

    /** [7] */
    set m31(value: number) {
        this[7] = value;
    }

    /** [11] */
    get m32(): number {
        return this[11];
    }

    /** [11] */
    set m32(value: number) {
        this[11] = value;
    }

    /** [15] */
    get m33(): number {
        return this[15];
    }

    /** [15] */
    set m33(value: number) {
        this[15] = value;
    }
    // #endregion

    /**
     * Creates a copy of this matrix.
     * @returns A new matrix with the same components.
     */
    clone(): Matrix4x4 {
        return Mat4x4Impl.fromArr(this);
    }

    /**
     * Sets the values of this matrix.
     * Data is provided in row-major order, but stored in column-major order.
     * @param m00 The value for the first row, first column.
     * @param m01 The value for the first row, second column.
     * @param m02 The value for the first row, third column.
     * @param m03 The value for the first row, fourth column.
     * @param m10 The value for the second row, first column.
     * @param m11 The value for the second row, second column.
     * @param m12 The value for the second row, third column.
     * @param m13 The value for the second row, fourth column.
     * @param m20 The value for the third row, first column.
     * @param m21 The value for the third row, second column.
     * @param m22 The value for the third row, third column.
     * @param m23 The value for the third row, fourth column.
     * @param m30 The value for the fourth row, first column.
     * @param m31 The value for the fourth row, second column.
     * @param m32 The value for the fourth row, third column.
     * @param m33 The value for the fourth row, fourth column.
     */
    // prettier-ignore
    set(
        m00: number, m01: number, m02: number, m03: number, // first row
        m10: number, m11: number, m12: number, m13: number, // second row
        m20: number, m21: number, m22: number, m23: number, // third row
        m30: number, m31: number, m32: number, m33: number // fourth row
    ): Matrix4x4 {
        this[0] = m00;
        this[1] = m10;
        this[2] = m20;
        this[3] = m30;
        this[4] = m01;
        this[5] = m11;
        this[6] = m21;
        this[7] = m31;
        this[8] = m02;
        this[9] = m12;
        this[10] = m22;
        this[11] = m32;
        this[12] = m03;
        this[13] = m13;
        this[14] = m23;
        this[15] = m33;
        return this;
    }

    /**
     * Fills this matrix with the values from another matrix.
     * @param other The matrix to copy values from.
     * @returns this
     */
    fillWith(other: Matrix4x4): Matrix4x4 {
        // prettier-ignore
        return this.set(
            other[0], other[4], other[8], other[12], 
            other[1], other[5], other[9], other[13], 
            other[2], other[6], other[10], other[14], 
            other[3], other[7], other[11], other[15]
        );
    }

    /**
     * Inplace transposes this matrix.
     * @returns this
     */
    transpose(): Matrix4x4 {
        return Mat4x4Impl.transpose(this, this);
    }

    /**
     * Inplace inverts this matrix if invertible, otherwise throws an error.
     * @returns this
     */
    invert(): Matrix4x4 {
        const result = Mat4x4Impl.invert(this, this);
        if(result === null) {
            throw new Error('Matrix is not invertible');
        }
        return result;
    }

    /**
     * Inplace transforms this matrix into its adjugate matrix.
     * @returns this
     */
    adjoint(): Matrix4x4 {
        return Mat4x4Impl.adjoint(this, this);
    }

    /**
     * Inplace adds another matrix to this matrix.
     * @param other Matrix to add.
     * @returns this
     */
    add(other: Matrix4x4): Matrix4x4 {
        return Mat4x4Impl.add(this, this, other);
    }

    /**
     * Inplace subtracts another matrix from this matrix.
     * @param other Matrix to subtract.
     * @returns this
     */
    subtract(other: Matrix4x4): Matrix4x4 {
        return Mat4x4Impl.subtract(this, this, other);
    }

    /**
     * Inplace multiplies this matrix by another matrix.
     * @param other Matrix to multiply by.
     * @returns this
     */
    multiply(other: Matrix4x4): Matrix4x4 {
        return Mat4x4Impl.multiply(this, this, other);
    }

    /**
     * Inplace multiplies this matrix by a scalar.
     * @param scalar Scale factor.
     * @returns this
     */
    multiplyScalar(scalar: number): Matrix4x4 {
        return Mat4x4Impl.multiplyScalar(this, this, scalar);
    }

    /**
     * Inplace translates this matrix.
     * @param v Translation vector.
     * @returns this
     */
    translate(v: Readonly<Vector3>): Matrix4x4 {
        return Mat4x4Impl.translate(this, this, v);
    }

    /**
     * Inplace rotates this matrix or throws an error if the axis is degenerate.
     * @param axis Rotation axis.
     * @param rad Rotation in radians.
     * @returns this
     */
    rotate(axis: Readonly<Vector3>, rad: number): Matrix4x4 {
        const result = Mat4x4Impl.rotate(this, this, axis, rad);
        if(result === null) {
            throw new Error('Rotation axis is degenerate');
        }
        return result;
    }

    /**
     * Inplace scales this matrix.
     * @param v Scale vector.
     * @returns this
     */
    scale(v: Readonly<Vector3>): Matrix4x4 {
        return Mat4x4Impl.scale(this, this, v);
    }

    /**
     * Determinant of this matrix.
     * @returns determinant of this matrix
     */
    determinant(): number {
        return Mat4x4Impl.determinant(this);
    }

    /**
     * Frobenius norm of this matrix.
     * @returns The Frobenius norm of this matrix.
     */
    frob(): number {
        return Mat4x4Impl.frob(this);
    }

    /**
     * Checks if this matrix is strictly equal to another matrix.
     * @param other The matrix to compare with.
     * @returns true if strictly equal, false otherwise.
     */
    strictEquals(other: Matrix4x4): boolean {
        return Mat4x4Impl.strictEquals(this, other);
    }

    /**
     * Checks approximate equality with another matrix.
     * @param other The matrix to compare with.
     * @param epsilon The tolerance for comparison.
     * @returns true if equal within epsilon, false otherwise.
     */
    equals(other: Matrix4x4, epsilon: number = EPSILON): boolean {
        return Mat4x4Impl.equals(this, other, epsilon);
    }

    /**
     * Returns a stable string representation of this matrix.
     * @returns String representation.
     */
    toString(): string {
        return Mat4x4Impl.stringify(this);
    }

    // #region static functions
    /**
     * Creates a new identity matrix.
     * @returns A new identity matrix.
     */
    static identity(): Matrix4x4 {
        return new Matrix4x4();
    }

    /**
     * Creates a 4x4 matrix from a 2x2 or 3x3 matrix.
     * @param mat Source matrix.
     * @returns The created matrix.
     */
    static fromMat(mat: Matrix2x2 | Matrix3x3): Matrix4x4 {
        return Mat4x4Impl.fromMat(mat);
    }

    /**
     * Creates a 4x4 matrix from a column-major array.
     * @param arr Source array.
     * @returns The created matrix.
     */
    static fromArr(arr: Array<number>): Matrix4x4 {
        return Mat4x4Impl.fromArr(arr);
    }

    /**
     * Transposes a matrix.
     * @param out Receiving matrix.
     * @param a Source matrix.
     * @returns The receiving matrix.
     */
    static transpose(out: Matrix4x4, a: Readonly<Matrix4x4>): Matrix4x4 {
        return Mat4x4Impl.transpose(out, a);
    }

    /**
     * Inverts a matrix.
     * @param out Receiving matrix.
     * @param a Source matrix.
     * @returns The receiving matrix or null if not invertible.
     */
    static invert(out: Matrix4x4, a: Readonly<Matrix4x4>): Matrix4x4 | null {
        return Mat4x4Impl.invert(out, a);
    }

    /**
     * Computes an adjugate matrix.
     * @param out Receiving matrix.
     * @param a Source matrix.
     * @returns The receiving matrix.
     */
    static adjoint(out: Matrix4x4, a: Readonly<Matrix4x4>): Matrix4x4 {
        return Mat4x4Impl.adjoint(out, a);
    }

    /**
     * Adds two matrices.
     * @param out Receiving matrix.
     * @param a First operand.
     * @param b Second operand.
     * @returns The receiving matrix.
     */
    static add(out: Matrix4x4, a: Readonly<Matrix4x4>, b: Readonly<Matrix4x4>): Matrix4x4 {
        return Mat4x4Impl.add(out, a, b);
    }

    /**
     * Subtracts matrix b from matrix a.
     * @param out Receiving matrix.
     * @param a First operand.
     * @param b Second operand.
     * @returns The receiving matrix.
     */
    static subtract(out: Matrix4x4, a: Readonly<Matrix4x4>, b: Readonly<Matrix4x4>): Matrix4x4 {
        return Mat4x4Impl.subtract(out, a, b);
    }

    /**
     * Multiplies two matrices.
     * @param out Receiving matrix.
     * @param a First operand.
     * @param b Second operand.
     * @returns The receiving matrix.
     */
    static multiply(out: Matrix4x4, a: Readonly<Matrix4x4>, b: Readonly<Matrix4x4>): Matrix4x4 {
        return Mat4x4Impl.multiply(out, a, b);
    }

    /**
     * Multiplies a matrix by a scalar.
     * @param out Receiving matrix.
     * @param a Source matrix.
     * @param scalar Scale factor.
     * @returns The receiving matrix.
     */
    static multiplyScalar(out: Matrix4x4, a: Readonly<Matrix4x4>, scalar: number): Matrix4x4 {
        return Mat4x4Impl.multiplyScalar(out, a, scalar);
    }

    /**
     * Translates a matrix.
     * @param out Receiving matrix.
     * @param a Source matrix.
     * @param v Translation vector.
     * @returns The receiving matrix.
     */
    static translate(out: Matrix4x4, a: Readonly<Matrix4x4>, v: Readonly<Vector3>): Matrix4x4 {
        return Mat4x4Impl.translate(out, a, v);
    }

    /**
     * Rotates a matrix around an axis.
     * @param out Receiving matrix.
     * @param a Source matrix.
     * @param axis Rotation axis.
     * @param rad Rotation in radians.
     * @returns The receiving matrix or null if axis is degenerate.
     */
    static rotate(out: Matrix4x4, a: Readonly<Matrix4x4>, axis: Readonly<Vector3>, rad: number): Matrix4x4 | null {
        return Mat4x4Impl.rotate(out, a, axis, rad);
    }

    /**
     * Scales a matrix by a vector.
     * @param out Receiving matrix.
     * @param a Source matrix.
     * @param v Scale vector.
     * @returns The receiving matrix.
     */
    static scale(out: Matrix4x4, a: Readonly<Matrix4x4>, v: Readonly<Vector3>): Matrix4x4 {
        return Mat4x4Impl.scale(out, a, v);
    }
    // #endregion
}

// alias for convenience
export const Mat4x4 = Matrix4x4;