import { Mat3, mat3Set } from './mat3';
import { Mat4, mat4Reset, mat4Set } from './mat4';
import { Vec3, vec3Equals } from './vec3';

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

/**
 * Generates a frustum matrix with the given bounds
 * @param out Matrix4x4 frustum matrix will be written to
 * @param left Left bound of the frustum
 * @param right Right bound of the frustum
 * @param bottom Bottom bound of the frustum
 * @param top Top bound of the frustum
 * @param near Near bound of the frustum
 * @param far Far bound of the frustum
 * @returns Matrix4x4 frustum matrix
 */
export function mat4Frustrum(
    out: Mat4,
    left: number,
    right: number,
    bottom: number,
    top: number,
    near: number,
    far: number,
): Mat4 {
    let rl = 1 / (right - left);
    let tb = 1 / (top - bottom);
    let nf = 1 / (near - far);

    // prettier-ignore
    return mat4Set(out,
        near * 2 * rl, 0, 0, 0,
        0, near * 2 * tb, 0, 0,
        (right + left) * rl, (top + bottom) * tb, (far + near) * nf, -1,
        0, 0, far * near * 2 * nf, 0
    );
}

/**
 * Generates a 3D perspective projection matrix with the given bounds.
 * The near/far clip planes correspond to a normalized device coordinate Z range of [-1, 1],
 * which matches WebGL/OpenGL's clip volume.
 * Passing null/undefined/no value for far will generate infinite projection matrix.
 * @param out Matrix4x4 perspective matrix will be written to
 * @param fovy Vertical field of view in radians
 * @param aspect Aspect ratio. typically viewport width/height
 * @param near Near bound of the frustum
 * @param far Far bound of the frustum, can be null or Infinity
 * @returns Matrix4x4 out
 */
export function mat4Perspective(out: Mat4, fovy: number, aspect: number, near: number, far: number): Mat4 {
    const f = 1.0 / Math.tan(fovy / 2);
    let m22, m23;
    if (far != null && far !== Infinity) {
        const nf = 1 / (near - far);
        m22 = (far + near) * nf;
        m23 = 2 * far * near * nf;
    } else {
        m22 = -1;
        m23 = -2 * near;
    }
    // prettier-ignore
    return mat4Set(out,
        f / aspect, 0, 0, 0,
        0, f, 0, 0,
        0, 0, m22, -1,
        0, 0, m23, 0
    );
}

/**
 * Generates a 3D orthogonal projection matrix with the given bounds.
 * The near/far clip planes correspond to a normalized device coordinate Z range of [-1, 1],
 * which matches WebGL/OpenGL's clip volume.
 * @param out Matrix4x4 orthogonal matrix will be written to
 * @param left Left bound of the frustum
 * @param right Right bound of the frustum
 * @param bottom Bottom bound of the frustum
 * @param top Top bound of the frustum
 * @param near Near bound of the frustum
 * @param far Far bound of the frustum
 * @returns Matrix4x4 out
 */
export function mat4Ortho(
    out: Mat4,
    left: number,
    right: number,
    bottom: number,
    top: number,
    near: number,
    far: number,
): Mat4 {
    const lr = 1 / (left - right);
    const bt = 1 / (bottom - top);
    const nf = 1 / (near - far);
    // prettier-ignore
    return mat4Set(out,
        -2 * lr, 0, 0, 0,
        0, -2 * bt, 0, 0,
        0, 0, 2 * nf, 0,
        (left + right) * lr, (top + bottom) * bt, (far + near) * nf, 1
    );
}

/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis.
 * If you want a matrix that actually makes an object look at another object, you should use targetTo instead.
 *
 * @param out Matrix4x4 lookAt matrix will be written into
 * @param eye Position of the viewer
 * @param center Point the viewer is looking at
 * @param up vec3 pointing up
 * @returns Matrix4x4 out
 */
export function mat4LookAt(
    out: Mat4,
    eye: Readonly<Vec3>,
    center: Readonly<Vec3>,
    up: Readonly<Vec3>,
): Mat4 {
    let x0, x1, x2, y0, y1, y2, z0, z1, z2, len;

    if (vec3Equals(eye, center)) {
        return mat4Reset(out);
    }

    z0 = eye.x - center.x;
    z1 = eye.y - center.y;
    z2 = eye.z - center.z;

    len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;

    x0 = up.y * z2 - up.z * z1;
    x1 = up.z * z0 - up.x * z2;
    x2 = up.x * z1 - up.y * z0;
    len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
    if (!len) {
        x0 = 0;
        x1 = 0;
        x2 = 0;
    } else {
        len = 1 / len;
        x0 *= len;
        x1 *= len;
        x2 *= len;
    }

    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;

    len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
    if (!len) {
        y0 = 0;
        y1 = 0;
        y2 = 0;
    } else {
        len = 1 / len;
        y0 *= len;
        y1 *= len;
        y2 *= len;
    }

    // prettier-ignore
    return mat4Set(out,
        x0, y0, z0, 0,
        x1, y1, z1, 0,
        x2, y2, z2, 0,
        -(x0 * eye.x + x1 * eye.y + x2 * eye.z),
        -(y0 * eye.x + y1 * eye.y + y2 * eye.z),
        -(z0 * eye.x + z1 * eye.y + z2 * eye.z),
        1,
    );
}
