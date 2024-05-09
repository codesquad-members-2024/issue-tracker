import { create } from "zustand";

const MIN_LENGTH = 6;
const INPUT_REGEX = /^[A-Za-z0-9]+$/;
const INPUT_REGEX_ERROR_MESSAGE = "ID와 비밀번호는 알파벳과 숫자만 포함해야 합니다.";
const INPUT_LENGTH_ERROR_MESSAGE = "ID와 비밀번호는 최소 6자이여야 합니다.";

interface LoginState {
  idValue: string;
  passwordValue: string;
  allFilled: boolean;
  errorMessage: string;
  setIdValue: (idValue: string) => void;
  setPasswordValue: (passwordValue: string) => void;
  handleLoginClick: () => void;
  checkAllFilled: () => void;
}

const validateInputs = (state: LoginState) => {
  if (!state.allFilled) return {};

  if (!INPUT_REGEX.test(state.idValue) || !INPUT_REGEX.test(state.passwordValue)) {
    return { errorMessage: INPUT_REGEX_ERROR_MESSAGE };
  }

  if (state.idValue.length < MIN_LENGTH || state.passwordValue.length < MIN_LENGTH) {
    return { errorMessage: INPUT_LENGTH_ERROR_MESSAGE };
  }

  return { errorMessage: "" };
};

const filledCallback = ({ idValue, passwordValue }: LoginState) => ({ allFilled: !!(idValue && passwordValue) });

const useLoginStore = create<LoginState>((set) => ({
  idValue: "",
  passwordValue: "",
  allFilled: false,
  errorMessage: "",
  setIdValue: (idValue: string) => set(() => ({ idValue })),
  setPasswordValue: (passwordValue: string) => set(() => ({ passwordValue })),
  handleLoginClick: () => set(validateInputs),
  checkAllFilled: () => set(filledCallback),
}));

export default useLoginStore;
