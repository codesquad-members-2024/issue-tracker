import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { getIssues } from '../apis/getIssues';
import { IssueItem } from '../components/IssueItem';
import { Loading, CheckBox } from '~/common/components';

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
			<StyledFilter>
				<StyledCheckAll>
					<CheckBox />

					<span>열린이슈</span>
					<span>닫힌이슈</span>
				</StyledCheckAll>
			</StyledFilter>
			{isLoading && <Loading size='large' />}

			{issueData.map((issue, index) => (
				<IssueItem key={issue.id} issue={issue} index={issue[index]} />
			))}
		</StyledWrapper>
	);
}
const StyledWrapper = styled.div`
	position: relative;
	border: 1px solid #d9dbe9;
	border-radius: 16px;
	overflow: hidden;
	.ant-checkbox-group {
		width: 100%;
	}
`;
const StyledFilter = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	height: 64px;
	padding: 16px 32px;
	border-bottom: 1px solid #d9dbe9;
	background-color: #f7f7fc;
`;
const StyledCheckAll = styled.div`
	display: flex;
	column-gap: 8px;
`;
