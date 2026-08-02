import { vec4MatTransform } from './vec4-affine';
import { vec4Add, vec4Angle, vec4Distance, vec4Divide, vec4Dot, vec4Lerp, vec4Multiply, vec4SquaredDistance, vec4Subtract } from './vec4-binary-ops';
import {
    vec4,
    vec4Set,
    vec4Equals,
    vec4StrictEquals,
    vec4Clone,
    vec4FillWith,
    vec4Stringify,
    vec4FillPad,
    VEC4_ZERO,
    VEC4_ONE,
} from './vec4-core';
import { vec4Magnitude, vec4SquaredMagnitude } from './vec4-props';
import { vec4Apply, vec4Negate, vec4Invert, vec4Normalize, vec4Scale } from './vec4-unary-ops';

export {
    // core
    vec4 as of,
    vec4 as create,
    vec4Set as set,
    vec4Clone as clone,
    vec4FillWith as fillWith,
    vec4FillPad as fillPad,
    vec4Equals as equals,
    vec4StrictEquals as strictEquals,
    vec4Stringify as toString,
    VEC4_ZERO as ZERO,
    VEC4_ONE as ONE,

    // properties
    vec4Magnitude as magnitude,
    vec4SquaredMagnitude as squaredMagnitude,

    // affine transformations
    vec4MatTransform as matTransform,

    // unary operations
    vec4Apply as apply,
    vec4Scale as scale,
    vec4Negate as negate,
    vec4Invert as invert,
    vec4Normalize as normalize,

    // binary operations
    vec4Add as add,
    vec4Subtract as subtract,
    vec4Multiply as multiply,
    vec4Divide as divide,

    // binary properties
    vec4Distance as distance,
    vec4SquaredDistance as squaredDistance,
    vec4Dot as dot,
    vec4Lerp as lerp,
    vec4Angle as angle,

};
