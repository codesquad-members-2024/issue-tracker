import styled from "styled-components";
import { EditIcon } from "@/icons/EditIcon";
import { TrashIcon } from "@/icons/TrashIcon";
import { useState } from "react";
import { NewLabels } from "./NewLabels";

export function LabelsContent(props) {
  const { labels, loading, error, fetchData, putData, deleteData } = props;

  const [onEdit, setOnEdit] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(null);

  const handleDelete = async (labelId) => {
    await deleteData(labelId);
    fetchData();
  };

  const handleEdit = (label) => {
    setSelectedLabel(label);
    setOnEdit(true);
  };

  const closeNewLabels = () => {
    setOnEdit(false);
    setSelectedLabel(null);
  };

  return (
    <Wrap>
      <LabelsHeader>{labels?.countsOfLabels}개의 레이블</LabelsHeader>
      {loading && <h1>LOADING...</h1>}
      {error && <h1>{error}</h1>}
      {onEdit && (
        <NewLabels
          actionType="updateIssue"
          labelId={selectedLabel?.id}
          initialData={selectedLabel}
          {...{ closeNewLabels, fetchData, putData, deleteData }}
        />
      )}
      <LabelsList>
        {labels?.countsOfLabels === 0 ? (
          <Content />
        ) : (
          labels?.labelList.map((label) => {
            const { id, title, description, color, fontColor } = label;
            return (
              <Content key={id}>
                <div className="label">
                  <StyledLabel $backcolor={color} color={fontColor}>
                    {title}
                  </StyledLabel>
                </div>
                <div className="description">
                  <div>{description}</div>
                </div>
                <Buttons>
                  <Button onClick={() => handleEdit(label)}>
                    <EditIcon />
                    <div>편집</div>
                  </Button>
                  <Button className="delete" onClick={() => handleDelete(id)}>
                    <TrashIcon />
                    <div>삭제</div>
                  </Button>
                </Buttons>
              </Content>
            );
          })
        )}
      </LabelsList>
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

const LabelsHeader = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  margin-left: 25px;
`;

const LabelsList = styled.div`
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
  .label {
    width: 10%;
  }
  .description {
    width: 70%;
  }
`;

const StyledLabel = styled.span`
  background-color: ${({ $backcolor }) => $backcolor};
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 14px;
  color: ${({ color }) => color};
`;

const Buttons = styled.div`
  display: flex;
  padding-right: 25px;
  cursor: pointer;
  .delete {
    padding-left: 20px;
    color: red;
  }
`;

const Button = styled.div`
  display: flex;
  padding-left: 5px;
  align-items: center;
  cursor: pointer;
  gap: 5px;
`;
