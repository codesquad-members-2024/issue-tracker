import { server } from '~/apis/baseApi';

export async function addLabel(label) {
	console.log(label);
	try {
		const response = await fetch(`${server}/labels`, {
			method: 'POST',
			// credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(label),
		});
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error:', error);
		return { error: error.message };
	}
}
