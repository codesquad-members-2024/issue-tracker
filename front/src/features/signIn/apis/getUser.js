import { server, devServer } from '~/apis/baseApi';

/**
 * 로그인 API
 * @url http://3.38.30.88:8080/login
 * @method POST
 * @param {loginId, password}
 */
export async function getUser(id, password) {
	try {
		const response = await fetch(`${server}/login`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				loginId: id,
				password: password,
			}),
		});

		const data = await response.json();

		if (response.status === 200) {
			console.log('🚀 ~ getUser ~ data:', data);
			return data;
		} else {
			return { error: data };
		}
	} catch (error) {
		console.error('Error:', error);
		return { error: error.message };
	}
}
