import styled from 'styled-components';
import { theme } from '../../../styles/theme';
import { Button } from '../../../common/components/Button';
import { IconEdit } from '../../../common/icons/IconEdit';
import { IconTrash } from '../../../common/icons/IconTrash';
import { IconAlertCircle } from '../../../common/icons/IconAlertCircle';
import {
	IssueCommentItem,
	IssueSidebar,
	IssueCommentEdit,
} from '~/features/issue/components';

export function IssueDetailContainer() {
	return (
		<StyledWrapper>
			<StyledDetailHeader>
				<StyledTitle>
					<h2>
						FE 이슈트래커 디자인 시스템 구현 <strong>#2</strong>
					</h2>
					<StyledButtonWrap>
						<Button
							type='button'
							size='small'
							buttonType='outline'
							onClick={() => {}}
						>
							<IconEdit />
							제목 편집
						</Button>
						<Button
							type='button'
							size='small'
							buttonType='outline'
							onClick={() => {}}
						>
							<IconTrash />
							이슈 닫기
						</Button>
					</StyledButtonWrap>
				</StyledTitle>
				<StyledSubHeader>
					<StyledBadge>
						<IconAlertCircle />
						열린 이슈
					</StyledBadge>
					<p>
						이 이슈가 <>3분</>전에 <>melroh629</>님에 의해 열렸습니다
					</p>
					<b>∙</b>
					<p>
						코멘트 <>3</>개
					</p>
				</StyledSubHeader>
			</StyledDetailHeader>
			<StyledContents>
				<section>
					<IssueCommentItem />
					<IssueCommentItem />
					<IssueCommentEdit />
				</section>
				<IssueSidebar />
			</StyledContents>
		</StyledWrapper>
	);
}
const StyledWrapper = styled.div`
	//TODO: padding-bottom: 100px; 삭제
	padding-bottom: 100px;
`;
const StyledDetailHeader = styled.div`
	padding-bottom: 24px;
	margin-bottom: 24px;
	border-bottom: 1px solid ${theme.color.neutral.border.default};
`;
const StyledTitle = styled.div`
	display: flex;
	justify-content: space-between;
	h2 {
		color: ${theme.color.neutral.text.strong};
		${theme.typography.bold[32]};
		strong {
			color: ${theme.color.neutral.text.weak};
		}
	}
`;
const StyledButtonWrap = styled.div`
	display: flex;
	column-gap: 16px;
	button {
		${theme.typography.medium[12]};
		color: ${theme.color.brand.text.weak};
		i {
			padding-right: 4px;
		}
	}
`;

const StyledSubHeader = styled.div`
	margin-top: 16px;
	display: flex;
	align-items: center;
	p {
		color: ${theme.color.neutral.text.weak};
		${theme.typography.medium[16]};
	}
	b {
		padding: 0 8px;
		color: ${theme.color.neutral.text.weak};
	}
`;
const StyledBadge = styled.span`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 16px;
	margin-right: 6px;
	height: 32px;
	border-radius: ${theme.radius.large};
	background: ${theme.color.palette.blue};
	color: ${theme.color.brand.text.default};
	${theme.typography.medium[12]};
	i {
		padding-right: 4px;
	}
`;
const StyledContents = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	section {
		width: 960px;
	}
	aside {
		width: 288px;
		height: 100px;
	}
`;
