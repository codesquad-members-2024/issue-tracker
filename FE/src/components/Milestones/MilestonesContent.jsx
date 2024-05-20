import styled from "styled-components";
import { EditIcon } from "@/icons/EditIcon";
import { TrashIcon } from "@/icons/TrashIcon";
import { ClosedIcon } from "@/icons/ClosedIcon";
import { OpenIcon } from "@/icons/OpenIcon";
import { MilestonesIcon } from "@/icons/MilestonesIcon";
import { milestonesList } from "@/test.json";
import { CalendarOutlined } from "@ant-design/icons";

export function MilestonesContent() {
  return (
    <Wrap>
      <MilestonesHeader>
        <StyledBtn>
          <OpenIcon />
          <div className="open">열린 마일스톤()</div>
        </StyledBtn>
        <StyledBtn>
          <ClosedIcon />
          <div className="closed">닫힌 마일스톤()</div>
        </StyledBtn>
      </MilestonesHeader>
      <MilestonesList>
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
              <Buttons>
                <Button>
                  <ClosedIcon />
                  <div>닫기</div>
                </Button>
                <Button>
                  <EditIcon />
                  <div>편집</div>
                </Button>
                <Button>
                  <TrashIcon />
                  <div>삭제</div>
                </Button>
              </Buttons>
            </Content>
          ))
        )}
      </MilestonesList>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 100px;
  border: solid #dadbef;
  border-radius: 10px;
  overflow: hidden;
`;

const MilestonesHeader = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  width: 280px;
  justify-content: space-between;
  margin-left: 35px;
`;

const StyledBtn = styled.div`
  display: flex;
  div {
    margin-left: 10px;
  }
`;

const MilestonesList = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
`;

const Content = styled.div`
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  border-top: solid #dadbef;
  padding-left: 25px;
`;

const StyledDescript = styled.div`
  .top {
    display: flex;
    gap: 20px;
  }
  .description {
    margin-top: 10px;
    margin-left: 25px;
  }
  span {
    margin-left: 10px;
  }
`;

const Buttons = styled.div`
  display: flex;
  padding-right: 25px;
  cursor: pointer;
  .delete {
    margin-left: 20px;
    color: red;
  }
`;

const Button = styled.div`
  display: flex;
  padding-left: 5px;
  align-items: center;
  padding-left: 20px;
  cursor: pointer;
  div {
    margin-left: 10px;
  }
`;

const StyledMilestonesIcon = styled(MilestonesIcon)`
  padding: 0;
  stroke: blue;
`;
