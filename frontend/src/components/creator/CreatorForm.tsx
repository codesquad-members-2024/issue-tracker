import styled, { css } from "styled-components";

interface CreatorFormProps {
  labelText: string;
  height: string;
}

function CreatorForm({ labelText, height }: CreatorFormProps) {
  return (
    <Wrapper isFocused={false} height={height}>
      <FormParagraph height={height}>
        <FormInput required />
        <FormInputLabel>
          <span>{labelText}</span>
        </FormInputLabel>
      </FormParagraph>
    </Wrapper>
  );
}

const Wrapper = styled.div<{ isFocused: boolean, height: string }>`
  box-sizing: border-box;
  width: 100%;
  ${({ height }) => `height: ${height};`}
  display: flex;
  padding: 0 1em;
  flex-direction: column;
  border: 1px solid #eceef5;
  border-radius: 16px;
  background-color: #eceef5;
  transition: all 0.5s ease;

  ${(props) =>
    props.isFocused &&
    css`
      background-color: white;
      outline: 1.6px solid black;
    `}
`;

const FormParagraph = styled.p<{ height: string }>`
  position: relative;
  top: 0;
  width: 100%;
  ${({ height }) => `height: ${height};`}
  margin: 0;
`;

const FormInput = styled.textarea`
  position: relative;
  top: 24px;
  width: 100%;
  height: 80%;
  padding: 0;
  border: 0 none;
  background-color: transparent;
  color: #4E4B66;
  outline: none;
  resize: none;

  &:focus + label span,
  &:valid + label span {
    transform: translateY(-3px);
    font-size: 12px;
    color: #595f63;
  }

  &:focus + label::after,
  &:valid + label::after {
    width: 100%;
    transform: translateX(0);
  }
`;

const FormInputLabel = styled.label`
  position: absolute;
  left: 0%;
  width: 100%;
  height: 100%;
  text-align: left;
  pointer-events: none;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -1px;
    width: 0;
    height: 100%;
    border: none;
    transition: all 0.3s ease;
  }

  span {
    position: absolute;
    top: 1em;
    left: 0;
    bottom: 5px;
    transition: all 0.3s ease;
  }
`;

export default CreatorForm;
