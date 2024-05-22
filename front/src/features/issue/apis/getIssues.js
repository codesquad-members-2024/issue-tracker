import { server, devServer } from '../../../apis/baseApi';

/**
 * 이슈 목록 조회 API
 * @url http://3.38.30.88:8080/issues
 * @returns {object} : 이슈 리스트 정보
 */
export async function getIssues() {
	try {
		const response = await fetch(`${server}/issues`, {
			method: 'GET',
			credentials: 'include',
		}).then(res => res.json());
		const data = response;
		return data;
	} catch (error) {
		console.error(error);
		throw new Error('이슈 목록 조회에 실패했습니다.');
	}
}
