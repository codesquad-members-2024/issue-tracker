import styled from 'styled-components';

export function Label({
	backgroundColor = '#0025E6',
	labelTitle = 'documentation',
}) {
	return <StyledWrapper $bg={backgroundColor}>{labelTitle}</StyledWrapper>;
}
const StyledWrapper = styled.div`
	display: inline-block;
	padding: 4px 12px;
	border-radius: ${({ theme }) => theme.radius.large};
	background: ${({ $bg }) => $bg};
	color: ${({ theme }) => theme.color.brand.text.default};
	${({ theme }) => theme.typography.medium[12]};
`;
