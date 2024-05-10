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

export const sendLoginRequest: (loginState: LoginState) => Promise<Response> = async (loginState) => {
  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginState),
  };
  const response = await fetch(
    `${SERVER}/login`,
    request
  );
  if (!response.ok) throw new Error("Network Error");

  return response;
};

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
  const response = await fetch(`${SERVER}/registration`, request);
  if (!response.ok) throw new Error("Network Error");

  return response;
};

export const sendIdValidationRequest: (idValue: string) => Promise<boolean> = async (idValue) => {
  const request = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(`${SERVER}/validation/${idValue}`, request);

  if (response.status === 500) throw new Error("Network Error");
  if (!response.ok) return false;

  return true;
};
