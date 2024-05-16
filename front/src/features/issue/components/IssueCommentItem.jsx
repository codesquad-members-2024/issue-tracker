import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { Alert } from 'antd';
import { Button } from '~/common/components/Button';
import { IconEdit, IconSmile, IconXsquare } from '~/common/icons';
import { IssueCommentEdit } from '~/features/issue/components';

export function IssueCommentItem({ content, writer, isWriter }) {
	const [comment, setComment] = useState(content);
	const [isEdit, setIsEdit] = useState(false);
	const [hasChange, setHasChange] = useState(false);

	useEffect(() => {
		setComment(content);
	}, [content]);
	const handleCommentEdit = () => {
		//TODO: 계정정보와 작성자 정보가 일치해야 수정 가능하도록
		setIsEdit(!isEdit);
	};
	useEffect(() => {
		setHasChange(comment !== content);
	}, [comment, content]);

	return (
		<>
			<StyledWrapper>
				<StyledHeader>
					<span className='info'>
						<img
							src='https://avatars.githubusercontent.com/u/58014235?v=4'
							alt='양시미'
						/>
						<h3>{writer}</h3>
						<p>3분 전</p>
					</span>
					<span className='action'>
						{isWriter && <p className='badge'>작성자</p>}

						<Button
							type='button'
							size='small'
							buttonType='ghost'
							buttonText='편집'
							icon={<IconEdit />}
							onClick={() => {
								handleCommentEdit();
							}}
						/>
						<Button
							type='button'
							size='small'
							buttonType='ghost'
							buttonText='반응'
							icon={<IconSmile />}
							onClick={() => {}}
						/>
					</span>
				</StyledHeader>
				{isEdit ? (
					<IssueCommentEdit
						value={comment}
						placeholder={content}
						onChange={e => {
							setComment(e.target.value);
						}}
					/>
				) : (
					<StyledContents>{content}</StyledContents>
				)}
			</StyledWrapper>
			{isEdit && (
				<StyledButtons>
					<Button
						type='button'
						size='small'
						buttonType='outline'
						buttonText='편집 취소'
						icon={<IconXsquare />}
						onClick={handleCommentEdit}
					/>
					<Button
						type='button'
						size='small'
						disabled={!hasChange}
						buttonText='편집 완료'
						icon={<IconEdit />}
						onClick={() => {}}
					/>
				</StyledButtons>
			)}
		</>
	);
}
const StyledWrapper = styled.div`
	overflow: hidden;
	border: 1px solid ${({ theme }) => theme.color.neutral.border.default};
	border-radius: ${({ theme }) => theme.radius.large};
	margin-bottom: 24px;
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
const StyledButtons = styled.div`
	display: flex;
	margin-bottom: 24px;
	justify-content: flex-end;
	column-gap: 16px;
`;
