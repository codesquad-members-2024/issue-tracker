const SERVER = process.env.REACT_APP_EC2_SERVER;

const uploadFile = async (formData: FormData) => {
	try {
		const response = await fetch(`${SERVER}/upload`, {
			method: "POST",
			credentials: "include",
			body: formData,
		});
		if (!response.ok) throw new Error("에러!!");
		const data = await response.json();
		return data;
	} catch (err) {
		if (err instanceof Error) console.error("에러메세지", err.message);
	}
};

export default uploadFile;
