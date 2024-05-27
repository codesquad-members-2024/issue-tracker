import styled from 'styled-components';
import { Dropdowns } from '~/common/components';
import { InputSelectGroup } from '~/common/components';
import { useUser } from '~/common/hooks';
export function PopoverAssignee({ dropdownTitle, type, onChange, ...props }) {
	const { userList } = useUser();
	return (
		<StyledWrapper {...props}>
			<Dropdowns dropdownTitle={dropdownTitle}>
				{userList?.map(user => (
					<InputSelectGroup
						key={user.loginId}
						type={type}
						listName='assignee'
						value={user.loginId}
						src={user.profileImage}
						// checked={false}
						onChange={onChange}
					/>
				))}
			</Dropdowns>
		</StyledWrapper>
	);
}
const StyledWrapper = styled.div`
	padding: 0;
`;
