import styled from 'styled-components';
import { IssueListViewsPage } from '../../issue/pages/IssueListViewsPage';
import { GlobalHeader } from '../../header/components/GlobalHeader';
export function MainPage() {
	return (
		<>
			<GlobalHeader />
			<IssueListViewsPage />
		</>
	);
}
