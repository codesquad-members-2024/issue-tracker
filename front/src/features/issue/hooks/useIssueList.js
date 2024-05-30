import { useState, useEffect } from 'react';
import { getIssues } from '~/features/issue/apis/getIssues';

export const useIssueList = () => {
	const [issueList, setIssueDetail] = useState([]);
	const [counts, setCounts] = useState({
		open: issueList.filter(issue => !issue.closed).length || 0,
		closed: issueList.filter(issue => issue.closed).length || 0,
	});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchIssueList = async closed => {
		setLoading(true);
		try {
			let data = await getIssues();
			switch (closed) {
				case false:
					data = data.filter(issue => !issue.closed);
					break;
				case true:
					data = data.filter(issue => issue.closed);

					break;
				default:
					break;
			}
			setIssueDetail(data);
			setCounts({
				open: data.filter(issue => !issue.closed).length,
				closed: data.filter(issue => issue.closed).length,
			});
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchIssueList(false);
	}, []);

	return {
		issueList,
		loading,
		error,
		fetchIssueList,
		openCounts: counts.open,
		closedCounts: counts.closed,
		setCounts,
	};
};
