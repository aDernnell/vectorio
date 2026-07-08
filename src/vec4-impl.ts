import { round } from './utils';
import { Vector4 } from './vector4';

export const Vec4Impl = {
    from(...values: [number, number, number, number] | [Array<number>]): Vector4 {
        if (values.length === 4) {
            return new Vector4(values[0], values[1], values[2], values[3]);
        } else if (Array.isArray(values[0]) && values[0].length >= 4) {
            return new Vector4(values[0][0], values[0][1], values[0][2], values[0][3]);
        }
        throw new Error('Invalid arguments for Vec4.from. Expected four numbers or an array of at least four numbers.');
    },

    magnitude: (a: Readonly<Vector4>): number => {
        return Math.hypot(a[0], a[1], a[2], a[3]);
    },

    squaredMagnitude: (a: Readonly<Vector4>): number => {
        return a[0] * a[0] + a[1] * a[1] + a[2] * a[2] + a[3] * a[3];
    },

    strictEquals: (a: Readonly<Vector4>, b: Readonly<Vector4>): boolean => {
        return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
    },

    equals: (a: Readonly<Vector4>, b: Readonly<Vector4>, epsilon: number): boolean => {
        return (
            Math.abs(a[0] - b[0]) <= epsilon &&
            Math.abs(a[1] - b[1]) <= epsilon &&
            Math.abs(a[2] - b[2]) <= epsilon &&
            Math.abs(a[3] - b[3]) <= epsilon
        );
    },

    stringify: (a: Readonly<Vector4>): string => {
        return `vec4([${a.join(', ')}])`;
    },

    add: (out: Vector4, a: Readonly<Vector4>, b: Readonly<Vector4>): Vector4 => {
        return out.set(a[0] + b[0], a[1] + b[1], a[2] + b[2], a[3] + b[3]);
    },

    subtract: (out: Vector4, a: Readonly<Vector4>, b: Readonly<Vector4>): Vector4 => {
        return out.set(a[0] - b[0], a[1] - b[1], a[2] - b[2], a[3] - b[3]);
    },

    multiply: (out: Vector4, a: Readonly<Vector4>, b: Readonly<Vector4>): Vector4 => {
        return out.set(a[0] * b[0], a[1] * b[1], a[2] * b[2], a[3] * b[3]);
    },

    divide: (out: Vector4, a: Readonly<Vector4>, b: Readonly<Vector4>): Vector4 => {
        return out.set(a[0] / b[0], a[1] / b[1], a[2] / b[2], a[3] / b[3]);
    },

    ceil: (out: Vector4, a: Readonly<Vector4>): Vector4 => {
        return out.set(Math.ceil(a[0]), Math.ceil(a[1]), Math.ceil(a[2]), Math.ceil(a[3]));
    },

    floor: (out: Vector4, a: Readonly<Vector4>): Vector4 => {
        return out.set(Math.floor(a[0]), Math.floor(a[1]), Math.floor(a[2]), Math.floor(a[3]));
    },

    round: (out: Vector4, a: Readonly<Vector4>): Vector4 => {
        return out.set(round(a[0]), round(a[1]), round(a[2]), round(a[3]));
    },

    scale: (out: Vector4, a: Readonly<Vector4>, scalar: number): Vector4 => {
        return out.set(a[0] * scalar, a[1] * scalar, a[2] * scalar, a[3] * scalar);
    },

    negate: (out: Vector4, a: Readonly<Vector4>): Vector4 => {
        return out.set(-a[0], -a[1], -a[2], -a[3]);
    },

    inverse: (out: Vector4, a: Readonly<Vector4>): Vector4 => {
        return out.set(1 / a[0], 1 / a[1], 1 / a[2], 1 / a[3]);
    },

    normalize: (out: Vector4, a: Readonly<Vector4>): Vector4 => {
        const x = a[0];
        const y = a[1];
        const z = a[2];
        const w = a[3];
        let len = x * x + y * y + z * z + w * w;
        if (len === 0) {
            return out.set(0, 0, 0, 0);
        }
        len = 1 / Math.sqrt(len);
        return out.set(x * len, y * len, z * len, w * len);
    },

    distance: (a: Readonly<Vector4>, b: Readonly<Vector4>): number => {
        const x = b[0] - a[0];
        const y = b[1] - a[1];
        const z = b[2] - a[2];
        const w = b[3] - a[3];
        return Math.sqrt(x * x + y * y + z * z + w * w);
    },

    squaredDistance: (a: Readonly<Vector4>, b: Readonly<Vector4>): number => {
        const x = b[0] - a[0];
        const y = b[1] - a[1];
        const z = b[2] - a[2];
        const w = b[3] - a[3];
        return x * x + y * y + z * z + w * w;
    },

    dot: (a: Readonly<Vector4>, b: Readonly<Vector4>): number => {
        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
    },
    
    lerp: (out: Vector4, a: Readonly<Vector4>, b: Readonly<Vector4>, t: number): Vector4 => {
        return out.set(
            a[0] + t * (b[0] - a[0]),
            a[1] + t * (b[1] - a[1]),
            a[2] + t * (b[2] - a[2]),
            a[3] + t * (b[3] - a[3]),
        );
    },

    angle: (a: Readonly<Vector4>, b: Readonly<Vector4>): number => {
        const mag = a.magnitude() * b.magnitude();
        if (mag === 0) {
            return 0;
        }
        const cosine = Math.min(Math.max(Vec4Impl.dot(a, b) / mag, -1), 1);
        return Math.acos(cosine);
    },
};
