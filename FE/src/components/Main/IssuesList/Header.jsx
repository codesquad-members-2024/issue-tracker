import styled from "styled-components";
import { Logo } from "../../../icons/logo";

export function Header() {
  return (
    <StyledHeader>
      <Logo />
      <img src="/img/frog.png" />
    </StyledHeader>
  );
}

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 25px 100px 50px 100px;
  img {
    width: 32px;
    height: 32px;
  }
`;
