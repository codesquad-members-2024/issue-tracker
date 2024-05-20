import styled, { keyframes } from 'styled-components';

export function MilestoneIndicator({ milestone, progess = 40 }) {
	return (
		<StyledWrapper>
			<span className='total'>
				<StyledProgress
					className='percentage'
					$width={progess}
				></StyledProgress>
			</span>
			<p>{milestone}</p>
		</StyledWrapper>
	);
}
const AnimationFill = keyframes`
    from {
        width: 0;
    }
    to {
        width: ${({ $width }) => $width}%;
    }
`;

const StyledWrapper = styled.div`
	width: 224px;

	.total {
		position: relative;
		display: block;
		height: 8px;
		width: 100%;
		background-color: ${({ theme }) => theme.color.neutral.surface.bold};
		border-radius: ${({ theme }) => theme.radius.medium};
		overflow: hidden;
		i {
			position: absolute;
			top: 0;
			left: 0;
			height: 100%;
			background-color: ${({ theme }) => theme.color.palette.blue};
		}
	}
	p {
		margin-top: 8px;
		color: ${({ theme }) => theme.color.neutral.text.strong};
		${({ theme }) => theme.typography.medium[12]}
	}
`;
const StyledProgress = styled.i`
	width: ${({ $width }) => $width}%;
	animation: ${AnimationFill} 1s forwards;
`;
