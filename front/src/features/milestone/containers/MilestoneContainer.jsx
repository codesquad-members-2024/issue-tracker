import styled from 'styled-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconPlus, IconAlertCircle, IconArchive } from '~/common/icons';
import { LabelMilestoneCounterProvider } from '~/context/LabelMilestoneCounter';
import { Tabs, ListHeader, ListBody, Button, Label } from '~/common/components';
import { MileRegister, MileListItem } from '~/features/milestone/components';

export function MilestoneContainer() {
	const milestoneArray = [
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
	const [newMilestone, setNewMilestone] = useState(false);
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
						buttonText='마일스톤 추가'
						icon={<IconPlus />}
						disabled={newMilestone}
						onClick={() => {
							setNewMilestone(true);
						}}
					/>
				</div>
				<MileRegister
					newMilestone={newMilestone}
					setNewMilestone={setNewMilestone}
				/>
				{newMilestone && <div></div>}
				<StyledListHeader>
					<strong>
						<IconAlertCircle />
						열린 마일스톤(2)
					</strong>
					<strong>
						<IconArchive />
						닫힌 마일스톤(0)
					</strong>
				</StyledListHeader>
				<ListBody>
					<MileListItem />
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
const StyledListHeader = styled(ListHeader)`
	display: flex;
	align-items: center;
	gap: 24px;
	justify-content: flex-start;
	strong {
		display: flex;
		align-items: center;
		gap: 4px;
	}
`;
