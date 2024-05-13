import styled from "styled-components";
import pageLogo from "../../img/pageLogo.svg";
import userIcon from "../../img/userIcon.png";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <HeaderLogo src={pageLogo} alt="page-logo" onClick={() => navigate("/")} />
      <HeaderUserIcon src={userIcon} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 94px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderLogo = styled.img`
  height: 40px;
  cursor: pointer;
`;

const HeaderUserIcon = styled.img`
  width: 32px;
  height: 32px;
`;

export default Header;
