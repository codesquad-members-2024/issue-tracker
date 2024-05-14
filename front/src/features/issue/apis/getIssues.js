import { server, devServer } from '../../../apis/baseApi';

/**
 * 이슈 목록 조회 API
 * @url http://3.38.30.88:8080/issues
 * @returns {object} : 이슈 리스트 정보
 */
export async function getIssues() {
	try {
		const response = await fetch(`${server}/issues`).then(res => res.json());
		const data = await response;
		return data;
	} catch (error) {
		console.error(error);
		return error;
	}
}
