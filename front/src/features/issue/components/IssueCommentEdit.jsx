import { useState } from 'react';
import styled from 'styled-components';
import { InputTextArea, ImageUpload } from '~/common/components';

export function IssueCommentEdit({ value, placeholder, onChange, onClick }) {
	const [fileUrl, setFileUrl] = useState('');
	const handleUploadSuccess = url => {
		setFileUrl(url);
	};

	const fileURLValue = fileUrl ? `![이미지](${fileUrl})` : '';

	const combinedValue = value + (fileUrl ? `\n${fileURLValue}` : '');
	return (
		<StyledWrapper>
			<InputTextArea
				value={combinedValue}
				placeholder={placeholder}
				onChange={onChange}
				onClick={onClick}
				type='Input.TextArea'
			/>
			<ImageUpload handleUploadSuccess={handleUploadSuccess} />
		</StyledWrapper>
	);
}
const StyledWrapper = styled.div`
	background-color: ${({ theme }) => theme.color.neutral.surface.strong};
`;
