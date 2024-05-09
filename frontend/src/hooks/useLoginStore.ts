import { create } from "zustand";

interface LoginState {
  idValue: string;
  passwordValue: string;
  allFilled: boolean;
  errorMessage: string;
  setIdValue: (idValue: string) => void;
  setPasswordValue: (passwordValue: string) => void;
  setErrorMessage: (errorMessage: string) => void;
  checkAllFilled: () => void;
}

const filledCallback = ({ idValue, passwordValue }: LoginState) => ({ allFilled: !!(idValue && passwordValue) });

const useLoginStore = create<LoginState>((set) => ({
  idValue: "",
  passwordValue: "",
  allFilled: false,
  errorMessage: "",
  setIdValue: (idValue: string) => set(() => ({ idValue })),
  setPasswordValue: (passwordValue: string) => set(() => ({ passwordValue })),
  setErrorMessage: (errorMessage: string) => set(() => ({ errorMessage })),
  checkAllFilled: () => set(filledCallback),
}));

export default useLoginStore;
