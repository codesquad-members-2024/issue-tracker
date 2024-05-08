import { useEffect, useState } from "react"

const useLoginStore = () => {
  const [idValue, setIdValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [allFilled, setAllFilled] = useState(false);

  useEffect(() => setAllFilled(!!(idValue && passwordValue)), [idValue, passwordValue]);

  return { idValue, setIdValue, passwordValue, setPasswordValue, allFilled, setAllFilled };
}

export default useLoginStore;