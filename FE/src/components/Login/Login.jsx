import { useState } from "react";
import styled from "styled-components";
import { Logo } from "./logo";
export function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = () => {
    if (id === "aa" && password === "aa") { // 수정 예정
      setIsAuthenticated(true);
      setErrorMessage("");
    } else {
      setErrorMessage("아이디 또는 비밀번호가 일치하지 않습니다.");
    }
  };

  const isInputEmpty = id.trim() === "" || password.trim() === "";

  return (
    <form>
      <LoginContainer>
        {!isAuthenticated && (
          <>
            <Logo />
            <GitHubBtn>GitHub 계정으로 로그인</GitHubBtn>
            <p>or</p>
            <Input type="text" placeholder="아이디" value={id}
              onChange={(event) => setId(event.target.value)}
            />
            <Input type="password" placeholder="비밀번호" value={password}
              autoComplete="off"
              onChange={(event) => setPassword(event.target.value)}
            />
            <LoginBtn type="button" onClick={handleLogin}disabled={isInputEmpty}>아이디로 로그인</LoginBtn>
            {errorMessage && <StyledMessage>{errorMessage}</StyledMessage>}
            <JoinBtn>회원가입</JoinBtn>
          </>
        )}
        {isAuthenticated && <p>main 화면</p>} {/* 수정예정 */}
      </LoginContainer>
    </form>
  );
}

const LoginButtonStyles = `
  width: 320px;
  height: 56px;
  margin: 10px 0px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 18px;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 600px;
  img {
    width: 320px;
    padding: 5px 0;
  }
  p {
    margin: 5px 0px;
  }
`;

const GitHubBtn = styled.button`
  ${LoginButtonStyles}
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
