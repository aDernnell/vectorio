import {
    mat3,
    mat3Set,
    mat3Reset,
    mat3Clone,
    mat3Equals,
    mat3StrictEquals,
    mat3Stringify,
    mat3FillArr,
    mat3FillTrunc,
    mat3FillPad,
    MAT3_IDENTITY,
} from './mat3-core';
import { mat3ExtractAngle, mat3ExtractScaling, mat3ExtractTranslation } from './mat3-decompose';
import { mat3Det, mat3Frob } from './mat3-props';
import { mat3Translate, mat3FillTranslation, mat3Rotate, mat3FillRotation, mat3Scale, mat3FillScale } from './mat3-affine';
import { mat3Add, mat3Multiply, mat3MultiplyScalar, mat3Subtract } from './mat3-binary-ops';
import { mat3Adjugate, mat3Invert, mat3Transpose } from './mat3-unary-ops';

export {
    // core
    mat3 as create,
    mat3Set as set,
    mat3Reset as reset,
    mat3Clone as clone,
    mat3FillArr as fillArr,
    mat3FillTrunc as fillTrunc,
    mat3FillPad as fillPad,
    mat3Equals as equals,
    mat3StrictEquals as strictEquals,
    mat3Stringify as toString,
    MAT3_IDENTITY as IDENTITY,

    // properties
    mat3Det as determinant,
    mat3Frob as frobeniusNorm,

    // affine transformations
    mat3Translate as translate,
    mat3FillTranslation as fillTranslation,
    mat3Rotate as rotate,
    mat3FillRotation as fillRotation,
    mat3Scale as scale,
    mat3FillScale as fillScale,

    // decompositions
    mat3ExtractTranslation as extractTranslation,
    mat3ExtractAngle as extractAngle,
    mat3ExtractScaling as extractScaling,

    // binary operations
    mat3Add as add,
    mat3Subtract as subtract,
    mat3Multiply as multiply,
    mat3MultiplyScalar as multiplyScalar,

    // unary operations
    mat3Transpose as transpose,
    mat3Invert as invert,
    mat3Adjugate as adjugate,
    };
