import { server } from '~/apis/baseApi';

export async function postMilestone(milestone) {
	console.log(milestone);
	try {
		const requestOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(milestone),
		};
		const response = await fetch(`${server}/milestones`, requestOptions);
		if (response.status === 201) {
			return { success: true };
		}
	} catch (error) {
		console.error('Error:', error);
		return { error: error.message };
	}
}

export async function putMilestone(milestoneId, milestone) {
	try {
		const requestOptions = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(milestone),
		};
		const response = await fetch(
			`${server}/milestones/${milestoneId}`,
			requestOptions
		);
		if (response.status === 200) {
			return { success: true };
		}
	} catch (error) {
		console.error('Error:', error);
		return { error: error.message };
	}
}
