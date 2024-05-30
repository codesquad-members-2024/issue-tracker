const SERVER = process.env.REACT_APP_SERVER;

export interface LabelContent {
  labelName: string;
  description: string;
  textColor: string;
  bgColor: string;
}

const SERVER_ERROR_MESSAGE = "서버 연결에 실패하였습니다.";

const getAuthToken = () => localStorage.getItem("token");

export const sendLabelsRequest = async () => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${SERVER}/labels`, {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error(SERVER_ERROR_MESSAGE);

    return response.json();
  } catch (error) {
    const message = error instanceof Error ? error.message : SERVER_ERROR_MESSAGE;
    throw new Error(message);
  }
};

export const postNewLabel = async (labelContent: LabelContent) => {
  try {
    const token = getAuthToken();
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include" as RequestCredentials,
      body: JSON.stringify(labelContent),
    };
    const response = await fetch(`${SERVER}/label`, request);

    if (!response.ok) throw new Error(SERVER_ERROR_MESSAGE);

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : SERVER_ERROR_MESSAGE;
    throw new Error(message);
  }
};

export const sendPutLabelRequest = async (labelId: number, labelContent: LabelContent) => {
  try {
    const token = getAuthToken();
    const request = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include" as RequestCredentials,
      body: JSON.stringify(labelContent),
    };
    const response = await fetch(`${SERVER}/label/${labelId}`, request);

    if (!response.ok) throw new Error(SERVER_ERROR_MESSAGE);

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : SERVER_ERROR_MESSAGE;
    throw new Error(message);
  }
};

export const sendDeleteLabelRequest = async (labelId: number) => {
  try {
    const token = getAuthToken();
    const request = {
      method: "DELETE",
      credentials: "include" as RequestCredentials,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(`${SERVER}/label/${labelId}`, request);

    if (!response.ok) throw new Error(SERVER_ERROR_MESSAGE);

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : SERVER_ERROR_MESSAGE;
    throw new Error(message);
  }
};
