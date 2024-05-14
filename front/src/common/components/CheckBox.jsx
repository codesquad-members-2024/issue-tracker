import styled from 'styled-components';
import { useState } from 'react';
import { IconCheck, IconCheckActive, IconCheckDisabled } from '~/common/icons';

export function CheckBox({ className }) {
	return (
		<StyledWrapper className={className}>
			<HiddenCheckbox type='checkbox' />
		</StyledWrapper>
	);
}

const StyledWrapper = styled.div`
	position: relative;
	width: 16px;
	height: 16px;
	padding: 0;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	//TODO: 아이콘 색상 변경해야함
	i {
		color: ${({ theme }) => theme.color.palette.blue};
		transition: all 1s;
	}
`;

const HiddenCheckbox = styled.input`
	width: 100%;
	height: 100%;
	margin: 0;
	cursor: pointer;
`;
