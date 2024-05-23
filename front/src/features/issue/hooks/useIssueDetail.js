import { useState, useEffect } from 'react';
import { getIssueDetail } from '~/features/issue/apis/getIssueDetail';

export const useIssueDetail = id => {
	const [issueDetail, setIssueDetail] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchIssueDetail = async () => {
		try {
			const data = await getIssueDetail(id);
			setIssueDetail(data);
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		fetchIssueDetail();
	}, [id]);

	return { issueDetail, loading, error, fetchIssueDetail };
};
