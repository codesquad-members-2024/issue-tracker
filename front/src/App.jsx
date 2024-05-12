import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from './styles';
import { Router } from './Routes';

function App() {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<StyledWrapper>
				<Router />
			</StyledWrapper>
		</ThemeProvider>
	);
}

const StyledWrapper = styled.div``;
export default App;
