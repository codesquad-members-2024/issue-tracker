import styled from 'styled-components';
import { useState } from 'react';

import { IconPlus } from '~/common/icons';
import { LabelMilestoneCounterProvider } from '~/context/LabelMilestoneCounter';
import { Tabs, ListHeader, ListBody, Button } from '~/common/components';
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
					<LabelMilestoneCounterProvider>
						<Tabs />
					</LabelMilestoneCounterProvider>

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
const StyledListHeader = styled(ListHeader)``;
const StyledLabeCount = styled.strong`
	${({ theme }) => theme.typography.bold[16]};
	color: ${({ theme }) => theme.color.neutral.text.default};
`;
