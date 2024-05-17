import { Outlet } from 'react-router-dom';
import { IssueContext } from '~/context/IssueContext';
import { IssueListViewsPage } from '~/features/issue/pages';
import { GlobalHeader } from '~/features/header/components/GlobalHeader';

export function Layout() {
	return (
		<>
			<IssueContext.Provider value={100}>
				<GlobalHeader />
				<Outlet />
				<IssueListViewsPage />
			</IssueContext.Provider>
		</>
	);
}
