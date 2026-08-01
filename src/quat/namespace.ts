import { quat, QUAT_IDENTITY, quatClone, quatEquals, quatReset, quatSet, quatStrictEquals, quatStringify } from "./quat-core";
import { quatAdd, quatAngle, quatDot, quatLerp, quatMultiply, quatSlerp } from "./quat-binary-ops";
import { quatMagnitude, quatSquaredMagnitude } from "./quat-props";
import { quatConjugate, quatInvert, quatNegate, quatNormalize, quatExp, quatLn, quatPow, quatScale } from "./quat-unary-ops";
import { quatFillMat3, quatFillMat4 } from "./quat-convert";
import { extractAxisAngle } from "./quat-decompose";
import { quatFillEuler, quatFillRotation, quatFillRotationTo, quatRotateX, quatRotateY, quatRotateZ } from "./quat-rot";


export {
    // core
    quat as create,
    quatSet as set,
    quatReset as reset,
    quatClone as clone,
    quatEquals as equals,
    quatStrictEquals as strictEquals,
    quatStringify as toString,
    QUAT_IDENTITY as IDENTITY,

    // properties
    quatMagnitude as magnitude,
    quatSquaredMagnitude as squaredMagnitude,

    // binary operations
    quatMultiply as multiply,
    quatAdd as add,
    quatDot as dot,
    quatAngle as angle,
    quatLerp as lerp,
    quatSlerp as slerp,

    // unary operations
    quatInvert as invert,
    quatNegate as negate,
    quatConjugate as conjugate,
    quatNormalize as normalize,
    quatExp as exp,
    quatLn as ln,
    quatPow as pow,
    quatScale as scale,

    // conversions
    quatFillMat3 as fillMat3,
    quatFillMat4 as fillMat4,

    // decompositions
    extractAxisAngle as extractAxisAngle,

    // rotations
    quatFillRotation as fillRotation,
    quatRotateX as rotateX,
    quatRotateY as rotateY,
    quatRotateZ as rotateZ,
    quatFillEuler as fillEuler,
    quatFillRotationTo as fillRotationTo,
}