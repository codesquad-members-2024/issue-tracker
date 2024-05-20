import styled from 'styled-components';

export function IconSmile({ className }) {
	return (
		<StyledWrapper className={className}>
			<svg
				width='16'
				height='16'
				viewBox='0 0 16 16'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<g clipPath='url(#clip0_14852_5691)'>
					<path
						d='M8.00016 14.6667C11.6821 14.6667 14.6668 11.6819 14.6668 8.00004C14.6668 4.31814 11.6821 1.33337 8.00016 1.33337C4.31826 1.33337 1.3335 4.31814 1.3335 8.00004C1.3335 11.6819 4.31826 14.6667 8.00016 14.6667Z'
						stroke='currentColor'
						strokeWidth='1.6'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
					<path
						d='M5.3335 9.33337C5.3335 9.33337 6.3335 10.6667 8.00016 10.6667C9.66683 10.6667 10.6668 9.33337 10.6668 9.33337'
						stroke='currentColor'
						strokeWidth='1.6'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
					<path
						d='M6 6H6.00667'
						stroke='currentColor'
						strokeWidth='1.6'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
					<path
						d='M10 6H10.0067'
						stroke='currentColor'
						strokeWidth='1.6'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</g>
				<defs>
					<clipPath id='clip0_14852_5691'>
						<rect width='16' height='16' fill='white' />
					</clipPath>
				</defs>
			</svg>
		</StyledWrapper>
	);
}
const StyledWrapper = styled.i`
	padding: 0;
`;
