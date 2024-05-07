import logo from "./logo.svg";

function Login() {
	return (
		<div className="w-full h-full flex items-center justify-center">
			<div className="w-[400px] h-[600px] flex items-center justify-center flex-col bg-sky-50 text-grayscale.600">
				<img className="mb-20" src={logo} alt="logo"></img>
				<button className="btn-large btn-outline mb-4">GitHub 계정으로 로그인</button>
				or
				<input type="text"></input>
				<input type="password"></input>
				<button className="btn-large btn-container">아이디로 로그인</button>
				<button>회원가입</button>
			</div>
		</div>
	);
}

export default Login;
