import styled from 'styled-components';
import { Input } from 'antd';
const { TextArea } = Input;

export function InputText({ className }) {
	return (
		<StyledWrapper className={className}>
			<StyledTextArea placeholder='코멘트를 입력하세요' showCount={true} />
		</StyledWrapper>
	);
}
const StyledWrapper = styled.div`
	position: relative;
`;
const StyledTextArea = styled(TextArea)`
	min-height: 132px;
	max-height: 500px;
`;
