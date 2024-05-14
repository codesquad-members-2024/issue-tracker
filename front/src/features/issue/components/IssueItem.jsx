import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { IconLandmark } from '../../../common/icons/IconLandmark';
import { CheckBox, Label } from '~/common/components';
import { timestamp } from '~/utils/util';

export function IssueItem({ issue }) {
	return (
		<StyledWrapper>
			<StyledCheckbox />
			<StyledFlex>
				<ExclamationCircleOutlined />
				<StyledIssueTitle to={`/issues/${issue?.id}`}>
					{issue?.title}
				</StyledIssueTitle>

				{issue?.labels?.map((label, index) => (
					<Label label={label} key={index} />
				))}
			</StyledFlex>
			<StyledDetail>
				<p>#{issue.id}</p>
				<StyledAuthour>
					이 이슈가 {timestamp(issue?.createTime)}, {issue?.writer}님에 의해
					작성되었습니다.
				</StyledAuthour>
				<StyledMilestone>
					<IconLandmark />
					<p>{issue?.milestoneId}</p>
				</StyledMilestone>
			</StyledDetail>
			<StyledUserImage src={issue?.profileImage} />
		</StyledWrapper>
	);
}
const StyledWrapper = styled.div`
	display: block;
	border-bottom: 1px solid #d9dbe9;
	width: 100%;
	position: relative;
	padding: 16px 54px 16px 80px;
	&:last-child {
		border-bottom: 0;
	}
`;

const StyledCheckbox = styled(CheckBox)`
	position: absolute;
	top: 50%;
	left: 32px;
	transform: translateY(-50%);
`;
const StyledFlex = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 8px;
	span {
		color: #007aff;
	}

	strong {
		height: 24px;
		font-weight: 500;
		font-size: 12px;
		border-radius: 16px;
		line-height: 24px;
		padding: 0 12px;
		color: #fff;
		background: blue;
	}
`;
const StyledIssueTitle = styled(Link)`
	font-size: 20px;
	margin: 0 8px;
`;
const StyledDetail = styled.div`
	display: flex;
	align-items: center;
	p {
		${({ theme }) => theme.typography.medium[16]}
		color: ${({ theme }) => theme.color.neutral.text.weak};
	}
`;
const StyledAuthour = styled.p`
	margin: 0 16px;
`;
const StyledUserImage = styled.img`
	width: 20px;
	height: 20px;
	position: absolute;
	top: 50%;
	right: 54px;
	transform: translateY(-50%);
	border: 1px solid ${({ theme }) => theme.color.neutral.border.active};
	border-radius: 50%;
`;
const StyledMilestone = styled.div`
	display: flex;
	align-items: center;
	div {
		width: 16px;
		height: 16px;
		color: #6e7191;
		margin-right: 8px;
	}
`;
