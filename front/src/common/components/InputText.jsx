import styled from 'styled-components';
import { Input } from 'antd';
const { TextArea } = Input;

export function InputText() {
	return (
		<StyledWrapper>
			<StyledTextArea placeholder='코멘트를 입력하세요' showCount={true} />
		</StyledWrapper>
	);
}
const StyledWrapper = styled.div`
	position: relative;
`;
const StyledTextArea = styled(TextArea)``;
