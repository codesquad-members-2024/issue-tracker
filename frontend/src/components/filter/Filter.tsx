import styled from "styled-components";
import filterClickIcon from "../../img/filterClickIcon.svg";
import searchIcon from "../../img/searchIcon.svg";
import labelIcon from "../../img/labelIcon.svg";
import milestoneIcon from "../../img/milestoneIcon.svg";

function Filter() {
  return (
    <>
    <FilterTab>
        <FilterBox>
          <MyFilterBar>
            <MyFilterTitle>필터</MyFilterTitle>
            <FilterIcon src={filterClickIcon} />
          </MyFilterBar>
          <SearchBar>
            <SmallIcon src={searchIcon} />
            <SearchTitle>is:issue is:open</SearchTitle>
          </SearchBar>
        </FilterBox>
        <FilterBox>
          <LabelBar>
            <SmallIcon src={labelIcon} />
            <LargeTitle>레이블(0)</LargeTitle>
          </LabelBar>
          <MilestoneBar>
            <SmallIcon src={milestoneIcon} />
            <LargeTitle>마일스톤(0)</LargeTitle>
          </MilestoneBar>
        </FilterBox>
      </FilterTab>
    </>
  );
}

const FilterTab = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
  margin-top: 2em;
  justify-content: space-between;
`;

const FilterBox = styled.div`
  display: flex;
  border: 1px solid #d9dbe9;
  border-radius: 12px;
`;

const MyFilterBar = styled.div`
  width: 5em;
  padding: 0 1.5em;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MyFilterTitle = styled.span`
  color: #4e4b66;
`;

const FilterIcon = styled.img`
  width: 0.5em;
  height: 0.25em;
`;

const SearchBar = styled.div`
  width: 24em;
  padding: 0 1.5em;
  display: flex;
  align-items: center;
  gap: 0.5em;
  border-left: 1px solid #d9dbe9;
  background-color: #EFF0F6;
`;

const SmallIcon = styled.img`
  width: 1em;
  height: 1em;
`;

const SearchTitle = styled.span`
  color: #6E7191;
`;

const LargeTitle = styled.span`
  margin-left: 0.25em;
  font-size: 1em;
`

const LabelBar = styled.div`
  width: 8.4em;
  padding: 0 0.725em;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #4E4B66;
`;

const MilestoneBar = styled.div`
  width: 8.4em;
  padding: 0 0.725em;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 1px solid #d9dbe9;
  color: #4E4B66;
`;

export default Filter;