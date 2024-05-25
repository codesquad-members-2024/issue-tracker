import { styled } from 'styled-components';
import { useLocation, Outlet } from 'react-router-dom';

import { GlobalHeader } from '~/features/header/components/GlobalHeader';
import { UserProvider } from '../../../context/UserContext';

export function Layout() {
	const location = useLocation();
	return (
		<>
			<StyledWrapper>
				<UserProvider>
					{location.pathname !== '/' && location.pathname !== '/signIn' && (
						<GlobalHeader />
					)}
				</UserProvider>
				<Outlet />
			</StyledWrapper>
		</>
	);
}
const StyledWrapper = styled.div`
	background: ${({ theme }) => theme.color.neutral.surface.default};
`;
