import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { LogoIcon } from "@/icons/LogoIcon";

export function Header() {
  const navigate = useNavigate();
  const navigateHome = () => navigate("/");

  return (
    <StyledHeader>
      <StyledLogo onClick={navigateHome}/>
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

const StyledLogo = styled(LogoIcon)`
  width: 200px;
  height: auto;
`;
