import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Input } from 'antd';
const { TextArea } = Input;

export function InputTextArea({
	className,
	placeholder = '코멘트를 입력해 주세요✍🏻',
	value,
	onChange,
	onClick,
}) {
	const [showCount, setShowCount] = useState(false);
	const [wordsCount, setWordsCount] = useState(0);

	const countWords = value => {
		setWordsCount(value.length);
	};
	useEffect(() => {
		countWords(value);
	}, [value]);
	return (
		<StyledWrapper className={className}>
			<StyledTextArea
				placeholder={placeholder}
				value={value}
				onChange={e => {
					onChange(e);
					countWords(e.target.value);
				}}
				onClick={onClick}
				onBlur={() => {
					setShowCount(false);
				}}
				onFocus={() => {
					setShowCount(true);
				}}
			/>
			{showCount && <i>띄어쓰기 포함 {wordsCount}자</i>}
		</StyledWrapper>
	);
}
const StyledWrapper = styled.div`
	position: relative;

	height: 132px;

	// border: 1px solid ${({ $border }) => ($border ? '#003f66' : '#0075ca')};
	.ant-input-outlined:focus-within {
		box-shadow: none;
	}
	.ant-input-show-count {
		${({ theme }) => theme.typography.medium[12]};
		color: ${({ theme }) => theme.color.neutral.text.weak};
	}
	i {
		position: absolute;
		right: 44px;
		bottom: 16px;
		${({ theme }) => theme.typography.medium[12]};
		color: ${({ theme }) => theme.color.neutral.text.weak};
		font-style: normal;
	}
`;
const StyledTextArea = styled(TextArea)`
	max-height: 500px;
	height: 132px;
	border: none;
	&&& {
		border-color: transparent;
	}

	&&&:hover {
		border-color: transparent;
	}

	&&&:focus,
	&&&:active {
		border-color: transparent;
		box-shadow: none;
	}
`;
