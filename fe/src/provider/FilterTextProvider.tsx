import { createContext, useState } from "react";

interface Props {
	children: React.ReactNode;
}

type FilterTextContextType = [string, React.Dispatch<React.SetStateAction<string>>];

const defaultContext: FilterTextContextType = ["", () => {}];
const FilterTextContext = createContext<FilterTextContextType>(defaultContext);

function FilterTextProvider({ children }: Props) {
	const [filterText, setFilterText] = useState("is:issue");
	return (
		<FilterTextContext.Provider value={[filterText, setFilterText]}>
			{children}
		</FilterTextContext.Provider>
	);
}

export { FilterTextContext, FilterTextProvider };
