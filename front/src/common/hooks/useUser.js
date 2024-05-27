import { useEffect, useState } from 'react';
import { getUserList } from '~/common/apis';

export const useUser = () => {
	const [user, setUser] = useState(null);
	const fetchUser = async () => {
		try {
			const response = await getUserList();
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
