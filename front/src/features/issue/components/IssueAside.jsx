import styled from 'styled-components';
import { useState } from 'react';
import { IconPlus } from '~/common/icons';
import { Dropdowns } from '~/common/components';
import { PopoverAssignee, Assignee } from '~/features/issue/components';
import { useCheckList } from '~/features/issue/hooks';

export function IssueAside({ ...props }) {
	const [check, dispatchCheck] = useCheckList();

	const [isOpen, setIsOpen] = useState({
		assignee: false,
		label: false,
		milestone: false,
	});
	console.log('check.selectedAssignees', check.selectedAssignees);
	// 셀렉트박스 체크 여부
	const onChangeAssignee = e => {
		const { value, dataset } = e.target;
		dispatchCheck({
			type: 'setAssignees',
			payload: {
				loginId: value,
				profileImage: dataset.src,
			},
		});
	};
	const toggleOpen = target =>
		setIsOpen(prev => ({ ...prev, [target]: !prev[target] }));

	return (
		<StyledWrapper {...props}>
			<StyledSideItem>
				<StyledTitleWrapper onClick={() => toggleOpen('assignee')}>
					<StyledTitle>담당자</StyledTitle>
					<IconPlus />
					<PopoverAssignee
						dropdownTitle='담당자 설정'
						type='checkbox'
						onChange={onChangeAssignee}
					/>
				</StyledTitleWrapper>
				<StyledContent>
					{check.selectedAssignees?.map((assignee, index) => (
						<Assignee key={index} assignee={assignee} />
					))}
				</StyledContent>
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
	top: 70px;
	right: 0;
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
const StyledContent = styled.div`
	margin-top: 16px;
	.label {
		margin-bottom: 8px;
		&:last-child {
			margin-right: 0;
		}
	}
`;
