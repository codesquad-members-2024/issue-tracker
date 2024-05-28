import styled from 'styled-components';
import { useEffect, useRef, useReducer, useState } from 'react';
import { IconPlus } from '~/common/icons';
import { Label } from '~/common/components';
import {
	PopoverAssignee,
	Assignee,
	PopoverLabel,
} from '~/features/issue/components';
import { useCheckList } from '~/features/issue/hooks';

function listArrayReducer(state, action) {
	switch (action.type) {
		case 'UPDATE':
			return action.payload;
		default:
			throw new Error();
	}
}

function lableArrayReducer(state, action) {
	switch (action.type) {
		case 'UPDATE':
			return action.payload;
		default:
			throw new Error();
	}
}

export function IssueAside({ id, list, labels, getAssignees, ...props }) {
	const [check, dispatchCheck] = useCheckList(id);
	const listArray = useRef(list ? [...list] : []);
	const lableArray = useRef(labels ? [...labels] : []);

	const [, forceUpdate] = useReducer(listArrayReducer, []);
	const [, forceUpdateLabel] = useReducer(lableArrayReducer, []);

	const [isOpen, setIsOpen] = useState({
		assignee: false,
		label: false,
		milestone: false,
	});

	// 셀렉트박스 체크 여부

	const toggleOpen = target =>
		setIsOpen(prev => ({ ...prev, [target]: !prev[target] }));

	useEffect(() => {
		listArray.current = list ? [...list] : [];
		forceUpdate({ type: 'UPDATE', payload: listArray.current });
	}, [list]);

	useEffect(() => {
		lableArray.current = labels ? [...labels] : [];
		forceUpdateLabel({ type: 'UPDATE', payload: lableArray.current });
	}, [labels]);

	const onChangeAssignee = e => {
		const { value, dataset, checked } = e.target;
		const newAssignee = {
			loginId: value,
			profileImage: dataset.src,
		};

		if (checked) {
			listArray.current = [...listArray.current, newAssignee];
			// getAssignees(listArray.current);
		} else {
			listArray.current = listArray.current.filter(
				assignee => assignee.loginId !== value
			);
			// getAssignees(listArray.current);
		}

		// Force a re-render
		forceUpdate({ type: 'UPDATE', payload: listArray.current });

		dispatchCheck({
			type: 'setAssignees',
			payload: newAssignee,
		});
	};

	const onChangeLabel = e => {
		const { id, value, dataset, checked } = e.target;
		const newLabel = {
			id,
			name: value,
			backgroundColor: dataset.bgcolor,
			textColor: dataset.textcolor,
		};

		if (checked) {
			lableArray.current = [...lableArray.current, newLabel];
		} else {
			// !! 왜 label의 id로는 안되지?
			lableArray.current = lableArray.current.filter(
				label => label.name !== newLabel.name
			);
		}

		// Force a re-render
		forceUpdateLabel({ type: 'UPDATE', payload: lableArray.current });

		dispatchCheck({
			type: 'setLabels',
			payload: newLabel,
		});
	};

	return (
		<StyledWrapper {...props}>
			<StyledSideItem>
				<StyledTitleWrapper onClick={() => toggleOpen('assignee')}>
					<StyledTitle>담당자</StyledTitle>
					<IconPlus />
					{isOpen.assignee && (
						<PopoverAssignee
							dropdownTitle='담당자 설정'
							type='checkbox'
							onChange={onChangeAssignee}
							checkedItems={listArray.current.map(assignee => assignee.loginId)}
						/>
					)}
				</StyledTitleWrapper>
				<StyledContent>
					{listArray.current.map((assignee, index) => (
						<Assignee key={index} assignee={assignee} />
					))}
				</StyledContent>
			</StyledSideItem>

			<StyledSideItem>
				<StyledTitleWrapper onClick={() => toggleOpen('label')}>
					<StyledTitle>레이블</StyledTitle>
					<IconPlus />
					{isOpen.label && (
						<PopoverLabel
							dropdownTitle='레이블 설정'
							type='checkbox'
							onChange={onChangeLabel}
							checkedItems={lableArray.current.map(label => label.name)}
						/>
					)}
				</StyledTitleWrapper>
				<StyledContent>
					{lableArray.current.map((label, index) => (
						<Label
							key={index}
							name={label.name}
							backgroundColor={label.backgroundColor}
							textColor={label.textColor}
						/>
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
	padding: 32px;
	align-items: flex-start;
	border-bottom: 1px solid ${({ theme }) => theme.color.neutral.border.default};
	&:last-child {
		border-bottom: none;
	}
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
	height: 100px;
	.label {
		margin-bottom: 8px;
		&:last-child {
			margin-right: 0;
		}
	}
`;
