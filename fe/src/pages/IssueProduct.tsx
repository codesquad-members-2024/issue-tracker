import { useLocation, useParams } from 'react-router-dom';

const IssueProduct = () => {
    const { productId } = useParams();
    const location = useLocation();
    const issueInfo = location.state;

    return (
        <>
            <h3>id: {productId}</h3>
            <div>author: {issueInfo.author}</div>
            <div>contents: {issueInfo.contents}</div>
            <div>created_at: {issueInfo.created_at}</div>
            <div>updated_at: {issueInfo.updated_at}</div>
        </>
    );
}

export default IssueProduct;
