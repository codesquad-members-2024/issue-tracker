import useFetch from "../../../hooks/useFetch";
import { Header } from "./Header";
import { IssueListBar } from "./IssueListBar/IssueListBar";
import { IssueTable } from "./IssueTable/IssueTable";

const OPEN_ISSUES_API = "/api/issues/open";

export function Main() {
  const { state: issues, loading, error, fetchData: fetchOpenIssues } = useFetch(OPEN_ISSUES_API);
  
  return (
    <>
      <Header />
      <IssueListBar />
      <IssueTable {...{ issues, loading, error, fetchData: fetchOpenIssues }}/>
    </>
  );
}
