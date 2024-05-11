import { server, devServer } from '../../../apis/baseApi';

export async function getIssues() {
	try {
		const response = await fetch(`${devServer}/0`).then(res => res.json());
		const data = await response;
		return data.list;
	} catch (error) {
		console.error(error);
		return error;
	}
}
