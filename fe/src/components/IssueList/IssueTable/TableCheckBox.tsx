import { useEffect, useState } from "react";
import { ReactComponent as CheckBoxActive } from "../../../svg/CheckBoxActive.svg";
import { ReactComponent as CheckBoxInitial } from "../../../svg/CheckBoxInitial.svg";

interface CheckboxState {
	activeTotal: boolean;
	clickTotal: boolean;
	countCheckBox: number;
}

interface PropsType {
	state: CheckboxState;
	dispatch: React.Dispatch<string>;
}

function TableCheckBox({ state, dispatch }: PropsType) {
	const [active, setActive] = useState(false);

	useEffect(() => {
		if (state.activeTotal || state.clickTotal) {
			state.activeTotal ? setActive(true) : setActive(false);
		}
	}, [state]);

	const onClick = () => {
		active ? dispatch("MINUS_COUNT") : dispatch("PLUS_COUNT");
		setActive(!active);
	};
	return (
		<div className="cursor-pointer mx-8" onClick={onClick}>
			{active ? <CheckBoxActive /> : <CheckBoxInitial />}
		</div>
	);
}

export default TableCheckBox;
