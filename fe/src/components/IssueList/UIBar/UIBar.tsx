import Button from "../../common/Button";
import Filter from "./Filter";
import TabButton from "../../common/TabButton";

function UI() {
	return (
		<div className="container mx-lg my-16 flex justify-between h-[40px]">
			<Filter />
			<div className="flex h-full w-2/5 ">
				<TabButton />
				<Button size="S" type="CONTAINED" icon="PLUS" text="이슈 작성" state="DEFAULT" />
			</div>
		</div>
	);
}
export default UI;
