import styled from "styled-components";
import { Logo } from "../../../icons/logo";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <StyledHeader>
      <StyledLogo />
      <Link to={"/login"}>
        <img src="/img/frog.png" />
      </Link>
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

const StyledLogo = styled(Logo)`
  width: 200px;
  height: auto;
`;
