import styled from 'styled-components';

export function IconEdit({ className, children }) {
    return (
        <StyledWrapper className={className}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_14852_5734)">
                    <path
                        d="M13.3335 9.77329V13.3333C13.3335 13.6869 13.193 14.0261 12.943 14.2761C12.6929 14.5262 12.3538 14.6666 12.0002 14.6666H2.66683C2.31321 14.6666 1.97407 14.5262 1.72402 14.2761C1.47397 14.0261 1.3335 13.6869 1.3335 13.3333V3.99996C1.3335 3.64634 1.47397 3.3072 1.72402 3.05715C1.97407 2.8071 2.31321 2.66663 2.66683 2.66663H6.22683"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M12.0002 1.33337L14.6668 4.00004L8.00016 10.6667H5.3335V8.00004L12.0002 1.33337Z"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </g>
                <defs>
                    <clipPath id="clip0_14852_5734">
                        <rect width="16" height="16" fill="white" />
                    </clipPath>
                </defs>
            </svg>
            {children}
        </StyledWrapper>
    );
}
const StyledWrapper = styled.i`
    padding: 0;
`;
