import { useEffect, useState } from "react";

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

const useRegistrationStore = () => {
  const [idValue, setIdValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [passwordValidationValue, setPasswordValidationValue] = useState("");
  const [nicknameValue, setNicknameValue] = useState("");
  const [allFilled, setAllFilled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isValidated, setIsValidated] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");

  const handleRegistrationClick = () => {
    if (!allFilled) return;

    if (
      !INPUT_REGEX.test(idValue) ||
      !INPUT_REGEX.test(passwordValue) ||
      !INPUT_REGEX.test(passwordValidationValue) ||
      !INPUT_REGEX.test(nicknameValue)
    ) {
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
  };

  const handleValidationClick = () => {
    if (idValue === VALIDATION_TEST_ID_VALUE) {
      setIsValidated(false);
      setValidationMessage(VALIDATION_FAILURE_MESSAGE);
      return;
    }

    setIsValidated(true);
    setValidationMessage(VALIDATION_SUCCESS_MESSAGE);
  };

  useEffect(
    () => setAllFilled(!!(idValue && passwordValue && passwordValidationValue && nicknameValue && isValidated)),
    [idValue, passwordValue, passwordValidationValue, nicknameValue, isValidated]
  );

  return {
    setIdValue,
    setPasswordValue,
    setPasswordValidationValue,
    setNicknameValue,
    allFilled,
    errorMessage,
    handleRegistrationClick,
    handleValidationClick,
    isValidated,
    validationMessage,
  };
};

export default useRegistrationStore;
