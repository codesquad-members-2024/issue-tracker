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
	onFocus,
	onBlur,
}) {
	const [localValue, setLocalValue] = useState(value);
	const [showCount, setShowCount] = useState(false);
	useEffect(() => {
		setLocalValue(localValue);
	}, [localValue]);
	return (
		<StyledWrapper className={className}>
			<StyledTextArea
				placeholder={placeholder}
				value={localValue}
				onChange={e => {
					setLocalValue(e.target.value);
					onChange(e);
				}}
				onClick={onClick}
				onBlur={() => {
					onBlur();
					setShowCount(false);
				}}
				onFocus={() => {
					onFocus();
					setShowCount(true);
				}}
			/>
			{/* {showCount && <i>띄어쓰기 포함 자</i>} */}
		</StyledWrapper>
	);
}
const StyledWrapper = styled.div`
	position: relative;

	min-height: 132px;
	height: 100%;
	max-height: 500px;

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
	// max-height: 500px;
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
