import { server } from '../../../apis/baseApi';

export async function postComment(id, comment) {
	console.log('postComment🆘', id, comment, typeof comment);
	try {
		const response = await fetch(`${server}/comments`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				loginId: 'daniel',
				content: comment,
				issueId: 1,
			}),
		});

		const text = await response.text();
		const data = text ? JSON.parse(text) : {};

		if (!response.ok) {
			console.error('Response status:', response.status, response.statusText);
			console.error('Response data:', data);
			throw new Error(data.message || '수정요청');
		}

		return data;
	} catch (error) {
		console.error('Error:', error);
		return { error: error.message };
	}
}
