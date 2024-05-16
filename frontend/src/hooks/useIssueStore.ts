import { create } from "zustand";

interface Headline {
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

interface IssueStoreState {
  issues: Headline[];
  openIssueCount: number;
  closeIssueCount: number;
  setIssues: (issues: Headline[]) => void;
  setIssueCounts: ({ openIssueCount, closeIssueCount }: IssueCounts) => void;
}

const useIssueStore = create<IssueStoreState>((set) => ({
  issues: [],
  openIssueCount: 0,
  closeIssueCount: 0,
  setIssues: (issues: Headline[]) => set(() => ({ issues })),
  setIssueCounts: ({ openIssueCount, closeIssueCount }: IssueCounts) =>
    set(() => ({ openIssueCount, closeIssueCount })),
}));

export default useIssueStore;
