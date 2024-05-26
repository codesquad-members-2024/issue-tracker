import { server } from '~/apis/baseApi';

export const postIssueDetail = async issue => {
	try {
		const requestOption = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(issue),
		};
		const response = await fetch(`${server}/issues`, requestOption);
		if (response.status === 201) {
			const issue = await response.json();
			console.log(issue.id);
			return issue.id;
		} else {
			console.log('postIssueDetail', response.status);
		}
	} catch (error) {
		console.error('postIssueDetail', error);
	}
};
