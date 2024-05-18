import { useEffect, useRef, useState } from "react";
import useIssueStore from "../stores/useIssueStore";
import useIntersectionObserver from "../utils/useIntersectionObserver";
import { useMutation } from "react-query";
import { sendIssuesRequest } from "../../api/IssueAPI";

export type IssueType = "open" | "close";

const FIRST_PAGE = 1;

const useIssueListLogic = () => {
  const { openIssueCount, closeIssueCount, issues, setIssues } = useIssueStore();
  const [focusedTab, setFocusedTab] = useState<IssueType>("open");
  const [requestError, setRequestError] = useState(false);
  const [page, setPage] = useState(FIRST_PAGE);
  const lastIssueRef = useRef(null);

  const fetchNextIssues = () => {
    const maxIssueCount = focusedTab === "open" ? openIssueCount : closeIssueCount;
    if (maxIssueCount > issues.length) {
      const nextPage = page + 1;
      fetchIssues({ issueType: focusedTab, page: nextPage });
      setPage(nextPage);
      lastIssueRef.current && observer.unobserve(lastIssueRef.current);
    }
  }

  const { mutate: fetchIssues } = useMutation(sendIssuesRequest, {
    onSuccess: (data) => {
      setIssues([...issues, ...data]);
      setRequestError(false);
    },
    onError: () => setRequestError(true),
  });

  const { observer } = useIntersectionObserver(fetchNextIssues);

  useEffect(() => () => setIssues([]), []);

  useEffect(() => {
    setPage(FIRST_PAGE);
    fetchIssues({ issueType: focusedTab, page: FIRST_PAGE });
  }, [focusedTab]);

  useEffect(() => {
    const lastIssue = lastIssueRef.current;

    if (lastIssue) observer.observe(lastIssue);
  }, [issues]);

  return {
    focusedTab,
    setFocusedTab,
    issues,
    setIssues,
    lastIssueRef,
    requestError,
  };
};

export default useIssueListLogic;
