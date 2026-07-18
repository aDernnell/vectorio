import { vec4Magnitude, vec4SquaredMagnitude } from "../vec4";
import { Quat } from "./quat-core";

/**
 * Calculates the magnitude (length) of a quat.
 * 
 * @remarks
 * Same as vec4Magnitude(a).
 * 
 * @param a The quaternion to calculate the magnitude of.
 * @returns The magnitude of the quaternion.
 */
export function quatMagnitude(a: Readonly<Quat>): number {
    return vec4Magnitude(a);
}

/**
 * Calculates the squared magnitude (length) of a quat.
 * 
 * @remarks
 * Same as vec4SquaredMagnitude(a).
 * 
 * @param a The quaternion to calculate the squared magnitude of.
 * @returns The squared magnitude of the quaternion.
 */
export function quatSquaredMagnitude(a: Readonly<Quat>): number {
    return vec4SquaredMagnitude(a);
}
