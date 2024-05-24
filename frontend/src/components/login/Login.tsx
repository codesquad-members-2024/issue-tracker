import styled from "styled-components";
import pageLogo from "../../img/icon/pageLogo.svg";
import AuthorizationForm from "../authorization/AuthorizationForm";
import { useNavigate } from "react-router-dom";
<<<<<<< be-dev
import useLoginLogic from "../../hooks/useLoginLogic";
=======
import useLoginLogic from "../../hooks/logics/useLoginLogic";
>>>>>>> team-05
import Loading from "./Loading";

function Login() {
  const {
<<<<<<< be-dev
    state: { allFilled, errorMessage },
    isLoading,
    setIdValue,
    setPasswordValue,
    handleLoginClick,
=======
    isSubmitable,
    errorMessage,
    isLoading,
    idValueRef,
    passwordValueRef,
    handleLoginClick,
    handleOnChange
>>>>>>> team-05
  } = useLoginLogic();
  const navigate = useNavigate();

  return (
    <LoginWrapper>
      <Logo src={pageLogo} alt="page-logo" onClick={() => navigate("/")} />
      <GithubLoginButton>Github 계정으로 로그인</GithubLoginButton>
      <div>or</div>
<<<<<<< be-dev
      <AuthorizationForm type="id" onInputChange={setIdValue} />
      <AuthorizationForm type="password" onInputChange={setPasswordValue} />
      <LoginButton onClick={handleLoginClick} allFilled={allFilled}>
=======
      <AuthorizationForm ref={idValueRef} type="id" onChange={handleOnChange} />
      <AuthorizationForm ref={passwordValueRef} type="password" onChange={handleOnChange} />
      <LoginButton onClick={handleLoginClick} isSubmitable={isSubmitable}>
>>>>>>> team-05
        아이디로 로그인
      </LoginButton>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <RegistrationButton onClick={() => navigate("/registration")}>회원가입</RegistrationButton>
      {isLoading && <Loading />}
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

const Logo = styled.img`
  margin-bottom: 48px;
  cursor: pointer;
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
  cursor: pointer;
`;

<<<<<<< be-dev
const LoginButton = styled.button<{ allFilled: boolean }>`
=======
const LoginButton = styled.button<{ isSubmitable: boolean }>`
>>>>>>> team-05
  width: 320px;
  height: 56px;
  border: 1px solid #595959;
  border-radius: 16px;
  background-color: #595959;
  font-size: 20px;
  color: white;
<<<<<<< be-dev
  opacity: ${({ allFilled }) => (allFilled ? "1" : "0.32")};
  cursor: ${({ allFilled }) => (allFilled ? "pointer" : "default")};
=======
  opacity: ${({ isSubmitable }) => (isSubmitable ? "1" : "0.32")};
  cursor: ${({ isSubmitable }) => (isSubmitable ? "pointer" : "default")};
>>>>>>> team-05
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
