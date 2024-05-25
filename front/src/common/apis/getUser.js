import { server } from '~/apis/baseApi';

// 유저 정보 조회 API

export async function getUser() {
	try {
		const requestOptions = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const response = await fetch(`${server}/users`, requestOptions);
		if (response.status === 200) {
			return response.json();
		} else {
			console.error('Error:', response);
		}
	} catch (error) {
		console.error(error);
		throw new Error('유저 정보 조회에 실패했습니다.');
	}
}
