import { create } from "zustand";

export interface Headline {
  issueId: number;
  title: string;
  author: string;
  publishedAt: string;
  isClosed: boolean;
}

interface IssueCounts {
  openIssueCount: number;
  closeIssueCount: number;
}

interface Label {
  labelId: number;
  labelName: string;
  labelBgColor: string;
}

interface Milestone {
  milestoneId: number;
  title: string;
}

interface IssueStoreState {
  issues: Headline[];
  openIssueCount: number;
  closeIssueCount: number;
  labels: Label[];
  milestones: Milestone[];
  setIssues: (issues: Headline[]) => void;
  setIssueCounts: ({ openIssueCount, closeIssueCount }: IssueCounts) => void;
  setLabels: (labels: Label[]) => void;
  setMilestones: (milestones: Milestone[]) => void;
}

const useIssueStore = create<IssueStoreState>((set) => ({
  issues: [],
  openIssueCount: 0,
  closeIssueCount: 0,
  labels: [],
  milestones: [],
  setIssues: (issues: Headline[]) => set(() => ({ issues })),
  setIssueCounts: ({ openIssueCount, closeIssueCount }: IssueCounts) =>
    set(() => ({ openIssueCount, closeIssueCount })),
  setLabels: (labels: Label[]) => set(() => ({ labels })),
  setMilestones: (milestones: Milestone[]) => set(() => ({ milestones })),
}));

export default useIssueStore;
