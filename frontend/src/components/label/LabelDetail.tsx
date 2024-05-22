import styled from "styled-components";
import { LabelDetailType } from "../../hooks/contexts/useLabelStateContext";

function LabelDetail({ labelId, labelName, description, textColor, bgColor }: LabelDetailType) {
  return (
    <Wrapper>
      <LabelWrapper>
        <Label textColor={textColor} bgColor={bgColor}>
          {labelName}
        </Label>
      </LabelWrapper>
      <Description>{description}</Description>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 7em;
  padding: 0 2em;
  display: flex;
  align-items: center;
  border-top: 1px solid #d9dbe9;
  gap: 2em;
`;

const LabelWrapper = styled.div`
  display: flex;
  width: 9.75em;
  max-width: 9.75em;
`;

const Label = styled.div<{ textColor: string; bgColor: string }>`
  padding: 0 1em;
  height: 2em;
  border: 1px solid ${({ bgColor }) => `${bgColor}`};
  border-radius: 1em;
  font-size: 12px;
  background-color: ${({ bgColor }) => `${bgColor}`};
  color: ${({ textColor }) => `${textColor}`};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Description = styled.span`
  color: #6e7191;
`;

export default LabelDetail;
