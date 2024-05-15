import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { theme } from '../../../styles/theme';
import { Button, InputTitleEdit } from '~/common/components';
import {
	IconEdit,
	IconTrash,
	IconAlertCircle,
	IconXsquare,
} from '~/common/icons';
import { timestamp } from '~/utils/util';

import {
	IssueCommentItem,
	IssueSidebar,
	IssueCommentEdit,
} from '~/features/issue/components';
import { getIssueDetail } from '~/features/issue/apis/';

const issues = [
	{
		id: 1,
		title: 'title1',
		content: 'my name is daniel',
		milestoneId: 'm1',
		assignees: [
			{
				loginId: 'mellisa',
				profileImage:
					'https://avatars.githubusercontent.com/u/140429591?s=40&v=4',
			},
			{
				loginId: 'wade',
				profileImage:
					'https://avatars.githubusercontent.com/u/126778700?s=40&v=4',
			},
		],
		writer: 'daniel',
		createTime: '2024-05-14T04:41:45.318597316',
		labels: [
			{
				name: 'bug',
				description: 'bug',
				color: '#0075ca',
			},
			{
				name: 'documentation',
				description: 'documentation',
				color: '#008672',
			},
		],
		comments: [
			{
				id: 1,
				content: 'comment1',
				writer: 'daniel',
			},
			{
				id: 2,
				content: 'comment2',
				writer: 'mellisa',
			},
		],
		closed: false,
	},
];

export function IssueDetailContainer() {
	const { id = 1 } = useParams();

	const [issueDetail, setIssueDetail] = useState({});
	useEffect(() => {
		// getIssueDetail(id).then(res => {
		// 	setIssueDetail(res);
		// });
		setIssueDetail(issues[0]);
	}, [id]);
	const [title, setTitle] = useState(issueDetail.title);
	const [hasChange, setHasChange] = useState(false);
	const [isEdit, setIsEdit] = useState(false);

	useEffect(() => {
		setHasChange(title !== issueDetail.title);
	}, [title, issueDetail.title]);
	useEffect(() => {
		setTitle(issueDetail.title);
	}, [issueDetail.title]);
	const handleEdit = () => {
		setIsEdit(!isEdit);
	};

	return (
		<StyledWrapper>
			<StyledDetailHeader>
				<StyledTitle>
					{isEdit ? (
						<InputTitleEdit
							placeholder={issueDetail.title}
							value={title}
							onChange={e => setTitle(e.target.value)}
						/>
					) : (
						<h2>
							{issueDetail.title} <strong> #{issueDetail.id}</strong>
						</h2>
					)}

					<StyledButtonWrap>
						{isEdit ? (
							<Button
								type='button'
								size='small'
								buttonType='outline'
								buttonText='편집 취소'
								icon={<IconXsquare />}
								onClick={() => {
									handleEdit();
								}}
							/>
						) : (
							<Button
								type='button'
								size='small'
								buttonType='outline'
								buttonText='제목 편집'
								icon={<IconEdit />}
								onClick={() => {
									handleEdit();
								}}
							/>
						)}
						{isEdit ? (
							<Button
								type='button'
								size='small'
								disabled={!hasChange}
								buttonType='outline'
								buttonText='편집 완료'
								icon={<IconEdit />}
							/>
						) : (
							<Button
								type='button'
								size='small'
								buttonType='outline'
								buttonText='이슈 삭제'
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
						이 이슈가 {timestamp(issueDetail.createTime)}에 {issueDetail.writer}
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

					<IssueCommentEdit />
				</section>
				<IssueSidebar
					assignees={issueDetail.assignees}
					milestone={issueDetail.milestoneId}
					labels={issueDetail.labels}
				/>
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
		height: 100px;
	}
`;
