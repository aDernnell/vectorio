import type { Quat } from './quat-core';
import type { Mat3 } from '../mat3';
import type { Mat4 } from '../mat4';
import { mat3, mat3FillTrunc } from '../mat3';

/**
 * Fills a quaternion with the rotation represented by a 3x3 rotation matrix.
 * @param out The output quaternion.
 * @param mat The 3x3 rotation matrix.
 * @returns The output quaternion with values set to represent the rotation.
 */
export function quatFillMat3(out: Quat, mat: Readonly<Mat3>): Quat {
    const m00 = mat.m00, m01 = mat.m01, m02 = mat.m02;
    const m10 = mat.m10, m11 = mat.m11, m12 = mat.m12;
    const m20 = mat.m20, m21 = mat.m21, m22 = mat.m22;
    const trace = m00 + m11 + m22;
    if (trace > 0) { // |w| > 1/2
        const s = 0.5 / Math.sqrt(trace + 1.0); // 1/(4w)
        out.w = 0.25 / s;
        out.x = (m21 - m12) * s;
        out.y = (m02 - m20) * s;
        out.z = (m10 - m01) * s;
    } else if (m00 > m11 && m00 > m22) {
        const s = 2.0 * Math.sqrt(1.0 + m00 - m11 - m22);
        out.w = (m21 - m12) / s;
        out.x = 0.25 * s;
        out.y = (m01 + m10) / s;
        out.z = (m02 + m20) / s;
    } else if (m11 > m22) {
        const s = 2.0 * Math.sqrt(1.0 + m11 - m00 - m22);
        out.w = (m02 - m20) / s;
        out.x = (m01 + m10) / s;
        out.y = 0.25 * s;
        out.z = (m12 + m21) / s;
    } else {
        const s = 2.0 * Math.sqrt(1.0 + m22 - m00 - m11);
        out.w = (m10 - m01) / s;
        out.x = (m02 + m20) / s;
        out.y = (m12 + m21) / s;
        out.z = 0.25 * s;
    }
    return out;
}

/**
 * Fills a quaternion with the rotation represented by a 4x4 rotation matrix.
 * @param out The output quaternion.
 * @param mat The 4x4 rotation matrix.
 * @returns The output quaternion with values set to represent the rotation.
 */
export function quatFillMat4(out: Quat, mat: Readonly<Mat4>): Quat {
    return quatFillMat3(out, mat3FillTrunc(mat3(), mat));
}