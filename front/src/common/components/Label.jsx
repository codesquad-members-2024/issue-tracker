import styled from 'styled-components';

export function Label({ label }) {
	return (
		<StyledWrapper $bg={label.color} className='label'>
			{label.name}
		</StyledWrapper>
	);
}
const StyledWrapper = styled.div`
	display: inline-block;
	padding: 4px 12px;
	border-radius: ${({ theme }) => theme.radius.large};
	background: ${({ $bg }) => $bg};
	color: ${({ theme }) => theme.color.brand.text.default};
	${({ theme }) => theme.typography.medium[12]};
	& + .label {
		margin-left: 8px;
	}
`;
// "name": "bug",
// "description": "bug",
// "color": "#0075CA"
