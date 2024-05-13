import { useReducer, useEffect } from "react";

interface LoginState {
  idValue: string;
  passwordValue: string;
  allFilled: boolean;
  errorMessage: string;
}

interface LoginAction {
  type: string;
  payload: string | boolean;
}

const initialState = {
  idValue: "",
  passwordValue: "",
  errorMessage: "",
  allFilled: false,
};

const loginReducer = (state: LoginState, { type, payload }: LoginAction) => {
  switch (type) {
    case "SET_ID_VALUE":
      return { ...state, idValue: payload as string };
    case "SET_PASSWORD_VALUE":
      return { ...state, passwordValue: payload as string };
    case "SET_ERROR_MESSAGE":
      return { ...state, errorMessage: payload as string };
    case "SET_ALL_FILLED":
      return { ...state, allFilled: payload as boolean };
    default:
      return state;
  }
};

function useLoginState() {
  const [state, dispatch] = useReducer(loginReducer, initialState);
  const { idValue, passwordValue } = state;

  return {
    state,
    setIdValue: (idValue: string) => dispatch({ type: "SET_ID_VALUE", payload: idValue }),
    setPasswordValue: (passwordValue: string) => dispatch({ type: "SET_PASSWORD_VALUE", payload: passwordValue }),
    setErrorMessage: (errorMessage: string) => dispatch({ type: "SET_ERROR_MESSAGE", payload: errorMessage }),
    checkAllFilled: () => dispatch({ type: "SET_ALL_FILLED", payload: !!(idValue && passwordValue) }),
  };
}

export default useLoginState;
