import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { getIssues } from '../apis/getIssues';
import { IssueItem } from '../components/IssueItem';

export function IssueListViewContainer() {
	const [issueData, setIssueData] = useState([]);
	useEffect(() => {
		getIssues().then(issueData => setIssueData(issueData));
	}, []);
	return (
		<>
			<StyledWrapper>
				<StyledFilter></StyledFilter>
				{issueData.map(issue => (
					<IssueItem key={issue.id} issue={issue} />
				))}
				<IssueItem />
			</StyledWrapper>
		</>
	);
}
const StyledWrapper = styled.div`
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
