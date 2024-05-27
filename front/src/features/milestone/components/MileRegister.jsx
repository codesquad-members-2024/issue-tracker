import styled from 'styled-components';
import { useState, useEffect, useReducer } from 'react';
import { IconPlus, IconXsquare, IconEdit } from '~/common/icons';
import { Input } from 'antd';
import { Button } from '~/common/components';
import { useMilestoneList } from '~/features/issue/hooks';
import { postMilestone, putMilestone } from '~/features/milestone/apis';

function milestoneReducer(state, action) {
	switch (action.type) {
		case 'SET_NAME':
			return { ...state, name: action.payload };
		case 'SET_DUEDATE':
			return { ...state, dueDate: action.payload };
		case 'SET_DESCRIPTION':
			return { ...state, description: action.payload };
		default:
			return state;
	}
}
export function MileRegister({
	milestone,
	isEdit,
	setIsEdit,
	newMilestone,
	setNewMilestone,
}) {
	const initialMilestone = {
		name: milestone?.name || '',
		description: milestone?.description || '',
		dueDate: milestone?.dueDate || '',
	};
	const [state, dispatch] = useReducer(milestoneReducer, initialMilestone);
	const { fetchMilestoneList } = useMilestoneList();

	const addMilestone = async () => {
		try {
			console.log('Milestone Data:', state);
			const result = await postMilestone(state);
			if (result.error) {
				console.error('Server Error:', result.error); // 서버 에러 확인
			} else {
				await fetchMilestoneList();
				setNewMilestone(!newMilestone);
			}
		} catch (error) {
			console.error('Error:', error);
		}
	};

	return (
		<StyledRegister>
			<h3>{isEdit ? '마일스톤 편집' : '새로운 마일스톤 추가'}</h3>
			<div className='register'>
				<div className='inputs'>
					<Input
						placeholder='마일스톤의 이름을 입력하세요'
						value={state.name}
						onChange={e =>
							dispatch({ type: 'SET_NAME', payload: e.target.value })
						}
						variant='filled'
					/>
					<Input
						placeholder='완료일(선택)'
						variant='filled'
						value={state.dueDate}
						type='date'
						onChange={e =>
							dispatch({ type: 'SET_DUEDATE', payload: e.target.value })
						}
					/>
				</div>
				<Input
					placeholder='마일스톤에 대한 설명을 입력하세요'
					value={state.description}
					onChange={e =>
						dispatch({ type: 'SET_DESCRIPTION', payload: e.target.value })
					}
					variant='filled'
				/>
			</div>
			<div className='buttons'>
				{isEdit ? (
					<>
						<Button
							type='button'
							buttonType='outlined'
							size='small'
							buttonText='취소'
							onClick={() => {
								setIsEdit(false);
							}}
							icon={<IconXsquare />}
						/>
						<Button
							type='button'
							size='small'
							buttonText='편집 완료'
							icon={<IconEdit />}
						/>
					</>
				) : (
					<>
						<Button
							className='cancel'
							type='button'
							buttonType='outlined'
							size='small'
							buttonText='취소'
							onClick={() => {
								setNewMilestone(!newMilestone);
							}}
							icon={<IconXsquare />}
						/>
						<Button
							type='button'
							size='small'
							buttonText='완료'
							disabled={false}
							onClick={addMilestone}
							icon={<IconPlus />}
						/>
					</>
				)}
			</div>
		</StyledRegister>
	);
}

const StyledRegister = styled.section`
	width: 100%;
	height: 284px;
	border: 1px solid ${({ theme }) => theme.color.neutral.border.default};
	border-radius: ${({ theme }) => theme.radius.medium};
	background-color: ${({ theme }) => theme.color.neutral.surface.strong};
	padding: 32px;
	margin-bottom: 24px;
	h3 {
		${({ theme }) => theme.typography.bold[20]};
		margin-bottom: 24px;
	}
	.buttons {
		display: flex;
		margin-top: 24px;
		justify-content: flex-end;
		width: 100%;
		column-gap: 24px;
	}
	.register {
		width: 100%;
		flex-direction: column;
	}
	.inputs {
		display: flex;
		justify-content: space-between;
		width: 100%;
		gap: 16px;
		align-items: center;
		margin-bottom: 16px;
		input {
			width: calc(50% - 16px);
		}
	}
`;
