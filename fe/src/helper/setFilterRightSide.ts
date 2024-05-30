import { NavigateFunction } from "react-router-dom";

type FilterTarget = (
	query: string,
	filterText: string,
	navigate: NavigateFunction,
	setFilterText: React.Dispatch<React.SetStateAction<string>>,
	paramRef: React.RefObject<URLSearchParams>
) => void;

const setWriterFilter: FilterTarget = (query, filterText, navigate, setFilterText, paramRef) => {
	const params = paramRef.current!;
	params.delete("writer");
	const [writerKey, writer] = query.split("=");
	params.set(writerKey, writer);

	setFilterText((prev) => {
		const currWriter = prev.match(/writer:[^\s]+/g)?.[0];
		console.log(prev);
		if (currWriter) return prev.replaceAll(currWriter, filterText);
		return `${prev} ${filterText}`;
	});

	navigate(`/filter?target=issue&${params.toString()}`);
};

const setLabelFilter: FilterTarget = (query, filterText, navigate, setFilterText, paramRef) => {
	const params = paramRef.current!;
	params.delete("label_id");
	const [labelIdKey, labelId] = query.split("=");
	params.set(labelIdKey, labelId);

	setFilterText((prev) => {
		const currWriter = prev.match(/label:[^\s]+/g)?.[0];
		console.log(prev);
		if (currWriter) return prev.replaceAll(currWriter, filterText);
		return `${prev} ${filterText}`;
	});

	navigate(`/filter?target=issue&${params.toString()}`);
};

export { setWriterFilter, setLabelFilter };
