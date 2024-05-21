import { useRef } from "react";
import styled from "styled-components";
import { CommonBtnStyles } from "@/styles/commonStyles";

export function NewComment() {
  const textareaHeight = useRef();

  const handleTextareaHeight = () => {
    const textarea = textareaHeight.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <StyledComment>
      <StyledTextarea
        id="comment"
        placeholder="코멘트를 입력하세요"
        ref={textareaHeight}
        onInput={handleTextareaHeight}
      />
      <StyledBtn>
        <div>+ 코멘트 작성</div>
      </StyledBtn>
    </StyledComment>
  );
}

const StyledComment = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2em;
`;

const StyledTextarea = styled.textarea`
  border: none;
  border-radius: 10px;
  background-color: #eff0f6;
  font-size: 18px;
  padding: 20px;
  min-height: 60px;
  resize: none;
`;

const StyledBtn = styled.div`
  ${CommonBtnStyles}
  height: 40px;
  background-color: #007bff;
  color: white;
  border-radius: 10px;
  width: 120px;
  align-self: flex-end;
`;
