import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { IssueListViewsPage } from './features/issue/pages/IssueListViewsPage';
import { MainPage } from './features/main/pages/MainPage';
import { SignInPage } from './features/signIn/pages/SignInPage';
import { GlobalHeader } from './features/header/components/GlobalHeader';
import { IssueDetailPage } from './features/issue/pages/IssueDetailPage';
export const Router = () => (
	<BrowserRouter>
		<GlobalHeader />
		<Routes>
			<Route path='/' element={<MainPage />} />
			<Route path='/signIn' element={<SignInPage />} />
			<Route path='/issues' element={<IssueListViewsPage />} />
			<Route path='/issues/:id' element={<IssueDetailPage />} />
		</Routes>
	</BrowserRouter>
);
/**
 * TODO: 이걸로 교체해보기
 * const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <h1>Hello World</h1>
        <Link to="about">About Us</Link>
      </div>
    ),
  },
  {
    path: "about",
    element: <div>About</div>,
  },
]);

 */
