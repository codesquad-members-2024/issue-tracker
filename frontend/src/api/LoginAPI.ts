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

<<<<<<< be-dev
const LOGIN_VALIDATION_ERROR_MESSAGE = "아이디나 비밀번호가 일치하지 않습니다.";
const VALIDATION_SUCCESS_MESSAGE = "사용할 수 있는 아이디입니다.";
const VALIDATION_FAILURE_MESSAGE = "이미 존재하는 아이디입니다.";
=======
const LOGIN_ID_NOT_FOUND_ERROR_MESSAGE = "아이디가 존재하지 않습니다.";
const LOGIN_INPUT_VALIDATION_ERROR_MESSAGE = "아이디나 비밀번호가 일치하지 않습니다.";
const REGISTRATION_FORMAT_ERROR_MESSAGE = "아이디, 비밀번호의 형식이 올바르지 않습니다.";
const REGISTRATION_DUPLICATE_VALIDATION_FAILURE_MEESAGE = "이미 존재하는 아이디로 회원가입을 시도하였습니다.";
const ID_DUPLICATE_VALIDATION_SUCCESS_MESSAGE = "사용할 수 있는 아이디입니다.";
const ID_DUPLICATE_VALIDATION_FAILURE_MESSAGE = "이미 존재하는 아이디입니다.";
>>>>>>> team-05
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
    
<<<<<<< be-dev
    if (response.status === 400) throw new Error(LOGIN_VALIDATION_ERROR_MESSAGE);
=======
    if (response.status === 400) throw new Error(LOGIN_INPUT_VALIDATION_ERROR_MESSAGE);
    if (response.status === 404) throw new Error(LOGIN_ID_NOT_FOUND_ERROR_MESSAGE);
>>>>>>> team-05
    if (!response.ok) throw new Error(SERVER_ERROR_MESSAGE);

    return response;
  } catch (error) {
<<<<<<< be-dev
    throw new Error(SERVER_ERROR_MESSAGE);
=======
    const message = error instanceof Error ? error.message : SERVER_ERROR_MESSAGE;
    throw new Error(message);
>>>>>>> team-05
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
    
<<<<<<< be-dev
=======
    if (response.status === 400) throw new Error(REGISTRATION_FORMAT_ERROR_MESSAGE);
    if (response.status === 409) throw new Error(REGISTRATION_DUPLICATE_VALIDATION_FAILURE_MEESAGE);
>>>>>>> team-05
    if (!response.ok) throw new Error(SERVER_ERROR_MESSAGE);

    return response;
  } catch (error) {
<<<<<<< be-dev
    throw new Error(SERVER_ERROR_MESSAGE);
=======
    const message = error instanceof Error ? error.message : SERVER_ERROR_MESSAGE;
    throw new Error(message);
>>>>>>> team-05
  }
};

export const sendIdValidationRequest = async (idValue: string): Promise<string> => {
  try {
    const response = await fetch(`${SERVER}/validation/${idValue}`);

<<<<<<< be-dev
    if (response.status === 400) throw new Error(VALIDATION_FAILURE_MESSAGE);
    if (!response.ok) throw new Error(SERVER_ERROR_MESSAGE);

    return VALIDATION_SUCCESS_MESSAGE;
  } catch (error) {
    throw new Error(SERVER_ERROR_MESSAGE);
=======
    if (response.status === 409) throw new Error(ID_DUPLICATE_VALIDATION_FAILURE_MESSAGE);
    if (!response.ok) throw new Error(SERVER_ERROR_MESSAGE);

    return ID_DUPLICATE_VALIDATION_SUCCESS_MESSAGE;
  } catch (error) {
    const message = error instanceof Error ? error.message : SERVER_ERROR_MESSAGE;
    throw new Error(message);
>>>>>>> team-05
  }
};
