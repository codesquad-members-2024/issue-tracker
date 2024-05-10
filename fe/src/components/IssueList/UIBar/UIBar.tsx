import Button from "../../common/Button";
import Filter from "./Filter";
import TabButton from "./TabButton";

function UI() {
	return (
		<div className="container mx-lg my-16 flex justify-between h-[40px]">
			<Filter />
			<div className="flex h-full w-2/5 bg-sky-100">
				<TabButton />
				<Button />
			</div>
		</div>
	);
}
export default UI;
