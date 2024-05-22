import { createContext, useState } from 'react';

export const LabelMilestoneCounter = createContext();

export const LabelMilestoneCounterProvider = ({ children }) => {
	const [labelCounter, setLabelCounter] = useState(7);
	const [milestoneCounter, setMilestoneCounter] = useState(8);

	return (
		<LabelMilestoneCounter.Provider value={{ labelCounter, milestoneCounter }}>
			{children}
		</LabelMilestoneCounter.Provider>
	);
};
