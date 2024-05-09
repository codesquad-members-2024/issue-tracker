import { useLocation, useParams } from 'react-router-dom';

const IssueProduct = () => {
    const { productId } = useParams();
    const location = useLocation();
    const issueInfo = location.state;

    return (
        <>
            <h3>{productId}번 상품 페이지 입니다.</h3>
            <h3>{issueInfo.author}</h3>
            <h3>{issueInfo.contents}</h3>
            <h3>{issueInfo.created_at}</h3>
            <h3>{issueInfo.updated_at}</h3>
        </>
    );
}

export default IssueProduct;
