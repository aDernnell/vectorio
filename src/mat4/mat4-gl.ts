import { EPSILON } from '../utils';
import { Vec3, VEC3_UP, vec3Equals } from '../vec3';
import { Mat4, mat4Reset, mat4Set } from './mat4-core';

/**
 * Generates a frustum matrix with the given bounds.
 * The generated matrix transforms a left-handed view-space with +Z forward to clip space with 
 * normalized device coordinates in the range [-1, 1] (WebGL/OpenGL NDC).
 * 
 * @param out Matrix4x4 frustum matrix will be written to
 * @param left Left bound of the frustum
 * @param right Right bound of the frustum
 * @param bottom Bottom bound of the frustum
 * @param top Top bound of the frustum
 * @param near Near bound of the frustum
 * @param far Far bound of the frustum
 * @returns Matrix4x4 frustum matrix
 */
export function mat4Frustum(
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
    let fn = 1 / (far - near);

    // prettier-ignore
    return mat4Set(out,
        near * 2 * rl, 0, -(right + left) * rl, 0,
        0, near * 2 * tb, -(top + bottom) * tb, 0,
        0, 0, (far + near) * fn, -2 * far * near * fn,
        0, 0, 1, 0
    );
}


/**
 * Generates a 3D perspective projection matrix with the given bounds.
 * The generated matrix transforms a left-handed view-space with +Z forward to clip space with 
 * normalized device coordinates in the range [-1, 1] (WebGL/OpenGL NDC).
 * 
 * @param out Matrix4x4 perspective matrix will be written to
 * @param fovy Vertical field of view in radians
 * @param aspect Aspect ratio. typically viewport width/height
 * @param near Near bound of the frustum
 * @param far Far bound of the frustum, can be Infinity
 * @returns Matrix4x4 out
 */
export function mat4Perspective(out: Mat4, fovy: number, aspect: number, near: number, far: number): Mat4 {
    const f = 1.0 / Math.tan(fovy / 2);
    let m22, m23;
    if (far !== Infinity) {
        const fn = 1 / (far - near);
        m22 = (far + near) * fn;
        m23 = -2 * far * near * fn;
    } else {
        m22 = 1;
        m23 = -2 * near;
    }

    // prettier-ignore
    return mat4Set(out,
        f / aspect, 0, 0, 0,
        0, f, 0, 0,
        0, 0, m22, m23,
        0, 0, 1, 0
    );
}


/**
 * Generates a 3D orthogonal projection matrix with the given bounds.
 * The generated matrix transforms a left-handed view-space with +Z forward to clip space with
 * normalized device coordinates in the range [-1, 1] (WebGL/OpenGL NDC).
 * 
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
    const rl = 1 / (right - left);
    const tb = 1 / (top - bottom);
    const fn = 1 / (far - near);

    // prettier-ignore
    return mat4Set(out,
        2 * rl, 0, 0, -(left + right) * rl,
        0, 2 * tb, 0, -(top + bottom) * tb,
        0, 0, 2 * fn, -(far + near) * fn,
        0, 0, 0, 1
    );
}

/**
 * Generates a look-at matrix with the given eye (camera) position, focal point, and up axis.
 * The generated matrix transforms a left-handed world-space with +Z forward
 * to a left-handed view-space with +Z forward.
 * For a matrix that actually makes an object look at another object, use targetTo instead.
 *
 * @param out Matrix4x4 lookAt matrix will be written into
 * @param eye Position of the viewer
 * @param center Point the viewer is looking at
 * @param up vec3 world up, default is (0, 1, 0)
 * @returns Matrix4x4 out
 */
export function mat4LookAt(out: Mat4, eye: Readonly<Vec3>, center: Readonly<Vec3>, up: Readonly<Vec3> = VEC3_UP): Mat4 {
    let x0, x1, x2, y0, y1, y2, z0, z1, z2, len;

    if (vec3Equals(eye, center)) {
        return out; // preserve current matrix if eye and center are the same
    }

    // forward (left-handed convention: +Z forward)
    z0 = center.x - eye.x;
    z1 = center.y - eye.y;
    z2 = center.z - eye.z;

    // normalize forward
    len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;

    // right = up x forward
    x0 = up.y * z2 - up.z * z1;
    x1 = up.z * z0 - up.x * z2;
    x2 = up.x * z1 - up.y * z0;

    len = x0 * x0 + x1 * x1 + x2 * x2;
    if (len < EPSILON) {
        // up and forward are parallel or anti-parallel, so we need to choose a different vector.
        ({ x0, x1, x2 } = fallbackRight(z0, z1, z2));
    } else {
        // normalize right
        len = 1 / Math.sqrt(len);
        x0 *= len;
        x1 *= len;
        x2 *= len;
    }

    // correctedUp = forward x right
    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;

    // normalize up (cannot be zero because forward and right are not parallel due to previous checks)
    len = 1 / Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
    y0 *= len;
    y1 *= len;
    y2 *= len;

    // t = -dot(right, eye), -dot(up, eye), -dot(forward, eye)
    const tx = -(x0 * eye.x + x1 * eye.y + x2 * eye.z);
    const ty = -(y0 * eye.x + y1 * eye.y + y2 * eye.z);
    const tz = -(z0 * eye.x + z1 * eye.y + z2 * eye.z);

    // prettier-ignore
    return mat4Set(out,
        x0, x1, x2, tx,
        y0, y1, y2, ty,
        z0, z1, z2, tz,
        0, 0, 0, 1,
    );
}


/**
 * Generates a target-to matrix with the given source point, target point, and up axis.
 * The generated matrix can be used to orient an object so that its local forward axis points toward target
 * in a left-handed world-space with +Z forward.
 *
 * @param out Matrix4x4 targetTo matrix will be written into
 * @param source Position of the source
 * @param target Point the source is looking at
 * @param up vec3 normalized world up, default is (0, 1, 0)
 * @returns Matrix4x4 out
 */
export function mat4TargetTo(
    out: Mat4,
    source: Readonly<Vec3>,
    target: Readonly<Vec3>,
    up: Readonly<Vec3> = VEC3_UP,
): Mat4 {
    let len;

    if (vec3Equals(source, target)) {
        return mat4Reset(out);
    }

    // forward (left-handed convention: +Z forward)
    let z0 = target.x - source.x;
    let z1 = target.y - source.y;
    let z2 = target.z - source.z;

    // normalize forward
    len = z0 * z0 + z1 * z1 + z2 * z2;
    if (len > 0) {
        len = 1 / Math.sqrt(len);
        z0 *= len;
        z1 *= len;
        z2 *= len;
    }

    // right = up x forward
    let x0 = up.y * z2 - up.z * z1;
    let x1 = up.z * z0 - up.x * z2;
    let x2 = up.x * z1 - up.y * z0;

    len = x0 * x0 + x1 * x1 + x2 * x2;
    if (len < EPSILON) {
        // up and forward are parallel or anti-parallel, so we need to choose a different vector.
        ({ x0, x1, x2 } = fallbackRight(z0, z1, z2));
    } else {
        // normalize right
        len = 1 / Math.sqrt(len);
        x0 *= len;
        x1 *= len;
        x2 *= len;
    }

    // correctedUp = forward x right
    let y0 = z1 * x2 - z2 * x1;
    let y1 = z2 * x0 - z0 * x2;
    let y2 = z0 * x1 - z1 * x0;

    // columns = right, correctedUp, forward, source
    // prettier-ignore
    return mat4Set(
        out,
        x0, y0, z0, source.x,
        x1, y1, z1, source.y,
        x2, y2, z2, source.z,
        0, 0, 0, 1,
    );
}

/**
 * Choose an axis orthogonal to the forward vector (z0, z1, z2) to use as the right vector (x0, x1, x2).
 * The choosen vector is normalized.
 * (z0, z1, z2) is assumed to be normalized and non-zero.
 * This is a fallback method for when the up vector is parallel or anti-parallel to the forward vector 
 * for lookAt() and targetTo() functions.
 */
function fallbackRight(z0: number, z1: number, z2: number): { x0: number; x1: number; x2: number } {
    let x0, x1, x2, len;
    if (Math.abs(z0) <= Math.abs(z1) && Math.abs(z0) <= Math.abs(z2)) {
        x0 = 0;
        x1 = z2;
        x2 = -z1;
    } else if (Math.abs(z1) <= Math.abs(z2)) {
        x0 = -z2;
        x1 = 0;
        x2 = z0;
    } else {
        x0 = z1;
        x1 = -z0;
        x2 = 0;
    }
    // normalization
    len = 1 / Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
    x0 *= len;
    x1 *= len;
    x2 *= len;
    return { x0, x1, x2 };
}
