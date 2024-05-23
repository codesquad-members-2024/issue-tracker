import { server } from '~/apis/baseApi';

/**
 * @method POST
 */

export async function postComment(issueId, comment) {
	// 📍POST 성공 이후 서버에서 반환되는 데이터 필요
	try {
		const response = await fetch(`${server}/comments`, {
			method: 'POST',
			// credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				loginId: 'daniel',
				content: comment,
				issueId: issueId,
			}),
		});
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error:', error);
		return { error: error.message };
	}
}
