import { Link } from "react-router-dom";
import Button from "../../common/Button";
import Filter from "./Filter";
import TabButton from "../../common/TabButton";
import useGet from "../../../hooks/useGet";

function UIBar() {
	const { data, error } = useGet("count", "/count", true);
	if (error) return <div>값을 불러오지 못했습니다</div>;
	const { totalLabelCounts = 0, totalMilestoneCounts = 0 } = data || {};

	return (
		<div className=" mx-lg my-10 flex justify-between h-[40px] flex-wrap-reverse content-end">
			<Filter />
			<div className="flex justify-between h-full lg:w-[500px] w-full lg:mb-0 mb-4">
				<TabButton
					position="UI_BAR"
					leftCount={totalLabelCounts}
					rightCount={totalMilestoneCounts}
				/>
				<Link to="/issue">
					<Button size="S" type="CONTAINED" icon="PLUS" text="이슈 작성" state="DEFAULT" />
				</Link>
			</div>
		</div>
	);
}
export default UIBar;
