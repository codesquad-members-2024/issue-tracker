import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { IconPlus, IconEdit, IconTrash } from '~/common/icons';
import { Tabs, ListHeader, ListBody, Button, Label } from '~/common/components';

export function LabelContainer() {
	const labelArray = [
		{
			id: 2,
			name: 'documentation',
			description: 'documentation description',
			backgroundColor: '#008672',
			textColor: '#ffffff',
		},
		{
			id: 4,
			name: 'bug',
			description: 'bugggg description',
			backgroundColor: '#008672',
			textColor: '#ffffff',
		},
	];
	return (
		<StyledWrapper>
			<Tabs labelCount={1} milestoneCount={0} />
			<StyledLink to={'milestones'}>
				<IconPlus />
				레이블 추가
			</StyledLink>
			<StyledListHeader>
				<StyledLabeCount>{3}개의 레이블</StyledLabeCount>
			</StyledListHeader>
			<ListBody>
				{labelArray.map(label => (
					<StyledListItem key={label.id}>
						<StyledLabelInfo>
							<Label
								className='label'
								name={label.name}
								textColor={label.textColor}
								backgroundColor={label.backgroundColor}
							/>
							<p>{label.description}</p>
						</StyledLabelInfo>
						<div className='button-list'>
							<Button
								type='button'
								buttonType='ghost'
								size='small'
								buttonText='편집'
								icon={<IconEdit />}
							/>
							<Button
								type='button'
								buttonType='ghost'
								size='small'
								buttonText='삭제'
								icon={<IconTrash />}
							/>
						</div>
					</StyledListItem>
				))}
			</ListBody>
		</StyledWrapper>
	);
}
const StyledWrapper = styled.div`
	padding: 0;
`;
const StyledLink = styled(Link)`
	display: flex;
	align-items: center;
	justify-content: center;
	column-gap: 4px;
	width: 128px;
	height: 40px;
	border-radius: ${({ theme }) => theme.radius.medium};
	background-color: ${({ theme }) => theme.color.brand.surface.default};
	${({ theme }) => theme.typography.medium[12]};
	color: ${({ theme }) => theme.color.brand.text.default};
`;
const StyledListHeader = styled(ListHeader)``;
const StyledLabeCount = styled.strong`
	${({ theme }) => theme.typography.bold[16]};
	color: ${({ theme }) => theme.color.neutral.text.default};
`;

const StyledListItem = styled.div`
	padding: 32px;
	display: flex;
	align-items: center;
	column-gap: 32px;
	border-bottom: 1px solid ${({ theme }) => theme.color.neutral.border.default};
	&:last-child {
		border-bottom: none;
	}
	.button-list {
		display: flex;
		column-gap: 24px;
		button {
			min-width: auto;
			width: 41px;
			padding: 8px 0;
			column-gap: 4px;
			&:last-child {
				color: ${({ theme }) => theme.color.danger.text.default};
			}
		}
	}
`;

const StyledLabelInfo = styled.span`
	width: 100%;
	display: flex;
	column-gap: 32px;
	align-items: center;
	p {
		flex: 1 1 100%;
		cursor: pointer;
	}
`;
