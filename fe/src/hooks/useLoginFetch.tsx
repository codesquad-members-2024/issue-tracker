import { useEffect, useState } from "react";

const SERVER = process.env.REACT_APP_EC2_SERVER;

function useLoginFetch(url: string, body: Object | null) {
	const [result, setResult] = useState(false);
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

				if (!response.ok) throw new Error("에러!!");
				const [, payload] = response.headers.get("Authorization")?.split(".") || [];
				const result = window.atob(payload);
				localStorage.setItem("jwt", payload);
				localStorage.setItem("user", result);
				setResult(true);
			} catch (err) {
				if (err instanceof Error) setError("서버 점검");
			} finally {
				setLoading(false);
			}
		})();
	}, [body, url]);

	return [result, error, loading];
}

export default useLoginFetch;
