import { useEffect, useState } from 'react';
import { getUser } from '~/common/apis/getUser';

export const useUser = () => {
	const [user, setUser] = useState(null);
	const fetchUser = async () => {
		try {
			const response = await getUser();
			setUser(response);
		} catch (error) {
			console.error(error);
		} finally {
			// setLoading(false);
		}
	};

	useEffect(() => {
		fetchUser();
	}, []);
	return { user, fetchUser };
};
