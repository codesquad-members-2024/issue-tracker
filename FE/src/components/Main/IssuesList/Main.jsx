import { Header } from "./Header";
import { IssueListBar } from "./IssueListBar/IssueListBar";
import { IssueTable } from "./IssueTable/IssueTable";

export function Main() {
  return (
    <>
      <Header />
      <IssueListBar />
      <IssueTable />
    </>
  );
}
