import styled from "styled-components";
import plusIcon from "../../img/icon/plusIcon_dark.svg";

function Sidebar() {
  return <Wrapper>
          <Sector>
            <span>담당자</span>
            <img src={plusIcon} />
          </Sector>
          <Sector>
            <span>레이블</span>
            <img src={plusIcon} />
          </Sector>
          <Sector>
            <span>마일스톤</span>
            <img src={plusIcon} />
          </Sector>
        </Wrapper>
}

const Wrapper = styled.div`
  width: 288px;
  height: 16em;
  border: 1px solid #d9dbe9;
  border-radius: 16px;
  overflow: hidden;
`;

const Sector = styled.div`
  padding: 2em;
  border-top: 1px solid #d9dbe9;
  display: flex;
  justify-content: space-between;

  &:first-child {
    border-top: none;
  }
`;

export default Sidebar;