const SERVER = process.env.REACT_APP_SERVER;

interface LoginState {
  userId: string;
  userPassword: string;
}

interface UserState {
  userId: string;
  userNickname: string;
}

interface RegistrationState extends UserState {
  userPassword: string;
}

// 백엔드 API 배포 이후에 변경 예정
export const sendLoginRequest: (loginState: LoginState) => Promise<UserState> = async (loginState) => {
  const request = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(
    `${SERVER}/users?userId=${loginState.userId}&userPassword=${loginState.userPassword}`,
    request
  );
  if (!response.ok) throw new Error("Network Error");

  const userStateArray = (await response.json()) as UserState[];

  if (userStateArray.length === 0) throw new Error("No users found (404)");

  return userStateArray[0];
};

// 백엔드 API 배포 이후에 변경 예정
export const sendRegistrationRequest: (registrationState: RegistrationState) => Promise<Response> = async (
  registrationState
) => {
  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registrationState),
  };
  const response = await fetch(`${SERVER}/users`, request);
  if (!response.ok) throw new Error("Network Error");

  return response;
};

// 백엔드 API 배포 이후에 변경 예정
export const sendIdValidationRequest: (idValue: string) => Promise<boolean> = async (idValue) => {
  const request = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(`${SERVER}/users?userId=${idValue}`, request);
  if (!response.ok) throw new Error("Network Error");

  const userStateArray = await response.json();

  if (userStateArray.length === 0) return true;

  return false;
};
