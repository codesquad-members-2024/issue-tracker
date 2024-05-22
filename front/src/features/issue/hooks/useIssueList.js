import { useState, useEffect } from 'react';
import { getIssues } from '~/features/issue/apis/getIssues';

export const useIssueList = () => {
	const [issueList, setIssueDetail] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchIssueList = async () => {
			try {
				const data = await getIssues();
				setIssueDetail(data);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};
		fetchIssueList();
	}, []);
	return { issueList, loading, error };
};
