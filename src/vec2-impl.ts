import { round } from './utils';
import { Vector2 } from './vector2';

export const Vec2Impl = {
    from(...values: [number, number] | [Array<number>]): Vector2 {
        if (values.length === 2) {
            return new Vector2(values[0], values[1]);
        } else if (Array.isArray(values[0]) && values[0].length >= 2) {
            return new Vector2(values[0][0], values[0][1]);
        }
        throw new Error('Invalid arguments for Vec2.from. Expected two numbers or an array of at least two numbers.');
    },

    magnitude: (a: Readonly<Vector2>): number => {
        return Math.hypot(a[0], a[1]);
    },

    squaredMagnitude: (a: Readonly<Vector2>): number => {
        return a[0] * a[0] + a[1] * a[1];
    },

    strictEquals: (a: Readonly<Vector2>, b: Readonly<Vector2>): boolean => {
        return a[0] === b[0] && a[1] === b[1];
    },

    equals: (a: Readonly<Vector2>, b: Readonly<Vector2>, epsilon: number): boolean => {
        return Math.abs(a[0] - b[0]) <= epsilon && Math.abs(a[1] - b[1]) <= epsilon;
    },

    stringify: (a: Readonly<Vector2>): string => {
        return `vec2([${a.join(", ")}])`;
    },

    add: (out: Vector2, a: Readonly<Vector2>, b: Readonly<Vector2>): Vector2 => {
        return out.set(a[0] + b[0], a[1] + b[1]);
    },

    subtract: (out: Vector2, a: Readonly<Vector2>, b: Readonly<Vector2>): Vector2 => {
        return out.set(a[0] - b[0], a[1] - b[1]);
    },

    multiply: (out: Vector2, a: Readonly<Vector2>, b: Readonly<Vector2>): Vector2 => {
        return out.set(a[0] * b[0], a[1] * b[1]);
    },

    divide: (out: Vector2, a: Readonly<Vector2>, b: Readonly<Vector2>): Vector2 => {
        return out.set(a[0] / b[0], a[1] / b[1]);
    },

    ceil: (out: Vector2, a: Readonly<Vector2>): Vector2 => {
        return out.set(Math.ceil(a[0]), Math.ceil(a[1]));
    },

    floor: (out: Vector2, a: Readonly<Vector2>): Vector2 => {
        return out.set(Math.floor(a[0]), Math.floor(a[1]));
    },

    round: (out: Vector2, a: Readonly<Vector2>): Vector2 => {
        return out.set(round(a[0]), round(a[1]));
    },

    scale: (out: Vector2, a: Readonly<Vector2>, scalar: number): Vector2 => {
        return out.set(a[0] * scalar, a[1] * scalar);
    },

    rotate: (out: Vector2, a: Readonly<Vector2>, origin: Readonly<Vector2>, angleRad: number): Vector2 => {
        const cos = Math.cos(angleRad);
        const sin = Math.sin(angleRad);
        const x = a[0] - origin[0];
        const y = a[1] - origin[1];
        return out.set(origin[0] + x * cos - y * sin, origin[1] + x * sin + y * cos);
    },

    negate: (out: Vector2, a: Readonly<Vector2>): Vector2 => {
        return out.set(-a[0], -a[1]);
    },

    inverse: (out: Vector2, a: Readonly<Vector2>): Vector2 => {
        return out.set(1 / a[0], 1 / a[1]);
    },

    normalize: (out: Vector2, a: Readonly<Vector2>): Vector2 => {
        const x = a[0];
        const y = a[1];
        let len = x * x + y * y;
        if (len === 0) {
            return out.set(0, 0);
        }
        len = 1 / Math.sqrt(len);
        return out.set(x * len, y * len);
    },

    distance: (a: Readonly<Vector2>, b: Readonly<Vector2>): number => {
        const x = b[0] - a[0];
        const y = b[1] - a[1];
        return Math.sqrt(x * x + y * y);
    },

    squaredDistance: (a: Readonly<Vector2>, b: Readonly<Vector2>): number => {
        const x = b[0] - a[0];
        const y = b[1] - a[1];
        return x * x + y * y;
    },

    dot: (a: Readonly<Vector2>, b: Readonly<Vector2>): number => {
        return a[0] * b[0] + a[1] * b[1];
    },

    cross: (a: Readonly<Vector2>, b: Readonly<Vector2>): number => {
        return a[0] * b[1] - a[1] * b[0];
    },

    lerp: (out: Vector2, a: Readonly<Vector2>, b: Readonly<Vector2>, t: number): Vector2 => {
        return out.set(a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1]));
    },

    angle(a: Readonly<Vector2>, b: Readonly<Vector2>): number {
        let ax = a[0],
            ay = a[1],
            bx = b[0],
            by = b[1];
        return Math.abs(Math.atan2(ay * bx - ax * by, ax * bx + ay * by));
    },
    
    signedAngle(from: Readonly<Vector2>, to: Readonly<Vector2>): number {
        let ax = from[0],
            ay = from[1],
            bx = to[0],
            by = to[1];
        return Math.atan2(ax * by - ay * bx, ax * bx + ay * by);
    },
};
