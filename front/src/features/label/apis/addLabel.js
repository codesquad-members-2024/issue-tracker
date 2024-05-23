import { server } from '~/apis/baseApi';

export async function addLabel(label) {
	try {
		const response = await fetch(`${server}/labels`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ label }),
		});
		return response;
	} catch (error) {
		console.error('Error:', error);
		return { error: error.message };
	}
}
