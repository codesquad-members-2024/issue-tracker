import styled from 'styled-components';

import { GlobalStyle } from './styles/globalStyle';
import { Router } from './Routes';
import { GlobalHeader } from './features/header/components/GlobalHeader';

function App() {
	return (
		<>
			<GlobalStyle />
			<StyledWrapper>
				<Router />
			</StyledWrapper>
		</>
	);
}

const StyledWrapper = styled.div``;
export default App;
