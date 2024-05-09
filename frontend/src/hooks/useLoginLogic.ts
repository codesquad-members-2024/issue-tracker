import { useEffect } from "react";
import useLoginStore from "./useLoginStore"

const useLoginLogic = () => {
  const loginStore = useLoginStore();
  const { idValue, passwordValue, checkAllFilled } = loginStore;

  useEffect(checkAllFilled, [idValue, passwordValue]);

  return loginStore;
}

export default useLoginLogic;