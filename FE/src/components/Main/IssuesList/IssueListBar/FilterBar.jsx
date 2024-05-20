import { useState } from "react";
import styled from "styled-components";
import { DropdownIcon } from "../../../../icons/DropdownIcon";
import { SearchIcon } from "../../../../icons/SearchIcon";
import { Popup } from "../../../common/Dropdown/Popup";


const issuePopupItems = [
  { id: "open", label: "열린 이슈" },
  { id: "my_issues", label: "내가 작성한 이슈" },
  { id: "assigned_to_me", label: "나에게 할당된 이슈" },
  { id: "commented_by_me", label: "내가 댓글을 남긴 이슈" },
  { id: "closed", label: "닫힌 이슈" },
];

export function FilterBar() {
  const [isopen, setIsOpen] = useState(false);

  const handleToggleCheckbox = () => {
    setIsOpen(!isopen);
  };

  const handleCloseContent = () => {
    setIsOpen(false);
  };

  return (
    <Container>
      <Input id="issue" type="checkbox" onChange={handleToggleCheckbox} />
      <Filter htmlFor="issue">
        <div>필터</div>
        <DropdownIcon />
      </Filter>
      <Popup
        id="이슈"
        isopen={isopen}
        popupItems={issuePopupItems}
        onChange={handleCloseContent}
      />
      <TextInput>
        <SearchIcon />
        <input type="text" defaultValue="is:issues is:open" />
      </TextInput>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 560px;
  min-width: 200px;
  position: relative;
  border: solid #dadbef;
  border-radius: 10px;
  background-color: #eff0f6;
`;

const Input = styled.input`
  left: 0;
  visibility: hidden;
  position: absolute;
`;

const Filter = styled.label`
  width: 120px;
  display: flex;
  justify-content: space-between;
  border-radius: 10px 0 0 10px;
  padding: 10px;
  align-items: center;
  border-right: solid #dadbef;
  background-color: #f7f7fc;
  div {
    padding-left: 10px;
  }
  &:hover {
    cursor: pointer;
  }
`;

const TextInput = styled.div`
  display: flex;
  align-items: center;
  width: 300px;
  input {
    height: 100%;
    border: none;
    background: none;
    width: -webkit-fill-available;
  }
`;
