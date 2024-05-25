import { server } from '~/apis/baseApi';

/**
 * 이슈 상세 조회 API
 * @url http://3.38.30.88:8080/issues/{id}
 * @param {number} id : 이슈 id
 * @returns {object} : 이슈 상세 정보
 */

export async function getIssueDetail(id) {
	try {
		const response = await fetch(`${server}/issues/${id}`, {
			method: 'GET',
			// credentials: 'include',
		}).then(res => res.json());
		const data = response;
		return data;
	} catch (error) {
		console.error(error);
		throw new Error('이슈 상세 조회에 실패했습니다.');
	}
}

export async function editIssueTitle(issueId, issueTitle) {
	console.log(issueId, issueTitle);
	try {
		const requestOptions = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ title: issueTitle }),
		};
		const response = await fetch(
			`${server}/issues/${issueId}/title`,
			requestOptions
		);
		if (response.status === 200) {
			return { success: true };
		} else {
			console.error('Error:', response);
		}
	} catch (e) {
		console.error('Error:', e);
	}
}

export async function editIssueContent(issueId, content) {
	console.log(issueId, content);
	try {
		const requestOptions = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ content: content }),
		};
		const response = await fetch(
			`${server}/issues/${issueId}/content`,
			requestOptions
		);
		if (response.status === 200) {
			return { success: true };
		} else {
			console.error('Error:', response);
			return { error: response.statusText };
		}
	} catch (error) {
		console.error('Error:', error);
		return { error: error.message };
	}
}
