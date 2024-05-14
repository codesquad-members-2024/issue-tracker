import { APiUtil } from "../../util/APIUtils";

const LabelsPage = () => {
    const params = ["is_open=false", "label=BE"];

    const query = params.map(k => encodeURIComponent(k)).join('=&');
    console.log("http://localhost:9999/"+ "?" +query)
    const getIssueList = async() => {
        const issueList = await APiUtil.getNewsData("issues/?" + query)
        console.log(issueList)
    }
    getIssueList()
    return (
        
        <>
            <h3>레이블 페이지</h3>
        </>
    );
};

export default LabelsPage;
