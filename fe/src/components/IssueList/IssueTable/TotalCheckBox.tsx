import { ReactComponent as CheckBoxDisable } from "./CheckBoxDisable.svg";
import { ReactComponent as CheckBoxActive } from "./CheckBoxActive.svg";
import { ReactComponent as CheckBoxInitial } from "./CheckBoxInitial.svg";

interface CheckboxState {
	activeTotal: boolean;
	clickTotal: boolean;
	countCheckBox: number;
}

interface PropsType {
	state: CheckboxState;
	dispatch: React.Dispatch<string>;
	TOTAL_LENGTH: number;
}

const render = (state: CheckboxState, TOTAL_LENGTH: number) => {
	if (state.countCheckBox === TOTAL_LENGTH) return <CheckBoxActive />;
	if (state.countCheckBox > 0) return <CheckBoxDisable />;
	if (state.activeTotal) return <CheckBoxActive />;
	return <CheckBoxInitial />;
};

function TotalCheckBox({ state, dispatch, TOTAL_LENGTH }: PropsType) {
	const onClick = () =>
		state.activeTotal ? dispatch("SET_TOTAL_DISABLE") : dispatch("SET_TOTAL_ACTIVE");

	return (
		<div onClick={onClick} className="cursor-pointer">
			{render(state, TOTAL_LENGTH)}
		</div>
	);
}

export default TotalCheckBox;
