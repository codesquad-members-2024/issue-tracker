import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { IconMilestone } from '~/common/icons';
import { CheckBox, Label } from '~/common/components';
import { useUser } from '~/common/hooks';

export function IssueItem({ issue }) {
	const { userList } = useUser();
	const writerImg = writer => {
		const user = userList?.find(user => user.loginId === writer);
		return user?.profileImage;
	};

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
				<p>#{issue?.id}</p>
				<StyledAuthour>
					이 이슈가 {issue?.duration} 전, {issue?.writer}님에 의해
					작성되었습니다.
				</StyledAuthour>
				{issue?.milestone?.name && (
					<StyledMilestone>
						<IconMilestone />
						<p>{issue?.milestone?.name}</p>
					</StyledMilestone>
				)}
			</StyledDetail>
			<StyledUserImage src={writerImg(issue?.writer)} />
		</StyledWrapper>
	);
}
const StyledWrapper = styled.div`
	display: block;
	border-bottom: 1px solid ${({ theme }) => theme.color.neutral.border.default};
	width: 100%;
	position: relative;
	padding: 16px 54px 16px 80px;
	&:last-child {
		border-bottom: 0;
	}
	background: ${({ theme }) => theme.color.neutral.surface.strong};
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
		color: ${({ theme }) => theme.color.brand.text.weak};
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
	border-radius: 50%;
`;
const StyledMilestone = styled.div`
	display: flex;
	gap: 8px;
	align-items: center;
	color: ${({ theme }) => theme.color.neutral.text.weak};
`;
