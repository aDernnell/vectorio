import { Mat3x3Impl } from './mat3x3-impl';
import { Matrix2x2 } from './matrix2x2';
import { Matrix4x4 } from './matrix4x4';
import { EPSILON } from './utils';
import { Vector2 } from './vector2';

/**
 * Matrix3x3 stores values in column-major order:
 * ```
 * | m00  m01  m02 |
 * | m10  m11  m12 |
 * | m20  m21  m22 |
 * ```
 * layout = [m00, m10, m20, m01, m11, m21, m02, m12, m22]
 *
 *
 * Exemple for a 2D affine transformation matrix (translation only):
 * ```
 * | 1  0  tx |
 * | 0  1  ty |
 * | 0  0  1  |
 * ```
 * layout = [1, 0, 0, 0, 1, 0, tx, ty, 1]
 */
export class Matrix3x3 extends Array<number> {
    // prettier-ignore
    static IDENTITY: Readonly<Matrix3x3> = new Matrix3x3(
        1, 0, 0,
        0, 1, 0,
        0, 0, 1
    );

    /**
     * Creates a new 3x3 matrix.
     * Data is provided in row-major order, but stored in column-major order.
     * If no parameters are provided, the identity matrix is created.
     * ```
     * | m00  m01  m02 |
     * | m10  m11  m12 |
     * | m20  m21  m22 |
     * ```
     * @param m00 The value for the first row, first column.
     * @param m01 The value for the first row, second column.
     * @param m02 The value for the first row, third column.
     * @param m10 The value for the second row, first column.
     * @param m11 The value for the second row, second column.
     * @param m12 The value for the second row, third column.
     * @param m20 The value for the third row, first column.
     * @param m21 The value for the third row, second column.
     * @param m22 The value for the third row, third column.
     */
    // prettier-ignore
    constructor(
        m00: number = 1, m01: number = 0, m02: number = 0,
        m10: number = 0, m11: number = 1, m12: number = 0,
        m20: number = 0, m21: number = 0, m22: number = 1
    ) {
        // prettier-ignore
        super(
            m00, m10, m20, // first column
            m01, m11, m21, // second column
            m02, m12, m22  // third column
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

    /** [3] */
    get m01(): number {
        return this[3];
    }

    /** [3] */
    set m01(value: number) {
        this[3] = value;
    }

    /** [6] */
    get m02(): number {
        return this[6];
    }

    /** [6] */
    set m02(value: number) {
        this[6] = value;
    }

    /** [1] */
    get m10(): number {
        return this[1];
    }

    /** [1] */
    set m10(value: number) {
        this[1] = value;
    }

    /** [4] */
    get m11(): number {
        return this[4];
    }

    /** [4] */
    set m11(value: number) {
        this[4] = value;
    }

    /** [7] */
    get m12(): number {
        return this[7];
    }

    /** [7] */
    set m12(value: number) {
        this[7] = value;
    }

    /** [2] */
    get m20(): number {
        return this[2];
    }

    /** [2] */
    set m20(value: number) {
        this[2] = value;
    }

    /** [5] */
    get m21(): number {
        return this[5];
    }

    /** [5] */
    set m21(value: number) {
        this[5] = value;
    }

    /** [8] */
    get m22(): number {
        return this[8];
    }

    /** [8] */
    set m22(value: number) {
        this[8] = value;
    }
    // #endregion

    /**
     * Creates a copy of this matrix.
     * @returns A new matrix with the same components.
     */
    clone(): Matrix3x3 {
        return Mat3x3Impl.fromArr(this);
    }

    /**
     * Sets the values of this matrix.
     * Data is provided in row-major order, but stored in column-major order.
     * @param m00 The value for the first row, first column.
     * @param m01 The value for the first row, second column.
     * @param m02 The value for the first row, third column.
     * @param m10 The value for the second row, first column.
     * @param m11 The value for the second row, second column.
     * @param m12 The value for the second row, third column.
     * @param m20 The value for the third row, first column.
     * @param m21 The value for the third row, second column.
     * @param m22 The value for the third row, third column.
     * @returns this
     */
    // prettier-ignore
    set(
        m00: number, m01: number, m02: number, // first row
        m10: number, m11: number, m12: number, // second row
        m20: number, m21: number, m22: number // third row
    ): Matrix3x3 {
        this[0] = m00;
        this[1] = m10;
        this[2] = m20;
        this[3] = m01;
        this[4] = m11;
        this[5] = m21;
        this[6] = m02;
        this[7] = m12;
        this[8] = m22;
        return this;
    }

    /**
     * Fills this matrix with the values from another matrix.
     * @param other The matrix to copy values from.
     * @returns this
     */
    fillWith(other: Matrix3x3): Matrix3x3 {
        // prettier-ignore
        return this.set(
            other[0], other[3], other[6],
            other[1], other[4], other[7],
            other[2], other[5], other[8]
        );
    }

    /**
     * Inplace transposes this matrix.
     * @returns this
     */
    transpose(): Matrix3x3 {
        return Mat3x3Impl.transpose(this, this);
    }

    /**
     * Inplace inverts this matrix if invertible, otherwise throws an error.
     * @returns this
     */
    invert(): Matrix3x3 {
        const result = Mat3x3Impl.invert(this, this);
        if(result === null) {
            throw new Error('Matrix is not invertible');
        }
        return result;
    }

    /**
     * Inplace transforms this matrix into its adjugate matrix.
     * @returns this
     */
    adjoint(): Matrix3x3 {
        return Mat3x3Impl.adjoint(this, this);
    }

    /**
     * Inplace adds another matrix to this matrix.
     * @param other Matrix to add.
     * @returns this
     */
    add(other: Matrix3x3): Matrix3x3 {
        return Mat3x3Impl.add(this, this, other);
    }

    /**
     * Inplace subtracts another matrix from this matrix.
     * @param other Matrix to subtract.
     * @returns this
     */
    subtract(other: Matrix3x3): Matrix3x3 {
        return Mat3x3Impl.subtract(this, this, other);
    }

    /**
     * Inplace multiplies this matrix by another matrix.
     * @param other Matrix to multiply by.
     * @returns this
     */
    multiply(other: Matrix3x3): Matrix3x3 {
        return Mat3x3Impl.multiply(this, this, other);
    }

    /**
     * Inplace multiplies this matrix by a scalar.
     * @param scalar Scale factor.
     * @returns this
     */
    multiplyScalar(scalar: number): Matrix3x3 {
        return Mat3x3Impl.multiplyScalar(this, this, scalar);
    }

    /**
     * Inplace translates this matrix.
     * @param v Translation vector.
     * @returns this
     */
    translate(v: Readonly<Vector2>): Matrix3x3 {
        return Mat3x3Impl.translate(this, this, v);
    }

    /**
     * Inplace rotates this matrix.
     * @param rad Rotation in radians.
     * @returns this
     */
    rotate(rad: number): Matrix3x3 {
        return Mat3x3Impl.rotate(this, this, rad);
    }

    /**
     * Inplace scales this matrix.
     * @param v Scale vector.
     * @returns this
     */
    scale(v: Readonly<Vector2>): Matrix3x3 {
        return Mat3x3Impl.scale(this, this, v);
    }

    /**
     * Determinant of this matrix.
     * @returns determinant of this matrix
     */
    determinant(): number {
        return Mat3x3Impl.determinant(this);
    }

    /**
     * Frobenius norm of this matrix.
     * @returns The Frobenius norm of this matrix.
     */
    frob(): number {
        return Mat3x3Impl.frob(this);
    }

    /**
     * Checks if this matrix is strictly equal to another matrix.
     * @param other The matrix to compare with.
     * @returns true if strictly equal, false otherwise.
     */
    strictEquals(other: Matrix3x3): boolean {
        return Mat3x3Impl.strictEquals(this, other);
    }

    /**
     * Checks approximate equality with another matrix.
     * @param other The matrix to compare with.
     * @param epsilon The tolerance for comparison.
     * @returns true if equal within epsilon, false otherwise.
     */
    equals(other: Matrix3x3, epsilon: number = EPSILON): boolean {
        return Mat3x3Impl.equals(this, other, epsilon);
    }

    /**
     * Returns a stable string representation of this matrix.
     * @returns String representation.
     */
    toString(): string {
        return Mat3x3Impl.stringify(this);
    }

    // #region static functions
    /**
     * Creates a new identity matrix.
     * @returns A new identity matrix.
     */
    static identity(): Matrix3x3 {
        return new Matrix3x3();
    }

    /**
     * Creates a 3x3 matrix from a 2x2 or 4x4 matrix.
     * @param mat Source matrix.
     * @returns The created matrix.
     */
    static fromMat(mat: Matrix2x2 | Matrix4x4): Matrix3x3 {
        return Mat3x3Impl.fromMat(mat);
    }

    /**
     * Creates a 3x3 matrix from a column-major array.
     * @param arr Source array.
     * @returns The created matrix.
     */
    static fromArr(arr: Array<number>): Matrix3x3 {
        return Mat3x3Impl.fromArr(arr);
    }

    /**
     * Transposes a matrix.
     * @param out Receiving matrix.
     * @param a Source matrix.
     * @returns The receiving matrix.
     */
    static transpose(out: Matrix3x3, a: Readonly<Matrix3x3>): Matrix3x3 {
        return Mat3x3Impl.transpose(out, a);
    }

    /**
     * Inverts a matrix.
     * @param out Receiving matrix.
     * @param a Source matrix.
     * @returns The receiving matrix or null if not invertible.
     */
    static invert(out: Matrix3x3, a: Readonly<Matrix3x3>): Matrix3x3 | null {
        return Mat3x3Impl.invert(out, a);
    }

    /**
     * Computes an adjugate matrix.
     * @param out Receiving matrix.
     * @param a Source matrix.
     * @returns The receiving matrix.
     */
    static adjoint(out: Matrix3x3, a: Readonly<Matrix3x3>): Matrix3x3 {
        return Mat3x3Impl.adjoint(out, a);
    }

    /**
     * Adds two matrices.
     * @param out Receiving matrix.
     * @param a First operand.
     * @param b Second operand.
     * @returns The receiving matrix.
     */
    static add(out: Matrix3x3, a: Readonly<Matrix3x3>, b: Readonly<Matrix3x3>): Matrix3x3 {
        return Mat3x3Impl.add(out, a, b);
    }

    /**
     * Subtracts matrix b from matrix a.
     * @param out Receiving matrix.
     * @param a First operand.
     * @param b Second operand.
     * @returns The receiving matrix.
     */
    static subtract(out: Matrix3x3, a: Readonly<Matrix3x3>, b: Readonly<Matrix3x3>): Matrix3x3 {
        return Mat3x3Impl.subtract(out, a, b);
    }

    /**
     * Multiplies two matrices.
     * @param out Receiving matrix.
     * @param a First operand.
     * @param b Second operand.
     * @returns The receiving matrix.
     */
    static multiply(out: Matrix3x3, a: Readonly<Matrix3x3>, b: Readonly<Matrix3x3>): Matrix3x3 {
        return Mat3x3Impl.multiply(out, a, b);
    }

    /**
     * Multiplies a matrix by a scalar.
     * @param out Receiving matrix.
     * @param a Source matrix.
     * @param scalar Scale factor.
     * @returns The receiving matrix.
     */
    static multiplyScalar(out: Matrix3x3, a: Readonly<Matrix3x3>, scalar: number): Matrix3x3 {
        return Mat3x3Impl.multiplyScalar(out, a, scalar);
    }

    /**
     * Translates a matrix.
     * @param out Receiving matrix.
     * @param a Source matrix.
     * @param v Translation vector.
     * @returns The receiving matrix.
     */
    static translate(out: Matrix3x3, a: Readonly<Matrix3x3>, v: Readonly<Vector2>): Matrix3x3 {
        return Mat3x3Impl.translate(out, a, v);
    }

    /**
     * Rotates a matrix.
     * @param out Receiving matrix.
     * @param a Source matrix.
     * @param rad Rotation in radians.
     * @returns The receiving matrix.
     */
    static rotate(out: Matrix3x3, a: Readonly<Matrix3x3>, rad: number): Matrix3x3 {
        return Mat3x3Impl.rotate(out, a, rad);
    }

    /**
     * Scales a matrix by a vector.
     * @param out Receiving matrix.
     * @param a Source matrix.
     * @param v Scale vector.
     * @returns The receiving matrix.
     */
    static scale(out: Matrix3x3, a: Readonly<Matrix3x3>, v: Readonly<Vector2>): Matrix3x3 {
        return Mat3x3Impl.scale(out, a, v);
    }
    // #endregion
}

// alias for convenience
export const Mat3x3 = Matrix3x3;