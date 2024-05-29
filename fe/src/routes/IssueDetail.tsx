import Header from "../components/Header/Header";
import IssueDetailContent from "../components/IssueDetail/IssueDetailContent";
import IssueDetailTitle from "../components/IssueDetail/IssueDetailTitle";
import Loading from "../components/common/Loading";
import useGet from "../hooks/useGet";

function IssueDetail() {
	const [issueId] = window.location.pathname.match(/\d+/g)!;

	const { data, error, isLoading } = useGet(`issue/${issueId}`, `/issue/${issueId}`, true);
	if (isLoading) return <Loading />;
	if (error) return <div>에러 {error.message}</div>;
	console.log(data); // DELETE
	return (
		<div className="w-screen h-screen flex items-center justify-center overflow-auto">
			<div className="h-[95%] w-[85%]">
				<Header />
				<IssueDetailTitle issue={data.issue} commentLegth={data.comments.length} />
				<IssueDetailContent issueData={data} />
			</div>
		</div>
	);
}

export default IssueDetail;
