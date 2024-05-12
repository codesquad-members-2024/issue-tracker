import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { IssueListViewsPage } from './features/issue/pages/IssueListViewsPage';
import { MainPage } from './features/main/pages/MainPage';
import { SignInPage } from './features/signIn/pages/SignInPage';
import { GlobalHeader } from './features/header/components/GlobalHeader';
export const Router = () => (
	<BrowserRouter>
		<GlobalHeader />
		<Routes>
			<Route path='/' element={<MainPage />} />
			<Route path='/signIn' element={<SignInPage />} />
			<Route path='/issue' element={<IssueListViewsPage />} />

			{/* <Route path='issue' element={<IssueListViewsPage />} />
			<Route path='issue/:id' element={<IssueDetailViewPage />} /> */}
		</Routes>
	</BrowserRouter>
);
