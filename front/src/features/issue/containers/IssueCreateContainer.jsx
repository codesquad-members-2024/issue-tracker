import { useState } from 'react';
import styled from 'styled-components';
import { IconXsquare } from '~/common/icons';
import { IssueSidebar, IssueCommentEdit } from '~/features/issue/components';
import { Button, InputTitleEdit } from '~/common/components';

export function IssueCreateContainer() {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	return (
		<StyledWrapper>
			<h2>새로운 이슈 작성</h2>
			<StyledContent>
				<section>
					<img
						src='https://avatars.githubusercontent.com/u/58014235?v=4'
						alt='양시미'
					/>
					<StyledInputWrapper>
						<InputTitleEdit
							placeholder='제목'
							value={title}
							onChange={e => {
								setTitle(e.target.value);
							}}
						/>
						<StyledIssueCommentEdit
							placeholder='코멘트를 입력하세요.'
							value={content}
							onChange={e => {
								setContent(e.target.value);
							}}
							onClick={() => {}}
						/>
					</StyledInputWrapper>
				</section>
				<IssueSidebar assignees={[]} milestone={[]} labels={[]} />
			</StyledContent>
			<StyledFooter>
				<Button
					type='button'
					size='small'
					buttonType='ghost'
					buttonText='작성 취소'
					icon={<IconXsquare />}
					onClick={() => {
						console.log('포스트 요청');
					}}
				/>
				<Button
					type='button'
					size='large'
					buttonText='완료'
					onClick={() => {
						console.log('포스트 요청');
					}}
				/>
			</StyledFooter>
		</StyledWrapper>
	);
}
const StyledWrapper = styled.div`
	width: 100%;
	h2 {
		padding-bottom: 24px;
		margin-bottom: 24px;
		color: ${({ theme }) => theme.color.neutral.text.strong};
		${({ theme }) => theme.typography.bold[32]};
		border-bottom: 1px solid
			${({ theme }) => theme.color.neutral.border.default};
	}
`;
const StyledContent = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: flex-start;
	column-gap: 24px;
	section {
		width: 100%;
		display: flex;
		align-items: flex-start;
		column-gap: 24px;
		img {
			width: 32px;
			height: 32px;
			border-radius: 50%;
		}
	}
`;
const StyledInputWrapper = styled.div`
	width: calc(100% - 56px);
	height: 100%;
`;
const StyledIssueCommentEdit = styled(IssueCommentEdit)`
	margin-top: 8px;
	height: 100%;
	textarea {
		height: 100%;
	}
`;
const StyledFooter = styled.section`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	column-gap: 32px;
	margin-top: 24px;
	padding: 24px 0 80px;
	border-top: 1px solid ${({ theme }) => theme.color.neutral.border.default};
`;
