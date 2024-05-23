import { useEffect, useState } from "react";

const SignUp = () => {
    const [isFormValid, setIsFormValid] = useState(false);
    const [isIdAvailable, setIsIdAvailable] = useState(false);
    const [signUpForm, serSignUpForm] = useState({
        name: "",
        id: "",
        passWard: "",
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        serSignUpForm((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleIsIdAvailable = () => {
        
    }

    const checkValue = () => {
        const { name, id, passWard } = signUpForm;
        return name !== "" && id !== "" && passWard !== "" && isIdAvailable;
    };

    useEffect(() => {
        setIsFormValid(checkValue());
    }, [signUpForm]);

    return (
        <main className="h-full flex justify-center items-center">
            <div className="flex flex-col items-center">
                <form className="flex flex-col gap-2">
                    <input
                        name="name"
                        className="focus:outline-none bg-slate-200 text-black px-8 py-2 border-solid rounded-xl"
                        type="text"
                        value={signUpForm.name}
                        onChange={handleChange}
                        placeholder="이름"
                    />
                    <div className="bg-slate-200 text-black px-8 py-2 border-solid rounded-xl flex">
                        <input
                            name="id"
                            className="bg-slate-200 text-black focus:outline-none"
                            type="text"
                            value={signUpForm.id}
                            onChange={handleChange}
                            placeholder="아이디"
                        />
                        <div onClick={handleIsIdAvailable} className="m-auto text-sm bg-blue-500 rounded-xl text-white py-1 px-2">중복 확인</div>
                    </div>
                    <input
                        name="passWard"
                        className="focus:outline-none bg-slate-200 text-black px-8 py-2 border-solid border-2 rounded-xl"
                        type="text"
                        value={signUpForm.passWard}
                        onChange={handleChange}
                        placeholder="비밀번호"
                    />
                    <input
                        className={`${
                            !isFormValid && "bg-gray-200"
                        } px-10 py-2 font-normal border-solid border-2 text-white rounded-xl bg-blue-500`}
                        type="submit"
                        disabled={isFormValid}
                        value="회원가입"
                    />
                </form>
            </div>
        </main>
    );
};

export default SignUp;
