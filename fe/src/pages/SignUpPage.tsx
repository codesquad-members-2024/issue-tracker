import { useEffect, useState } from "react";
import FileUploader from "../common/FileUploader";
import { UserImgBox } from "../common/UserImgBox";
import { Link } from "react-router-dom";
import { APiUtil } from "../common/Utils";

export interface SignUpForm {
    username: string;
    id: string;
    password: string;
    imgUrl: string;
}
const SignUp = () => {
    const [isFormValid, setIsFormValid] = useState(false);
    const [isIdUnique, setIsIdUnique] = useState(false);
    const [isIdDuplicate, setIsIdDuplicate] = useState(false)
    const [isFocus, setIsFocus] = useState({
        idFocus: false,
        passWordFocus: false
    })
    const [signUpForm, setSignUpForm] = useState<SignUpForm>({
        username: "",
        id: "",
        password: "",
        imgUrl: "",
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSignUpForm((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const validateId = (type: string, min: number, max: number) => {
        const regex = new RegExp(`^[a-zA-Z0-9]{${min},${max}}$`);
        return regex.test(type);
    };

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await APiUtil.createData("users", signUpForm)
    }

    const handleIsIdAvailable = async() => {
        try {
            await APiUtil.getData(`users/checkUserId/${signUpForm.id}`)
            setIsIdUnique(true)
            console.log(`${signUpForm.id}`)
        } catch (e){
            console.log(e)
            setIsIdDuplicate(true)
            setTimeout(()=>{
                setIsIdDuplicate(false)
            },2500)
        }
    };

    const checkValue = () => {
        const { username } = signUpForm;
        return (
            username !== "" &&
            validateId(signUpForm.id, 6, 16) &&
            validateId(signUpForm.password, 6, 12)
        );
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        const {name} = e.target
        setIsFocus(prev => ({
            ...prev,
            [`${name}Focus`]: true
        }))
    }
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const {name} = e.target
        setIsFocus(prev => ({
            ...prev,
            [`${name}Focus`]: false
        }))
    }

    useEffect(() => {
        console.log(signUpForm)
        // isIdUnique 타입도 검사
        setIsFormValid(checkValue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isIdUnique, signUpForm]);

    return (
        <main className="h-full flex justify-center items-center flex-col">
            <Link
                to="/"
                className="text-5xl font-style: italic font-extralight p-10"
            >
                Issue Tracker
            </Link>
            <UserImgBox imgURL={signUpForm.imgUrl} />
            <FileUploader<SignUpForm> setIssueData={setSignUpForm} />
            <div className="flex flex-col items-center">
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <input
                        name="username"
                        className="focus:outline-none bg-slate-200 text-black px-8 py-2 border-solid rounded-xl"
                        type="text"
                        value={signUpForm.username}
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
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            minLength={6}
                            maxLength={16}
                            placeholder="아이디(6 - 16자리)"
                        />
                        <button
                            type="button"
                            onClick={handleIsIdAvailable}
                            className="m-auto text-sm bg-blue-500 rounded-xl text-white py-1 px-2"
                        >
                            중복 확인
                        </button>
                    </div>
                    {isFocus.idFocus && !isIdDuplicate && !validateId(signUpForm.id, 6, 16) && (
                        <p className="text-red-500 text-sm">
                            아이디는 6자 이상 16자 이하여야 합니다.
                        </p>
                    )}
                    { isIdDuplicate && (
                        <p className="text-red-500 text-sm">
                            아이디가 중복되었습니다.
                        </p>
                    )}
                    <input
                        name="password"
                        className={`focus:outline-none bg-slate-200 text-black px-8 py-2 border-solid border-2 rounded-xl `}
                        type="password"
                        value={signUpForm.password}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        minLength={6}
                        maxLength={12}
                        placeholder="비밀번호(6 - 12자리)"
                        pattern=".{6,12}"
                        title="비밀번호는 6자 이상 12자 이하여야 합니다."
                    />
                    {isFocus.passWordFocus && !validateId(signUpForm.password, 6, 12) && (
                        <p className="text-red-500 text-sm">
                            비밀번호는 6자 이상 12자 이하여야 합니다.
                        </p>
                    )}
                    <input
                        className={`${
                            !isFormValid && "bg-gray-200"
                        } px-10 py-2 font-normal border-solid border-2 text-white rounded-xl bg-blue-500`}
                        type="submit"
                        disabled={!isFormValid}
                        value="회원가입"
                    />
                </form>
            </div>
        </main>
    );
};

export default SignUp;
