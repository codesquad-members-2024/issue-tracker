import { Dropdown } from "../../../../icons/dropdown";
import { useState } from "react";
import styled from "styled-components";
import { Popup } from "./Popup";

export const DropdownContainer = ({ id, label, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenContent = () => setIsOpen(true);
  const handleCloseContent = () => setIsOpen(false);

  return (
    <Container>
      <Input
        id={id}
        type="checkbox"
        onChange={() => (isOpen ? handleCloseContent() : handleOpenContent())}
      />
      <Filter htmlFor={id}>
        <div>{label}</div>
        <Dropdown />
      </Filter>
      <StyledPopup
        id={label}
        isopen={isOpen}
        popupItems={items}
        onChange={handleCloseContent}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  position: relative;
`;

const StyledPopup = styled(Popup)`
  right: 0;
`;

const Input = styled.input`
  left: 0;
  visibility: hidden;
  position: absolute;
`;

const Filter = styled.label`
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  padding: 10px;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;
