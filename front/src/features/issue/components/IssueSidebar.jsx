import styled from 'styled-components';
import { useState } from 'react';
import { IconPlus } from '~/common/icons';
import { Dropdowns, Label, InputRadio, InputCheck } from '~/common/components';
import { Assignee, MilestoneIndicator } from '~/features/issue/components';

export function IssueSidebar({ assignees, milestone, labels }) {
	const [isOpen, setIsOpen] = useState({
		assignee: false,
		label: false,
		milestone: false,
	});

	const toggleOpen = target =>
		setIsOpen(prev => ({ ...prev, [target]: !prev[target] }));
	console.log(assignees);
	return (
		<StyledWrapper>
			<StyledSideItem>
				<StyledTitleWrapper onClick={() => toggleOpen('assignee')}>
					<StyledTitle>담당자</StyledTitle>
					<IconPlus />
				</StyledTitleWrapper>
				{isOpen.assignee && (
					<StyledDropdown dropdownTitle='담당자 설정'>
						{assignees.map((assignee, index) => (
							<InputCheck
								key={index}
								listName={'assignees'}
								value={assignee.loginId}
								src={assignee.profileImage}
							/>
						))}
					</StyledDropdown>
				)}
				<StyledSideContent>
					{assignees &&
						assignees?.map((assignee, index) => (
							<Assignee key={index} assignee={assignee} />
						))}
				</StyledSideContent>
			</StyledSideItem>
			<StyledSideItem>
				<StyledTitleWrapper onClick={() => toggleOpen('label')}>
					<StyledTitle>레이블</StyledTitle>
					<IconPlus />
				</StyledTitleWrapper>
				{isOpen.label && (
					<StyledDropdown dropdownTitle='레이블 설정'>
						{labels.map((label, index) => (
							<InputRadio
								key={index}
								listName={'label'}
								value={label.name}
								bgColor={label.backgroundColor}
								fontColor={label.textColor}
							/>
						))}
					</StyledDropdown>
				)}
				<StyledSideContent>
					{labels &&
						labels?.map(label => <Label key={label.name} label={label} />)}
				</StyledSideContent>
			</StyledSideItem>
			<StyledSideItem>
				<StyledTitleWrapper onClick={() => toggleOpen('milestone')}>
					<StyledTitle>마일스톤</StyledTitle>
					<IconPlus />
				</StyledTitleWrapper>
				{/* {isOpen.milestone && (
					<StyledDropdown dropdownTitle='마일스톤 설정'>
					{milestone.map((mile, index) => (
						<InputRadio
							key={index}
							listName={'label'}
							value={label.name}
							bgColor={label.backgroundColor}
							fontColor={label.textColor}
						/>
					))}
				</StyledDropdown>
				)} */}
				<StyledSideContent>
					{/* {milestone &&
						milestone?.map((mile, index) => (
							<MilestoneIndicator milestone={mile} key={index} />
						))} */}
					<MilestoneIndicator milestone={milestone} />
				</StyledSideContent>
			</StyledSideItem>
		</StyledWrapper>
	);
}
const StyledWrapper = styled.div`
	width: 288px;
	border: 1px solid ${({ theme }) => theme.color.neutral.border.default};
	border-radius: ${({ theme }) => theme.radius.large};
	background: ${({ theme }) => theme.color.neutral.surface.strong};
`;
const StyledSideItem = styled.div`
	position: relative;
	padding: 32px;
	min-height: 88px;
	align-items: flex-start;
	border-bottom: 1px solid ${({ theme }) => theme.color.neutral.border.default};
	&:last-child {
		border-bottom: none;
	}
`;
const StyledDropdown = styled(Dropdowns)`
	top: 160px;
	left: 150px;
`;

const StyledTitleWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	cursor: pointer;
`;
const StyledTitle = styled.h4`
	${({ theme }) => theme.typography.medium[16]};
	color: ${({ theme }) => theme.color.neutral.text.default};
`;
const StyledSideContent = styled.div`
	margin-top: 16px;
	.label {
		margin-right: 8px;
		&:last-child {
			margin-right: 0;
		}
	}
`;
