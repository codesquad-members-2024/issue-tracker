import { useReducer } from 'react';
import { checkItemArray, toggleItemInArray } from '../../../utils/util';

export function useCheckList() {
	const initialCheck = {
		selectedAssignees: [],
		selectedLabels: [],
		selectedMilestone: null,
	};
	function checkReducer(state, action) {
		switch (action.type) {
			case 'setAssignees':
				return {
					...state,
					selectedAssignees: toggleItemInArray(
						state.selectedAssignees,
						action.payload,
						'loginId'
					),
				};
			case 'setLabels':
				return { ...state, selectedLabels: action.payload };
			case 'setMilestone':
				return { ...state, selectedMilestone: action.payload };
			default:
				return state;
		}
	}
	return useReducer(checkReducer, initialCheck);
}
