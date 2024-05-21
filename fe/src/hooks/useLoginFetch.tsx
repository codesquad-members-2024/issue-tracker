import { useEffect, useState } from "react";

const SERVER = process.env.REACT_APP_EC2_SERVER;

function useLoginFetch(url: string, body: Object | null) {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<null | string>(null);

	useEffect(() => {
		if (!body) {
			setLoading(false);
			return;
		}

		(async () => {
			setLoading(true);
			try {
				const response = await fetch(`${SERVER}${url}`, {
					method: "POST",
					credentials: "include",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(body),
				});

				if (!response.ok) throw new Error("에러!!");//TODO 에러메세지 처리
				const [, payload] = response.headers.get("Authorization")?.split(".") || [];
				const result = window.atob(payload);
				setData(JSON.parse(result));
			} catch (err) {
				if (err instanceof Error) setError(err.message);
			} finally {
				setLoading(false);
			}
		})();
	}, [body, url]);

	return [data, error, loading];
}

export default useLoginFetch;
