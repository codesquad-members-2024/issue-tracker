import { Dispatch, FC, PropsWithChildren, SetStateAction, createContext, useState } from "react";
import { Label, Milestone } from "../hooks/stores/useIssueStore";

interface CreatorContextType {
  assignees: string[];
  setAssignees: Dispatch<SetStateAction<string[]>>;
  labels: Label[];
  setLabels: Dispatch<SetStateAction<Label[]>>;
  milestone: Milestone | null | undefined;
  setMilestone: Dispatch<SetStateAction<Milestone | null | undefined>>;
}

export const CreatorContext = createContext<CreatorContextType>({
  assignees: [],
  setAssignees: () => {},
  labels: [],
  setLabels: () => {},
  milestone: null,
  setMilestone: () => {},
});

export const CreatorProvider: FC<PropsWithChildren> = ({ children }) => {
  const [assignees, setAssignees] = useState<string[]>([]);
  const [labels, setLabels] = useState<Label[]>([]);
  const [milestone, setMilestone] = useState<Milestone | null | undefined>(null);

  return (
    <CreatorContext.Provider value={{ assignees, setAssignees, labels, setLabels, milestone, setMilestone }}>
      {children}
    </CreatorContext.Provider>
  );
};
