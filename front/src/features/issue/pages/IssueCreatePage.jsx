import styled from 'styled-components';
import { InnerLayout } from '~/common/components/InnerLayout';
import { IssueCreateContainer } from '~/features/issue/containers/IssueCreateContainer';

export function IssueCreatePage() {
	return (
		<StyledInnerLayout>
			<IssueCreateContainer />
		</StyledInnerLayout>
	);
}
const StyledInnerLayout = styled(InnerLayout)``;
