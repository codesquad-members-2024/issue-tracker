import styled from 'styled-components';
import { useEffect, useState } from 'react';
import {
	IconPlus,
	IconXsquare,
	IconRefresh,
	IconChevronDown,
	IconEdit,
} from '~/common/icons';
import { Input } from 'antd';
import { Button, Label, InputRadio } from '~/common/components';

export function MileRegister({
	isEdit,
	setIsEdit,

	newLabel,
	setNewLabel,
}) {
	const [date, setDate] = useState('2024.05.22');
	return (
		<StyledRegister>
			<h3>{isEdit ? '마일스톤 편집' : '새로운 마일스톤 추가'}</h3>
			<div className='register'>
				<div className='inputs'>
					<Input
						placeholder='마일스톤의 이름을 입력하세요'
						value={2}
						onChange={() => {}}
						variant='filled'
					/>
					<Input
						placeholder='완료일(선택)'
						variant='filled'
						value={date}
						type='date'
						onChange={e => {
							setDate(e.target.value);
						}}
					/>
				</div>
				<Input
					placeholder='마일스톤에 대한 설명을 입력하세요'
					value={2}
					onChange={() => {}}
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
							onClick={() => {}}
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
							type='button'
							buttonType='outlined'
							size='small'
							buttonText='취소'
							onClick={() => {}}
							icon={<IconXsquare />}
						/>
						<Button
							type='button'
							size='small'
							buttonText='완료'
							disabled={true}
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
