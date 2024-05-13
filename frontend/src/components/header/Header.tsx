import styled from "styled-components";
import pageLogo from "../../img/pageLogo.svg";
import userIcon from "../../img/userIcon.png";

function Header() {
  return (
    <Wrapper>
      <HeaderLogo src={pageLogo} />
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
`;

const HeaderUserIcon = styled.img`
  width: 32px;
  height: 32px;
`;

export default Header;
