import { SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
    const navigate = useNavigate();

    const handelSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        navigate("/issue", { replace: true });
    };
    return (
        <main className="h-full flex justify-center items-center">
            <div className="flex flex-col items-center">
                <h1 className="text-5xl font-style: italic font-extralight p-10">
                    Issue Tracker
                </h1>
                <button className="px-10 py-2 font-normal border-solid border-2 text-blue-500 border-blue-500 rounded-xl">
                    GitHub 계정으로 로그인
                </button>
                <div className="p-4">or</div>
                <form onSubmit={handelSubmit} className="flex flex-col gap-2">
                    <input
                        className="bg-slate-200 text-black px-8 py-2 border-solid rounded-xl"
                        type="text"
                        placeholder="아이디"
                    />
                    <input
                        className="bg-slate-200 text-black px-8 py-2 border-solid border-2 rounded-xl"
                        type="text"
                        placeholder="비밀번호"
                    />
                    <input
                        className="px-10 py-2 font-normal border-solid border-2 text-white border-blue-500 rounded-xl bg-blue-500"
                        type="submit"
                        value="아이디로 로그인"
                    />
                </form>
                <button className="p-5">회원가입</button>
            </div>
        </main>
    );
};

export default LoginPage;

