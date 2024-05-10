import styled from 'styled-components';

import { GlobalStyle } from './styles/globalStyle';
import { Router } from './Routes';

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
