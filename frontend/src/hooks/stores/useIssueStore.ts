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

interface Milestone {
  milestoneId: number;
  title: string;
}

interface IssueStoreState {
  issues: Headline[];
  openIssueCount: number;
  closeIssueCount: number;
  milestones: Milestone[];
  setIssues: (issues: Headline[]) => void;
  setIssueCounts: ({ openIssueCount, closeIssueCount }: IssueCounts) => void;
  setMilestones: (milestones: Milestone[]) => void;
}

const useIssueStore = create<IssueStoreState>((set) => ({
  issues: [],
  openIssueCount: 0,
  closeIssueCount: 0,
  milestones: [],
  setIssues: (issues: Headline[]) => set(() => ({ issues })),
  setIssueCounts: ({ openIssueCount, closeIssueCount }: IssueCounts) =>
    set(() => ({ openIssueCount, closeIssueCount })),
  setMilestones: (milestones: Milestone[]) => set(() => ({milestones})),
}));

export default useIssueStore;
