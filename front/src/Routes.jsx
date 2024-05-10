import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { IssueListViewsPage } from './features/issue/pages/IssueListViewsPage';
import { SignInPage } from './features/signIn/pages/SignInPage';
export const Router = () => (
	<BrowserRouter>
		<Routes>
			<Route path='/' element={<SignInPage />} />
			<Route path='/issue' element={<IssueListViewsPage />} />

			{/* <Route path='issue' element={<IssueListViewsPage />} />
			<Route path='issue/:id' element={<IssueDetailViewPage />} /> */}
		</Routes>
	</BrowserRouter>
);
