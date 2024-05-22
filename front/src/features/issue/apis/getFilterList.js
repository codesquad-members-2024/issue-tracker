import { server } from '~/apis/baseApi';

/**
 * 이슈 목록 조회 API
 * @url http://3.38.30.88:8080/issues
 * @returns {object} : 이슈 리스트 정보
 */
async function getLabels() {
	try {
		const response = await fetch(`${server}/labels`, {
			method: 'GET',
			// credentials: 'include',
		}).then(res => res.json());
		const data = response;
		return data;
	} catch (error) {
		console.error(error);
		throw new Error('레이블 목록 조회에 실패했습니다.');
	}
}

async function getMilestones() {
	try {
		const response = await fetch(`${server}/milestones`, {
			method: 'GET',
			// credentials: 'include',
		}).then(res => res.json());
		const data = response;
		return data;
	} catch (error) {
		console.error(error);
		throw new Error('마일스톤 목록 조회에 실패했습니다.');
	}
}

export { getLabels, getMilestones };
