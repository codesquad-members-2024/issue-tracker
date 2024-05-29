import { ReactComponent as CheckBoxDisable } from "../../../svg/CheckBoxDisable.svg";
import { ReactComponent as CheckBoxActive } from "../../../svg/CheckBoxActive.svg";
import { ReactComponent as CheckBoxInitial } from "../../../svg/CheckBoxInitial.svg";
import { useContext } from "react";
import { CheckboxContext } from "../../../provider/CheckboxProvider";

interface CheckboxState {
	activeTotal: boolean;
	clickTotal: boolean;
	countCheckBox: number;
}

interface PropsType {
	length: number;
	checkedIssues: React.MutableRefObject<{ [key: number]: number }>;
	issues: Issue[];
}

const CheckBoxState = (state: CheckboxState, totalLength: number) => {
	if (state.countCheckBox && state.countCheckBox === totalLength) return <CheckBoxActive />;
	if (state.countCheckBox > 0) return <CheckBoxDisable />;
	if (state.activeTotal) return <CheckBoxActive />;
	return <CheckBoxInitial />;
};

function TotalCheckBox({ length, checkedIssues, issues }: PropsType) {
	const [state, dispatch] = useContext(CheckboxContext);

	const onClick = () => {
		if (state.activeTotal) {
			dispatch({ type: "SET_TOTAL_DISABLE" });
			checkedIssues.current = {};
			return;
		}
		dispatch({ type: "SET_TOTAL_ACTIVE", payload: length });
		checkedIssues.current = issues.reduce((prev, { id }) => {
			return { ...prev, [id]: id };
		}, {});
	};

	return (
		<div onClick={onClick} className="cursor-pointer">
			{CheckBoxState(state, length)}
		</div>
	);
}

export default TotalCheckBox;
