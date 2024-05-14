import { server, devServer } from '../../../apis/baseApi';

export async function getIssues() {
	try {
		const response = await fetch(`${devServer}/issue`).then(res => res.json());
		const data = await response;
		return data;
	} catch (error) {
		console.error(error);
		return error;
	}
}
