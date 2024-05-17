import { styled } from 'styled-components';
import { Outlet } from 'react-router-dom';
import { IssueContext } from '~/context/IssueContext';
import { IssueListViewsPage } from '~/features/issue/pages';
import { GlobalHeader } from '~/features/header/components/GlobalHeader';

export function Layout() {
	return (
		<>
			<StyledWrapper>
				<IssueContext.Provider value=''>
					<GlobalHeader />
					<Outlet />
				</IssueContext.Provider>
			</StyledWrapper>
		</>
	);
}
const StyledWrapper = styled.div`
	background: ${({ theme }) => theme.color.neutral.surface.default};
`;
