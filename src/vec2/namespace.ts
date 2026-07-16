import { vec2MatTransform, vec2Rotate, vec2Scale } from './vec2-affine';
import { vec2Add, vec2Angle, vec2Cross, vec2Distance, vec2Divide, vec2Dot, vec2Lerp, vec2Multiply, vec2SignedAngle, vec2SquaredDistance, vec2Subtract } from './vec2-binary-ops';
import { vec2, vec2Set, vec2Equals, vec2StrictEquals, vec2Clone, vec2FillWith, vec2Stringify,
    VEC2_ZERO,
    VEC2_ONE,
    VEC2_RIGHT,
    VEC2_LEFT,
    VEC2_UP,
    VEC2_DOWN,
} from './vec2-core';
import { vec2Magnitude, vec2SquaredMagnitude } from './vec2-props';
import { vec2Apply, vec2Normalize } from './vec2-unary-ops';

export {
    // core
    vec2 as of,
    vec2 as create,
    vec2Set as set,
    vec2Clone as clone,
    vec2FillWith as fillWith,
    vec2Equals as equals,
    vec2StrictEquals as strictEquals,
    vec2Stringify as toString,
    VEC2_ZERO as ZERO,
    VEC2_ONE as ONE,
    VEC2_RIGHT as RIGHT,
    VEC2_LEFT as LEFT,
    VEC2_UP as UP,
    VEC2_DOWN as DOWN,

    // affine transformations
    vec2Scale as scale,
    vec2Rotate as rotate,
    vec2MatTransform as matTransform,

    // proeprties
    vec2Magnitude as magnitude,
    vec2SquaredMagnitude as squaredMagnitude,

    // unary operations
    vec2Apply as apply,
    vec2Normalize as normalize,

    // binary operations
    vec2Add as add,
    vec2Subtract as subtract,
    vec2Multiply as multiply,
    vec2Divide as divide,

    // binary properties
    vec2Distance as distance,
    vec2SquaredDistance as squaredDistance,
    vec2Dot as dot,
    vec2Cross as cross,
    vec2Lerp as lerp,
    vec2Angle as angle,
    vec2SignedAngle as signedAngle,
};
