import styled from 'styled-components';
import { InputTextArea } from '~/common/components';
import { ImageUpload } from '../../../common/components';
export function IssueCommentEdit() {
	return (
		<StyledWrapper>
			<InputTextArea />
			<ImageUpload />
		</StyledWrapper>
	);
}
const StyledWrapper = styled.div`
	background-color: ${({ theme }) => theme.color.neutral.surface.strong};
`;
