function dd() {
	return <div></div>;
}

export default dd;
// import { useEffect, useState } from "react";

// const SERVER = process.env.REACT_APP_EC2_SERVER;

// function useFetch(url: string, method: string, body?: Object | null) {
// 	const [data, setData] = useState(null);
// 	const [loading, setLoading] = useState(true);
// 	const [error, setError] = useState<null | string>(null);

// 	useEffect(() => {
// 		if (!body) {
// 			setLoading(false);
// 			return;
// 		}

// 		(async () => {
// 			setLoading(true);
// 			try {
// 				const response = await fetch(`${SERVER}${url}`, {
// 					method: method,
// 					credentials: "include",
// 					headers: {
// 						"Content-Type": "application/json",
// 					},
// 					body: JSON.stringify(body),
// 				});

// 				const [, payload] = response.headers.get("Authorization")?.split(".") || [];
// 				const re = window.atob(payload);
// 				console.log(response.json());

// 				if (!response.ok) throw new Error("에러!!");
// 				// const result = await response.json();
// 				setData(result);
// 			} catch (err) {
// 				if (err instanceof Error) setError(err.message);
// 			} finally {
// 				setLoading(false);
// 			}
// 		})();
// 	}, [body, method, url]);

// 	return [message, error, loading];
// }

// export default useFetch;
