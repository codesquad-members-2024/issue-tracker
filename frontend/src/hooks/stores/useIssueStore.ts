import { create } from "zustand";

export interface LabelResponse {
  labelId: number;
}

export interface Headline {
  issueId: number;
  title: string;
  author: string;
  publishedAt: string;
  isClosed: boolean;
  labels: LabelResponse[];
  milestoneId: number | null;
}

interface IssueCounts {
  openIssueCount: number;
  closeIssueCount: number;
}

export interface Label {
  labelId: number;
  labelName: string;
  labelBgColor: string;
  labelTextColor: string;
}

export interface Milestone {
  milestoneId: number;
  title: string;
}

interface IssueStoreState {
  issues: Headline[];
  page: number;
  openIssueCount: number;
  closeIssueCount: number;
  labels: Label[];
  milestones: Milestone[];
  users: string[];
  filterText: string;
  setIssues: (issues: Headline[]) => void;
  setPage: (page: number) => void;
  setIssueCounts: ({ openIssueCount, closeIssueCount }: IssueCounts) => void;
  setLabels: (labels: Label[]) => void;
  setMilestones: (milestones: Milestone[]) => void;
  setUsers: (users: string[]) => void;
  setFilterText: (filterText: string) => void;
}

const useIssueStore = create<IssueStoreState>((set) => ({
  issues: [],
  page: 1,
  openIssueCount: 0,
  closeIssueCount: 0,
  labels: [],
  milestones: [],
  users: [],
  filterText: "is:open",
  setIssues: (issues: Headline[]) => set(() => ({ issues })),
  setPage: (page: number) => set(() => ({ page })),
  setIssueCounts: ({ openIssueCount, closeIssueCount }: IssueCounts) =>
    set(() => ({ openIssueCount, closeIssueCount })),
  setLabels: (labels: Label[]) => set(() => ({ labels })),
  setMilestones: (milestones: Milestone[]) => set(() => ({ milestones })),
  setUsers: (users: string[]) => set(() => ({ users })),
  setFilterText: (filterText: string) => set(() => ({ filterText })),
}));

export default useIssueStore;
