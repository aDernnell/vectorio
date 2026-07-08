import { EPSILON } from './utils';
import { Vec2Impl } from './vec2-impl';

export class Vector2 extends Array<number> {
    static ZERO: Readonly<Vector2> = new Vector2(0, 0);
    static ONE: Readonly<Vector2> = new Vector2(1, 1);
    static RIGHT: Readonly<Vector2> = new Vector2(1, 0);
    static LEFT: Readonly<Vector2> = new Vector2(-1, 0);
    static UP: Readonly<Vector2> = new Vector2(0, 1);
    static DOWN: Readonly<Vector2> = new Vector2(0, -1);

    constructor(x: number = 0, y: number = 0) {
        super(x, y);
    }

    get x() {
        return this[0];
    }
    set x(value: number) {
        this[0] = value;
    }

    get y() {
        return this[1];
    }
    set y(value: number) {
        this[1] = value;
    }

    /**
     * Create a new Vec2 with the same values as this one.
     */
    clone(): Vector2 {
        return Vec2Impl.from(this);
    }

    /**
     * Sets the components of the vector.
     * @param x The x component.
     * @param y The y component.
     * @returns This vector after setting the components.
     */
    set(x: number, y: number): Vector2 {
        this[0] = x;
        this[1] = y;
        return this;
    }

    /**
     * The magnitude (length) of the vector.
     */
    magnitude(): number {
        return Vec2Impl.magnitude(this);
    }

    /**
     * The squared magnitude (length) of the vector.
     */
    squaredMagnitude(): number {
        return Vec2Impl.squaredMagnitude(this);
    }

    /**
     * Inplace addition of another vector to this one.
     * @param v The vector to add.
     * @returns This vector after addition.
     */
    add(v: Readonly<Vector2>): Vector2 {
        return Vec2Impl.add(this, this, v);
    }

    /**
     * Inplace subtraction of another vector from this one.
     * @param v The vector to subtract.
     * @returns This vector after subtraction.
     */
    subtract(v: Readonly<Vector2>): Vector2 {
        return Vec2Impl.subtract(this, this, v);
    }

    /**
     * Inplace multiplication of this vector by another vector.
     * @param v The vector to multiply by.
     * @returns This vector after multiplication.
     */
    multiply(v: Readonly<Vector2>): Vector2 {
        return Vec2Impl.multiply(this, this, v);
    }

    /**
     * Inplace division of this vector by another vector.
     * @param v The vector to divide by.
     * @returns This vector after division.
     */
    divide(v: Readonly<Vector2>): Vector2 {
        return Vec2Impl.divide(this, this, v);
    }

    /**
     * Inplace scaling of this vector by a scalar value.
     * @param scalar The number to scale by.
     * @returns This vector after scaling.
     */
    scale(scalar: number): Vector2 {
        return Vec2Impl.scale(this, this, scalar);
    }

    /**
     * Inplace rotation of this vector around a given origin by a specified angle in radians.
     * @param origin The point around which to rotate.
     * @param angleRad The angle in radians to rotate by.
     * @returns This vector after rotation.
     */
    rotate(origin: Vector2, angleRad: number): Vector2 {
        return Vec2Impl.rotate(this, this, origin, angleRad);
    }

    /**
     * Inplace negation of this vector.
     * @returns This vector after negation.
     */
    negated(): Vector2 {
        return Vec2Impl.negate(this, this);
    }

    /**
     * Inplace inversion of this vector.
     * @returns This vector after inversion.
     */
    inversed(): Vector2 {
        return Vec2Impl.inverse(this, this);
    }

    /**
     * Inplace normalisation of this vector.
     * @returns This vector after normalisation.
     */
    normalised(): Vector2 {
        return Vec2Impl.normalize(this, this);
    }

    /**
     * Checks if this vector is strictly equal to another vector.
     * @param v The vector to compare with.
     * @returns True if the vectors are equal, false otherwise.
     */
    strictEquals(v: Readonly<Vector2>): boolean {
        return Vec2Impl.strictEquals(this, v);
    }

    /**
     * Checks if this vector is equal to another vector within a given epsilon.
     * @param v The vector to compare with.
     * @param epsilon The tolerance for comparison.
     * @returns True if the vectors are almost equal, false otherwise.
     */
    equals(v: Readonly<Vector2>, epsilon: number = EPSILON): boolean {
        return Vec2Impl.equals(this, v, epsilon);
    }

    /**
     * Returns a string representation of the vector.
     */
    toString(): string {
        return Vec2Impl.stringify(this);
    }

    // #region static functions
    /**
     * Creates a vector from an array of numbers or from two numbers.
     * @param values Input components.
     * @returns The created vector.
     */
    static fromValues(...values: [number, number] | [Array<number>]): Vector2 {
        return Vec2Impl.from(...values);
    }

    /**
     * Add two vectors and store the result in out.
     * @param out The receiving vector.
     * @param a The first operand.
     * @param b The second operand.
     * @returns The receiving vector.
     */
    static add(out: Vector2, a: Readonly<Vector2>, b: Readonly<Vector2>): Vector2 {
        return Vec2Impl.add(out, a, b);
    }

    /**
     * Subtract two vectors and store the result in out.
     * @param out The receiving vector.
     * @param a The first operand.
     * @param b The second operand.
     * @returns The receiving vector.
     */
    static subtract(out: Vector2, a: Readonly<Vector2>, b: Readonly<Vector2>): Vector2 {
        return Vec2Impl.subtract(out, a, b);
    }

    /**
     * Multiply two vectors and store the result in out.
     * @param out The receiving vector.
     * @param a The first operand.
     * @param b The second operand.
     * @returns The receiving vector.
     */
    static multiply(out: Vector2, a: Readonly<Vector2>, b: Readonly<Vector2>): Vector2 {
        return Vec2Impl.multiply(out, a, b);
    }

    /**
     * Divide two vectors and store the result in out.
     * @param out The receiving vector.
     * @param a The first operand.
     * @param b The second operand.
     * @returns The receiving vector.
     */
    static divide(out: Vector2, a: Readonly<Vector2>, b: Readonly<Vector2>): Vector2 {
        return Vec2Impl.divide(out, a, b);
    }

    /**
     * Ceil the components of a vector and store the result in out.
     * @param out The receiving vector.
     * @param a The vector to ceil.
     * @returns The receiving vector.
     */
    static ceil(out: Vector2, a: Readonly<Vector2>): Vector2 {
        return Vec2Impl.ceil(out, a);
    }

    /**
     * Floor the components of a vector and store the result in out.
     * @param out The receiving vector.
     * @param a The vector to floor.
     * @returns The receiving vector.
     */
    static floor(out: Vector2, a: Readonly<Vector2>): Vector2 {
        return Vec2Impl.floor(out, a);
    }

    /**
     * Symmetrically rounds the components of a vector to the nearest integer and stores the result in out.
     * @param out The receiving vector.
     * @param a The vector to round.
     * @returns The receiving vector.
     */
    static round(out: Vector2, a: Readonly<Vector2>): Vector2 {
        return Vec2Impl.round(out, a);
    }

    /**
     * Scale the components of a vector by a scalar value and store the result in out.
     * @param out The receiving vector.
     * @param a The vector to scale.
     * @param scalar The scalar value to scale by.
     * @returns The receiving vector.
     */
    static scale(out: Vector2, a: Readonly<Vector2>, scalar: number): Vector2 {
        return Vec2Impl.scale(out, a, scalar);
    }

    /**
     * Rotates a vector around a given origin by a specified angle in radians and stores the result in out.
     * @param out The receiving vector.
     * @param a The vector to rotate.
     * @param origin The origin around which to rotate.
     * @param angleRad The angle in radians to rotate.
     * @returns The receiving vector.
     */
    static rotate(out: Vector2, a: Readonly<Vector2>, origin: Readonly<Vector2>, angleRad: number): Vector2 {
        return Vec2Impl.rotate(out, a, origin, angleRad);
    }

    /**
     * Negates the components of a vector and stores the result in out.
     * @param out The receiving vector.
     * @param a The vector to negate.
     * @returns The receiving vector.
     */
    static negate(out: Vector2, a: Readonly<Vector2>): Vector2 {
        return Vec2Impl.negate(out, a);
    }

    /**
     * Inverses the components of a vector and stores the result in out.
     * @param out The receiving vector.
     * @param a The vector to inverse.
     * @returns The receiving vector.
     */
    static inverse(out: Vector2, a: Readonly<Vector2>): Vector2 {
        return Vec2Impl.inverse(out, a);
    }

    /**
     * Normalizes the components of a vector and stores the result in out.
     * @param out The receiving vector.
     * @param a The vector to normalize.
     * @returns The receiving vector.
     */
    static normalize(out: Vector2, a: Readonly<Vector2>): Vector2 {
        return Vec2Impl.normalize(out, a);
    }

    /**
     * Calculates the distance between two vectors.
     * @param a The first vector.
     * @param b The second vector.
     * @returns The distance between the two vectors.
     */
    static distance(a: Readonly<Vector2>, b: Readonly<Vector2>): number {
        return Vec2Impl.distance(a, b);
    }

    /**
     * Calculates the squared distance between two vectors.
     * @param a The first vector.
     * @param b The second vector.
     * @returns The squared distance between the two vectors.
     */
    static squaredDistance(a: Readonly<Vector2>, b: Readonly<Vector2>): number {
        return Vec2Impl.squaredDistance(a, b);
    }

    /**
     * Calculates the dot product of two vectors.
     * @param a The first vector.
     * @param b The second vector.
     * @returns The dot product of the two vectors.
     */
    static dot(a: Readonly<Vector2>, b: Readonly<Vector2>): number {
        return Vec2Impl.dot(a, b);
    }

    /**
     * Calculates the cross product of two vectors.
     * @param a The first vector.
     * @param b The second vector.
     * @returns The cross product of the two vectors.
     */
    static cross(a: Readonly<Vector2>, b: Readonly<Vector2>): number {
        return Vec2Impl.cross(a, b);
    }

    /**
     * Performs a linear interpolation between two vectors.
     * @param out The receiving vector.
     * @param a The first vector.
     * @param b The second vector.
     * @param t The interpolation factor.
     * @returns The receiving vector.
     */
    static lerp(out: Vector2, a: Readonly<Vector2>, b: Readonly<Vector2>, t: number): Vector2 {
        return Vec2Impl.lerp(out, a, b, t);
    }

    /**
     * Get the smallest angle between two 2D vectors
     * @param a The first vector
     * @param b The second vector
     * @returns The angle in radians
     */
    static angle(a: Readonly<Vector2>, b: Readonly<Vector2>): number {
        return Vec2Impl.angle(a, b);
    }

    /**
     * Get the signed angle in the interval [-pi,pi] between two 2D vectors
     * The angle returned is the signed counterclockwise angle between the two vectors.
     * @param from The first vector, origin of the angle
     * @param to The second vector, destination of the angle
     * @returns The signed angle in radians
     */
    static signedAngle(from: Readonly<Vector2>, to: Readonly<Vector2>): number {
        return Vec2Impl.signedAngle(from, to);
    }
    // #endregion
}

// alias for convenience
export const Vec2 = Vector2;