import { EPSILON } from "./utils";
import { Vec3Impl } from "./vec3-impl";

export class Vector3 extends Array<number> {
    static ZERO: Readonly<Vector3> = new Vector3(0, 0, 0);
    static ONE: Readonly<Vector3> = new Vector3(1, 1, 1);
    static RIGHT: Readonly<Vector3> = new Vector3(1, 0, 0);
    static LEFT: Readonly<Vector3> = new Vector3(-1, 0, 0);
    static UP: Readonly<Vector3> = new Vector3(0, 1, 0);
    static DOWN: Readonly<Vector3> = new Vector3(0, -1, 0);
    static FORWARD: Readonly<Vector3> = new Vector3(0, 0, 1);
    static BACK: Readonly<Vector3> = new Vector3(0, 0, -1);

    constructor(x: number = 0, y: number = 0, z: number = 0) {
        super(x, y, z);
    }

    // #region xyz/rgb getters and setters
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
    // #endregion

    /**
     * Create a new Vector3 with the same values as this one.
     */
    clone(): Vector3 {
        return Vec3Impl.from(this);
    }

    /**
     * Sets the components of the vector.
     * @param x The x component.
     * @param y The y component.
     * @param z The z component.
     * @returns This vector after setting the components.
     */
    set(x: number, y: number, z: number): Vector3 {
        this[0] = x;
        this[1] = y;
        this[2] = z;
        return this;
    }

    /**
     * The magnitude (length) of the vector.
     */
    magnitude(): number {
        return Vec3Impl.magnitude(this);
    }

    /**
     * The squared magnitude (length) of the vector.
     */
    squaredMagnitude(): number {
        return Vec3Impl.squaredMagnitude(this);
    }

    /**
     * Inplace addition of another vector to this one.
     * @param v The vector to add.
     * @returns This vector after addition.
     */
    add(v: Readonly<Vector3>): Vector3 {
        return Vec3Impl.add(this, this, v);
    }

    /**
     * Inplace subtraction of another vector from this one.
     * @param v The vector to subtract.
     * @returns This vector after subtraction.
     */
    subtract(v: Readonly<Vector3>): Vector3 {
        return Vec3Impl.subtract(this, this, v);
    }

    /**
     * Inplace multiplication of this vector by another vector.
     * @param v The vector to multiply by.
     * @returns This vector after multiplication.
     */
    multiply(v: Readonly<Vector3>): Vector3 {
        return Vec3Impl.multiply(this, this, v);
    }

    /**
     * Inplace division of this vector by another vector.
     * @param v The vector to divide by.
     * @returns This vector after division.
     */
    divide(v: Readonly<Vector3>): Vector3 {
        return Vec3Impl.divide(this, this, v);
    }

    /**
     * Inplace scaling of this vector by a scalar value.
     * @param scalar The number to scale by.
     * @returns This vector after scaling.
     */
    scale(scalar: number): Vector3 {
        return Vec3Impl.scale(this, this, scalar);
    }

    /**
     * Inplace negation of this vector.
     * @returns This vector after negation.
     */
    negated(): Vector3 {
        return Vec3Impl.negate(this, this);
    }

    /**
     * Inplace inversion of this vector.
     * @returns This vector after inversion.
     */
    inversed(): Vector3 {
        return Vec3Impl.inverse(this, this);
    }

    /**
     * Inplace normalisation of this vector.
     * @returns This vector after normalisation.
     */
    normalised(): Vector3 {
        return Vec3Impl.normalize(this, this);
    }

    /**
     * Checks if this vector is strictly equal to another vector.
     * @param v The vector to compare with.
     * @returns True if the vectors are strictly equal, false otherwise.
     */
    strictEquals(v: Readonly<Vector3>): boolean {
        return Vec3Impl.strictEquals(this, v);
    }

    /**
     * Checks if this vector is equal to another vector within a given epsilon.
     * @param v The vector to compare with.
     * @param epsilon The tolerance for comparison.
     * @returns True if the vectors are equal, false otherwise.
     */
    equals(v: Readonly<Vector3>, epsilon: number = EPSILON): boolean {
        return Vec3Impl.equals(this, v, epsilon);
    }

    /**
     * Returns a string representation of the vector.
     */
    toString(): string {
        return Vec3Impl.stringify(this);
    }

    // #region static functions
    /**
     * Creates a vector from an array or from three numbers.
     * @param values Input components.
     * @returns The created vector.
     */
    static fromValues(...values: [number, number, number] | [Array<number>]): Vector3 {
        return Vec3Impl.from(...values);
    }
    
    /**
     * Add two vectors and store the result in out.
     * @param out The receiving vector.
     * @param a The first operand.
     * @param b The second operand.
     * @returns The receiving vector.
     */
    static add(out: Vector3, a: Readonly<Vector3>, b: Readonly<Vector3>): Vector3 {
        return Vec3Impl.add(out, a, b);
    }

    /**
     * Subtract two vectors and store the result in out.
     * @param out The receiving vector.
     * @param a The first operand.
     * @param b The second operand.
     * @returns The receiving vector.
     */
    static subtract(out: Vector3, a: Readonly<Vector3>, b: Readonly<Vector3>): Vector3 {
        return Vec3Impl.subtract(out, a, b);
    }

    /**
     * Multiply two vectors and store the result in out.
     * @param out The receiving vector.
     * @param a The first operand.
     * @param b The second operand.
     * @returns The receiving vector.
     */
    static multiply(out: Vector3, a: Readonly<Vector3>, b: Readonly<Vector3>): Vector3 {
        return Vec3Impl.multiply(out, a, b);
    }

    /**
     * Divide two vectors and store the result in out.
     * @param out The receiving vector.
     * @param a The first operand.
     * @param b The second operand.
     * @returns The receiving vector.
     */
    static divide(out: Vector3, a: Readonly<Vector3>, b: Readonly<Vector3>): Vector3 {
        return Vec3Impl.divide(out, a, b);
    }

    /**
     * Ceil the components of a vector and store the result in out.
     * @param out The receiving vector.
     * @param a The vector to ceil.
     * @returns The receiving vector.
     */
    static ceil(out: Vector3, a: Readonly<Vector3>): Vector3 {
        return Vec3Impl.ceil(out, a);
    }

    /**
     * Floor the components of a vector and store the result in out.
     * @param out The receiving vector.
     * @param a The vector to floor.
     * @returns The receiving vector.
     */
    static floor(out: Vector3, a: Readonly<Vector3>): Vector3 {
        return Vec3Impl.floor(out, a);
    }

    /**
     * Symmetrically rounds the components of a vector to the nearest integer and stores the result in out.
     * @param out The receiving vector.
     * @param a The vector to round.
     * @returns The receiving vector.
     */
    static round(out: Vector3, a: Readonly<Vector3>): Vector3 {
        return Vec3Impl.round(out, a);
    }

    /**
     * Scale the components of a vector by a scalar value and store the result in out.
     * @param out The receiving vector.
     * @param a The vector to scale.
     * @param scalar The scalar value to scale by.
     * @returns The receiving vector.
     */
    static scale(out: Vector3, a: Readonly<Vector3>, scalar: number): Vector3 {
        return Vec3Impl.scale(out, a, scalar);
    }

    /**
     * Negates the components of a vector and stores the result in out.
     * @param out The receiving vector.
     * @param a The vector to negate.
     * @returns The receiving vector.
     */
    static negate(out: Vector3, a: Readonly<Vector3>): Vector3 {
        return Vec3Impl.negate(out, a);
    }

    /**
     * Inverses the components of a vector and stores the result in out.
     * @param out The receiving vector.
     * @param a The vector to inverse.
     * @returns The receiving vector.
     */
    static inverse(out: Vector3, a: Readonly<Vector3>): Vector3 {
        return Vec3Impl.inverse(out, a);
    }

    /**
     * Normalizes the components of a vector and stores the result in out.
     * @param out The receiving vector.
     * @param a The vector to normalize.
     * @returns The receiving vector.
     */
    static normalize(out: Vector3, a: Readonly<Vector3>): Vector3 {
        return Vec3Impl.normalize(out, a);
    }

    /**
     * Calculates the distance between two vectors.
     * @param a The first vector.
     * @param b The second vector.
     * @returns The distance between the two vectors.
     */
    static distance(a: Readonly<Vector3>, b: Readonly<Vector3>): number {
        return Vec3Impl.distance(a, b);
    }

    /**
     * Calculates the squared distance between two vectors.
     * @param a The first vector.
     * @param b The second vector.
     * @returns The squared distance between the two vectors.
     */
    static squaredDistance(a: Readonly<Vector3>, b: Readonly<Vector3>): number {
        return Vec3Impl.squaredDistance(a, b);
    }

    /**
     * Calculates the dot product of two vectors.
     * @param a The first vector.
     * @param b The second vector.
     * @returns The dot product of the two vectors.
     */
    static dot(a: Readonly<Vector3>, b: Readonly<Vector3>): number {
        return Vec3Impl.dot(a, b);
    }

    /**
     * Calculates the cross product of two vectors and stores the result in out.
     * @param out The receiving vector.
     * @param a The first vector.
     * @param b The second vector.
     * @returns The receiving vector.
     */
    static cross(out: Vector3, a: Readonly<Vector3>, b: Readonly<Vector3>): Vector3 {
        return Vec3Impl.cross(out, a, b);
    }

    /**
     * Performs a linear interpolation between two vectors.
     * @param out The receiving vector.
     * @param a The first vector.
     * @param b The second vector.
     * @param t The interpolation factor.
     * @returns The receiving vector.
     */
    static lerp(out: Vector3, a: Readonly<Vector3>, b: Readonly<Vector3>, t: number): Vector3 {
        return Vec3Impl.lerp(out, a, b, t);
    }

    /**
     * Get the smallest angle between two 3D vectors.
     * @param a The first vector.
     * @param b The second vector.
     * @returns The angle in radians.
     */
    static angle(a: Readonly<Vector3>, b: Readonly<Vector3>): number {
        return Vec3Impl.angle(a, b);
    }
    // #endregion
}

// alias for convenience
export const Vec3 = Vector3;

