import styled from "styled-components";
import Header from "./header/Header";
import Filter from "./filter/Filter";
import IssueList from "./list/IssueList";

function Main() {
  return (
    <Wrapper>
      <Header />
      <Filter />
      <IssueList />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: block;
`;

const List = styled.div`
  width: 1280px;
`;

export default Main;
