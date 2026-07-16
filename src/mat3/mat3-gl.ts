import { Mat3, mat3Set } from './mat3-core';

/**
 * Generates a 2D projection matrix with the given bounds
 * @param out Matrix3x3 projection matrix will be written to
 * @param width Width of your gl context
 * @param height Height of gl context
 * @returns Matrix3x3 projection matrix
 */
export function mat3Projection(out: Mat3, width: number, height: number): Mat3 {
    // prettier-ignore
    return mat3Set(out,
        2 / width, 0, 0,
        0, -2 / height, 0,
        -1, 1, 1
    );
}
