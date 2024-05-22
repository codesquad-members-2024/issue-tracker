import { useState } from 'react';
import styled from 'styled-components';
import {
	IconEdit,
	IconTrash,
	IconArchive,
	IconMilestone,
	IconCalendar,
} from '~/common/icons';
import { Button } from '~/common/components';
import { MilestoneIndicator } from '~/features/issue/components';
import { MileRegister } from '~/features/milestone/components';

export function MileListItem({ milestone }) {
	const [isEdit, setIsEdit] = useState(false);
	return (
		<StyledListItem key={1}>
			{isEdit ? (
				<MileRegister
					isEdit={isEdit}
					setIsEdit={setIsEdit}
					milestone={milestone}
				/>
			) : (
				<>
					<StyledMileInfo>
						<p className='title'>
							<StyledIconMilestone />
							<strong>마일스톤 이름</strong>
							<span className='due'>
								<IconCalendar />
								<span>완료일 일정</span>
							</span>
						</p>
						<p className='description'>
							레이블에 대한 설명이 있는 경우에만 렌더링
						</p>
					</StyledMileInfo>
					<StyledOptions>
						<div className='button-list'>
							<Button
								type='button'
								buttonType='ghost'
								size='small'
								buttonText='닫기'
								icon={<IconArchive />}
								onClick={() => setIsEdit(true)}
							/>
							<Button
								type='button'
								buttonType='ghost'
								size='small'
								buttonText='편집'
								icon={<IconEdit />}
								onClick={() => setIsEdit(true)}
							/>
							<Button
								type='button'
								buttonType='ghost'
								size='small'
								buttonText='삭제'
								icon={<IconTrash />}
							/>
						</div>
						<div className='milestone-info'>
							<MilestoneIndicator
								milestone={{ progress: 40, name: '고치자' }}
								detail={true}
							/>
						</div>
					</StyledOptions>
				</>
			)}
		</StyledListItem>
	);
}
const StyledListItem = styled.div`
	padding: 32px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	column-gap: 32px;
	border-bottom: 1px solid ${({ theme }) => theme.color.neutral.border.default};
	&:last-child {
		border-bottom: none;
	}
	.button-list {
		display: flex;
		column-gap: 24px;
		button {
			min-width: auto;
			width: 41px;
			padding: 8px 0;
			column-gap: 4px;
			&:last-child {
				color: ${({ theme }) => theme.color.danger.text.default};
			}
		}
	}
`;

const StyledMileInfo = styled.div`
	display: flex;
	flex-direction: column;
	.title {
		display: flex;
		align-items: center;
		gap: 8px;
		${({ theme }) => theme.typography.medium[16]};
		strong {
			color: ${({ theme }) => theme.color.neutral.text.strong};
		}
		.due {
			display: flex;
			align-items: center;
			gap: 8px;
			margin-left: 8px;
			color: ${({ theme }) => theme.color.neutral.text.weak};
			${({ theme }) => theme.typography.medium[12]};
		}
	}
	.description {
		margin-top: 8px;
		color: ${({ theme }) => theme.color.neutral.text.weak};
	}
`;
const StyledOptions = styled.div`
	display: flex;
	flex-direction: column;
`;
const StyledIconMilestone = styled(IconMilestone)`
	color: ${({ theme }) => theme.color.palette.blue};
`;
