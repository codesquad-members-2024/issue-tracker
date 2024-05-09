const SERVER = process.env.REACT_APP_SERVER;

interface LoginState {
  usedId: string;
  userPassword: string;
}

interface UserState {
  userId: string;
  userNickname: string;
}

export const sendLoginRequest: (loginState: LoginState) => Promise<UserState> = async (loginState) => {
  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginState),
  };
  const response = await fetch(`${SERVER}/login`, request);
  if (!response.ok) throw new Error("Network Error");
  const userState = response.json();

  return userState;
} 