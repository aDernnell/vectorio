import { describe, expect, it } from 'vitest';
import { vec4, vec4Equals } from '../../vec4/vec4-core';
import { vec4MatTransform, vec4Scale } from '../../vec4/vec4-affine';
import { mat4 } from '../../mat4/mat4-core';

describe('vec4-affine', function () {
    it('transforms and scales vectors', function () {
        const out = vec4();
        vec4MatTransform(out, vec4(1, 2, 3, 1), mat4(2, 0, 0, 1, 0, 3, 0, 2, 0, 0, 4, 3, 0, 0, 0, 1));
        expect(vec4Equals(out, vec4(3, 8, 15, 1))).toBe(true);

        vec4Scale(out, vec4(1, -2, 3, -4), 2);
        expect(vec4Equals(out, vec4(2, -4, 6, -8))).toBe(true);
    });

    // TODO
});
