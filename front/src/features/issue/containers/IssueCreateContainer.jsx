import { useState, useReducer } from 'react';
import styled from 'styled-components';
import { IconXsquare } from '~/common/icons';
import { IssueSidebar, IssueCommentEdit } from '~/features/issue/components';
import { Button, InputTitleEdit } from '~/common/components';
import { useUser } from '../../../common/hooks/useUser';
import { useLabelList, useMilestoneList } from '~/features/issue/hooks';
import { postIssueDetail } from '~/features/issue/apis';
import { useNavigate } from 'react-router-dom';

const initialState = {
	title: '',
	content: '',
	selectedAssignees: [],
	selectedLabels: [],
	selectedMilestone: null,
};

function issueReducer(state, action) {
	switch (action.type) {
		case 'SET_TITLE':
			return { ...state, title: action.payload };
		case 'SET_CONTENT':
			return { ...state, content: action.payload };
		case 'TOGGLE_ASSIGNEE':
			return {
				...state,
				selectedAssignees: state.selectedAssignees.includes(action.payload)
					? state.selectedAssignees.filter(a => a !== action.payload)
					: [...state.selectedAssignees, action.payload],
			};
		case 'TOGGLE_LABEL':
			return {
				...state,
				selectedLabels: state.selectedLabels.includes(action.payload)
					? state.selectedLabels.filter(l => l !== action.payload)
					: [...state.selectedLabels, action.payload],
			};
		case 'SET_MILESTONE':
			return { ...state, selectedMilestone: action.payload };
		default:
			return state;
	}
}

export function IssueCreateContainer() {
	const [state, dispatch] = useReducer(issueReducer, initialState);
	const navigate = useNavigate();
	const { user } = useUser();
	const { labelList } = useLabelList();
	const { milestoneList } = useMilestoneList();

	const handleCreateIssue = async () => {
		const issueData = {
			title: state.title,
			content: state.content,
			milestoneId: state.selectedMilestone?.id || null,
			issueAssignees: state.selectedAssignees.map(assignee => ({
				userLoginId: assignee,
			})),
			issueLabels: state.selectedLabels.map(label => {
				const labelObj = labelList.find(l => l.name === label);
				return { labelId: labelObj.id };
			}),
		};
		console.log('포스트 요청', issueData);
		try {
			const id = await postIssueDetail(issueData);
			navigate(`/issues/${id}`);
		} catch (error) {
			console.error('postIssueDetail', error);
		}
	};

	return (
		<StyledWrapper>
			<h2>새로운 이슈 작성</h2>
			<StyledContent>
				<section>
					<img
						src='https://avatars.githubusercontent.com/u/58014235?v=4'
						alt='양시미'
					/>
					<StyledInputWrapper>
						<InputTitleEdit
							placeholder='제목'
							value={state.title}
							onChange={e =>
								dispatch({ type: 'SET_TITLE', payload: e.target.value })
							}
						/>
						<StyledIssueCommentEdit
							placeholder='코멘트를 입력하세요.'
							value={state.content}
							onChange={e =>
								dispatch({ type: 'SET_CONTENT', payload: e.target.value })
							}
						/>
					</StyledInputWrapper>
				</section>
				<IssueSidebar
					assignees={user}
					labels={labelList}
					milestones={milestoneList}
					selectedAssignees={state.selectedAssignees}
					selectedLabels={state.selectedLabels}
					selectedMilestone={state.selectedMilestone}
					dispatch={dispatch}
				/>
			</StyledContent>
			<StyledFooter>
				<Button
					type='button'
					size='small'
					buttonType='ghost'
					buttonText='작성 취소'
					icon={<IconXsquare />}
					onClick={() => {
						console.log('취소 버튼 클릭');
					}}
				/>
				<Button
					type='button'
					size='large'
					buttonText='완료'
					onClick={handleCreateIssue}
				/>
			</StyledFooter>
		</StyledWrapper>
	);
}
const StyledWrapper = styled.div`
	width: 100%;
	h2 {
		padding-bottom: 24px;
		margin-bottom: 24px;
		color: ${({ theme }) => theme.color.neutral.text.strong};
		${({ theme }) => theme.typography.bold[32]};
		border-bottom: 1px solid
			${({ theme }) => theme.color.neutral.border.default};
	}
`;
const StyledContent = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: flex-start;
	column-gap: 24px;
	section {
		width: 100%;
		display: flex;
		align-items: flex-start;
		column-gap: 24px;
		img {
			width: 32px;
			height: 32px;
			border-radius: 50%;
		}
	}
`;
const StyledInputWrapper = styled.div`
	width: calc(100% - 56px);
	height: 100%;
`;
const StyledIssueCommentEdit = styled(IssueCommentEdit)`
	margin-top: 8px;
	height: 100%;
	textarea {
		height: 100%;
	}
`;
const StyledFooter = styled.section`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	column-gap: 32px;
	margin-top: 24px;
	padding: 24px 0 80px;
	border-top: 1px solid ${({ theme }) => theme.color.neutral.border.default};
`;
