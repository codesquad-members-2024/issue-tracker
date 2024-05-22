import { useState } from 'react';
import styled from 'styled-components';
import { IconEdit, IconTrash } from '~/common/icons';
import { Button, Label } from '~/common/components';
import { putLabel } from '~/features/label/apis';
import { LabelRegister } from '~/features/label/components';

export function LabelListItem({ label }) {
	const [isEdit, setIsEdit] = useState(false);

	const handleEditLabel = () => {
		putLabel(label.id, label);
	};

	return (
		<StyledListItem key={label.id}>
			{isEdit ? (
				<LabelRegister isEdit={isEdit} setIsEdit={setIsEdit} label={label} />
			) : (
				<>
					<StyledLabelInfo>
						<Label
							className='label'
							name={label.name}
							textColor={label.textColor}
							backgroundColor={label.backgroundColor}
						/>
						<p>{label.description}</p>
					</StyledLabelInfo>
					<div className='button-list'>
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
				</>
			)}
		</StyledListItem>
	);
}
const StyledListItem = styled.div`
	padding: 32px;
	display: flex;
	align-items: center;
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

const StyledLabelInfo = styled.span`
	width: 100%;
	display: flex;
	column-gap: 32px;
	align-items: center;
	p {
		flex: 1 1 100%;
	}
`;
