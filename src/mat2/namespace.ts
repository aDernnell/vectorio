import {
    mat2,
    mat2Set,
    mat2Reset,
    mat2Clone,
    mat2Equals,
    mat2StrictEquals,
    mat2Stringify,
    mat2FillArr,
    mat2FillTrunc,
    MAT2_IDENTITY,
} from './mat2-core';

import { mat2Rotate, mat2FillRotation, mat2Scale, mat2FillScale } from './mat2-affine';
import { mat2Add, mat2Multiply, mat2MultiplyScalar, mat2Subtract } from './mat2-binary-ops';
import { mat2Adjugate, mat2Invert, mat2Transpose } from './mat2-unary-ops';
import { mat2Det, mat2Frob } from './mat2-props';
import { mat2ExtractAngle, mat2ExtractScaling } from './mat2-decompose';

export {
    // core
    mat2 as create,
    mat2Set as set,
    mat2Reset as reset,
    mat2Clone as clone,
    mat2FillArr as fillArr,
    mat2FillTrunc as fillTrunc,
    mat2Equals as equals,
    mat2StrictEquals as strictEquals,
    mat2Stringify as toString,
    MAT2_IDENTITY as IDENTITY,

    // properties
    mat2Det as determinant,
    mat2Frob as frobeniusNorm,

    // affine transformations
    mat2Rotate as rotate,
    mat2FillRotation as fillRotation,
    mat2Scale as scale,
    mat2FillScale as fillScale,

    // decompositions
    mat2ExtractAngle as extractAngle,
    mat2ExtractScaling as extractScaling,

    // binary operations
    mat2Add as add,
    mat2Subtract as subtract,
    mat2Multiply as multiply,
    mat2MultiplyScalar as multiplyScalar,

    // unary operations
    mat2Transpose as transpose,
    mat2Invert as invert,
    mat2Adjugate as adjugate,
};
