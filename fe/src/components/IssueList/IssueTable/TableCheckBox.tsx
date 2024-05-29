import { useEffect, useState, useContext } from "react";
import { ReactComponent as CheckBoxActive } from "../../../svg/CheckBoxActive.svg";
import { ReactComponent as CheckBoxInitial } from "../../../svg/CheckBoxInitial.svg";
import { CheckboxContext } from "../../../provider/CheckboxProvider";

interface PropsType {
	issueId: number;
	checkedIssues: React.MutableRefObject<{ [key: number]: number }>;
}
function TableCheckBox({ issueId, checkedIssues }: PropsType) {
	const [active, setActive] = useState(false);
	const [state, dispatch] = useContext(CheckboxContext);

	useEffect(() => {
		if (state.activeTotal || state.clickTotal) {
			state.activeTotal ? setActive(true) : setActive(false);
		}
	}, [state]);

	const onClick = () => {
		if (active) {
			dispatch({ type: "MINUS_COUNT" });
			setActive(!active);
			delete checkedIssues.current[issueId];
			return;
		}
		dispatch({ type: "PLUS_COUNT" });
		checkedIssues.current = { ...checkedIssues.current, [issueId]: issueId };
		setActive(!active);
	};
	return (
		<div className="cursor-pointer mx-8" onClick={onClick}>
			{active ? <CheckBoxActive /> : <CheckBoxInitial />}
		</div>
	);
}

export default TableCheckBox;
