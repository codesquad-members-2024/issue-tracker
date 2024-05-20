import styled from 'styled-components';
import { IssueDetailContainer } from '../containers/IssueDetailContainer';
import { InnerLayout } from '../../../common/components/InnerLayout';

export function IssueDetailPage() {
	return (
		<InnerLayout>
			<IssueDetailContainer />
		</InnerLayout>
	);
}
const StyledWrapper = styled.div`
	padding: 0;
`;
