import styled from 'styled-components';
import { InnerLayout } from '../../../common/components/InnerLayout';
import { Logo } from '../../../common/Logo';
import { Link } from 'react-router-dom';
import { IconUser } from '../../../common/icons/IconUser';

export function GlobalHeader({ ...props }) {
	return (
		<StyledHeader>
			<StyledInnerLayout>
				<StyledLink>
					<Logo />
				</StyledLink>
				<StyledUser></StyledUser>
			</StyledInnerLayout>
		</StyledHeader>
	);
}
const StyledHeader = styled.header`
	height: 94px;
	& > div {
		height: 100%;
	}
`;
const StyledInnerLayout = styled(InnerLayout)`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
const StyledLink = styled(Link)`
	display: block;
	background-color: gold;
	width: 199px;
`;
const StyledUser = styled(IconUser)`
	width: 32px;
	height: 32px;
`;
