import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { APiUtil } from "../common/Utils";

export interface LoginForm {
    id: string;
    password: string;
}

const LoginPage = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false)
    const [LoginForm, setLoginForm] = useState<LoginForm>({
        id: "",
        password: ""
    })
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await APiUtil.createData("users/login", LoginForm);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            sessionStorage.setItem('token', data.token);
            sessionStorage.setItem('user', JSON.stringify(data.userResponse));
            
            setIsLogin(true)
            
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    useEffect(()=> {
        // <Navigate to="/Login" />
        if(isLogin) navigate("/issue", { replace: true });
    }, [isLogin])

    useEffect(() => {
        const isLogin = !!sessionStorage.getItem("token");
        if(isLogin) navigate("/issue", { replace: true });
    }, [navigate])

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setLoginForm((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }
    return (
        <main className="h-full flex justify-center items-center">
            <div className="flex flex-col items-center">
                <Link to="/" className="text-5xl font-style: italic font-extralight p-10">
                    Issue Tracker11
                </Link>
                <button className="px-10 py-2 font-normal border-solid border-2 text-blue-500 border-blue-500 rounded-xl">
                    GitHub 계정으로 로그인
                </button>
                <div className="p-4">or</div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <input
                        className="bg-slate-200 text-black px-8 py-2 border-solid rounded-xl"
                        name="id"
                        type="text"
                        onChange={handleChange}
                        value={LoginForm.id}
                        placeholder="아이디"
                    />
                    <input
                        className="bg-slate-200 text-black px-8 py-2 border-solid border-2 rounded-xl"
                        onChange={handleChange}
                        value={LoginForm.password}
                        name="password"
                        type="text"
                        placeholder="비밀번호"
                    />
                    <input
                        className="px-10 py-2 font-normal border-solid border-2 text-white border-blue-500 rounded-xl bg-blue-500"
                        type="submit"
                        value="아이디로 로그인"
                    />
                </form>
                <Link to="/SignUp" className="p-5">회원가입</Link>
            </div>
        </main>
    );
};

export default LoginPage;

