import { NavigateFunction } from "react-router-dom";

type FilterTarget = (
	query: string,
	filterText: string,
	navigate: NavigateFunction,
	setFilterText: React.Dispatch<React.SetStateAction<string>>,
	paramRef: React.MutableRefObject<URLSearchParams>
) => void;

const setFilterRightSide: FilterTarget = (query, filterText, navigate, setFilterText,  { current: params }) => {
	console.log(query);
	console.log(filterText);
  // params.set("writer", "closed");
	// navigate(`/filter?target=issue&${params.toString()}`);
};

export default setFilterRightSide;
