import styled from "styled-components";
import plusIcon from "../../img/icon/plusIcon_blue.svg";
import submitIcon from "../../img/icon/editSubmit.svg";

function LabelEditBox() {
  return (
    <Wrapper>
      <Title>새로운 레이블 추가</Title>
      <Content>
        <LabelPreviewBox>
          <LabelPreview>Label</LabelPreview>
        </LabelPreviewBox>
        <FormWrapper>
          <Form>
            <FormType>이름</FormType>
            <FormInput required />
          </Form>
          <Form>
            <FormType>설명(선택)</FormType>
            <FormInput required />
          </Form>
          <ColorFormWrapper>
            <BackgroundColorForm>
              <FormType>배경 색상</FormType>
              <FormInput required />
            </BackgroundColorForm>
            <TextColorSelection>
              <TextColorOption value="#000">어두운 색</TextColorOption>
              <TextColorOption value="#fff">밝은 색</TextColorOption>
            </TextColorSelection>
          </ColorFormWrapper>
        </FormWrapper>
      </Content>
      <ButtonWrapper>
        <CancelButton>
          <img src={plusIcon} />
          취소
        </CancelButton>
        <SubmitButton>
          <img src={submitIcon} />
          편집 완료
        </SubmitButton>
      </ButtonWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 80em;
  box-sizing: border-box;
  padding: 2em;
  display: flex;
  flex-direction: column;
  gap: 1em;
  border: 1px solid #d9dbe9;
  border-radius: 0.75em;
`;

const Title = styled.span`
  font-size: 1.25em;
  font-weight: 700;
`;

const Content = styled.div`
  display: flex;
  gap: 1em;
`;

const LabelPreviewBox = styled.div`
  width: 18em;
  height: 9.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #d9dbe9;
  border-radius: 0.75em;
`;

const LabelPreview = styled.div`
  height: 1.5em;
  padding: 0 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #d9dbe9;
  border-radius: 0.75em;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const ColorFormWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
`;

const BackgroundColorForm = styled.div`
  box-sizing: border-box;
  width: 15em;
  height: 2.5em;
  display: flex;
  gap: 4px;
  padding: 0 1em;
  background-color: #eff0f6;
  border: 1px solid #eff0f6;
  border-radius: 12px;
`;

const TextColorSelection = styled.select``;

const TextColorOption = styled.option`
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
  border: 1px solid #007AFF;
  border-radius: 12px;
  background-color: transparent;
  color: #007AFF;
`;

const SubmitButton = styled.button`
  width: 128px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5em;
  border: 1px solid #007AFF;
  border-radius: 12px;
  background-color: #007AFF;
  color: white;
`;

const Form = styled.div`
  box-sizing: border-box;
  width: 56em;
  height: 2.5em;
  display: flex;
  gap: 4px;
  padding: 0 1em;
  background-color: #eff0f6;
  border: 1px solid #eff0f6;
  border-radius: 12px;
`;

const FormType = styled.span`
  width: 6em;
  font-size: 0.75em;
  display: flex;
  align-items: center;
`;

const FormInput = styled.input`
  width: calc(100% - 6em);
  box-sizing: border-box;
  background-color: transparent;
  border: none;
`;

export default LabelEditBox;
