import { create } from "zustand";

interface UserStoreState {
  userId: string;
  isLoggedIn: boolean;
  setUserId: (userId: string) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const useUserStore = create<UserStoreState>((set) => ({
  userId: "",
  isLoggedIn: false,
  setUserId: (userId: string) => set(() => ({ userId })),
  setIsLoggedIn: (isLoggedIn: boolean) => set(() => ({ isLoggedIn })),
}));

export default useUserStore;
