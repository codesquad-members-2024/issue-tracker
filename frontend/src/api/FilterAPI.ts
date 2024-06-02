const SERVER = process.env.REACT_APP_SERVER;

const SERVER_ERROR_MESSAGE = "서버 연결에 실패하였습니다.";

const getAuthToken = () => localStorage.getItem("token");

const parseQueryText = (query: string) => {
  const regex = /(?:[^\s"]+|"[^"]*")+/g;
  const matches = query.match(regex);
  const params = new URLSearchParams();

  if (!matches) return "";

  matches.forEach((match) => {
    const [key, value] = match.split(":").map((part) => part.replace(/"/g, ""));
    params.append(key, value);
  });

  return params.toString();
};

export const sendFiltersRequest = async () => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${SERVER}/filters`, {
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

export const sendIssuesRequestByFilter = async (filterText: string, page: number) => {
  try {
    const token = getAuthToken();
    const queryText = parseQueryText(filterText);
    const request = {
      credentials: "include" as RequestCredentials,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const response = await fetch(`${SERVER}/filters/issues?page=${page}&${queryText}`, request);

    if (!response.ok) throw new Error(SERVER_ERROR_MESSAGE);

    return response.json();
  } catch (error) {
    const message = error instanceof Error ? error.message : SERVER_ERROR_MESSAGE;
    throw new Error(message);
  }
};
