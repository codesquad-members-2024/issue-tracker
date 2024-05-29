import Header from "../components/Header/Header";
import { useSearchParams, useLocation } from "react-router-dom";
import UIBar from "../components/IssueList/UIBar/UIBar";
import IssueTable from "../components/IssueList/IssueTable/IssueTable";
import { CheckboxProvider } from "../provider/CheckboxProvider";

const createAPI = (searchParams: URLSearchParams, pathname: string) => {
	let path = "/issue";
	if (pathname === "/filter") path = "/filter";
	const params = [...searchParams.keys()];
	const queryParams = params.map((param) => `${param}=${searchParams.get(param)}`);
	return `${path}${queryParams.length ? `?${queryParams.join("&")}` : ""}`;
};

function Main() {
	const location = useLocation();
	const [searchParams] = useSearchParams();
	const queryParamState = searchParams.get("state");

	const query = createAPI(searchParams, location.pathname);
	return (
		<div className="w-screen h-screen flex items-center justify-center overflow-auto">
			<div className="h-[95%] w-[85%]">
				<Header />
				<UIBar />
				<CheckboxProvider>
					<IssueTable queryParam={queryParamState} query={query} />
				</CheckboxProvider>
			</div>
		</div>
	);
}

export default Main;
