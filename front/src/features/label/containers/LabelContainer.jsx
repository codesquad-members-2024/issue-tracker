import styled from 'styled-components';
import { useState } from 'react';

import { IconPlus } from '~/common/icons';
import { LabelMilestoneCounterProvider } from '~/context/LabelMilestoneCounter';
import { useLabelList } from '~/features/issue/hooks';
import {
	Tabs,
	ListHeader,
	ListBody,
	Button,
	Loading,
} from '~/common/components';
import { addLabel } from '~/features/label/apis';
import { LabelRegister, LabelListItem } from '~/features/label/components';

export function LabelContainer() {
	const [newLabel, setNewLabel] = useState(false);
	const { labelList, loading, fetchLabelList } = useLabelList();

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
					{loading && <Loading size='big' />}
					{labelList?.map(label => (
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
