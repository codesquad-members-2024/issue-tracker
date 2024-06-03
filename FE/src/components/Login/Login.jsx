import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { LogoIcon } from "@/icons/LogoIcon";
import { LoginButtonStyles } from "@/styles/commonStyles";

export function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (id === "aa" && password === "aa") {
      setIsAuthenticated(true);
      setErrorMessage("");
      navigate('/issues'); // 로그인 성공 시 /issues로 이동
    } else {
      setErrorMessage("아이디 또는 비밀번호가 일치하지 않습니다.");
    }
  };

  const handleGitHubLogin = () => {
    const url = "https://github.com/login/oauth/authorize?client_id=Ov23ctHp2vZJoN3WHd25&scope=login,name,email,avatar_url&redirect_uri=https://www.issuetracker.site/login/oauth2/code/github";
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  };

  const isInputEmpty = id.trim() === "" || password.trim() === "";

  return (
    <form>
      <LoginContainer>
        {!isAuthenticated && (
          <>
            <LogoIcon />
            <GitHubBtn onClick={handleGitHubLogin}>GitHub 계정으로 로그인</GitHubBtn>
            <p>or</p>
            <Input type="text" placeholder="아이디" value={id}
              onChange={(event) => setId(event.target.value)}
            />
            <Input type="password" placeholder="비밀번호" value={password}
              autoComplete="off"
              onChange={(event) => setPassword(event.target.value)}
            />
            <LoginBtn type="button" onClick={handleLogin} disabled={isInputEmpty}>아이디로 로그인</LoginBtn>
            {errorMessage && <StyledMessage>{errorMessage}</StyledMessage>}
            <JoinBtn>회원가입</JoinBtn>
          </>
        )}
      </LoginContainer>
    </form>
  );
}

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 600px;
  p {
    margin: 5px 0px;
  }
`;

const GitHubBtn = styled.button`
  ${LoginButtonStyles}
  margin: 50px 0 10px;
  background-color: unset;
  color: #007bff;
  border: 1px solid #007bff;
`;

const Input = styled.input`
  ${LoginButtonStyles}
  width: 300px;
  background-color: #edeeef;
  padding: 0px 10px;
  cursor: text;
  &:focus {
    background-color: white;
  }
`;

const LoginBtn = styled.button`
  ${LoginButtonStyles}
  background-color: ${(props) => (props.disabled ? "#a8cffd" : "#007bff")};
  color: #f7f7fc;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  // not-allowed
`;

const JoinBtn = styled.button`
  background-color: unset;
  cursor: pointer;
  padding: 10px;
  border: none;
`;

const StyledMessage = styled.div`
  color: red;
  margin-top: 10px;
`;

export default Login;
