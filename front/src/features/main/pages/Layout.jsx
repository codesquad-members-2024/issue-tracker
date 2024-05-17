import { styled } from 'styled-components';
import { useLocation, Outlet } from 'react-router-dom';
import { IssueContext } from '~/context/IssueContext';

import { GlobalHeader } from '~/features/header/components/GlobalHeader';

export function Layout() {
	const location = useLocation();
	return (
		<>
			<StyledWrapper>
				<IssueContext.Provider value=''>
					{location.pathname !== '/' && location.pathname !== '/signIn' && (
						<GlobalHeader />
					)}

					<Outlet />
				</IssueContext.Provider>
			</StyledWrapper>
		</>
	);
}
const StyledWrapper = styled.div`
	background: ${({ theme }) => theme.color.neutral.surface.default};
`;
