import styled from "styled-components";
import Header from "./header/Header";
import Filter from "./filter/Filter";
import IssueList from "./issue/list/IssueList";
import { useQuery } from "react-query";
import { sendIssuesRequest } from "../api/IssueAPI";
import { useNavigate } from "react-router-dom";
import useUserStore from "../hooks/stores/useUserStore";

function Main() {
  const { setUserId, setIsLoggedIn } = useUserStore();
  const navigate = useNavigate();
  
  useQuery("issues", () => sendIssuesRequest({ issueType: "open", page: 1 }), {
    onSuccess: () => setIsLoggedIn(true),
    onError: () => navigate("/login"),
  });

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

export default Main;
