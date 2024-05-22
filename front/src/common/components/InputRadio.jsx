import { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { IconCheckCircle, IconCheckOff, IconChecks } from '~/common/icons';
/**
 * listName = assignees, labels, milestones, writers
 * value = [] or [id1, id2, id3, ...]
 */
export function InputRadio({
	listName,
	value,
	src,
	bgColor,
	fontColor,
	onChange,

	...props
}) {
	const radio = useRef(null);

	return (
		<StyledLabel {...props} className='radio'>
			<span>
				{src && <img src={src} alt={src} />}
				{bgColor && <StyledCircle $bgColor={bgColor} className='aaa' />}
				<StyledValue $fontColor={fontColor}>{value}</StyledValue>
			</span>
			{/* {checked ? <IconCheckCircle /> : <IconCheckOff />} */}
			<input
				name={listName}
				value={value}
				type='radio'
				ref={radio}
				onChange={onChange}
			/>
		</StyledLabel>
	);
}
const StyledLabel = styled.label`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 8px 16px;
	background: ${({ theme }) => theme.color.neutral.surface.strong};
	color: ${({ theme }) => theme.color.neutral.text.default};
	${({ theme }) => theme.typography.medium[16]};
	span {
		display: flex;
		column-gap: 8px;
		align-items: center;
	}

	img {
		width: 20px;
		height: 20px;
		border-radius: 50%;
	}
`;
const StyledCircle = styled.b`
	display: block;
	width: 20px;
	height: 20px;
	border-radius: 50%;
	background-color: ${({ $bgColor }) =>
		$bgColor || 'theme.color.neutral.surface.default'};
`;
const StyledValue = styled.strong`
	${({ theme }) => theme.typography.medium[16]};
	color: ${({ theme }) => theme.color.neutral.text.strong};
`;
