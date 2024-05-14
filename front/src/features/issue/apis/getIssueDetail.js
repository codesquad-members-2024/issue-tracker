import { server, devServer } from '../../../apis/baseApi';

/**
 * 이슈 상세 조회 API
 * @param {number} id : 이슈 id
 * @returns {object} : 이슈 상세 정보
 */
export async function getIssueDetail(id) {
	console.log(`id: ${id}`);
	try {
		const response = await fetch(`${devServer}/issue?id=${id}`).then(res =>
			res.json()
		);
		const data = await response;
		return data;
	} catch (error) {
		console.error(error);
		return error;
	}
}
