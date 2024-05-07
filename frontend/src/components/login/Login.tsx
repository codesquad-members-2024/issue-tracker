import styled from "styled-components";
import pageLogo from "../../img/pageLogo.svg";

function Login() {
  return (
    <LoginWrapper>
      <img src={pageLogo} />
      <GithubLoginButton>Github 계정으로 로그인</GithubLoginButton>
      <div>or</div>
      <IdForm>
        <IdLabel>아이디</IdLabel>
      </IdForm>
      <PasswordForm>
        <PasswordLabel>비밀번호</PasswordLabel>
      </PasswordForm>
      <LoginButton>아이디로 로그인</LoginButton>
      <RegistrationButton>회원가입</RegistrationButton>
    </LoginWrapper>
  );
}

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  justify-content: center;
  align-items: center;
  color: #6E7191;
`;

const IdForm = styled.div`
  width: 288px;
  height: 56px;
  display: flex;
  padding: 0 1em;
  flex-direction: column;
  justify-content: center;
  border: 1px solid #eceef5;
  border-radius: 16px;
  background-color: #eceef5;
`;

const IdLabel = styled.p`
  font-size: 16px;
  margin: 0;
`;

const PasswordForm = styled.div`
  width: 288px;
  height: 56px;
  display: flex;
  padding: 0 1em;
  flex-direction: column;
  justify-content: center;
  border: 1px solid #eceef5;
  border-radius: 16px;
  background-color: #eceef5;
`;

const PasswordLabel = styled.p`
  font-size: 16px;
  margin: 0;
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

const LoginButton = styled.button`
  width: 320px;
  height: 56px;
  border: 1px solid #595959;
  border-radius: 16px;
  background-color: #595959;
  font-size: 20px;
  color: white;
  opacity: 0.32;
`;

const RegistrationButton = styled.button`
  border: none;
  background-color: transparent;
  font-size: 16px;
  color: #4E4B66;
`;

export default Login;
