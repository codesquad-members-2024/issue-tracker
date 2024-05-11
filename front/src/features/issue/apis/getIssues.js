export async function getIssues() {
	try {
		const response = await fetch('http://3.38.30.88:8080/issues').then(res =>
			res.json()
		);
		const data = await response;
		return data;
	} catch (error) {
		console.error(error);
		return error;
	}
}
