import styled from 'styled-components';
import { useState } from 'react';
import { IconPlus } from '~/common/icons';
import { Dropdown } from '~/common/components/Dropdown';

export function IssueSidebar() {
	const [isOpen, setIsOpen] = useState({
		assignee: false,
		label: false,
		milestone: false,
	});
	const toggleOpen = target =>
		setIsOpen(prev => ({ ...prev, [target]: !prev[target] }));
	return (
		<StyledWrapper>
			<StyledSideItem>
				<StyledTitleWrapper onClick={() => toggleOpen('assignee')}>
					<StyledTitle>담당자</StyledTitle>
					<IconPlus />
				</StyledTitleWrapper>
				{isOpen.assignee && <StyledDropdown />}
				<StyledSideContent></StyledSideContent>
			</StyledSideItem>
			<StyledSideItem>
				<StyledTitleWrapper onClick={() => toggleOpen('lable')}>
					<StyledTitle>레이블</StyledTitle>
					<IconPlus />
				</StyledTitleWrapper>
				{isOpen.label && <StyledDropdown />}
				<StyledSideContent></StyledSideContent>
			</StyledSideItem>
			<StyledSideItem>
				<StyledTitleWrapper onClick={() => toggleOpen('milestone')}>
					<StyledTitle>마일스톤</StyledTitle>
					<IconPlus />
				</StyledTitleWrapper>
				{isOpen.milestone && <StyledDropdown />}
				<StyledSideContent></StyledSideContent>
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
	height: ${({ $isOpen }) => ($isOpen ? 'auto' : '88px')};
	align-items: flex-start;
	border-bottom: 1px solid ${({ theme }) => theme.color.neutral.border.default};
	&:last-child {
		border-bottom: none;
	}
`;
const StyledDropdown = styled(Dropdown)`
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
`;
