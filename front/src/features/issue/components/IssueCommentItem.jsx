import styled from 'styled-components';
import { Button } from '~/common/components/Button';
import { IconEdit, IconSmile } from '~/common/icons';

export function IssueCommentItem() {
	return (
		<StyledWrapper>
			<StyledHeader>
				<span className='info'>
					<img
						src='https://avatars.githubusercontent.com/u/58014235?v=4'
						alt='양시미'
					/>
					<h3>yangsim</h3>
					<p>3분 전</p>
				</span>
				<span className='action'>
					<p className='badge'>작성자</p>
					<Button
						type='button'
						size='small'
						buttonType='ghost'
						onClick={() => {}}
					>
						<IconEdit />
						편집
					</Button>
					<Button
						type='button'
						size='small'
						buttonType='ghost'
						onClick={() => {}}
					>
						<IconSmile />
						반응
					</Button>
				</span>
			</StyledHeader>
			<StyledContents>
				이번 그룹 프로젝트에서 디자인 특징은 아래와 같습니다.
				<br />
				<br /> 타이포그래피
				<br />
				시스템에 display, selected, available같은 용법을 함께 표기함 컬러
				시스템에 라이트/다크 모드가 있음 Components 페이지에 기획서에 없는 선택
				미션 두 가지가 있음 Text Input의 지우기 기능 Comment Elements의 히스토리
				기능
			</StyledContents>
		</StyledWrapper>
	);
}
const StyledWrapper = styled.div`
	overflow: hidden;
	border: 1px solid ${({ theme }) => theme.color.neutral.border.default};
	border-radius: ${({ theme }) => theme.radius.large};
`;
const StyledHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 64px;
	padding: 24px 16px;
	span {
		display: flex;
		align-items: center;
	}
	.info {
		column-gap: 8px;
		img {
			width: 32px;
			height: 32px;
			border-radius: 50%;
		}
		h3 {
			color: ${({ theme }) => theme.color.neutral.text.strong};
			${({ theme }) => theme.typography.bold[16]};
		}
	}
	.action {
		column-gap: 16px;
		.badge {
			padding: 4px 12px;
			border: 1px solid ${({ theme }) => theme.color.neutral.border.default};
			border-radius: ${({ theme }) => theme.radius.large};
			background: ${({ theme }) => theme.color.neutral.surface.bold};
			color: ${({ theme }) => theme.color.neutral.text.weak};
			${({ theme }) => theme.typography.medium[12]};
		}
		button {
			min-width: auto;
			padding: 8px 0;
			i {
				padding-right: 4px;
			}
		}
	}
`;
const StyledContents = styled.p`
	padding: 16px 24px 24px 24px;
	word-break: break-all;
	${({ theme }) => theme.typography.medium[16]};
	color: ${({ theme }) => theme.color.neutral.text.default};
	background: ${({ theme }) => theme.color.neutral.surface.strong};
	border-top: 1px solid ${({ theme }) => theme.color.neutral.border.default};
`;
