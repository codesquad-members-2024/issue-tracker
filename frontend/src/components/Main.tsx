import styled from "styled-components";
import Header from "./header/Header";
import Filter from "./filter/Filter";

function Main() {
  return (
    <Wrapper>
      <Header />
      <Filter />
      <List>list</List>
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
