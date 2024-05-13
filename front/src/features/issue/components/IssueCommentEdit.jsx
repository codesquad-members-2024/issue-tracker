import styled from 'styled-components';
import { InputText } from '~/common/components';
export function IssueCommentEdit() {
	return (
		<StyledWrapper>
			<InputText />
		</StyledWrapper>
	);
}
const StyledWrapper = styled.div`
	background-color: ${({ theme }) => theme.color.neutral.surface.strong};
`;
