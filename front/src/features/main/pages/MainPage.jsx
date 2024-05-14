import styled from 'styled-components';
import { IssueListViewsPage } from '../../issue/pages/IssueListViewsPage';
import { IssueContext } from '~/context/IssueContext';

export function MainPage() {
	return (
		<>
			<IssueContext.Provider value={100}>
				<IssueListViewsPage />
			</IssueContext.Provider>
		</>
	);
}
