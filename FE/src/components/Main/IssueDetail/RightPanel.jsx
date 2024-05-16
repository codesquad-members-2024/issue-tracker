import styled from "styled-components";

export function RightPanel() {
  return (
    <StyledRightPanel>
      <SideBar>
        <Title>
          담당자
          <PlusButton>+</PlusButton>
        </Title>
      </SideBar>
      <SideBar>
        <Title>
          레이블
          <PlusButton>+</PlusButton>
        </Title>
      </SideBar>
      <SideBar>
        <Title>
          마일스톤
          <PlusButton>+</PlusButton>
        </Title>
      </SideBar>
    </StyledRightPanel>
  );
}

const StyledRightPanel = styled.div`
  width: 280px;
  margin-left: 50px;
  border: solid #dadbe9;
  border-radius: 10px;
  background: white;
`;

const SideBar = styled.div`
  border-bottom: solid #dadbe9;
  padding: 20px 20px 120px 20px;
  &:last-child {
    border-bottom: none; // 마일스톤 bottom
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PlusButton = styled.span`
  cursor: pointer;
  font-size: 20px;
`;
