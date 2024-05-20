import styled from 'styled-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconPlus } from '~/common/icons';
import { Tabs, ListHeader, ListBody, Button, Label } from '~/common/components';
import { LabelRegister, LabelListItem } from '~/features/label/components';

export function LabelContainer() {
	const labelArray = [
		{
			id: 2,
			name: 'documentation',
			description: 'documentation description',
			backgroundColor: '#008672',
			textColor: '#ffffff',
		},
		{
			id: 4,
			name: 'bug',
			description: 'bugggg description',
			backgroundColor: '#008672',
			textColor: '#ffffff',
		},
	];
	const [newLabel, setNewLabel] = useState(false);
	return (
		<>
			<StyledWrapper>
				<div className='container-header'>
					<Tabs labelCount={1} milestoneCount={0} />
					<Button
						type='button'
						size='small'
						buttonText='레이블 추가'
						icon={<IconPlus />}
						disabled={newLabel}
						onClick={() => {
							setNewLabel(true);
						}}
					/>
				</div>
				{newLabel && (
					<LabelRegister newLabel={newLabel} setNewLabel={setNewLabel} />
				)}
				<StyledListHeader>
					<StyledLabeCount>{3}개의 레이블</StyledLabeCount>
				</StyledListHeader>
				<ListBody>
					{labelArray.map(label => (
						<LabelListItem key={label.id} label={label} />
					))}
				</ListBody>
			</StyledWrapper>
		</>
	);
}
const StyledWrapper = styled.div`
	.container-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 24px;
	}
`;
const StyledLink = styled(Link)`
	display: flex;
	align-items: center;
	justify-content: center;
	column-gap: 4px;
	width: 128px;
	height: 40px;
	border-radius: ${({ theme }) => theme.radius.medium};
	background-color: ${({ theme }) => theme.color.brand.surface.default};
	${({ theme }) => theme.typography.medium[12]};
	color: ${({ theme }) => theme.color.brand.text.default};
`;
const StyledListHeader = styled(ListHeader)``;
const StyledLabeCount = styled.strong`
	${({ theme }) => theme.typography.bold[16]};
	color: ${({ theme }) => theme.color.neutral.text.default};
`;
