import { Mat2, mat2Set } from './mat2-core';

/**
 * Adds two 2x2 matrices.
 * @param out The matrix to store the result in.
 * @param a The first matrix to add.
 * @param b The second matrix to add.
 * @returns The out matrix with the result of the addition.
 */
export function mat2Add(out: Mat2, a: Readonly<Mat2>, b: Readonly<Mat2>): Mat2 {
	// prettier-ignore
	return mat2Set(
		out,
		a.m00 + b.m00, a.m01 + b.m01,
		a.m10 + b.m10, a.m11 + b.m11
	);
}

/**
 * Subtracts one 2x2 matrix from another.
 * @param out The matrix to store the result in.
 * @param a The matrix to subtract from.
 * @param b The matrix to subtract.
 * @returns The out matrix with the result of the subtraction.
 */
export function mat2Subtract(out: Mat2, a: Readonly<Mat2>, b: Readonly<Mat2>): Mat2 {
	// prettier-ignore
	return mat2Set(
		out,
		a.m00 - b.m00, a.m01 - b.m01,
		a.m10 - b.m10, a.m11 - b.m11
	);
}

/**
 * Multiplies two 2x2 matrices.
 * @param out The matrix to store the result in.
 * @param a The first matrix to multiply.
 * @param b The second matrix to multiply.
 * @returns The out matrix with the result of the multiplication.
 */
export function mat2Multiply(out: Mat2, a: Readonly<Mat2>, b: Readonly<Mat2>): Mat2 {
	// prettier-ignore
	return mat2Set(
		out,
		a.m00 * b.m00 + a.m01 * b.m10, a.m00 * b.m01 + a.m01 * b.m11,
		a.m10 * b.m00 + a.m11 * b.m10, a.m10 * b.m01 + a.m11 * b.m11
	);
}

/**
 * Multiplies a 2x2 matrix by a scalar.
 * @param out The matrix to store the result in.
 * @param a The matrix to multiply.
 * @param scalar The scalar to multiply by.
 * @returns The out matrix with the result of the multiplication.
 */
export function mat2MultiplyScalar(out: Mat2, a: Readonly<Mat2>, scalar: number): Mat2 {
	// prettier-ignore
	return mat2Set(
		out,
		a.m00 * scalar, a.m01 * scalar,
		a.m10 * scalar, a.m11 * scalar
	);
}
