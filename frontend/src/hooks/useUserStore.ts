import { create } from "zustand";

interface UserStoreState {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
};

const useUserStore = create<UserStoreState>((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn: boolean) => set(() => ({ isLoggedIn })),
}));

export default useUserStore;
