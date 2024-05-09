import { useState } from 'react';
import styled from 'styled-components';

import { Logo } from '../../../common/Logo';
import { Button } from '../../../common/components/Button';
import { Input } from 'antd';

export function SignContainer() {
	const [id, setId] = useState('');
	const [password, setPassword] = useState('');
	return (
		<StyledWrapper>
			<StyledLogo />
			<StyledButton type='button' buttonType='outline' size='large'>
				GitHub 계정으로 로그인
			</StyledButton>
			<b>or</b>
			<StyledInputWrap>
				<StyledId placeholder='아이디' onChange={e => setId(e.target.value)} />
				<StyledPassword
					placeholder='비밀번호'
					onChange={e => setPassword(e.target.value)}
				/>
			</StyledInputWrap>
			<StyledButton size='large' buttonType='container'>
				아이디로 로그인
			</StyledButton>
			<StyledJoinButton buttonType='ghost' size='large'>
				회원가입
			</StyledJoinButton>
		</StyledWrapper>
	);
}
// TODO: 스타일 수정, 버튼 theme 만들기
const StyledWrapper = styled.div`
	width: 342px;
	b {
		text-align: center;
		display: block;
		margin: 14px 0 18px;
	}
`;
const StyledLogo = styled(Logo)`
	width: 100%;
	margin-bottom: 64px;
`;
const StyledButton = styled(Button)`
	width: 100%;
`;
const StyledInputWrap = styled.div``;
const StyledId = styled(Input)`
	margin-bottom: 16px;
`;
const StyledPassword = styled(Input.Password)`
	margin-bottom: 16px;
`;
const StyledJoinButton = styled(Button)`
	text-align: center;
	width: 100%;
	margin-top: 16px;
	height: 32px;
`;
