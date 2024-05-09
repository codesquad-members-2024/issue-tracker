import { useState } from "react";

const useUserStore = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return { isLoggedIn };
};

export default useUserStore;
