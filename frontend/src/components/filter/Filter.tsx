import styled from "styled-components";
import filterClickIcon from "../../img/icon/filterClickIcon.svg";
import searchIcon from "../../img/icon/searchIcon.svg";
import labelIcon from "../../img/icon/labelIcon.svg";
import milestoneIcon from "../../img/icon/milestoneIcon.svg";
import plusIcon from "../../img/icon/plusIcon.svg";
import { useNavigate } from "react-router-dom";
import useFilterLogic from "../../hooks/logics/useFilterLogic";
import { useEffect, useRef, useState } from "react";
import FilterPopup from "../extension/FilterPopup";
import useIssueStore from "../../hooks/stores/useIssueStore";
import { useQueryClient } from "react-query";

const popupPostionStyle = {
  top: "2.25em",
  left: "0",
};

function Filter() {
  const client = useQueryClient();
  const { page, filterText, setFilterText, setPage, setIssues } = useIssueStore();
  const { labels, milestones } = useFilterLogic();
  const [filterbarVisible, setFilterbarVisible] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const aboutMeButtonRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleAboutMeButtonClick = () => setFilterbarVisible(true);
  const handleClickOutside = ({ target }: Event) => {
    if (aboutMeButtonRef.current && !aboutMeButtonRef.current.contains(target as Node)) setFilterbarVisible(false);
  };
  const handleInputKeyDown = ({ key }: React.KeyboardEvent<HTMLInputElement>) => {
    if (key === "Enter" && searchRef.current) {
      setFilterText(searchRef.current.value);
      setIssues([]);
      setPage(1);
      client.invalidateQueries(`issues-${page}-${filterText}`);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <FilterTab>
        <FilterBox>
          <MyFilterBar onClick={() => handleAboutMeButtonClick()}>
            <FilterButtonWrapper>
              <MyFilterTitle>필터</MyFilterTitle>
              <FilterIcon src={filterClickIcon} />
            </FilterButtonWrapper>
          </MyFilterBar>
          <SearchBar>
            <SmallIcon src={searchIcon} />
            <SearchTitle ref={searchRef} required defaultValue={filterText} onKeyDown={handleInputKeyDown} />
          </SearchBar>
        </FilterBox>
        <RightBox>
          <FilterBox>
            <LabelBar>
              <SmallIcon src={labelIcon} />
              <LargeTitle onClick={() => navigate("/labels")}>레이블({(labels && labels.length) || 0})</LargeTitle>
            </LabelBar>
            <MilestoneBar>
              <SmallIcon src={milestoneIcon} />
              <LargeTitle onClick={() => navigate("/milestones")}>
                마일스톤({(milestones && milestones.length) || 0})
              </LargeTitle>
            </MilestoneBar>
          </FilterBox>
          <NewIssueButton onClick={() => navigate("/new")}>
            <img src={plusIcon} />
            <span>이슈 작성</span>
          </NewIssueButton>
        </RightBox>
        {filterbarVisible && <FilterPopup ref={aboutMeButtonRef} filterType="aboutMe" customStyle={popupPostionStyle} />}
      </FilterTab>
    </>
  );
}

const FilterTab = styled.div`
  position: relative;
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
  overflow: hidden;
`;

const RightBox = styled.div`
  display: flex;
  gap: 1em;
`;

const MyFilterBar = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: 8em;
`;

const FilterButtonWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
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
  background-color: #eff0f6;
`;

const SmallIcon = styled.img`
  width: 1em;
  height: 1em;
`;

const SearchTitle = styled.input`
  width: 100%;
  height: 1em;
  color: #6e7191;
  background-color: transparent;
  border: none;
`;

const LargeTitle = styled.span`
  height: 1em;
  margin-left: 0.5em;
  font-size: 1em;
`;

const LabelBar = styled.div`
  width: 8.4em;
  padding: 0 0.725em;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #4e4b66;
`;

const MilestoneBar = styled.div`
  width: 8.4em;
  padding: 0 0.725em;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 1px solid #d9dbe9;
  color: #4e4b66;
`;

const NewIssueButton = styled.button`
  width: 9.5em;
  padding: 0 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5em;
  color: white;
  background-color: #595959;
  border: 0;
  border-radius: 0.725em;
  cursor: pointer;
`;

export default Filter;
