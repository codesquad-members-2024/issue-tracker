import styled from "styled-components";
import { CommonBtnStyles } from "@/styles/commonStyles";
import { useReducer, useEffect } from "react";

const initialState = {
  milestoneTitle: "",
  milestoneDeadline: "",
  milestoneDescription: "",
};

const milestoneReducer = (state, action) => {
  switch (action.type) {
    case "SET_MILESTONE_TITLE":
      return { ...state, milestoneTitle: action.payload };
    case "SET_MILESTONE_DEADLINE":
      return { ...state, milestoneDeadline: action.payload };
    case "SET_MILESTONE_DESCRIPTION":
      return { ...state, milestoneDescription: action.payload };
    case "SET_INITIAL_MILESTONE":
      return {
        ...state,
        milestoneTitle: action.payload.title,
        milestoneDeadline: action.payload.deadline,
        milestoneDescription: action.payload.description,
      };
    default:
      return state;
  }
};

export function NewMilestones(props) {
  const { postData, fetchData, putData, actionType, milestoneId, initialData, closeNewMilestones } = props;

  const [state, dispatch] = useReducer(milestoneReducer, initialState);
  const { milestoneTitle, milestoneDeadline, milestoneDescription } = state;

  useEffect(() => {
    if (actionType === "updateMilestones" && initialData) {
      dispatch({ type: "SET_INITIAL_MILESTONE", payload: initialData });
    }
  }, [initialData]);

  const handleSubmit = async () => {
    const NewMilestone = {
      title: milestoneTitle,
      deadline: milestoneDeadline,
      description: milestoneDescription,
    };

    actionType === "createMilestones" ? await postData(NewMilestone) : await putData(milestoneId, NewMilestone);
    closeNewMilestones();
    fetchData();
  };

  return (
    <>
      <Wrap $actionType={actionType}>
        <h3>{actionType === "createMilestones" ? "새로운 마일스톤 추가": "마일스톤 편집"}</h3>
        <Content>
          <MilestonesDescript>
            <StyledTop>
              <TopMilestonesWrapper>
                <label htmlFor="title">이름</label>
                <input
                  type="text"
                  id="title"
                  value={milestoneTitle}
                  placeholder="마일스톤의 이름을 입력하세요"
                  onChange={(e) =>dispatch({ type: "SET_MILESTONE_TITLE", payload: e.target.value })}
                />
              </TopMilestonesWrapper>
              <TopMilestonesWrapper>
                <label htmlFor="deadline">완료일(선택)</label>
                <input
                  type="text"
                  id="deadline"
                  value={milestoneDeadline}
                  placeholder="YYYY-MM-DD"
                  onChange={(e) =>dispatch({ type: "SET_MILESTONE_DEADLINE", payload: e.target.value })}
                />
              </TopMilestonesWrapper>
            </StyledTop>
            <MilestonesWrapper>
              <label htmlFor="description">설명(선택)</label>
              <input
                type="text"
                id="description"
                value={milestoneDescription}
                placeholder="마일스톤에 대한 설명을 입력하세요"
                onChange={(e) =>dispatch({ type: "SET_MILESTONE_DESCRIPTION", payload: e.target.value })}
              />
            </MilestonesWrapper>
          </MilestonesDescript>
        </Content>
        <Buttons>
          <CancelButton onClick={closeNewMilestones}>x 취소</CancelButton>
          <CompleteButton onClick={handleSubmit}>+ 완료</CompleteButton>
        </Buttons>
      </Wrap>
    </>
  );
}

const Wrap = styled.div`
  margin: ${(props) =>
    props.$actionType === "updateMilestones" ? "0" : "20px 100px"};
  border: ${(props) =>
    props.$actionType === "updateMilestones" ? "none" : "solid #dadbef"};
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
