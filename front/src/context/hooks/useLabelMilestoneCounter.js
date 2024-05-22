import { useContext } from 'react';
import { LabelMilestoneCounter } from '~/context/LabelMilestoneCounter';

export const useLabelMilestoneCounter = () => useContext(LabelMilestoneCounter);
