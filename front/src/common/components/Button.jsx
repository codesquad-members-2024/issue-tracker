import styled from 'styled-components';
import { theme } from '../../styles/theme';

export function Button({
	children,
	className,
	type,
	size = 'small',
	buttonType = 'container',
	disabled = false,
	onClick,
}) {
	return (
		<StyledAntdButton
			className={className}
			type={type}
			$size={size}
			$buttonType={buttonType}
			disabled={disabled}
			onClick={onClick}
		>
			{children}
		</StyledAntdButton>
	);
}

const StyledAntdButton = styled.button`
	display: block;
	${props => theme.buttonSizes[props.$size]}
	${props => theme.buttonStyles[props.$buttonType]}
`;

{
	/* <Button size="large" buttonType="outline">Click me</Button> */
}
