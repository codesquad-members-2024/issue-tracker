import { createContext, useState, useRef } from "react";

interface Props {
	children: React.ReactNode;
}

type FilterStateContextType = [
	string,
	React.Dispatch<React.SetStateAction<string>>,
	React.RefObject<URLSearchParams>
];

const defaultContext: FilterStateContextType = ["", () => {}, { current: new URLSearchParams() }];
const FilterStateContext = createContext<FilterStateContextType>(defaultContext);

function FilterStateProvider({ children }: Props) {
	const [filterText, setFilterText] = useState("is:issue");
	const paramRef = useRef(new URLSearchParams());
	return (
		<FilterStateContext.Provider value={[filterText, setFilterText, paramRef]}>
			{children}
		</FilterStateContext.Provider>
	);
}

export { FilterStateContext, FilterStateProvider };
