import { IssueListViewsPage, IssueCreatePage } from '~/features/issue/pages';
import { Layout } from './features/main/pages/Layout';
import { SignInPage } from './features/signIn/pages/SignInPage';
import { IssueDetailPage } from './features/issue/pages/IssueDetailPage';

export const routes = [
	{
		path: '/',
		element: <Layout />,
		children: [
			{ path: '/', element: <SignInPage /> },
			{ path: 'signIn', element: <SignInPage /> },
			{ path: 'issues', element: <IssueListViewsPage /> },
			{ path: 'issues/new', element: <IssueCreatePage /> },
			{ path: 'issues/:id', element: <IssueDetailPage /> },
		],
	},
];
