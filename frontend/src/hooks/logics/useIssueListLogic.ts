import { useEffect, useRef, useState } from "react";
import useIssueStore from "../stores/useIssueStore";
import useInfiniteScroll from "@schnee/react-infinite-scroll";
import { useQuery } from "react-query";
import { sendFiltersRequest, sendIssuesRequestByFilter } from "../../api/FilterAPI";
import { useNavigate } from "react-router";
import useUserStore from "../stores/useUserStore";
import { sendCurrentUserRequest } from "../../api/LoginAPI";

export type IssueType = "open" | "close";

const FIRST_PAGE = 1;
const CURRENT_USER_KEY = "currentUser";
const ISSUE_NUMBER_KEY = "issueNumberResponse";
const LABELS_KEY = "labelListResponse";
const MILESTONES_KEY = "milestoneListResponse";
const USERS_KEY = "userListResponse";

const useIssueListLogic = () => {
  const {
    openIssueCount,
    closeIssueCount,
    issues,
    filterText,
    page,
    setIssues,
    setIssueCounts,
    setLabels,
    setMilestones,
    setUsers,
    setFilterText,
    setPage,
  } = useIssueStore();
  const { setUserId } = useUserStore();
  const [focusedTab, setFocusedTab] = useState<IssueType>("open");
  const lastIssueRef = useRef(null);
  const navigate = useNavigate();

  const issueQueryKey = [`issues-${page}-${filterText}`];
  const fetchNextIssues = () => {
    const maxIssueCount = focusedTab === "open" ? openIssueCount : closeIssueCount;
    if (maxIssueCount > issues.length) {
      const nextPage = page + 1;
      setPage(nextPage);
    }
  };

  const userQuery = useQuery("currentUser", sendCurrentUserRequest, {
    onSuccess: (data) => setUserId(data[CURRENT_USER_KEY]),
    onError: () => navigate("/login"),
  });

  const filterQuery = useQuery("filters", sendFiltersRequest, {
    onSuccess: (data) => {
      setIssueCounts(data[ISSUE_NUMBER_KEY]);
      setLabels(data[LABELS_KEY]);
      setMilestones(data[MILESTONES_KEY]);
      setUsers(data[USERS_KEY]);
    },
    onError: () => navigate("/login"),
    enabled: issues.length === 0 && userQuery.isSuccess,
  });

  useQuery(issueQueryKey, () => sendIssuesRequestByFilter(filterText, page), {
    onSuccess: (data) => setIssues([...issues, ...data]),
    onError: () => navigate("/login"),
    keepPreviousData: true,
    enabled: filterQuery.isSuccess,
    refetchOnWindowFocus: false,
  });

  const { observe } = useInfiniteScroll(fetchNextIssues);

  useEffect(() => () => setIssues([]), []);

  useEffect(() => {
    if (page !== FIRST_PAGE) setPage(FIRST_PAGE);
  }, [focusedTab]);

  useEffect(() => {
    const lastIssue = lastIssueRef.current;

    if (lastIssue) observe(lastIssue);
  }, [lastIssueRef.current]);

  return {
    focusedTab,
    setFocusedTab,
    issues,
    setIssues,
    setFilterText,
    lastIssueRef,
    userQuery,
  };
};

export default useIssueListLogic;
