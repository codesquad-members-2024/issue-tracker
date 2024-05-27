// import { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { InnerLayout } from '../../../common/components/InnerLayout';
import { Logo } from '../../../common/Logo';
// import { UserContext } from '~/context/UserContext';
import { IconUser } from '../../../common/icons/IconUser';

export function GlobalHeader({ ...props }) {
	// const { user } = useContext(UserContext);
	// TODO: user 연동
	// console.log(user);
	return (
		<StyledHeader {...props}>
			<StyledInnerLayout>
				<StyledLink to='/issues'>
					<Logo />
				</StyledLink>
				<StyledUser></StyledUser>
			</StyledInnerLayout>
		</StyledHeader>
	);
}
const StyledHeader = styled.header`
	margin-bottom: 32px;
	height: 94px;
	display: flex;
	align-items: center;
	& > div {
		height: 100%;
	}
`;
const StyledInnerLayout = styled(InnerLayout)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-bottom: 0;
`;
const StyledLink = styled(Link)`
	display: block;
	width: 199px;
`;
const StyledUser = styled(IconUser)`
	width: 32px;
	height: 32px;
`;
