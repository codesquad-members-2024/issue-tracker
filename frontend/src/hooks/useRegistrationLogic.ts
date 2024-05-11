import useRegistrationState from "./useRegistrationState";
import { sendIdValidationRequest, sendRegistrationRequest } from "../api/LoginAPI";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { useEffect } from "react";

const INPUT_MIN_LENGTH = 6;
const NICKNAME_MIN_LENGTH = 2;
const INPUT_REGEX = /^[A-Za-z0-9]+$/;
const INPUT_REGEX_ERROR_MESSAGE = "ID, 비밀번호와 닉네임은 알파벳과 숫자만 포함해야 합니다.";
const INPUT_LENGTH_ERROR_MESSAGE = "ID와 비밀번호는 최소 6자이여야 합니다.";
const PASSWORD_VALIDATION_ERROR_MESSAGE = "비밀번호와 비밀번호 확인이 일치하지 않습니다.";
const NICKNAME_LENGTH_ERROR_MESSAGE = "닉네임은 최소 2자이여야 합니다.";
const REGISTRATION_FAILURE_MESSAGE = "회원가입에 실패하였습니다.";
const UNKNOWN_ERROR_MESSAGE = "알 수 없는 에러가 발생하였습니다.";

const useRegistrationLogic = () => {
  const registrationState = useRegistrationState();
  const {
    state: { idValue, passwordValue, passwordValidationValue, nicknameValue, allFilled },
    setErrorMessage,
    setIsValidated,
    setValidationMessage,
    checkAllFilled,
  } = registrationState;
  const navigate = useNavigate();

  const { mutate: validateId } = useMutation(sendIdValidationRequest, {
    onSuccess: (message) => {
      setValidationMessage(message);
      setIsValidated(true);
    },
    onError: (error) => {
      const errorMessage = error instanceof Error ? error.message : UNKNOWN_ERROR_MESSAGE;
      setValidationMessage(errorMessage);
      setIsValidated(false);
    },
  });

  const { mutate: register } = useMutation(sendRegistrationRequest, {
    onSuccess: () => navigate("/login"),
    onError: () => setErrorMessage(REGISTRATION_FAILURE_MESSAGE),
  });

  const handleValidationClick = () => validateId(idValue);
  const handleRegistrationClick = () => {
    if (!allFilled) return;

    const inputValues = [idValue, passwordValue, passwordValidationValue, nicknameValue];
    const hasInvalidInput = inputValues.some((value) => !INPUT_REGEX.test(value));

    if (hasInvalidInput) {
      setErrorMessage(INPUT_REGEX_ERROR_MESSAGE);
      return;
    }

    if (passwordValue !== passwordValidationValue) {
      setErrorMessage(PASSWORD_VALIDATION_ERROR_MESSAGE);
      return;
    }

    if (idValue.length < INPUT_MIN_LENGTH || passwordValue.length < INPUT_MIN_LENGTH) {
      setErrorMessage(INPUT_LENGTH_ERROR_MESSAGE);
      return;
    }

    if (nicknameValue.length < NICKNAME_MIN_LENGTH) {
      setErrorMessage(NICKNAME_LENGTH_ERROR_MESSAGE);
      return;
    }

    setErrorMessage("");
    register({ userId: idValue, userPassword: passwordValue, userNickname: nicknameValue });
  };

  useEffect(checkAllFilled, [idValue, passwordValue, passwordValidationValue, nicknameValue, allFilled]);

  return {
    ...registrationState,
    handleRegistrationClick,
    handleValidationClick,
  };
};

export default useRegistrationLogic;
