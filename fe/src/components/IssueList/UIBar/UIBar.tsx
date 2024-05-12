import Button from "../../common/Button";
import Filter from "./Filter";
import TabButton from "../../common/TabButton";

function UI() {
	return (
		<div className="container mx-lg my-14 flex justify-between h-[40px] flex-wrap-reverse content-end">
			<Filter />
			<div className="flex justify-between h-full lg:w-[500px] w-full lg:mb-0 mb-4">
				<TabButton />
				<Button size="S" type="CONTAINED" icon="PLUS" text="이슈 작성" state="DEFAULT" />
			</div>
		</div>
	);
}
export default UI;
