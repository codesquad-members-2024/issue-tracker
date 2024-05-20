import styled from 'styled-components';
import { LabelContainer } from '~/features/label/containers';
import { InnerLayout } from '~/common/components';
export function LabelPage() {
	return (
		<InnerLayout>
			<LabelContainer />
		</InnerLayout>
	);
}
const StyledWrapper = styled.div``;
