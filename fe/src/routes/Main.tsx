import Header from "../components/Header/Header";
import { useSearchParams } from "react-router-dom";
import UIBar from "../components/IssueList/UIBar/UIBar";
import IssueTable from "../components/IssueList/IssueTable/IssueTable";
import { CheckboxProvider } from "../provider/CheckboxProvider";
import { FilterStateProvider } from "../provider/FilterStateProvider";

const createAPI = (searchParams: URLSearchParams, { pathname }: { pathname: string }) => {
	let path = "/issue";
	if (pathname === "/filter") path = "/filter";
	const params = [...searchParams.keys()];
	const queryParams = params.map((param) => `${param}=${searchParams.get(param)}`);
	return `${path}${queryParams.length ? `?${queryParams.join("&")}` : ""}`;
};

function Main() {
	const [searchParams] = useSearchParams();
	const queryParamState = searchParams.get("state");

	const query = createAPI(searchParams, window.location);
	return (
		<div className="w-screen h-screen flex items-center justify-center overflow-auto">
			<div className="h-[95%] w-[85%]">
				<Header />
				<FilterStateProvider>
					<UIBar />
					<CheckboxProvider>
						<IssueTable queryParam={queryParamState} query={query} />
					</CheckboxProvider>
				</FilterStateProvider>
			</div>
		</div>
	);
}

export default Main;
