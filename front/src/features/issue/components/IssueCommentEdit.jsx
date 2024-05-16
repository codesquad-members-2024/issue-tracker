import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { InputTextArea, ImageUpload } from '~/common/components';

export function IssueCommentEdit({
	className,
	value,
	placeholder,
	onChange,
	onClick,
}) {
	const [localValue, setLocalValue] = useState(value || '');
	const [bg, setBg] = useState(false);
	const [fileUrl, setFileUrl] = useState([]);

	const handleUploadSuccess = url => {
		const fileURLValue = `![이미지](${url})`;
		const combinedValue = `${localValue}\n${fileURLValue}`;
		setLocalValue(combinedValue);
		setFileUrl(prevUrls => [...prevUrls, fileURLValue]);
	};

	const handleChange = e => {
		setLocalValue(e.target.value);
	};
	useEffect(() => {
		setLocalValue(value || '');
	}, [value]);

	// TODO: 마크다운으로 들어간 이미지 경로 지우면 파일도 삭제 해야하나........
	return (
		<StyledWrapper $bg={bg} className={className}>
			<InputTextArea
				value={value}
				placeholder={placeholder}
				onChange={onChange}
				onClick={onClick}
				type='Input.TextArea'
				onFocus={() => setBg(true)}
				onBlur={() => setBg(false)}
			/>
			<>{fileUrl}</>
			<ImageUpload handleUploadSuccess={handleUploadSuccess} />
		</StyledWrapper>
	);
}
const StyledWrapper = styled.div`
	height: 100%;
	background-color: ${({ theme, $bg }) =>
		$bg
			? theme.color.neutral.surface.strong
			: theme.color.neutral.surface.bold};
	border: 1px solid transparent;
	border-color: ${({ theme, $bg }) =>
		$bg ? theme.color.neutral.border.active : 'transparent'};
	overflow: hidden;
	border-radius: ${({ theme }) => theme.radius.large};
	textarea {
		height: 100%;
		max-height: 100%;
		background-color: ${({ theme }) => theme.color.neutral.surface.bold};
		&:hover {
			background-color: ${({ theme }) => theme.color.neutral.surface.bold};
		}
		&:focus {
			background-color: ${({ theme }) => theme.color.neutral.surface.strong};
		}
	}
`;
