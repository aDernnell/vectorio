import { round } from './utils';
import { Vector3 } from './vector3';

export const Vec3Impl = {
    from(...values: [number, number, number] | [Array<number>]): Vector3 {
        if (values.length === 3) {
            return new Vector3(values[0], values[1], values[2]);
        } else if (Array.isArray(values[0]) && values[0].length >= 3) {
            return new Vector3(values[0][0], values[0][1], values[0][2]);
        }
        throw new Error(
            'Invalid arguments for Vec3.from. Expected three numbers or an array of at least three numbers.',
        );
    },

    magnitude: (a: Readonly<Vector3>): number => {
        return Math.hypot(a[0], a[1], a[2]);
    },

    squaredMagnitude: (a: Readonly<Vector3>): number => {
        return a[0] * a[0] + a[1] * a[1] + a[2] * a[2];
    },

    strictEquals: (a: Readonly<Vector3>, b: Readonly<Vector3>): boolean => {
        return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
    },

    equals: (a: Readonly<Vector3>, b: Readonly<Vector3>, epsilon: number): boolean => {
        return (
            Math.abs(a[0] - b[0]) <= epsilon &&
            Math.abs(a[1] - b[1]) <= epsilon &&
            Math.abs(a[2] - b[2]) <= epsilon
        );
    },

    stringify: (a: Readonly<Vector3>): string => {
        return `vec3([${a.join(", ")}])`;
    },

    add: (out: Vector3, a: Readonly<Vector3>, b: Readonly<Vector3>): Vector3 => {
        return out.set(a[0] + b[0], a[1] + b[1], a[2] + b[2]);
    },

    subtract: (out: Vector3, a: Readonly<Vector3>, b: Readonly<Vector3>): Vector3 => {
        return out.set(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
    },

    multiply: (out: Vector3, a: Readonly<Vector3>, b: Readonly<Vector3>): Vector3 => {
        return out.set(a[0] * b[0], a[1] * b[1], a[2] * b[2]);
    },

    divide: (out: Vector3, a: Readonly<Vector3>, b: Readonly<Vector3>): Vector3 => {
        return out.set(a[0] / b[0], a[1] / b[1], a[2] / b[2]);
    },

    ceil: (out: Vector3, a: Readonly<Vector3>): Vector3 => {
        return out.set(Math.ceil(a[0]), Math.ceil(a[1]), Math.ceil(a[2]));
    },

    floor: (out: Vector3, a: Readonly<Vector3>): Vector3 => {
        return out.set(Math.floor(a[0]), Math.floor(a[1]), Math.floor(a[2]));
    },

    round: (out: Vector3, a: Readonly<Vector3>): Vector3 => {
        return out.set(round(a[0]), round(a[1]), round(a[2]));
    },

    scale: (out: Vector3, a: Readonly<Vector3>, scalar: number): Vector3 => {
        return out.set(a[0] * scalar, a[1] * scalar, a[2] * scalar);
    },

    negate: (out: Vector3, a: Readonly<Vector3>): Vector3 => {
        return out.set(-a[0], -a[1], -a[2]);
    },

    inverse: (out: Vector3, a: Readonly<Vector3>): Vector3 => {
        return out.set(1 / a[0], 1 / a[1], 1 / a[2]);
    },

    normalize: (out: Vector3, a: Readonly<Vector3>): Vector3 => {
        const x = a[0];
        const y = a[1];
        const z = a[2];
        let len = x * x + y * y + z * z;
        if (len === 0) {
            return out.set(0, 0, 0);
        }
        len = 1 / Math.sqrt(len);
        return out.set(x * len, y * len, z * len);
    },

    distance: (a: Readonly<Vector3>, b: Readonly<Vector3>): number => {
        const x = b[0] - a[0];
        const y = b[1] - a[1];
        const z = b[2] - a[2];
        return Math.sqrt(x * x + y * y + z * z);
    },

    squaredDistance: (a: Readonly<Vector3>, b: Readonly<Vector3>): number => {
        const x = b[0] - a[0];
        const y = b[1] - a[1];
        const z = b[2] - a[2];
        return x * x + y * y + z * z;
    },

    dot: (a: Readonly<Vector3>, b: Readonly<Vector3>): number => {
        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    },

    cross: (out: Vector3, a: Readonly<Vector3>, b: Readonly<Vector3>): Vector3 => {
        const ax = a[0];
        const ay = a[1];
        const az = a[2];
        const bx = b[0];
        const by = b[1];
        const bz = b[2];

        return out.set(ay * bz - az * by, az * bx - ax * bz, ax * by - ay * bx);
    },

    lerp: (out: Vector3, a: Readonly<Vector3>, b: Readonly<Vector3>, t: number): Vector3 => {
        return out.set(a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1]), a[2] + t * (b[2] - a[2]));
    },
    
    angle: (a: Readonly<Vector3>, b: Readonly<Vector3>): number => {
        const mag = a.magnitude() * b.magnitude();
        if (mag === 0) {
            return 0;
        }
        const cosine = Math.min(Math.max(Vec3Impl.dot(a, b) / mag, -1), 1);
        return Math.acos(cosine);
    },
};
