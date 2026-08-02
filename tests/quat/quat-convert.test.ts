import { describe, expect, it } from 'vitest';
import { mat3 } from '../../src/mat3/mat3-core';
import { mat4 } from '../../src/mat4/mat4-core';
import { quat } from '../../src/quat/quat-core';
import { quatFillMat3, quatFillMat4 } from '../../src/quat/quat-convert';

describe('quat-convert', function () {
	it('fills quaternion from identity mat3 (trace > 0 branch)', function () {
		const out = quatFillMat3(quat(), mat3());
		expect(out).toEqualQuat(quat(0, 0, 0, 1));
	});

	it('fills quaternion from mat3 where m00 is dominant', function () {
		const rx180 = mat3(
			1, 0, 0,
			0, -1, 0,
			0, 0, -1,
		);
		const out = quatFillMat3(quat(), rx180);

		expect(out).toEqualQuat(quat(1, 0, 0, 0));
	});

	it('fills quaternion from mat3 where m11 is dominant', function () {
		const ry180 = mat3(
			-1, 0, 0,
			0, 1, 0,
			0, 0, -1,
		);
		const out = quatFillMat3(quat(), ry180);

		expect(out).toEqualQuat(quat(0, 1, 0, 0));
	});

	it('fills quaternion from mat3 where m22 is dominant', function () {
		const rz180 = mat3(
			-1, 0, 0,
			0, -1, 0,
			0, 0, 1,
		);
		const out = quatFillMat3(quat(), rz180);

		expect(out).toEqualQuat(quat(0, 0, 1, 0));
	});

	it('fills quaternion from mat4 using truncated rotational part only', function () {
		const rz180WithTranslation = mat4(
			-1, 0, 0, 10,
			0, -1, 0, 20,
			0, 0, 1, 30,
			0, 0, 0, 1,
		);
		const out = quatFillMat4(quat(), rz180WithTranslation);

		expect(out).toEqualQuat(quat(0, 0, 1, 0));
	});
});
