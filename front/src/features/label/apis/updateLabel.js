import { server } from '~/apis/baseApi';

export async function putLabel(labelId, label) {
	console.log(labelId);
	const response = await fetch(`${server}/labels/${labelId}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(label),
	});
	if (!response.ok) {
		throw new Error('레이블 수정에 실패했습니다.');
	}
	return response.json();
}
