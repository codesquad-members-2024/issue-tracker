import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../../../styles/theme';
import { Alert } from 'antd';
import { useIssueDetail } from '../hooks/useIssueDetail';
import { Button, InputTitleEdit } from '~/common/components';
import {
	IconEdit,
	IconTrash,
	IconAlertCircle,
	IconXsquare,
	IconPlus,
} from '~/common/icons';
import { timestamp } from '~/utils/util';

import {
	IssueCommentItem,
	IssueSidebar,
	IssueCommentEdit,
} from '~/features/issue/components';

export function IssueDetailContainer() {
	const { id } = useParams();

	const { issueDetail, loading, error } = useIssueDetail(id);

	// const [title, setTitle] = useState(issueDetail?.title);
	// const [hasChange, setHasChange] = useState(false);
	// const [isEdit, setIsEdit] = useState(false);

	// const [newComment, setNewComment] = useState('');
	// const [hasNewComment, setHasNewComment] = useState(false);

	const [detailState, setDateilState] = useState({
		title: issueDetail?.title,
		newComment: '',
		isEdit: false,
	});

	useEffect(() => {
		setDateilState(prevState => ({
			...prevState,
			title: issueDetail?.title,
		}));
	}, [issueDetail?.title]);

	const handleEdit = () => {
		setDateilState(prevState => ({
			...prevState,
			isEdit: !prevState.isEdit,
		}));
	};

	const handleTitleChange = e => {
		setDateilState(prevState => ({
			...prevState,
			title: e.target.value,
		}));
	};

	const handleNewCommentChange = e => {
		setDateilState(prevState => ({
			...prevState,
			newComment: e.target.value,
		}));
	};

	const isNewComment = detailState.newComment.length !== '';
	const hasChanged = detailState.title !== issueDetail?.title;
	// TODO: error 재연
	return (
		<>
			{loading && <div>Loading...</div>}
			{error && <Alert message='Error Text' description={error} type='error' />}
			<StyledWrapper>
				<StyledDetailHeader>
					<StyledTitle>
						{detailState.isEdit ? (
							<InputTitleEdit
								placeholder={issueDetail.title}
								value={detailState.title}
								onChange={handleTitleChange}
							/>
						) : (
							<h2>
								{issueDetail.title} <strong> #{issueDetail.id}</strong>
							</h2>
						)}

						<StyledButtonWrap>
							{detailState.isEdit ? (
								<Button
									type='button'
									size='small'
									buttonType='outline'
									buttonText='편집 취소'
									icon={<IconXsquare />}
									onClick={handleEdit}
								/>
							) : (
								<Button
									type='button'
									size='small'
									buttonType='outline'
									buttonText='제목 편집'
									icon={<IconEdit />}
									onClick={handleEdit}
								/>
							)}
							{detailState.isEdit ? (
								<Button
									type='button'
									size='small'
									disabled={!hasChanged}
									buttonType='outline'
									buttonText='편집 완료'
									icon={<IconEdit />}
								/>
							) : (
								<Button
									type='button'
									size='small'
									buttonType='outline'
									buttonText='이슈 닫기'
									icon={<IconTrash />}
								/>
							)}
						</StyledButtonWrap>
					</StyledTitle>
					<StyledSubHeader>
						<StyledBadge>
							<IconAlertCircle />
							열린 이슈
						</StyledBadge>
						<p>
							이 이슈가 {timestamp(issueDetail.createTime)}에{' '}
							{issueDetail.writer}
							님에 의해 열렸습니다
						</p>

						{issueDetail?.comments && (
							<>
								<b>∙</b>
								<p>코멘트 {issueDetail?.comments.length}개</p>
							</>
						)}
					</StyledSubHeader>
				</StyledDetailHeader>
				<StyledContents>
					<section>
						<IssueCommentItem
							content={issueDetail.content}
							writer={issueDetail.writer}
							isWriter={true}
						/>
						{issueDetail?.comments &&
							issueDetail.comments.map(item => (
								<IssueCommentItem
									key={item.id}
									content={item.content}
									writer={item.writer}
									isWriter={issueDetail.writer === item.writer}
								/>
							))}
						<StyledNewComment>
							<IssueCommentEdit
								value={detailState.newComment}
								placeholder='코멘트를 입력하세요.'
								onChange={handleNewCommentChange}
								onClick={() => {}}
							/>
							<div className='right-align'>
								<Button
									type='button'
									size='small'
									disabled={!isNewComment}
									buttonType='container'
									buttonText='코멘트 작성'
									icon={<IconPlus />}
								/>
							</div>
						</StyledNewComment>
					</section>
					<aside>
						<IssueSidebar
							assignees={issueDetail.assignees}
							milestone={issueDetail.milestoneId}
							labels={issueDetail.labels}
						/>
						<div className='right-align'>
							<Button
								type='button'
								size='small'
								buttonType='ghost'
								onClick={() => {}}
								buttonText='이슈 삭제'
								icon={<IconTrash />}
							/>
						</div>
					</aside>
				</StyledContents>
			</StyledWrapper>
		</>
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
	.title {
		width: 100%;
	}
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
	margin-left: 16px;
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
		button {
			margin-top: 16px;
		}
	}
`;
const StyledNewComment = styled.div`
	button {
		margin-top: 24px;
	}
`;
