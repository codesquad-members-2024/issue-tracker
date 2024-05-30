import { NavigateFunction } from "react-router-dom";
import getLocalStorageItem from "../utility/getLocalStorageItem";

interface Navigation {
	[key: number]: () => void;
}
type FilterTarget = (
	idx: number,
	navigate: NavigateFunction,
	setFilterText: React.Dispatch<React.SetStateAction<string>>,
	paramRef: React.RefObject<URLSearchParams>
) => void;

const setFilterLeftSide: FilterTarget = (idx, navigate, setFilterText, paramRef) => {
	const params = paramRef.current!;
	const { member_id } = getLocalStorageItem("user");
	const deleteMultipleParams = () => {
		params.delete("writer");
		params.delete("assignee");
		params.delete("commenter");
	};
	const navigation: Navigation = {
		0: () => {
			params.set("state", "opened");
			setFilterText((prev) => {
				const deletedStr = prev.replace(/is:open|is:closed/g, "is:open").trim();
				return deletedStr.includes("is:open") ? deletedStr : `${deletedStr} is:open`;
			});
		},
		1: () => {
			params.set("state", "closed");
			setFilterText((prev) => {
				const deletedStr = prev.replace(/is:open|is:closed/g, "is:closed").trim();
				return deletedStr.includes("is:closed") ? deletedStr : `${deletedStr} is:closed`;
			});
		},
		2: () => {
			deleteMultipleParams();
			params.append("writer", member_id);
			setFilterText((prev) => {
				const deletedStr = prev.replace(/writer:@me|assignee:@me|commenter:@me/g, "").trim();
				return `${deletedStr} writer:@me`.trim();
			});
		},
		3: () => {
			deleteMultipleParams();
			params.append("assignee", member_id);
			setFilterText((prev) => {
				const deletedStr = prev.replace(/writer:@me|assignee:@me|commenter:@me/g, "").trim();
				return `${deletedStr} assignee:@me`;
			});
		},
		4: () => {
			deleteMultipleParams();
			params.append("commenter", member_id);
			setFilterText((prev) => {
				const deletedStr = prev.replace(/writer:@me|assignee:@me|commenter:@me/g, "").trim();
				return `${deletedStr} commenter:@me`;
			});
		},
	};
	navigation[idx]();
	navigate(`/filter?target=issue&${params.toString()}`);
};

export default setFilterLeftSide;
