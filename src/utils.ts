
export const EPSILON = 1e-6;
export const HALF_PI = Math.PI / 2;

/**
 * Symmetric round:
 * - half-up rounding mode for positive values
 * - half-down rounding mode for negative values
 * see https://github.com/DiscoNova/symmetric-round
 * @param value The number to round.
 * @returns The rounded integer.
 */
export function round(value: number): number {
    if (value >= 0) return Math.round(value);

    return value % 0.5 === 0 ? Math.floor(value) : Math.round(value);
}

/**
 * Clamps a value between a minimum and maximum value.
 * @param value The value to clamp.
 * @param min The minimum value.
 * @param max The maximum value.
 * @returns The clamped value.
 */
export function clamp(value: number, min: number, max: number) {
    return Math.max(Math.min(value, max), min);
}

/**
 * Linearly interpolates between two values.
 * @param a The start value.
 * @param b The end value.
 * @param t The interpolation factor (0 to 1).
 * @returns The interpolated value.
 */
export function lerp(a: number, b: number, t: number) {
    return a + (b - a) * t;
}
