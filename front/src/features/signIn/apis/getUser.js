import { server, devServer } from '~/apis/baseApi';

/**
 * 로그인 API
 * @url http://3.38.30.88:8080/login
 * @method POST
 * @param {loginId, password}
 */
export async function getUser(id, password) {
	console.log('🚀 ~ getUser ~ id, password:', id, password);

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
			sessionStorage.setItem('token', data.token);
			sessionStorage.setItm('email', data.email);
			console.log('🚀 ~ getUser ~ data:', data);
		} else {
			console.log('🚀 ~ getUser ~ data:', data);
			return { error: data.message };
		}
	} catch (error) {
		console.error('Error:', error);
		return { error: error.message };
	}
}
