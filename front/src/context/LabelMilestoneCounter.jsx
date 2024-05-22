import { createContext, useState } from 'react';
import { useIssueList } from '~/features/issue/hooks';

export const LabelMilestoneCounter = createContext();

export const LabelMilestoneCounterProvider = ({ children }) => {
	const { issueList, loading, error } = useIssueList();
	const [labelCounter, setLabelCounter] = useState(
		issueList.labels.length || 0
	);
	const [milestoneCounter, setMilestoneCounter] = useState(
		issueList.milestones.length || 0
	);

	return (
		<LabelMilestoneCounter.Provider value={{ labelCounter, milestoneCounter }}>
			{children}
		</LabelMilestoneCounter.Provider>
	);
};
