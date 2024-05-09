import create from "zustand";

interface RegistrationState {
  idValue: string;
  passwordValue: string;
  passwordValidationValue: string;
  nicknameValue: string;
  allFilled: boolean;
  errorMessage: string;
  isValidated: boolean;
  validationMessage: string;
  setIdValue: (idValue: string) => void;
  setPasswordValue: (passwordValue: string) => void;
  setPasswordValidationValue: (passwordValidationValue: string) => void;
  setNicknameValue: (nicknameValue: string) => void;
  setErrorMessage: (errorMessage: string) => void;
  setIsValidated: (isValidated: boolean) => void;
  setValidationMessage: (validationMessage: string) => void;
  checkAllFilled: () => void;
}

const filledCallback = ({
  idValue,
  passwordValue,
  passwordValidationValue,
  nicknameValue,
  isValidated,
}: RegistrationState) => ({
  allFilled: !!(idValue && passwordValue && passwordValidationValue && nicknameValue && isValidated),
});

const useRegistrationStore = create<RegistrationState>((set) => ({
  idValue: "",
  passwordValue: "",
  passwordValidationValue: "",
  nicknameValue: "",
  allFilled: false,
  errorMessage: "",
  isValidated: false,
  validationMessage: "",
  setIdValue: (idValue: string) => set(() => ({ idValue })),
  setPasswordValue: (passwordValue: string) => set(() => ({ passwordValue })),
  setPasswordValidationValue: (passwordValidationValue: string) => set(() => ({ passwordValidationValue })),
  setNicknameValue: (nicknameValue: string) => set(() => ({ nicknameValue })),
  setErrorMessage: (errorMessage: string) => set(() => ({ errorMessage })),
  setIsValidated: (isValidated: boolean) => set(() => ({ isValidated })),
  setValidationMessage: (validationMessage: string) => set(() => ({ validationMessage })),
  checkAllFilled: () => set(filledCallback),
}));

export default useRegistrationStore;
