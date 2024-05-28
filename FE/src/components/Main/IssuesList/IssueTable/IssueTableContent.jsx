import styled from "styled-components";
import { Link } from "react-router-dom";
import { OpenIcon } from "@/icons/OpenIcon";
import { calculateTime } from "@/utils/calculateTime";

export function IssueTableContent({
  checkedItems,
  onIssueCheckboxChange,
  issues,
}) {
  return (
    <>
      {issues.length === 0 ? (
        <Issues />
      ) : (
        issues
          .slice()
          .reverse()
          .map((issue, index) => {
            const { id, title, writer, createTime, labels, milestone } = issue;
            return (
              <Issues key={index}>
                <Checkbox
                  type="checkbox"
                  checked={checkedItems.has(id)}
                  onChange={() => onIssueCheckboxChange(id)}
                />
                <Content>
                  <Top>
                    <StyledOpen />
                    <StyledLink to={`/issues/${id}`}>
                      <div className="title">{title}</div>
                    </StyledLink>
                    <div>
                      {labels.map((label) => (
                        <Label key={label.id} color={label.color}>
                          {label.name}
                        </Label>
                      ))}
                    </div>
                  </Top>
                  <Bottom>
                    <div>#{id}</div>
                    <div>
                      이 이슈가 {calculateTime(createTime)},{" "}
                      {writer}님에 의해 작성되었습니다
                    </div>
                    <div>{milestone}</div>
                  </Bottom>
                </Content>
              </Issues>
            );
          })
      )}
    </>
  );
}

const Issues = styled.div`
  display: flex;
  height: 90px;
  background-color: white;
  border-top: 1px solid #dadbef;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-left: 35px;
  div {
    margin-right: 20px;
  }
  .title {
    margin-left: 10px;
    font-size: 20px;
  }
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
`;

const Label = styled.span`
  background-color: ${({ color }) => color};
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 14px;
  color: white;
  margin-right: 5px;
`;

const Bottom = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  color: #6e7191;
`;

const Checkbox = styled.input`
  height: 50%;
  padding: 20px;
  margin-left: 25px;
`;

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
`;

const StyledOpen = styled(OpenIcon)`
  stroke: #007aff;
`;
