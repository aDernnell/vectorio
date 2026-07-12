import { describe, expect, it } from 'vitest';
import { vec4, vec4Add, vec4Normalize } from '../../vec4';

describe('vec4 index exports', function () {
    it('re-exports vec4 API symbols', function () {
        const a = vec4(1, 2, 3, 4);
        const b = vec4(4, 3, 2, 1);
        const out = vec4();

        vec4Add(out, a, b);
        expect(out.x).toBe(5);

        vec4Normalize(out, out);
        expect(Number.isFinite(out.x)).toBe(true);
    });
});
