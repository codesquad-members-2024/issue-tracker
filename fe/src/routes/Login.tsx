import { ReactComponent as Logo } from "../svg/LogoLarge.svg";
import { useContext, useEffect, useRef, useState } from "react";
import useLoginFetch from "../hooks/useLoginFetch";
import { TopContext } from "../provider/TopProvider";
import fetchData from "../utility/fetchData";

interface Data {
	memberId: string;
	password: string;
}

function Login() {
	const [validId, setValidId] = useState(false);
	const [validPw, setValidPw] = useState(false);
	const [loginData, setLoginData] = useState<null | Data>(null);
	const [result, error] = useLoginFetch("/member/login", loginData);
	const [, , , setIsLoggedIn] = useContext(TopContext);

	const idRef = useRef<HTMLInputElement>(null);
	const pwRef = useRef<HTMLInputElement>(null);

	const onIdBlur = () => {
		const { validity, value } = idRef.current as HTMLInputElement;
		setValidId(validity.valid && !!value);
	};

	const onPwChange = () => {
		const { validity, value } = pwRef.current as HTMLInputElement;
		setValidPw(validity.valid && !!value);
	};

	const handleLogin = () => {
		if (!(idRef.current && pwRef.current)) return;
		setLoginData({
			memberId: idRef.current.value,
			password: pwRef.current.value,
		});
	};

	useEffect(() => {
		const jwt = localStorage.getItem("jwt");
		if (jwt) setIsLoggedIn(true);
	}, [result, setIsLoggedIn]);

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
						onChange={onPwChange}
					/>
					<label
						htmlFor="pw"
						className="input-label top-[104px] peer-placeholder-shown/pw:input-label--input"
					>
						비밀번호
					</label>
				</div>
				<button
					onClick={handleLogin}
					className="mb-4 btn-large btn-container disabled:opacity-[32%]"
					disabled={!(validId && validPw)}
				>
					아이디로 로그인
				</button>
				<button className="btn-ghost disabled:opacity-[32%]" disabled={!(validId && validPw)}>
					회원가입
				</button>
			</div>
			{error && (
				<div className="absolute top-1/2 z-20 w-[350px] h-[280px] text-bold text-2xl shadow-modal bg-grayscale.50 rounded-2xl flex justify-center items-center">
					서버점검 중ㅠ.ㅠ
				</div>
			)}
		</div>
	);
}

export default Login;
