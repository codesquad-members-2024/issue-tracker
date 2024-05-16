import styled from 'styled-components';
import { InputTextArea, ImageUpload } from '~/common/components';

export function IssueCommentEdit({ value, placeholder, onChange, onClick }) {
	return (
		<StyledWrapper>
			<InputTextArea
				value={value || ''}
				placeholder={placeholder}
				onChange={onChange}
				onClick={onClick}
				type='Input.TextArea'
			/>
			<ImageUpload />
		</StyledWrapper>
	);
}
const StyledWrapper = styled.div`
	background-color: ${({ theme }) => theme.color.neutral.surface.strong};
`;
