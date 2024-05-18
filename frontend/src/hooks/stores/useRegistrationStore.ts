import { useReducer } from "react";

interface RegistrationState {
  idValue: string;
  passwordValue: string;
  passwordValidationValue: string;
  nicknameValue: string;
  allFilled: boolean;
  errorMessage: string;
  isValidated: boolean;
  validationMessage: string;
}

interface RegistrationAction {
  type: string;
  payload: string | boolean;
}

const initialState: RegistrationState = {
  idValue: "",
  passwordValue: "",
  passwordValidationValue: "",
  nicknameValue: "",
  errorMessage: "",
  validationMessage: "",
  isValidated: false,
  allFilled: false,
};

function registrationReducer(state: RegistrationState, { type, payload }: RegistrationAction): RegistrationState {
  switch (type) {
    case "SET_ID_VALUE":
      return { ...state, idValue: payload as string };
    case "SET_PASSWORD_VALUE":
      return { ...state, passwordValue: payload as string };
    case "SET_PASSWORD_VALIDATION_VALUE":
      return { ...state, passwordValidationValue: payload as string };
    case "SET_NICKNAME_VALUE":
      return { ...state, nicknameValue: payload as string };
    case "SET_ERROR_MESSAGE":
      return { ...state, errorMessage: payload as string };
    case "SET_IS_VALIDATED":
      return { ...state, isValidated: payload as boolean };
    case "SET_VALIDATION_MESSAGE":
      return { ...state, validationMessage: payload as string };
    case "SET_ALL_FILLED":
      return { ...state, allFilled: payload as boolean };
    default:
      return state;
  }
}

function useRegistrationStore() {
  const [state, dispatch] = useReducer(registrationReducer, initialState);
  const { idValue, passwordValue, passwordValidationValue, nicknameValue, isValidated } = state;

  return {
    state,
    setIdValue: (idValue: string) => dispatch({ type: "SET_ID_VALUE", payload: idValue }),
    setPasswordValue: (passwordValue: string) => dispatch({ type: "SET_PASSWORD_VALUE", payload: passwordValue }),
    setPasswordValidationValue: (passwordValidationValue: string) =>
      dispatch({ type: "SET_PASSWORD_VALIDATION_VALUE", payload: passwordValidationValue }),
    setNicknameValue: (nicknameValue: string) => dispatch({ type: "SET_NICKNAME_VALUE", payload: nicknameValue }),
    setErrorMessage: (errorMessage: string) => dispatch({ type: "SET_ERROR_MESSAGE", payload: errorMessage }),
    setIsValidated: (isValidated: boolean) => dispatch({ type: "SET_IS_VALIDATED", payload: isValidated }),
    setValidationMessage: (validationMessage: string) =>
      dispatch({ type: "SET_VALIDATION_MESSAGE", payload: validationMessage }),
    checkAllFilled: () =>
      dispatch({
        type: "SET_ALL_FILLED",
        payload: !!(idValue && passwordValue && passwordValidationValue && nicknameValue && isValidated),
      }),
  };
}

export default useRegistrationStore;
