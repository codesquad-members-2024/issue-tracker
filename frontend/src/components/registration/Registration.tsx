import styled from "styled-components";
import pageLogo from "../../img/pageLogo.svg";
import AuthorizationForm from "../authorization/AuthorizationForm";

function Registration() {
  return (
    <RegistrationWrapper>
      <img src={pageLogo} alt="page-logo" />
      <AuthorizationForm type="id" onInputChange={() => {}} />
      <ValidationWrapper>
        <DuplicateValidation>중복 확인</DuplicateValidation>
        <span>중복 확인 성공!</span>
      </ValidationWrapper>
      <AuthorizationForm type="password" onInputChange={() => {}} />
      <AuthorizationForm type="password-validation" onInputChange={() => {}} />
      <AuthorizationForm type="nickname" onInputChange={() => {}} />
      <SubmitButton allFilled={false}>회원가입</SubmitButton>
    </RegistrationWrapper>
  );
}

const RegistrationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  justify-content: center;
  align-items: center;
  color: #6e7191;
`;

const ValidationWrapper = styled.div`
  width: 320px;
  display: flex;
  justify-content: space-between;
`;

const DuplicateValidation = styled.button`
  width: 100px;
  height: 2em;
  background-color: #595959;
  border: 1px solid #595959;
  border-radius: 16px;
  color: white;
`;

const SubmitButton = styled.button<{ allFilled: boolean }>`
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

export default Registration;
