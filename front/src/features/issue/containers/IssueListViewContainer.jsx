import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { getIssues } from '../apis/getIssues';
import { IssueItem } from '../components/IssueItem';
import { Loading } from '~/common/components/Loading';

export function IssueListViewContainer() {
	const [issueData, setIssueData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		getIssues().then(issueData => {
			setIssueData(issueData);
			setIsLoading(false);
		});
	}, []);

	return (
		<StyledWrapper>
			<StyledFilter></StyledFilter>
			{isLoading && <Loading size='large' />}
			{issueData.map((issue, index) => (
				<IssueItem key={issue.id} issue={issue} index={index + 1} />
			))}
		</StyledWrapper>
	);
}
const StyledWrapper = styled.div`
	position: relative;
	border: 1px solid #d9dbe9;
	border-radius: 16px;
	overflow: hidden;
`;
const StyledFilter = styled.div`
	width: 100%;
	height: 64px;
	border-bottom: 1px solid #d9dbe9;
	background-color: #f7f7fc;
`;
