import styled from "styled-components";
import { CommonBtnStyles } from "@/styles/commonStyles";
import { useState } from "react";

export function NewMilestones({ actionType, closeNewMilestones }) {
  const [milestoneName, setMilestonsName] = useState("");

  return (
    <>
      <Wrap $actionType={actionType}>
        <h3>{actionType === "createMilestones" ? "새로운 마일스톤 추가" : "마일스톤 편집"}</h3>
        <Content>
          <MilestonesDescript>
            <StyledTop>
              <TopMilestonesWrapper>
                <label htmlFor="name">이름</label>
                <input
                  type="text"
                  id="name"
                  value={milestoneName}
                  placeholder="마일스톤의 이름을 입력하세요"
                  onChange={(e) => setMilestonsName(e.target.value)}
                />
              </TopMilestonesWrapper>
              <TopMilestonesWrapper>
                <label htmlFor="deadline">완료일(선택)</label>
                <input type="text" id="deadline" placeholder="YYYY-MM-DD" />
              </TopMilestonesWrapper>
            </StyledTop>
            <MilestonesWrapper>
              <label htmlFor="description">설명(선택)</label>
              <input
                type="text"
                id="description"
                placeholder="마일스톤에 대한 설명을 입력하세요"
              />
            </MilestonesWrapper>
          </MilestonesDescript>
        </Content>
        <Buttons>
          <CancelButton onClick={closeNewMilestones}>x 취소</CancelButton>
          <CompleteButton>+ 완료</CompleteButton>
        </Buttons>
      </Wrap>
    </>
  );
}




const Wrap = styled.div`
  margin: ${(props) => (props.$actionType === "updateMilestones" ? "0" : "20px 100px")};
  border: ${(props) => (props.$actionType === "updateMilestones" ? "none" : "solid #dadbef")};
  height: 330px;
  display: flex;
  border-radius: 10px;
  overflow: hidden;
  background-color: white;
  padding: 0 30px;
  flex-direction: column;
  justify-content: space-evenly;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const MilestonesDescript = styled.div`
  width: 100%;
`;

const MilestonesWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
  border-radius: 10px;
  padding: 10px;
  background-color: #eff0f6;

  label {
    width: 120px;
  }
  input {
    width: 90%;
    border: none;
    background-color: unset;
    font-size: 15px;
  }
`;

const TopMilestonesWrapper = styled(MilestonesWrapper)`
  width: 50%;
`;

const StyledTop = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
`;

const CancelButton = styled.button`
  ${CommonBtnStyles}
  background-color: unset;
  color: #007bff;
  border: solid #007bff;
  width: 120px;
  font-size: 16px;
  height: 40px;
`;

const CompleteButton = styled.button`
  ${CommonBtnStyles}
  background-color: #007bff;
  color: white;
  border: none;
  width: 120px;
  height: 40px;
  font-size: 16px;
`;
