import useFetch from "../../../hooks/useFetch";
import { Header } from "./Header";
import { IssueListBar } from "./IssueListBar/IssueListBar";
import { IssueTable } from "./IssueTable/IssueTable";
import API_ENDPOINTS from "@/config/config";

export function Main() {
  const { state: issues, loading, error, fetchData: fetchOpenIssues } = useFetch(`${API_ENDPOINTS.openIssues}`);
  
  return (
    <>
      <Header />
      <IssueListBar />
      <IssueTable {...{ issues, loading, error, fetchData: fetchOpenIssues }}/>
    </>
  );
}
