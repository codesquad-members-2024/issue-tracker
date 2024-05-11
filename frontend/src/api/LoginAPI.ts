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

const VALIDATION_SUCCESS_MESSAGE = "사용할 수 있는 아이디입니다.";
const VALIDATION_FAILURE_MESSAGE = "이미 존재하는 아이디입니다.";
const SERVER_ERROR_MESSAGE = "서버 연결에 실패하였습니다.";

export const sendLoginRequest: (loginState: LoginState) => Promise<Response> = async (loginState) => {
  try {
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginState),
    };
    const response = await fetch(`${SERVER}/login`, request);
    
    if (!response.ok) throw new Error(SERVER_ERROR_MESSAGE);

    return response;
  } catch (error) {
    throw new Error(SERVER_ERROR_MESSAGE);
  }
};

export const sendRegistrationRequest: (registrationState: RegistrationState) => Promise<Response> = async (
  registrationState
) => {
  try {
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registrationState),
    };
    const response = await fetch(`${SERVER}/registration`, request);
    
    if (!response.ok) throw new Error(SERVER_ERROR_MESSAGE);

    return response;
  } catch (error) {
    throw new Error(SERVER_ERROR_MESSAGE);
  }
};

export const sendIdValidationRequest = async (idValue: string): Promise<string> => {
  try {
    const response = await fetch(`${SERVER}/validation/${idValue}`);

    if (response.status === 400) throw new Error(VALIDATION_FAILURE_MESSAGE);
    if (!response.ok) throw new Error(SERVER_ERROR_MESSAGE);

    return VALIDATION_SUCCESS_MESSAGE;
  } catch (error) {
    throw new Error(SERVER_ERROR_MESSAGE);
  }
};
