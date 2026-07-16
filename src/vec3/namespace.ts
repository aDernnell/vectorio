import {
    vec3,
    vec3Set,
    vec3Equals,
    vec3StrictEquals,
    vec3Clone,
    vec3FillWith,
    vec3Stringify,
    vec3FillPad,
    VEC3_ZERO,
    VEC3_ONE,
    VEC3_RIGHT,
    VEC3_LEFT,
    VEC3_UP,
    VEC3_DOWN,
    VEC3_FORWARD,
    VEC3_BACK,
    vec3FillTrunc,
} from './vec3-core';
import { vec3Scale, vec3MatTransform, vec3RotateX, vec3RotateZ, vec3RotateY } from './vec3-affine';
import { vec3Magnitude, vec3SquaredMagnitude } from './vec3-props';
import { vec3Apply, vec3Normalize } from './vec3-unary-ops';
import {
    vec3Add,
    vec3Subtract,
    vec3Multiply,
    vec3Divide,
    vec3Cross,
    vec3Dot,
    vec3SquaredDistance,
    vec3Distance,
    vec3Lerp,
    vec3Angle,
} from './vec3-binary-ops';

export {
    // core
    vec3 as of,
    vec3 as create,
    vec3Set as set,
    vec3Clone as clone,
    vec3FillWith as fillWith,
    vec3FillPad as fillPad,
    vec3FillTrunc as fillTrunc,
    vec3Equals as equals,
    vec3StrictEquals as strictEquals,
    vec3Stringify as toString,
    VEC3_ZERO as ZERO,
    VEC3_ONE as ONE,
    VEC3_RIGHT as RIGHT,
    VEC3_LEFT as LEFT,
    VEC3_UP as UP,
    VEC3_DOWN as DOWN,
    VEC3_FORWARD as FORWARD,
    VEC3_BACK as BACK,

    // affine transformations
    vec3Scale as scale,
    vec3RotateX as rotateX,
    vec3RotateY as rotateY,
    vec3RotateZ as rotateZ,
    vec3MatTransform as matTransform,

    // properties
    vec3Magnitude as magnitude,
    vec3SquaredMagnitude as squaredMagnitude,

    // unary operations
    vec3Apply as apply,
    vec3Normalize as normalize,

    // binary operations
    vec3Add as add,
    vec3Subtract as subtract,
    vec3Multiply as multiply,
    vec3Divide as divide,

    // binary properties
    vec3Distance as distance,
    vec3SquaredDistance as squaredDistance,
    vec3Dot as dot,
    vec3Cross as cross,
    vec3Lerp as lerp,
    vec3Angle as angle,
};
