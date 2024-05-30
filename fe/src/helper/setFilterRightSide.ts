import { NavigateFunction } from "react-router-dom";

type FilterTarget = (
	query: string,
	filterText: string,
	navigate: NavigateFunction,
	setFilterText: React.Dispatch<React.SetStateAction<string>>,
	paramRef: React.RefObject<URLSearchParams>,
	deleteParam: string,
	regex: RegExp
) => void;

const setFilter: FilterTarget = (
	query,
	filterText,
	navigate,
	setFilterText,
	paramRef,
	deleteParam,
	regex
) => {
	const params = paramRef.current!;
	params.delete(deleteParam);
	const [key, value] = query.split("=");
	params.set(key, value);

	setFilterText((prev) => {
		const currWriter = prev.match(regex)?.[0];
		if (currWriter) return prev.replaceAll(currWriter, filterText);
		return `${prev} ${filterText}`;
	});

	navigate(`/filter?target=issue&${params.toString()}`);
};

export { setFilter };
