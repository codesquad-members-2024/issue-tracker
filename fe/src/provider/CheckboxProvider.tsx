import { createContext, useReducer } from "react";

interface Props {
	children: React.ReactNode;
}

interface CheckboxState {
	activeTotal: boolean;
	clickTotal: boolean;
	countCheckBox: number;
}

interface Action {
	type: string;
	payload?: number;
}

const initialState = { activeTotal: false, clickTotal: false, countCheckBox: 0 };

function reducer(state: CheckboxState, action: Action): CheckboxState {
	switch (action.type) {
		case "SET_TOTAL_ACTIVE":
			return { activeTotal: true, clickTotal: true, countCheckBox: action.payload || 0 };
		case "SET_TOTAL_DISABLE":
			return { activeTotal: false, clickTotal: true, countCheckBox: 0 };
		case "PLUS_COUNT":
			return { activeTotal: false, clickTotal: false, countCheckBox: state.countCheckBox + 1 };
		case "MINUS_COUNT":
			return { activeTotal: false, clickTotal: false, countCheckBox: state.countCheckBox - 1 };
		default:
			throw new Error();
	}
}

const CheckboxContext = createContext<[CheckboxState, React.Dispatch<Action>]>([
	initialState,
	() => {},
]);

function CheckboxProvider({ children }: Props) {
	const [state, dispatch] = useReducer(reducer, initialState);
	return <CheckboxContext.Provider value={[state, dispatch]}>{children}</CheckboxContext.Provider>;
}

export { CheckboxContext, CheckboxProvider };
