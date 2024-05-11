import styled from 'styled-components';
import { IssueListViewsPage } from '../../issue/pages/IssueListViewsPage';
import { GlobalHeader } from '../../header/components/GlobalHeader';
export function MainPage() {
	return (
		<StyledWrapper>
			<GlobalHeader />
			<IssueListViewsPage />
		</StyledWrapper>
	);
}
const StyledWrapper = styled.div`
	background: beige;
`;
