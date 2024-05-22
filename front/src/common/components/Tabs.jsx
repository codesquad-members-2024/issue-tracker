import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { IconLabel, IconLandmark } from '~/common/icons';
import { LabelMilestoneCounterProvider } from '~/context/LabelMilestoneCounter';
import { useLabelMilestoneCounter } from '~/context/hooks';

export function Tabs({ labelCount = 1, milestoneCount = 0, ...props }) {
	// const { labelCounter, milestoneCounter } = useLabelMilestoneCounter;
	return (
		// <LabelMilestoneCounterProvider>
		<StyledWrapper {...props}>
			<Link to='/labels'>
				<IconLabel />
				레이블 ({labelCount})
			</Link>
			<Link to='/milestones'>
				<IconLandmark />
				마일스톤 ({milestoneCount})
			</Link>
		</StyledWrapper>
		// </LabelMilestoneCounterProvider>
	);
}
const StyledWrapper = styled.div`
	display: flex;
	width: 320px;
	height: 40px;
	border: 1px solid ${({ theme }) => theme.color.neutral.border.default};
	border-radius: ${({ theme }) => theme.radius.medium};
	a {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 159.5px;
		height: 40px;
		column-gap: 4px;
		color: ${({ theme }) => theme.color.neutral.text.default};
		${({ theme }) => theme.typography.medium[14]};
		background-color: 
		&:first-child {
			border-right: 1px solid
				${({ theme }) => theme.color.neutral.border.default};
		}
	}
`;
