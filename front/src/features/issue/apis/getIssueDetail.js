import { server, devServer } from '~/apis/baseApi';

/**
 * 이슈 상세 조회 API
 * @url http://3.38.30.88:8080/issues/{id}
 * @param {number} id : 이슈 id
 * @returns {object} : 이슈 상세 정보
 */
export async function getIssueDetail(id) {
	try {
		const response = await fetch(`${server}/issues/${id}`).then(res =>
			res.json()
		);
		// console.log('⛳️ success getIssueDetail', response);
		const data = response;
		return data;
	} catch (error) {
		console.error(error);
		return error;
	}
}
