import 'vitest';

declare module 'vitest' {
    interface Assertion<T = any> {
        toEqualVec(expected: T, epsilon?: number): T;
        toEqualMat(expected: T, epsilon?: number): T;
        toEqualQuat(expected: T, epsilon?: number): T;
    }
}
