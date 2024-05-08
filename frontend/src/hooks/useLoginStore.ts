import { useEffect, useState } from "react";

const MIN_LENGTH = 6;
const INPUT_REGEX = /^[A-Za-z0-9]+$/;
const INPUT_REGEX_ERROR_MESSAGE = "ID와 비밀번호는 알파벳과 숫자만 포함해야 합니다.";
const INPUT_LENGTH_ERROR_MESSAGE = "ID와 비밀번호는 최소 6자이여야 합니다.";

const useLoginStore = () => {
  const [idValue, setIdValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [allFilled, setAllFilled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLoginClick = () => {
    if (!INPUT_REGEX.test(idValue) || !INPUT_REGEX.test(passwordValue)) {
      setErrorMessage(INPUT_REGEX_ERROR_MESSAGE);
      return;
    }

    if (idValue.length < MIN_LENGTH || passwordValue.length < MIN_LENGTH) {
      setErrorMessage(INPUT_LENGTH_ERROR_MESSAGE);
      return;
    } 

    setErrorMessage("");
  };

  useEffect(() => setAllFilled(!!(idValue && passwordValue)), [idValue, passwordValue]);

  return { setIdValue, setPasswordValue, allFilled, setAllFilled, errorMessage, handleLoginClick };
};

export default useLoginStore;
