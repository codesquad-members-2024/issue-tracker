import styled from 'styled-components';
import { useContext } from 'react';
import { IssueListViewContainer } from '../containers/IssueListViewContainer';
import { InnerLayout } from '../../../common/components/InnerLayout';
import { IssueContext } from '~/context';
import { useIssueContext } from '~/context/hooks';

export function IssueListViewsPage() {
	// const value = useContext(IssueContext);
	const value = useIssueContext();
	return (
		<InnerLayout>
			<>{value}</>
			<IssueListViewContainer />
		</InnerLayout>
	);
}
