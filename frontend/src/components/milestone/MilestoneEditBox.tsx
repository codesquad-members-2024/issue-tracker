import { useContext, useRef } from "react";
import styled from "styled-components";
import { MilestoneContext, MilestoneDetailType } from "../../contexts/MilestoneContext";
import { postNewMilestone } from "../../api/MilestoneAPI";

type EditType = "new" | "edit";

interface MilestoneEditBoxProps {
  type: EditType;
  milestoneId?: number;
  content?: MilestoneDetailType;
  handleCancelClick: () => void;
}

const defaultContent = {
  milestoneId: 0,
  title: "",
  description: "",
  deadline: "",
  totalIssue: 0,
  closedIssue: 0,
  isClosed: false,
};

function MilestoneEditBox({
  type,
  milestoneId = 0,
  content = defaultContent,
  handleCancelClick,
}: MilestoneEditBoxProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const deadlineRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  return (
    <Wrapper type={type}>
      <Title>{type === "new" ? "새로운 마일스톤 추가" : "마일스톤 편집"}</Title>
      <Content>
        <FormWrapper>
          <Form>
            <FormType>이름</FormType>
            <FormInput ref={titleRef}></FormInput>
          </Form>
          <Form>
            <FormType>완료일(선택)</FormType>
            <FormInput ref={deadlineRef}></FormInput>
          </Form>
        </FormWrapper>
        <FormWrapper>
          <DescriptionForm>
            <FormType>설명(선택)</FormType>
            <FormInput ref={descriptionRef}></FormInput>
          </DescriptionForm>
        </FormWrapper>
      </Content>
      <ButtonWrapper>
        <CancelButton onClick={handleCancelClick}>
          <CancelImage />
          취소
        </CancelButton>
        <SubmitButton>
          <img />
          완료
        </SubmitButton>
      </ButtonWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div<{ type: EditType }>`
  width: 80em;
  box-sizing: border-box;
  padding: 2em;
  display: flex;
  flex-direction: column;
  gap: 1em;
  ${({ type }) => type === "edit" && "border-top: 1px solid #d9dbe9;"}
`;

const Title = styled.span`
  font-size: 1.25em;
  font-weight: 700;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const FormWrapper = styled.div`
  display: flex;
  gap: 1em;
`;

const Form = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 2.5em;
  display: flex;
  gap: 4px;
  padding: 0 1em;
  background-color: #eff0f6;
  border: 1px solid #eff0f6;
  border-radius: 12px;
`;

const FormType = styled.span`
  width: 7em;
  font-size: 0.75em;
  display: flex;
  align-items: center;
`;

const FormInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  background-color: transparent;
  border: none;
`;

const DescriptionForm = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 2.5em;
  display: flex;
  gap: 4px;
  padding: 0 1em;
  background-color: #eff0f6;
  border: 1px solid #eff0f6;
  border-radius: 12px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
  gap: 1em;
`;

const CancelButton = styled.button`
  width: 128px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5em;
  border: 1px solid #595959;
  border-radius: 12px;
  background-color: transparent;
  color: #595959;
  cursor: pointer;
`;

const CancelImage = styled.img`
  transform: rotate(45deg);
`;

const SubmitButton = styled.button`
  width: 128px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5em;
  border: 1px solid #595959;
  border-radius: 12px;
  background-color: #595959;
  color: white;
  cursor: pointer;
`;

export default MilestoneEditBox;
