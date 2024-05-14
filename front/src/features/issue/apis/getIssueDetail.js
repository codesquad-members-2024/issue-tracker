import { server, devServer } from '../../../apis/baseApi';

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
