import { server, devServer } from '~/apis/baseApi';

/**
 * @method POST
 */
export async function postComment(id, comment) {
	console.log(id, comment);
	try {
		const response = await fetch(`${server}/comments`, {
			method: 'POST',
			// credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				loginId: 'daniel',
				content: 'comment',
				issueId: 1,
			}),
		});

		const data = await response.json();

		if (response.status === 200) {
			console.log('🚀 ~ getUser ~ data:', data);
			return data;
		} else {
			return { error: data };
		}
	} catch (error) {
		console.error('Error:', error);
		return { error: error.message };
	}
}
