import styled from 'styled-components';
import { useEffect, useRef, useReducer } from 'react';
import { IconPlus } from '~/common/icons';
import { PopoverAssignee, Assignee } from '~/features/issue/components';
import { useCheckList } from '~/features/issue/hooks';

function listArrayReducer(state, action) {
	switch (action.type) {
		case 'UPDATE':
			return action.payload;
		default:
			throw new Error();
	}
}

export function IssueAside({ id, list, ...props }) {
	const [check, dispatchCheck] = useCheckList(id);
	const listArray = useRef(list ? [...list] : []);
	const [, forceUpdate] = useReducer(listArrayReducer, []);
	useEffect(() => {
		listArray.current = list ? [...list] : [];
		forceUpdate({ type: 'UPDATE', payload: listArray.current });
	}, [list]);
	const onChangeAssignee = e => {
		const { value, dataset, checked } = e.target;
		const newAssignee = {
			loginId: value,
			profileImage: dataset.src,
		};

		if (checked) {
			listArray.current = [...listArray.current, newAssignee];
		} else {
			listArray.current = listArray.current.filter(
				assignee => assignee.loginId !== value
			);
		}

		// Force a re-render
		forceUpdate({ type: 'UPDATE', payload: listArray.current });

		dispatchCheck({
			type: 'setAssignees',
			payload: newAssignee,
		});
	};

	return (
		<StyledWrapper {...props}>
			<StyledSideItem>
				<StyledTitleWrapper onClick={() => {}}>
					<StyledTitle>담당자</StyledTitle>
					<IconPlus />
					<PopoverAssignee
						dropdownTitle='담당자 설정'
						type='checkbox'
						onChange={onChangeAssignee}
						checkedItems={listArray.current.map(assignee => assignee.loginId)}
					/>
				</StyledTitleWrapper>
				<StyledContent>
					{listArray.current.map((assignee, index) => (
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
	height: 410px;
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
