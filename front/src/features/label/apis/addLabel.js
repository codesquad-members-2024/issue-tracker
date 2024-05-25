import { server } from '~/apis/baseApi';
import { getLabels } from '~/features/issue/apis/getFilterList';

export async function addLabel(label) {
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
		console.log(data);
		return data;
	} catch (error) {
		console.error('Error:', error);
		return { error: error.message };
	}
}

export async function deleteLabel(labelId, label) {}
