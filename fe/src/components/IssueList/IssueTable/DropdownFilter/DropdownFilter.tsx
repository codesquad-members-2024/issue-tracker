import { useRef } from "react";
import AssigneeFilter from "./AssigneeFilter";
import MilestoneFilter from "./MilestoneFilter";
import LabelFilter from "./LabelFilter";
import WriterFilter from "./WriterFilter";

type FetchedDataType = Milestone[] | Label[] | Member[];

const FETCH_TIME = 200;

function DropdownFilter() {
	const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

	const handleFetch = (fetchedData: FetchedDataType, refetch: () => void) => {
		timeoutId.current = setTimeout(() => {
			if (!fetchedData) refetch();
		}, FETCH_TIME);
	};
	const handleClearTimeOut = () => {
		if (timeoutId.current !== null) {
			clearTimeout(timeoutId.current);
			timeoutId.current = null;
		}
	};

	return (
		<div className="h-full justify-between w-[390px] hidden lg:flex">
			<WriterFilter handleFetch={handleFetch} handleClearTimeOut={handleClearTimeOut} />
			<LabelFilter handleFetch={handleFetch} handleClearTimeOut={handleClearTimeOut} />
			<MilestoneFilter handleFetch={handleFetch} handleClearTimeOut={handleClearTimeOut} />
			<AssigneeFilter handleFetch={handleFetch} handleClearTimeOut={handleClearTimeOut} />
		</div>
	);
}

export default DropdownFilter;
