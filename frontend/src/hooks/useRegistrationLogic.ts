import { useEffect } from "react";
import useRegistrationStore from "./useRegistrationStore";

const useRegistrationLogic = () => {
  const registrationStore = useRegistrationStore();
  const { idValue, passwordValue, passwordValidationValue, nicknameValue, isValidated, checkAllFilled } =
    registrationStore;

  useEffect(checkAllFilled, [idValue, passwordValue, passwordValidationValue, nicknameValue, isValidated]);

  return registrationStore;
};

export default useRegistrationLogic;
