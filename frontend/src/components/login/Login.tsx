import styled from "styled-components";
import pageLogo from "../../img/pageLogo.svg";
import LoginForm from "./LoginForm";

function Login() {
  return (
    <LoginWrapper>
      <img src={pageLogo} />
      <GithubLoginButton>Github 계정으로 로그인</GithubLoginButton>
      <div>or</div>
      <LoginForm type="id" />
      <LoginForm type="password" />
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

const StyledParagraph = styled.p`
  position: relative;
  width: 100%;
  height: 24px;
  margin: 0;
`;

const StyledInput = styled.input`
  position: relative;
  top: 35%;
  width: 100%;
  height: 100%;
  padding: 0;
  border: 0 none;
  background-color: transparent;
  color: #595f63;
  outline: none;

  &:focus + label span,
  &:valid + label span {
    transform: translateY(-60%);
    font-size: 12px;
    color: #595f63;
  }

  &:focus + label::after,
  &:valid + label::after {
    width: 100%;
    transform: translateX(0);
  }
`;

const StyledLabel = styled.label`
  position: absolute;
  top: -50%;
  left: 0%;
  width: 100%;
  height: 100%;
  text-align: left;
  pointer-events: none;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -1px;
    width: 0;
    height: 100%;
    border: none;
    transition: all .3s ease;
  }

  span {
    position: absolute;
    top: 1em;
    left: 0;
    bottom: 5px;
    transition: all .3s ease;
  }
`;

export default Login;
