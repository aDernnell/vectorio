import { EPSILON } from './utils';
import { Vec4Impl } from './vec4-impl';

export class Vector4 extends Array<number> {
    static ZERO: Readonly<Vector4> = new Vector4(0, 0, 0, 0);
    static ONE: Readonly<Vector4> = new Vector4(1, 1, 1, 1);

    constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 0) {
        super(x, y, z, w);
    }

    // #region xyzw/rgba getters and setters
    get x(): number {
        return this[0];
    }
    set x(value: number) {
        this[0] = value;
    }

    get r(): number {
        return this[0];
    }
    set r(value: number) {
        this[0] = value;
    }

    get y(): number {
        return this[1];
    }
    set y(value: number) {
        this[1] = value;
    }

    get g(): number {
        return this[1];
    }
    set g(value: number) {
        this[1] = value;
    }

    get z(): number {
        return this[2];
    }
    set z(value: number) {
        this[2] = value;
    }

    get b(): number {
        return this[2];
    }
    set b(value: number) {
        this[2] = value;
    }

    get w(): number {
        return this[3];
    }
    set w(value: number) {
        this[3] = value;
    }

    get a(): number {
        return this[3];
    }
    set a(value: number) {
        this[3] = value;
    }
    // #endregion

    /**
     * Create a new Vector4 with the same values as this one.
     */
    clone(): Vector4 {
        return Vec4Impl.from(this);
    }

    /**
     * Sets the components of the vector.
     * @param x The x component.
     * @param y The y component.
     * @param z The z component.
     * @param w The w component.
     * @returns This vector after setting the components.
     */
    set(x: number, y: number, z: number, w: number): Vector4 {
        this[0] = x;
        this[1] = y;
        this[2] = z;
        this[3] = w;
        return this;
    }

    /**
     * The magnitude (length) of the vector.
     */
    magnitude(): number {
        return Vec4Impl.magnitude(this);
    }

    /**
     * The squared magnitude (length) of the vector.
     */
    squaredMagnitude(): number {
        return Vec4Impl.squaredMagnitude(this);
    }

    /**
     * Inplace addition of another vector to this one.
     * @param v The vector to add.
     * @returns This vector after addition.
     */
    add(v: Readonly<Vector4>): Vector4 {
        return Vec4Impl.add(this, this, v);
    }

    /**
     * Inplace subtraction of another vector from this one.
     * @param v The vector to subtract.
     * @returns This vector after subtraction.
     */
    subtract(v: Readonly<Vector4>): Vector4 {
        return Vec4Impl.subtract(this, this, v);
    }

    /**
     * Inplace multiplication of this vector by another vector.
     * @param v The vector to multiply by.
     * @returns This vector after multiplication.
     */
    multiply(v: Readonly<Vector4>): Vector4 {
        return Vec4Impl.multiply(this, this, v);
    }

    /**
     * Inplace division of this vector by another vector.
     * @param v The vector to divide by.
     * @returns This vector after division.
     */
    divide(v: Readonly<Vector4>): Vector4 {
        return Vec4Impl.divide(this, this, v);
    }

    /**
     * Inplace scaling of this vector by a scalar value.
     * @param scalar The number to scale by.
     * @returns This vector after scaling.
     */
    scale(scalar: number): Vector4 {
        return Vec4Impl.scale(this, this, scalar);
    }

    /**
     * Inplace negation of this vector.
     * @returns This vector after negation.
     */
    negated(): Vector4 {
        return Vec4Impl.negate(this, this);
    }

    /**
     * Inplace inversion of this vector.
     * @returns This vector after inversion.
     */
    inversed(): Vector4 {
        return Vec4Impl.inverse(this, this);
    }

    /**
     * Inplace normalisation of this vector.
     * @returns This vector after normalisation.
     */
    normalised(): Vector4 {
        return Vec4Impl.normalize(this, this);
    }

    /**
     * Checks if this vector is strictly equal to another vector.
     * @param v The vector to compare with.
     * @returns True if the vectors are strictly equal, false otherwise.
     */
    strictEquals(v: Readonly<Vector4>): boolean {
        return Vec4Impl.strictEquals(this, v);
    }

    /**
     * Checks if this vector is equal to another vector within a given epsilon.
     * @param v The vector to compare with.
     * @param epsilon The tolerance for comparison.
     * @returns True if the vectors are equal, false otherwise.
     */
    equals(v: Readonly<Vector4>, epsilon: number = EPSILON): boolean {
        return Vec4Impl.equals(this, v, epsilon);
    }

    /**
     * Returns a string representation of the vector.
     */
    toString(): string {
        return Vec4Impl.stringify(this);
    }

    // #region static functions
    /**
     * Creates a vector from an array of numbers or from four numbers.
     * @param values Input components.
     * @returns The created vector.
     */
    static fromValues(...values: [number, number, number, number] | [Array<number>]): Vector4 {
        return Vec4Impl.from(...values);
    }

    /**
     * Add two vectors and store the result in out.
     * @param out The receiving vector.
     * @param a The first operand.
     * @param b The second operand.
     * @returns The receiving vector.
     */
    static add(out: Vector4, a: Readonly<Vector4>, b: Readonly<Vector4>): Vector4 {
        return Vec4Impl.add(out, a, b);
    }

    /**
     * Subtract two vectors and store the result in out.
     * @param out The receiving vector.
     * @param a The first operand.
     * @param b The second operand.
     * @returns The receiving vector.
     */
    static subtract(out: Vector4, a: Readonly<Vector4>, b: Readonly<Vector4>): Vector4 {
        return Vec4Impl.subtract(out, a, b);
    }

    /**
     * Multiply two vectors and store the result in out.
     * @param out The receiving vector.
     * @param a The first operand.
     * @param b The second operand.
     * @returns The receiving vector.
     */
    static multiply(out: Vector4, a: Readonly<Vector4>, b: Readonly<Vector4>): Vector4 {
        return Vec4Impl.multiply(out, a, b);
    }

    /**
     * Divide two vectors and store the result in out.
     * @param out The receiving vector.
     * @param a The first operand.
     * @param b The second operand.
     * @returns The receiving vector.
     */
    static divide(out: Vector4, a: Readonly<Vector4>, b: Readonly<Vector4>): Vector4 {
        return Vec4Impl.divide(out, a, b);
    }

    /**
     * Ceil the components of a vector and store the result in out.
     * @param out The receiving vector.
     * @param a The vector to ceil.
     * @returns The receiving vector.
     */
    static ceil(out: Vector4, a: Readonly<Vector4>): Vector4 {
        return Vec4Impl.ceil(out, a);
    }

    /**
     * Floor the components of a vector and store the result in out.
     * @param out The receiving vector.
     * @param a The vector to floor.
     * @returns The receiving vector.
     */
    static floor(out: Vector4, a: Readonly<Vector4>): Vector4 {
        return Vec4Impl.floor(out, a);
    }

    /**
     * Symmetrically rounds the components of a vector to the nearest integer and stores the result in out.
     * @param out The receiving vector.
     * @param a The vector to round.
     * @returns The receiving vector.
     */
    static round(out: Vector4, a: Readonly<Vector4>): Vector4 {
        return Vec4Impl.round(out, a);
    }

    /**
     * Scale the components of a vector by a scalar value and store the result in out.
     * @param out The receiving vector.
     * @param a The vector to scale.
     * @param scalar The scalar value to scale by.
     * @returns The receiving vector.
     */
    static scale(out: Vector4, a: Readonly<Vector4>, scalar: number): Vector4 {
        return Vec4Impl.scale(out, a, scalar);
    }

    /**
     * Negates the components of a vector and stores the result in out.
     * @param out The receiving vector.
     * @param a The vector to negate.
     * @returns The receiving vector.
     */
    static negate(out: Vector4, a: Readonly<Vector4>): Vector4 {
        return Vec4Impl.negate(out, a);
    }

    /**
     * Inverses the components of a vector and stores the result in out.
     * @param out The receiving vector.
     * @param a The vector to inverse.
     * @returns The receiving vector.
     */
    static inverse(out: Vector4, a: Readonly<Vector4>): Vector4 {
        return Vec4Impl.inverse(out, a);
    }

    /**
     * Normalizes the components of a vector and stores the result in out.
     * @param out The receiving vector.
     * @param a The vector to normalize.
     * @returns The receiving vector.
     */
    static normalize(out: Vector4, a: Readonly<Vector4>): Vector4 {
        return Vec4Impl.normalize(out, a);
    }

    /**
     * Calculates the distance between two vectors.
     * @param a The first vector.
     * @param b The second vector.
     * @returns The distance between the two vectors.
     */
    static distance(a: Readonly<Vector4>, b: Readonly<Vector4>): number {
        return Vec4Impl.distance(a, b);
    }

    /**
     * Calculates the squared distance between two vectors.
     * @param a The first vector.
     * @param b The second vector.
     * @returns The squared distance between the two vectors.
     */
    static squaredDistance(a: Readonly<Vector4>, b: Readonly<Vector4>): number {
        return Vec4Impl.squaredDistance(a, b);
    }

    /**
     * Calculates the dot product of two vectors.
     * @param a The first vector.
     * @param b The second vector.
     * @returns The dot product of the two vectors.
     */
    static dot(a: Readonly<Vector4>, b: Readonly<Vector4>): number {
        return Vec4Impl.dot(a, b);
    }

    /**
     * Performs a linear interpolation between two vectors.
     * @param out The receiving vector.
     * @param a The first vector.
     * @param b The second vector.
     * @param t The interpolation factor.
     * @returns The receiving vector.
     */
    static lerp(out: Vector4, a: Readonly<Vector4>, b: Readonly<Vector4>, t: number): Vector4 {
        return Vec4Impl.lerp(out, a, b, t);
    }

    /**
     * Get the smallest angle between two 4D vectors.
     * @param a The first vector.
     * @param b The second vector.
     * @returns The angle in radians.
     */
    static angle(a: Readonly<Vector4>, b: Readonly<Vector4>): number {
        return Vec4Impl.angle(a, b);
    }
    // #endregion
}

// alias for convenience
export const Vec4 = Vector4;