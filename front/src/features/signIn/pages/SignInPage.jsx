import styled from 'styled-components';
import { SignContainer } from '../containers/SignContainer';
export function SignInPage() {
	return (
		<StyledFormWrapper>
			<StyledSignIn>
				<SignContainer />
			</StyledSignIn>
		</StyledFormWrapper>
	);
}
const StyledFormWrapper = styled.form`
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const StyledSignIn = styled.div``;
