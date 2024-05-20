import styled from 'styled-components';
import { useState } from 'react';
import { InputRadio, InputCheck } from '~/common/components';
import { theme } from '~/styles/theme';

//TODO: Dropdown 컴포넌트 타입별로 정리
/**
 *
 * 담당자 필터
 * - 담당자가 없는 이슈 [라디오]
 * - (이미지) 유저 [라디오]
 *
 * 레이블 필터
 * - 레이블이 없는 이슈 [라디오]
 * - (레이블 색상) 레이블명 [라디오]
 *
 * 마일스톤 필터
 * - 마일스톤이 없는 이슈 [라디오]
 * - 그룹프로젝트: 이슈트래커 [라디오]
 *
 * 작성자 필터
 * - (이미지) 유저 [라디오]
 */

export function Dropdowns({
	dropdownTitle = '',
	listName = '',
	value,
	src,
	children,
	className,
}) {
	return (
		<StyledWrapper className={className}>
			<h5>{dropdownTitle}</h5>
			<StyledList>{children}</StyledList>
		</StyledWrapper>
	);
}
const StyledWrapper = styled.div`
	// position: absolute;
	z-index: 10;
	top: 50%;
	left: 50%;

	min-width: 240px;
	// TODO: 지울 코드

	border: 1px solid ${theme.color.neutral.border.default};
	border-radius: ${theme.radius.large};
	overflow: hidden;
	background-color: ${theme.color.neutral.surface.strong};
	h5 {
		text-align: left;
		padding: 8px 16px;
		${theme.typography.medium[12]};
		color: ${theme.color.neutral.text.weak};
		background-color: ${theme.color.neutral.surface.default};
	}
`;
const StyledList = styled.div`
	height: 100%;
`;
const StyledRadioGroup = styled.div`
	width: 100%;
	label {
		padding: 8px 16px;
		display: flex;
		flex-direction: row-reverse;
		align-items: center;
		margin: 0;
		border-top: 1px solid ${theme.color.neutral.border.default};
		&:hover {
			background-color: ${theme.color.neutral.surface.bold};
			.ant-radio .ant-radio-inner {
				border-color: ${theme.color.neutral.text.default};
			}
			b {
				color: ${theme.color.neutral.text.strong};
			}
		}
		input + .ant-radio-inner {
			border: 1.5px solid ${theme.color.neutral.text.default};
		}
		.ant-radio-checked .ant-radio-inner {
			border-color: transparent;
			background-color: #fff;
			&:after {
				content: '';
				background-color: transparent;
			}
		}

		span {
			&:first-child {
				flex-shrink: 1;
				flex-grow: 1;
				flex-basis: 24px;
			}
			&:last-child {
				position: relative;
				display: flex;
				padding: 0;
				justify-content: space-between;
				color: ${theme.color.neutral.text.default};
				${theme.typography.medium[16]};
				.ant-radio-wrapper:hover .ant-radio {
					border-color: ${theme.color.neutral.text.default};
				}
				b {
					font-weight: 500;
					display: block;
					width: 156px;
					margin: 0 8px;
				}
				.anticon-check-circle {
					position: absolute;
					right: -16px;
					top: 50%;
					transform: translateY(-50%);
				}
			}

			img {
				width: 24px;
				height: 24px;
				border-radius: 50%;
			}
		}
	}
`;
