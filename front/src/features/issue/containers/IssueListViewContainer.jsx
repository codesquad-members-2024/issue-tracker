import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getIssues } from '../apis/getIssues';
import { IssueItem } from '../components/IssueItem';

import { Loading, CheckBox, Button, Dropdowns } from '~/common/components';
import { IconPlus, IconLandmark, IconLabel } from '~/common/icons';

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
			<StyledSearch>
				<div className='tab'></div>
				<div className='tab'>
					<span className='outlined-flex'>
						<Link to='/'>
							<IconLabel />
							레이블 (0)
						</Link>
						<Link to='/'>
							<IconLandmark />
							마일스톤 (2)
						</Link>
					</span>
					<Link to='/issues/new' className='create'>
						<IconPlus />
						이슈작성
					</Link>
				</div>
			</StyledSearch>
			<StyledFilter>
				<StyledCheckAll>
					<CheckBox />

					<span>열린이슈</span>
					<span>닫힌이슈</span>
				</StyledCheckAll>
				<Dropdowns />
			</StyledFilter>
			<StyledList>
				{isLoading && <Loading size='large' />}

				{issueData.map((issue, index) => (
					<IssueItem key={issue.id} issue={issue} index={issue[index]} />
				))}
			</StyledList>
		</StyledWrapper>
	);
}
const StyledWrapper = styled.div`
	position: relative;

	.ant-checkbox-group {
		width: 100%;
	}
`;
const StyledSearch = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	.tab {
		display: flex;
		column-gap: 16px;
		.outlined-flex {
			display: flex;
			border: 1px solid ${({ theme }) => theme.color.neutral.border.default};
			border-radius: ${({ theme }) => theme.radius.medium};
			a {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 159.5px;
				height: 40px;
				column-gap: 4px;
				color: ${({ theme }) => theme.color.neutral.text.default};
				${({ theme }) => theme.typography.medium[14]};
				&:first-child {
					border-right: 1px solid
						${({ theme }) => theme.color.neutral.border.default};
				}
			}
		}
		.create {
			display: flex;
			width: 128px;
			height: 40px;
			justify-content: center;
			align-items: center;

			column-gap: 4px;
			color: ${({ theme }) => theme.color.brand.text.default};
			${({ theme }) => theme.typography.medium[12]};
			background: ${({ theme }) => theme.color.brand.surface.default};
			border-radius: ${({ theme }) => theme.radius.medium};
		}
	}
`;
const StyledFilter = styled.div`
	position: relative;
	margin-top: 24px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: 64px;
	padding: 16px 32px;
	border: 1px solid ${({ theme }) => theme.color.neutral.border.default};
	border-radius: 16px 16px 0 0;
	background-color: #f7f7fc;
`;
const StyledCheckAll = styled.div`
	display: flex;
	column-gap: 8px;
`;
const StyledList = styled.div`
	border: 1px solid ${({ theme }) => theme.color.neutral.border.default};
	border-top: none;
	border-radius: 0 0 16px 16px;
	overflow: hidden;
`;
