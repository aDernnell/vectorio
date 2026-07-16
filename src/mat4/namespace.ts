import {
    mat4,
    mat4Set,
    mat4Reset,
    mat4Clone,
    mat4Equals,
    mat4StrictEquals,
    mat4Stringify,
    mat4FillArr,
    mat4FillPad,
    MAT4_IDENTITY,
} from './mat4-core';
import {
    mat4Translate,
    mat4FillTranslation,
    mat4Rotate,
    mat4FillRotation,
    mat4RotateZYX,
    mat4FillRotationZYX,
    mat4Scale,
    mat4FillScale,
    mat4RotateY,
    mat4FillRotationZ,
    mat4RotateZ,
    mat4FillRotationY,
    mat4FillRotationX,
    mat4RotateX,
} from './mat4-affine';
import { mat4ExtractEulerAngles, mat4ExtractScaling, mat4ExtractTranslation } from './mat4-decompose';
import { mat4Det, mat4Frob } from './mat4-props';
import { mat4Add, mat4Subtract, mat4Multiply, mat4MultiplyScalar } from './mat4-binary-ops';
import { mat4Adjugate, mat4Invert, mat4Transpose } from './mat4-unary-ops';

export {
    // core
    mat4 as create,
    mat4Set as set,
    mat4Reset as reset,
    mat4Clone as clone,
    mat4FillArr as fillArr,
    mat4FillPad as fillPad,
    mat4Equals as equals,
    mat4StrictEquals as strictEquals,
    mat4Stringify as toString,
    MAT4_IDENTITY as IDENTITY,

    // properties
    mat4Det as determinant,
    mat4Frob as frobeniusNorm,

    // affine transformations
    mat4Translate as translate,
    mat4FillTranslation as fillTranslation,
    mat4Rotate as rotate,
    mat4FillRotation as fillRotation,
    mat4RotateX as rotateX,
    mat4FillRotationX as fillRotationX,
    mat4RotateY as rotateY,
    mat4FillRotationY as fillRotationY,
    mat4RotateZ as rotateZ,
    mat4FillRotationZ as fillRotationZ,
    mat4RotateZYX as rotateZYX,
    mat4FillRotationZYX as fillRotationZYX,
    mat4Scale as scale,
    mat4FillScale as fillScale,

    // decompositions
    mat4ExtractTranslation as extractTranslation,
    mat4ExtractEulerAngles as extractEulerAngles,
    mat4ExtractScaling as extractScaling,

    // binary operations
    mat4Add as add,
    mat4Subtract as subtract,
    mat4Multiply as multiply,
    mat4MultiplyScalar as multiplyScalar,

    // unary operations
    mat4Transpose as transpose,
    mat4Invert as invert,
    mat4Adjugate as adjugate,
};
