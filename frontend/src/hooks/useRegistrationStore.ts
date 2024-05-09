import create from "zustand";

const INPUT_MIN_LENGTH = 6;
const NICKNAME_MIN_LENGTH = 2;
const VALIDATION_TEST_ID_VALUE = "admin"; // deprecated after implementation of registration api
const VALIDATION_SUCCESS_MESSAGE = "사용할 수 있는 아이디입니다.";
const VALIDATION_FAILURE_MESSAGE = "이미 존재하는 아이디입니다.";
const INPUT_REGEX = /^[A-Za-z0-9]+$/;
const INPUT_REGEX_ERROR_MESSAGE = "ID, 비밀번호와 닉네임은 알파벳과 숫자만 포함해야 합니다.";
const INPUT_LENGTH_ERROR_MESSAGE = "ID와 비밀번호는 최소 6자이여야 합니다.";
const PASSWORD_VALIDATION_ERROR_MESSAGE = "비밀번호와 비밀번호 확인이 일치하지 않습니다.";
const NICKNAME_LENGTH_ERROR_MESSAGE = "닉네임은 최소 2자이여야 합니다.";

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
  handleRegistrationClick: () => void;
  handleValidationClick: () => void;
  checkAllFilled: () => void;
}

const registrationCallback = (state: RegistrationState) => {
  if (!state.allFilled) return {};

  if (
    !INPUT_REGEX.test(state.idValue) ||
    !INPUT_REGEX.test(state.passwordValue) ||
    !INPUT_REGEX.test(state.passwordValidationValue) ||
    !INPUT_REGEX.test(state.nicknameValue)
  ) {
    return { errorMessage: INPUT_REGEX_ERROR_MESSAGE };
  }

  if (state.passwordValue !== state.passwordValidationValue) {
    return { errorMessage: PASSWORD_VALIDATION_ERROR_MESSAGE };
  }

  if (state.idValue.length < INPUT_MIN_LENGTH || state.passwordValue.length < INPUT_MIN_LENGTH) {
    return { errorMessage: INPUT_LENGTH_ERROR_MESSAGE };
  }

  if (state.nicknameValue.length < NICKNAME_MIN_LENGTH) {
    return { errorMessage: NICKNAME_LENGTH_ERROR_MESSAGE };
  }

  return { errorMessage: "" };
};

const validationCallback = (state: RegistrationState) => {
  if (state.idValue === VALIDATION_TEST_ID_VALUE) {
    return { isValidated: false, validationMessage: VALIDATION_FAILURE_MESSAGE };
  }

  return { isValidated: true, validationMessage: VALIDATION_SUCCESS_MESSAGE };
};

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
  handleRegistrationClick: () => set(registrationCallback),
  handleValidationClick: () => set(validationCallback),
  checkAllFilled: () => set(filledCallback),
}));

export default useRegistrationStore;
