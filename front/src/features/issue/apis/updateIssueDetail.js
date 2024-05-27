import { server } from '~/apis/baseApi';

/**
 * issueId => 목록에서 체크박스로 선택한 이슈의 id, 이슈 상세에서는 그냥 issueId
 */
export async function openIssue(issueId) {
	let issueIds = [];
	issueIds.push(issueId);
	try {
		const token = localStorage.getItem('token');
		const requestOptions = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(issueIds),
		};
		const response = await fetch(`${server}/issues/open`, requestOptions);
		if (response.status === 200) {
			return { success: true };
		} else {
			console.error(response.status, response);
		}
	} catch (error) {
		console.error('Error:', error);
		return { error: error.message };
	}
}

/**
 * 이슈 닫기
 */
export async function closeIssue(issueId) {
	let issueIds = [];
	issueIds.push(issueId);
	try {
		const token = localStorage.getItem('token');
		const requestOptions = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(issueIds),
		};
		const response = await fetch(`${server}/issues/close`, requestOptions);
		if (response.status === 200) {
			return { success: true };
		} else {
			console.error(response.status, response);
		}
	} catch (error) {
		console.error('Error:', error);
		return { error: error.message };
	}
}

/**
 * 이슈 삭제 API
 */
export async function deleteIssue(issueId) {
	try {
		const token = localStorage.getItem('token');
		const requestOptions = {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		};
		const response = await fetch(`${server}/issues/${issueId}`, requestOptions);
		if (response.status === 204) {
			return { success: true };
		} else {
			console.error(response.status, response);
		}
	} catch (error) {
		console.error('Error:', error);
		return { error: error.message };
	}
}
