import styled from 'styled-components';
import { MilestoneContainer } from '~/features/milestone/containers';

export function MilestonePage() {
	return (
		<StyledWrapper>
			<MilestoneContainer />
		</StyledWrapper>
	);
}
const StyledWrapper = styled.div`
	padding: 0;
`;
