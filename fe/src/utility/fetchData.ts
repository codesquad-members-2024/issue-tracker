const SERVER = process.env.REACT_APP_EC2_SERVER;

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
interface FetchDataOptions {
	method?: HttpMethod;
	body?: {};
}

async function fetchData(url: string, options?: FetchDataOptions) {
	const request: RequestInit = {
		method: options?.method || "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
	};

	if (options?.body) request.body = JSON.stringify(options.body);

	try {
		const response = await fetch(`${SERVER}${url}`, request);
		if (!response.ok) throw new Error("에러!!");
		const data = await response.json();
		return data;
	} catch (err) {
		if (err instanceof Error) console.error(err.message);
		throw err;
	}
}

export default fetchData;
