import styled from "styled-components";
import { EditIcon } from "@/icons/EditIcon";
import { TrashIcon } from "@/icons/TrashIcon";
import { ClosedIcon } from "@/icons/ClosedIcon";
import { MilestonesIcon } from "@/icons/MilestonesIcon";
import { CalendarOutlined } from "@ant-design/icons";
import { milestonesList } from "@/test.json";

export function MilestonesContent() {
  const progress = (1 / 2) * 100; // (닫힌 이슈 / 모든 이슈)

  return (
    <>
      {milestonesList.length === 0 ? (
        <Content />
      ) : (
        milestonesList.map((milestone) => (
          <Content key={milestone.id}>
            <StyledDescript>
              <div className="top">
                <div className="milestone">
                  <StyledMilestonesIcon />
                  <span>{milestone.title}</span>
                </div>
                <div className="deadLine">
                  <CalendarOutlined />
                  <span>{milestone.deadLine}</span>
                </div>
              </div>
              <div className="description">{milestone.description}</div>
            </StyledDescript>
            <div className="right">
              <Buttons>
                <Button>
                  <ClosedIcon /><span>닫기</span>
                </Button>
                <Button>
                  <EditIcon /><span>편집</span>
                </Button>
                <Button className="delete">
                  <TrashIcon /><span>삭제</span>
                </Button>
              </Buttons>
              <StyledProgress>
                <div className="progressBar">
                  <StyledProgressBar $progress={progress}></StyledProgressBar>
                </div>
                <div className="element">
                  <span>{progress}%</span>
                  <span>열린 이슈 0</span>
                  <span>닫힌 이슈 0</span>
                </div>
              </StyledProgress>
            </div>
          </Content>
        ))
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
  align-items: center;
  background: none;
  border: none;
  span {
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
    cursor: pointer;
    justify-content: space-between;
  }
`;

const StyledProgressBar = styled.div`
  width: ${({ $progress }) => `${$progress}%`};
  height: 10px;
  background-color: #007bff;
`;
