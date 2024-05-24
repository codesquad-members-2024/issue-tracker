import { useEffect, useRef, useState } from "react";
import useIssueStore from "../stores/useIssueStore";
import useIntersectionObserver from "../utils/useIntersectionObserver";
import { useMutation } from "react-query";
import { sendIssuesRequest } from "../../api/IssueAPI";
import { sendFiltersRequest } from '../../api/FilterAPI';

export type IssueType = "open" | "close";

const FIRST_PAGE = 1;

const useIssueListLogic = () => {
  const { openIssueCount, closeIssueCount, issues, setIssues, setIssueCounts } = useIssueStore();
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
    }
  };

  const { mutateAsync: fetchIssues } = useMutation(sendIssuesRequest, {
    onSuccess: (data) => {
      setIssues([...issues, ...data]);
      setRequestError(false);
    },
    onError: () => setRequestError(true),
  });

  const { mutateAsync: fetchFilters } = useMutation(sendFiltersRequest, {
    onSuccess: (data) => setIssueCounts(data),
  });

  const { observer } = useIntersectionObserver(fetchNextIssues);

  useEffect(() => () => setIssues([]), []);

  useEffect(() => {
    const fetchData = async () => {
      await fetchFilters();
      fetchIssues({ issueType: focusedTab, page: FIRST_PAGE });
    }

    if (page !== FIRST_PAGE) setPage(FIRST_PAGE);
    fetchData();
  }, [focusedTab]);

  useEffect(() => {
    const lastIssue = lastIssueRef.current;

    if (lastIssue) observer.observe(lastIssue);
    return () => {
      if (lastIssue) observer.unobserve(lastIssue);
    };
  }, [lastIssueRef.current]);

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
