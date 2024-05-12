import { useRef, useState } from "react";
import { ReactComponent as Logo } from "./Logo.svg";

function Login() {
	const [validId, setValidId] = useState(false);
	const [validPw, setValidPw] = useState(false);
	const idRef = useRef<HTMLInputElement>(null);
	const pwRef = useRef<HTMLInputElement>(null);

	const onIdBlur = () => {
		const { validity, value } = idRef.current as HTMLInputElement;
		setValidId(validity.valid && !!value);
	};

	const onPwBlur = () => {
		const { validity, value } = pwRef.current as HTMLInputElement;
		setValidPw(validity.valid && !!value);
	};
	return (
		<div className="w-full h-full flex items-center justify-center">
			<div className="w-[400px] h-[600px] flex items-center justify-center flex-col text-grayscale.600">
				<Logo className="animated-path mb-20" />
				<button className="btn-large btn-outline mb-4">GitHub 계정으로 로그인</button>
				or
				<div className="relative flex items-center justify-center flex-col">
					<input
						id="id"
						ref={idRef}
						placeholder=""
						className="invalid:input--invalid input-56 my-5 peer/id focus:input-text--focus"
						type="text"
						pattern="^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,16}$"
						onBlur={onIdBlur}
					/>
					<label htmlFor="id" className="input-label peer-placeholder-shown/id:input-label--input">
						아이디
					</label>
					<p className="invisible absolute top-19 left-4 text-xs text-accent.red font-medium peer-invalid/id:visible">
						영문, 숫자 조합 6자 이상 16자 이하
					</p>
					<input
						id="pw"
						ref={pwRef}
						placeholder=""
						className="input-56 mb-5 peer/pw focus:input-text--focus"
						type="password"
						pattern="^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,12}$"
						onBlur={onPwBlur}
					/>
					<label
						htmlFor="pw"
						className="input-label top-[104px] peer-placeholder-shown/pw:input-label--input"
					>
						비밀번호
					</label>
				</div>
				<button
					className="mb-4 btn-large btn-container disabled:opacity-[32%]"
					disabled={!(validId && validPw)}
				>
					아이디로 로그인
				</button>
				<button className="btn-ghost disabled:opacity-[32%]" disabled={!(validId && validPw)}>
					회원가입
				</button>
			</div>
		</div>
	);
}

export default Login;
