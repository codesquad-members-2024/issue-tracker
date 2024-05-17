import styled from 'styled-components';
import { IssueListViewsPage, IssueCreatePage } from '~/features/issue/pages';
import { IssueContext } from '~/context/IssueContext';

export function MainPage() {
	return (
		<>
			<IssueContext.Provider value={100}>
				{/* <IssueListViewsPage /> */}
				<IssueCreatePage />
			</IssueContext.Provider>
		</>
	);
}
