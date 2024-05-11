import styled from 'styled-components';
import { IssueListViewContainer } from '../containers/IssueListViewContainer';
import { InnerLayout } from '../../../common/components/InnerLayout';

export function IssueListViewsPage() {
	return (
		<InnerLayout>
			<IssueListViewContainer />
		</InnerLayout>
	);
}
