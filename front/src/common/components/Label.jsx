import styled from 'styled-components';

export function Label({ name, textColor, backgroundColor }) {
	return (
		<StyledWrapper
			$bg={backgroundColor}
			$textColor={textColor}
			className='label'
		>
			{name}
		</StyledWrapper>
	);
}
const StyledWrapper = styled.div`
	display: inline-block;
	padding: 4px 12px;
	border-radius: ${({ theme }) => theme.radius.large};
	background: ${({ $bg }) => $bg};
	color: ${({ $textColor }) => $textColor};

	${({ theme }) => theme.typography.medium[12]};
	& + .label {
		margin-left: 8px;
	}
`;
// "name": "bug",
// "description": "bug",
// "color": "#0075CA"
