import { useEffect } from "react";
import useRegistrationStore from "./useRegistrationStore";
import { sendIdValidationRequest, sendRegistrationRequest } from "../api/LoginAPI";
import { useNavigate } from "react-router-dom";

const INPUT_MIN_LENGTH = 6;
const NICKNAME_MIN_LENGTH = 2;
const VALIDATION_SUCCESS_MESSAGE = "사용할 수 있는 아이디입니다.";
const VALIDATION_FAILURE_MESSAGE = "이미 존재하는 아이디입니다.";
const INPUT_REGEX = /^[A-Za-z0-9]+$/;
const INPUT_REGEX_ERROR_MESSAGE = "ID, 비밀번호와 닉네임은 알파벳과 숫자만 포함해야 합니다.";
const INPUT_LENGTH_ERROR_MESSAGE = "ID와 비밀번호는 최소 6자이여야 합니다.";
const PASSWORD_VALIDATION_ERROR_MESSAGE = "비밀번호와 비밀번호 확인이 일치하지 않습니다.";
const NICKNAME_LENGTH_ERROR_MESSAGE = "닉네임은 최소 2자이여야 합니다.";

const useRegistrationLogic = () => {
  const registrationStore = useRegistrationStore();
  const {
    idValue,
    passwordValue,
    passwordValidationValue,
    nicknameValue,
    isValidated,
    allFilled,
    setErrorMessage,
    setIsValidated,
    setValidationMessage,
    checkAllFilled,
  } = registrationStore;
  const navigate = useNavigate();

  const handleRegistrationClick = () => {
    if (!allFilled) return;

    if (
      !INPUT_REGEX.test(idValue) ||
      !INPUT_REGEX.test(passwordValue) ||
      !INPUT_REGEX.test(passwordValidationValue) ||
      !INPUT_REGEX.test(nicknameValue)
    )
      setErrorMessage(INPUT_REGEX_ERROR_MESSAGE);

    if (passwordValue !== passwordValidationValue) setErrorMessage(PASSWORD_VALIDATION_ERROR_MESSAGE);

    if (idValue.length < INPUT_MIN_LENGTH || passwordValue.length < INPUT_MIN_LENGTH)
      setErrorMessage(INPUT_LENGTH_ERROR_MESSAGE);

    if (nicknameValue.length < NICKNAME_MIN_LENGTH) setErrorMessage(NICKNAME_LENGTH_ERROR_MESSAGE);

    setErrorMessage("");
    sendRegistrationRequest({ userId: idValue, userPassword: passwordValue, userNickname: nicknameValue })
      .then(() => navigate("/login"))
      .catch(() => setErrorMessage("회원가입에 실패하였습니다."));
  };

  const handleValidationClick = async () => {
    const validationResult = await sendIdValidationRequest(idValue);

    if (!validationResult) {
      setIsValidated(false);
      setValidationMessage(VALIDATION_FAILURE_MESSAGE);
      return;
    }

    setIsValidated(true);
    setValidationMessage(VALIDATION_SUCCESS_MESSAGE);
  };

  useEffect(checkAllFilled, [idValue, passwordValue, passwordValidationValue, nicknameValue, isValidated]);

  return { ...registrationStore, handleRegistrationClick, handleValidationClick };
};

export default useRegistrationLogic;
