import styled from "styled-components";
import pageLogo from "../../img/pageLogo.svg";
import LoginForm from "./LoginForm";
import useLoginStore from "../../hooks/useLoginStore";

function Login() {
  const { setIdValue, setPasswordValue, allFilled, errorMessage, handleLoginClick, handleRegistrationClick } = useLoginStore();

  return (
    <LoginWrapper>
      <img src={pageLogo} alt="page-logo" />
      <GithubLoginButton>Github 계정으로 로그인</GithubLoginButton>
      <div>or</div>
      <LoginForm type="id" onInputChange={setIdValue} />
      <LoginForm type="password" onInputChange={setPasswordValue} />
      <LoginButton onClick={handleLoginClick} allFilled={allFilled}>
        아이디로 로그인
      </LoginButton>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <RegistrationButton onClick={handleRegistrationClick}>회원가입</RegistrationButton>
    </LoginWrapper>
  );
}

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  justify-content: center;
  align-items: center;
  color: #6e7191;
`;

const GithubLoginButton = styled.button`
  width: 320px;
  height: 56px;
  border: 1px solid #7e7e7e;
  border-radius: 16px;
  padding: 0 24px;
  color: #7e7e7e;
  background-color: transparent;
  font-size: 20px;
  font-color: white;
  margin-top: 48px;
`;

const LoginButton = styled.button<{ allFilled: boolean }>`
  width: 320px;
  height: 56px;
  border: 1px solid #595959;
  border-radius: 16px;
  background-color: #595959;
  font-size: 20px;
  color: white;
  opacity: ${({ allFilled }) => (allFilled ? "1" : "0.32")};
  cursor: ${({ allFilled }) => (allFilled ? "pointer" : "default")};
  transition: all 0.5s ease-in-out;
`;

const RegistrationButton = styled.button`
  border: none;
  background-color: transparent;
  font-size: 16px;
  color: #4e4b66;
  cursor: pointer;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
`;

export default Login;
