import { useEffect } from "react";
import useLoginStore from "./useLoginStore";
import { sendLoginRequest } from "../api/LoginAPI";
import useUserStore from "./useUserStore";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";

const MIN_LENGTH = 6;
const INPUT_REGEX = /^[A-Za-z0-9]+$/;
const INPUT_REGEX_ERROR_MESSAGE = "ID와 비밀번호는 알파벳과 숫자만 포함해야 합니다.";
const INPUT_LENGTH_ERROR_MESSAGE = "ID와 비밀번호는 최소 6자이여야 합니다.";
const LOGIN_VALIDATION_ERROR_MESSAGE = "아이디나 비밀번호가 일치하지 않습니다.";

const useLoginLogic = () => {
  const loginStore = useLoginStore();
  const { idValue, passwordValue, allFilled, setErrorMessage, checkAllFilled } = loginStore;
  const { setIsLoggedIn } = useUserStore();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation(sendLoginRequest, {
    onSuccess: () => {
      setIsLoggedIn(true);
      navigate("/");
    },
    onError: () => {
      setErrorMessage(LOGIN_VALIDATION_ERROR_MESSAGE);
    },
  });

  const handleLoginClick = async () => {
    if (!allFilled) return;

    if (!INPUT_REGEX.test(idValue) || !INPUT_REGEX.test(passwordValue)) {
      setErrorMessage(INPUT_REGEX_ERROR_MESSAGE);
      return;
    }

    if (idValue.length < MIN_LENGTH || passwordValue.length < MIN_LENGTH) {
      setErrorMessage(INPUT_LENGTH_ERROR_MESSAGE);
      return;
    }

    setErrorMessage("");
    login({ userId: idValue, userPassword: passwordValue });
  };

  useEffect(checkAllFilled, [idValue, passwordValue]);

  return { ...loginStore, isLoading, handleLoginClick };
};

export default useLoginLogic;
