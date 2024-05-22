import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { IssueItem } from '../components/IssueItem';
import { useIssueList } from '~/features/issue/hooks';
import { LabelMilestoneCounterProvider } from '~/context/LabelMilestoneCounter';

import { CheckBox, Dropdowns, InputRadio, Tabs } from '~/common/components';
import { IconPlus, IconChevronDown } from '~/common/icons';

export function IssueListViewContainer() {
	const { issueList, loading, error } = useIssueList();

	return (
		<StyledWrapper>
			<StyledSearch>
				<div className='tab'></div>
				<div className='tab'>
					<LabelMilestoneCounterProvider>
						<Tabs />
					</LabelMilestoneCounterProvider>
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
				<StyledDropList>
					<details>
						<summary>
							담당자
							<IconChevronDown />
						</summary>
						<StyledDropdowns dropdownTitle='담당자 필터'>
							<InputRadio listName={'assignees'} value={'담당자가 없는 이슈'} />
							<InputRadio
								listName={'assignees'}
								value={'melroh629'}
								src={'https://avatars.githubusercontent.com/u/77464050?v=4'}
							/>
							<InputRadio
								listName={'assignees'}
								value={'guest=1243'}
								src={'https://avatars.githubusercontent.com/u/77464050?v=4'}
							/>
						</StyledDropdowns>
					</details>
					<details>
						<summary>
							레이블
							<IconChevronDown />
						</summary>
						<StyledDropdowns dropdownTitle='레이블 필터'>
							<InputRadio listName={'labels'} value={'레이블이 없는 이슈'} />
							<InputRadio
								listName={'labels'}
								value={'docu'}
								bgColor={'#d4c5f9'}
								fontColor={'#fff'}
							/>
							<InputRadio
								listName={'labels'}
								value={'bugs'}
								bgColor={'#d2f7f1'}
								fontColor={'#fff'}
							/>
						</StyledDropdowns>
					</details>
					<details>
						<summary>
							마일스톤
							<IconChevronDown />
						</summary>
						<StyledDropdowns dropdownTitle='마일스톤 필터'>
							<InputRadio
								listName={'milestones'}
								value={'마일스톤이 없는 이슈'}
							/>
							<InputRadio listName={'milestones'} value={'마일스톤 제목2'} />
							<InputRadio listName={'milestones'} value={'마일스톤 제목1'} />
						</StyledDropdowns>
					</details>
					<details>
						<summary>
							작성자 <IconChevronDown />
						</summary>
						<StyledDropdowns dropdownTitle='작성자 필터'>
							<InputRadio listName={'writer'} value={'담당자가 없는 이슈'} />
							<InputRadio
								listName={'writer'}
								value={'melroh629'}
								src={'https://avatars.githubusercontent.com/u/77464050?v=4'}
							/>
							<InputRadio
								listName={'writer'}
								value={'guest=1243'}
								src={'https://avatars.githubusercontent.com/u/77464050?v=4'}
							/>
						</StyledDropdowns>
					</details>
				</StyledDropList>
			</StyledFilter>
			<StyledList>
				{/* {loading && <Loading size='large' />} */}

				{issueList.map((issue, index) => (
					<IssueItem key={issue.id} issue={issue} index={issue[index]} />
				))}
			</StyledList>
		</StyledWrapper>
	);
}
const StyledWrapper = styled.div`
	position: relative;
	padding-bottom: 100px;
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
const StyledDropList = styled.div`
	display: flex;
	column-gap: 32px;
	details {
		position: relative;
		summary {
			display: flex;
			align-items: center;
			column-gap: 4px;
			padding: 4px 0;
			color: ${({ theme }) => theme.color.neutral.text.default};
			${({ theme }) => theme.typography.medium[14]};
			cursor: pointer;
			&::after {
				content: '';
			}
			svg {
				width: 12px;
				height: 12px;
			}
		}
	}
`;
const StyledDropdowns = styled(Dropdowns)`
	top: calc(100% + 8px);
	right: 0;
`;
const StyledList = styled.div`
	border: 1px solid ${({ theme }) => theme.color.neutral.border.default};
	border-top: none;
	border-radius: 0 0 16px 16px;
	overflow: hidden;
`;
