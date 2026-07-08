import { Mat2x2Impl } from './mat2x2-impl';
import { Matrix3x3 } from './matrix3x3';
import { Matrix4x4 } from './matrix4x4';
import { EPSILON } from './utils';
import { Vector2 } from './vector2';

/**
 * Matrix2x2 stores values in column-major order:
 * ```
 * | m00  m01 |
 * | m10  m11 |
 * ```
 * layout = [m00, m10, m01, m11]
 *
 * Exemple for a rotation matrix:
 * ```
 * | cos  -sin |
 * | sin   cos |
 * ```
 * layout = [cos, sin, -sin, cos]
 */
export class Matrix2x2 extends Array<number> {
    // prettier-ignore
    static IDENTITY: Readonly<Matrix2x2> = new Matrix2x2(
        1, 0,
        0, 1
    );

    /**
     * Creates a new 2x2 matrix.
     * Data is provided in row-major order, but stored in column-major order.
     * If no parameters are provided, the identity matrix is created.
     * ```
     * | m00  m01 |
     * | m10  m11 |
     * ```
     * @param m00 The value for the first row, first column.
     * @param m01 The value for the first row, second column.
     * @param m10 The value for the second row, first column.
     * @param m11 The value for the second row, second column.
     */
    // prettier-ignore
    constructor(
        m00: number = 1, m01: number = 0, // first row
        m10: number = 0, m11: number = 1 // second row
    ) {
        // prettier-ignore
        super(
            m00, m10, // first column
            m01, m11  // second column
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

    /** [2] */
    get m01(): number {
        return this[2];
    }
    /** [2] */
    set m01(value: number) {
        this[2] = value;
    }

    /** [1] */
    get m10(): number {
        return this[1];
    }

    /** [1] */
    set m10(value: number) {
        this[1] = value;
    }

    /** [3] */
    get m11(): number {
        return this[3];
    }

    /** [3] */
    set m11(value: number) {
        this[3] = value;
    }
    // #endregion

    /**
     * Creates a copy of this matrix.
     * @returns A new matrix with the same components.
     */
    clone(): Matrix2x2 {
        return Mat2x2Impl.fromArr(this);
    }

    /**
     * Sets the values of this matrix.
     * Data is provided in row-major order, but stored in column-major order.
     * @param m00 The value for the first row, first column.
     * @param m01 The value for the first row, second column.
     * @param m10 The value for the second row, first column.
     * @param m11 The value for the second row, second column.
     * @returns this
     */
    // prettier-ignore
    set(
        m00: number, m01: number, // first row
        m10: number, m11: number // second row
    ): Matrix2x2 {
        this[0] = m00;
        this[1] = m10;
        this[2] = m01;
        this[3] = m11;
        return this;
    }

    /**
     * Fills this matrix with the values from another matrix.
     * @param other The matrix to copy values from.
     * @returns this
     */
    fillWith(other: Matrix2x2): Matrix2x2 {
        // prettier-ignore
        return this.set(
            other[0], other[2], 
            other[1], other[3]
        );
    }

    /**
     * Inplace transposes this matrix.
     * @returns this
     */
    transpose(): Matrix2x2 {
        return Mat2x2Impl.transpose(this, this);
    }

    /**
     * Inplace inverts this matrix if invertible, otherwise throw an error.
     * @returns this
     */
    invert(): Matrix2x2 {
        const result = Mat2x2Impl.invert(this, this);
        if(result === null) {
            throw new Error('Matrix is not invertible');
        }
        return result;
    }

    /**
     * Inplace transform this matrix to its adjugate (adjoint) matrix.
     * @returns this
     */
    adjoint(): Matrix2x2 {
        return Mat2x2Impl.adjoint(this, this);
    }

    /**
     * Inplace adds another matrix to this matrix.
     * @param other The matrix to add.
     * @returns this
     */
    add(other: Matrix2x2): Matrix2x2 {
        return Mat2x2Impl.add(this, this, other);
    }

    /**
     * Inplace subtracts another matrix from this matrix.
     * @param other The matrix to subtract.
     * @returns this
     */
    subtract(other: Matrix2x2): Matrix2x2 {
        return Mat2x2Impl.subtract(this, this, other);
    }

    /**
     * Inplace multiplies this matrix by another matrix.
     * @param other The matrix to multiply by.
     * @returns this
     */
    multiply(other: Matrix2x2): Matrix2x2 {
        return Mat2x2Impl.multiply(this, this, other);
    }

    /**
     * Inplace multiplies this matrix by a scalar value.
     * @param scalar The number to multiply by.
     * @returns this
     */
    multiplyScalar(scalar: number): Matrix2x2 {
        return Mat2x2Impl.multiplyScalar(this, this, scalar);
    }

    /**
     * Inplace rotates this matrix by a given angle in radians.
     * @param rad The angle to rotate by in radians.
     * @returns this
     */
    rotate(rad: number): Matrix2x2 {
        return Mat2x2Impl.rotate(this, this, rad);
    }

    /**
     * Inplace scales the matrix by the dimensions in the given vector.
     * @param v The vector to scale the matrix by.
     * @returns this
     */
    scale(v: Readonly<Vector2>): Matrix2x2 {
        return Mat2x2Impl.scale(this, this, v);
    }

    /**
     * Determinant of this matrix.
     * @returns determinant of this matrix
     */
    determinant(): number {
        return Mat2x2Impl.determinant(this);
    }

    /**
     * Frobenius norm of this matrix.
     * @returns The Frobenius norm of this matrix.
     */
    frob(): number {
        return Mat2x2Impl.frob(this);
    }

    /**
     * Checks if this matrix is strictly equal to another matrix.
     * @param other The matrix to compare with.
     * @returns true if the matrices are strictly equal, false otherwise.
     */
    strictEquals(other: Matrix2x2): boolean {
        return Mat2x2Impl.strictEquals(this, other);
    }

    /**
     * Checks if this matrix is approximately equal to another matrix within a given epsilon.
     * @param other The matrix to compare with.
     * @param epsilon The tolerance for the comparison.
     * @returns true if the matrices are approximately equal, false otherwise.
     */
    equals(other: Matrix2x2, epsilon: number = EPSILON): boolean {
        return Mat2x2Impl.equals(this, other, epsilon);
    }

    /**
     * Returns a stable string representation of this matrix.
     * @returns String representation.
     */
    toString(): string {
        return Mat2x2Impl.stringify(this);
    }

    // #region static functions
    /**
     * Creates a new identity matrix.
     * @returns A new identity matrix.
     */
    static identity(): Matrix2x2 {
        return new Matrix2x2();
    }

    /**
     * Creates a 2x2 matrix from a 3x3 or 4x4 matrix.
     * @param mat Source matrix.
     * @returns The created matrix.
     */
    static fromMat(mat: Matrix3x3 | Matrix4x4): Matrix2x2 {
        return Mat2x2Impl.fromMat(mat);
    }

    /**
     * Creates a 2x2 matrix from a column-major array.
     * @param arr Source array.
     * @returns The created matrix.
     */
    static fromArr(arr: Array<number>): Matrix2x2 {
        return Mat2x2Impl.fromArr(arr);
    }

    /**
     * Transposes a matrix.
     * @param out Receiving matrix.
     * @param a Source matrix.
     * @returns The receiving matrix.
     */
    static transpose(out: Matrix2x2, a: Readonly<Matrix2x2>): Matrix2x2 {
        return Mat2x2Impl.transpose(out, a);
    }

    /**
     * Inverts a matrix.
     * @param out Receiving matrix.
     * @param a Source matrix.
     * @returns The receiving matrix or null if not invertible.
     */
    static invert(out: Matrix2x2, a: Readonly<Matrix2x2>): Matrix2x2 | null {
        return Mat2x2Impl.invert(out, a);
    }

    /**
     * Computes the adjoint matrix.
     * @param out Receiving matrix.
     * @param a Source matrix.
     * @returns The receiving matrix.
     */
    static adjoint(out: Matrix2x2, a: Readonly<Matrix2x2>): Matrix2x2 {
        return Mat2x2Impl.adjoint(out, a);
    }

    /**
     * Adds two matrices.
     * @param out Receiving matrix.
     * @param a First operand.
     * @param b Second operand.
     * @returns The receiving matrix.
     */
    static add(out: Matrix2x2, a: Readonly<Matrix2x2>, b: Readonly<Matrix2x2>): Matrix2x2 {
        return Mat2x2Impl.add(out, a, b);
    }

    /**
     * Subtracts matrix b from matrix a.
     * @param out Receiving matrix.
     * @param a First operand.
     * @param b Second operand.
     * @returns The receiving matrix.
     */
    static subtract(out: Matrix2x2, a: Readonly<Matrix2x2>, b: Readonly<Matrix2x2>): Matrix2x2 {
        return Mat2x2Impl.subtract(out, a, b);
    }

    /**
     * Multiplies two matrices.
     * @param out Receiving matrix.
     * @param a First operand.
     * @param b Second operand.
     * @returns The receiving matrix.
     */
    static multiply(out: Matrix2x2, a: Readonly<Matrix2x2>, b: Readonly<Matrix2x2>): Matrix2x2 {
        return Mat2x2Impl.multiply(out, a, b);
    }

    /**
     * Multiplies a matrix by a scalar.
     * @param out Receiving matrix.
     * @param a Source matrix.
     * @param scalar Scale factor.
     * @returns The receiving matrix.
     */
    static multiplyScalar(out: Matrix2x2, a: Readonly<Matrix2x2>, scalar: number): Matrix2x2 {
        return Mat2x2Impl.multiplyScalar(out, a, scalar);
    }

    /**
     * Rotates a matrix.
     * @param out Receiving matrix.
     * @param a Source matrix.
     * @param rad Rotation in radians.
     * @returns The receiving matrix.
     */
    static rotate(out: Matrix2x2, a: Readonly<Matrix2x2>, rad: number): Matrix2x2 {
        return Mat2x2Impl.rotate(out, a, rad);
    }

    /**
     * Scales a matrix by a vector.
     * @param out Receiving matrix.
     * @param a Source matrix.
     * @param v Scale vector.
     * @returns The receiving matrix.
     */
    static scale(out: Matrix2x2, a: Readonly<Matrix2x2>, v: Readonly<Vector2>): Matrix2x2 {
        return Mat2x2Impl.scale(out, a, v);
    }
    // #endregion
}

// alias for convenience
export const Mat2x2 = Matrix2x2;