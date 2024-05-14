import { useLocation, useParams } from 'react-router-dom';

const IssueProduct = () => {
    const { productId } = useParams();
    const location = useLocation();
    const issueInfo = location.state;

    return (
        <>
            <h3>id: {productId}</h3>
            <h3>author: {issueInfo.author}</h3>
            <h3>contents: {issueInfo.contents}</h3>
            <h3>created_at: {issueInfo.created_at}</h3>
            <h3>updated_at: {issueInfo.updated_at}</h3>
        </>
    );
}

export default IssueProduct;
