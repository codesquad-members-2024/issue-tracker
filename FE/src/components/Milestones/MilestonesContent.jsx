import styled from "styled-components";
import { useState } from "react";
import { EditIcon } from "@/icons/EditIcon";
import { TrashIcon } from "@/icons/TrashIcon";
import { ClosedIcon } from "@/icons/ClosedIcon";
import { MilestonesIcon } from "@/icons/MilestonesIcon";
import { CalendarOutlined } from "@ant-design/icons";
import { milestonesList } from "@/test.json";
import { NewMilestones } from "./NewMilestones";

export function MilestonesContent() {
  const [onEdit, setOnEdit] = useState(false);
  const [selectedMilestones, setSelectedMilestones] = useState(null);

  const handleEditMilestones = (label) => {
    setOnEdit(true);
    setSelectedMilestones(label);
  };

  const closeNewMilestones = () => {
    setOnEdit(false);
    setSelectedMilestones(null);
  };

  return (
    <>
      {onEdit && (
        <NewMilestones
          actionType="updateMilestones"
          milestoneId={selectedMilestones?.id}
          initialData={selectedMilestones}
          closeNewMilestones={closeNewMilestones}
        />
      )}
      {milestonesList.length === 0 ? (
        <Content />
      ) : (
        milestonesList.map((milestone) => {
          const {id, description, deadLine, title, countOfClosedIssue, countOfOpenIssue } = milestone;
          
          const totalIssues = countOfClosedIssue + countOfOpenIssue;
          const progress = totalIssues === 0 ? 0 : (countOfClosedIssue / totalIssues) * 100;

          return (
            <Content key={id}>
              <StyledDescript>
                <div className="top">
                  <div className="milestone">
                    <StyledMilestonesIcon />
                    <span>{title}</span>
                  </div>
                  <div className="deadLine">
                    <CalendarOutlined />
                    <span>{deadLine}</span>
                  </div>
                </div>
                <div className="description">{description}</div>
              </StyledDescript>
              <div className="right">
                <Buttons>
                  <Button>
                    <ClosedIcon />
                    <div>닫기</div>
                  </Button>
                  <Button onClick={() => handleEditMilestones(milestone)}>
                    <EditIcon />
                    <div>편집</div>
                  </Button>
                  <Button className="delete">
                    <TrashIcon />
                    <div>삭제</div>
                  </Button>
                </Buttons>
                <StyledProgress>
                  <div className="progressBar">
                    <StyledProgressBar $progress={progress}></StyledProgressBar>
                  </div>
                  <div className="element">
                    <div>{progress.toFixed()}%</div>
                    <div>열린 이슈 {countOfOpenIssue}</div>
                    <div>닫힌 이슈 {countOfClosedIssue}</div>
                  </div>
                </StyledProgress>
              </div>
            </Content>
          );
        })
      )}
    </>
  );
}

const Content = styled.div`
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  border-top: solid #dadbef;
  padding: 0 25px;
`;

const StyledDescript = styled.div`
  .top {
    display: flex;
    gap: 20px;
  }
  .description {
    margin-top: 10px;
  }
  span {
    margin-left: 10px;
  }
`;

const Buttons = styled.div`
  display: flex;
  cursor: pointer;
  justify-content: flex-end;
  width: 240px;
  .delete {
    color: red;
  }
`;

const Button = styled.button`
  display: flex;
  background: none;
  border: none;
  cursor: pointer;
  div {
    margin-left: 10px;
  }
`;

const StyledMilestonesIcon = styled(MilestonesIcon)`
  padding: 0;
  stroke: blue;
`;

const StyledProgress = styled.div`
  margin-top: 10px;
  .progressBar {
    border: solid #dadbef;
    border-radius: 10px;
    height: 10px;
    overflow: hidden;
  }
  .element {
    display: flex;
    margin-top: 10px;
    justify-content: space-between;
    font-size: 14px;
  }
`;

const StyledProgressBar = styled.div`
  width: ${({ $progress }) => `${$progress}%`};
  height: 10px;
  background-color: #007bff;
`;
