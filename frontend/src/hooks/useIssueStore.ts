import { create } from "zustand";

interface Headline {
  id: number;
  title: string;
  author: string;
  publishedAt: string;
  isClosed: boolean;
}

interface IssueStoreState {
  issues: Headline[];
  setIssues: (issues: Headline[]) => void;
}

const useIssueStore = create<IssueStoreState>((set) => ({
  issues: [],
  setIssues: (issues: Headline[]) => set(() => ({ issues })),
}));

export default useIssueStore;
