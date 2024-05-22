import { useEffect, useState } from 'react';
import { getMilestones } from '~/features/issue/apis';

export const useMilestoneList = () => {
	const [milestoneList, setMilestoneList] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchMilestoneList = async () => {
			try {
				const response = await getMilestones();
				setMilestoneList(response);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};
		fetchMilestoneList();
	}, []);
	return { milestoneList, loading, error };
};
