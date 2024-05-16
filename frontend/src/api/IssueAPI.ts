const SERVER = process.env.REACT_APP_SERVER;

interface NewIssue {
  title: string;
  content: string;
  userId: string;
}

const DATA_FORMAT_ERROR_MESSAGE = "데이터 형식에 오류가 생겼습니다.";
const SERVER_ERROR_MESSAGE = "서버 연결에 실패하였습니다.";

export const sendIssuesRequest = async () => {
  try {
    const response = await fetch(`${SERVER}/issues`);

    if (!response.ok) throw new Error(SERVER_ERROR_MESSAGE); 

    return response.json();
  } catch (error) {
    throw new Error(SERVER_ERROR_MESSAGE);
  }
}

export const postNewIssue = async ({ title, content, userId }: NewIssue) => {
  try {
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: content,
        author: userId,
      })
    };
    const response = await fetch(`${SERVER}/issue`, request);

    if (response.status === 400) throw new Error(DATA_FORMAT_ERROR_MESSAGE);
    if (!response.ok) throw new Error(SERVER_ERROR_MESSAGE);

    return response;
  } catch (error) {
    throw new Error(SERVER_ERROR_MESSAGE);
  }
}