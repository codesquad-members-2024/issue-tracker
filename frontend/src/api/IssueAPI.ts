const SERVER = process.env.REACT_APP_SERVER;

interface NewIssue {
  title: string;
  content: string;
  userId: string;
}

interface IssuesRequestProps {
  issueType: string;
  page: number;
}

interface CommentRequestProps {
  issueId: number | string;
  author: string;
  content: string;
}

interface TitleEditProps {
  issueId: number | string;
  title: string;
}

const ISSUE_ERROR_MESSAGE: { [key: number]: string } = {
  400: "데이터 형식에 오류가 생겼습니다.",
  404: "존재하지 않는 이슈에 접근하였습니다.",
};

const PAGE_FORMAT_ERROR_MESSAGE = "페이지의 형식이 맞지 않습니다.";
const SERVER_ERROR_MESSAGE = "서버 연결에 실패하였습니다.";

const getAuthToken = () => localStorage.getItem("token");

export const sendIssuesRequest = async ({ issueType, page }: IssuesRequestProps) => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${SERVER}/issues/${issueType}?page=${page}`, {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 400) throw new Error(PAGE_FORMAT_ERROR_MESSAGE);
    if (!response.ok) throw new Error(SERVER_ERROR_MESSAGE);

    return response.json();
  } catch (error) {
    const message = error instanceof Error ? error.message : SERVER_ERROR_MESSAGE;
    throw new Error(message);
  }
};

export const sendIssueRequestById = async (issueId: number | string) => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${SERVER}/issue/${issueId}`, {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorMessage = ISSUE_ERROR_MESSAGE[response.status] || SERVER_ERROR_MESSAGE;
      throw new Error(errorMessage);
    }

    return response.json();
  } catch (error) {
    const message = error instanceof Error ? error.message : SERVER_ERROR_MESSAGE;
    throw new Error(message);
  }
};

export const sendTitleEditRequest = async ({ issueId, title }: TitleEditProps) => {
  try {
    const token = getAuthToken();
    const request = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include" as RequestCredentials,
      body: JSON.stringify({ title: title }),
    };
    const response = await fetch(`${SERVER}/issue/${issueId}/title`, request);

    if (!response.ok) {
      const errorMessage = ISSUE_ERROR_MESSAGE[response.status] || SERVER_ERROR_MESSAGE;
      throw new Error(errorMessage);
    }

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : SERVER_ERROR_MESSAGE;
    throw new Error(message);
  }
};

export const postNewIssue = async ({ title, content, userId }: NewIssue) => {
  try {
    const token = getAuthToken();
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include" as RequestCredentials,
      body: JSON.stringify({
        title: title,
        content: content,
        author: userId,
      }),
    };
    const response = await fetch(`${SERVER}/issue`, request);

    if (!response.ok) {
      const errorMessage = ISSUE_ERROR_MESSAGE[response.status] || SERVER_ERROR_MESSAGE;
      throw new Error(errorMessage);
    }

    return response.json();
  } catch (error) {
    const message = error instanceof Error ? error.message : SERVER_ERROR_MESSAGE;
    throw new Error(message);
  }
};

export const postNewComment = async ({ issueId, author, content }: CommentRequestProps) => {
  try {
    const token = getAuthToken();
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include" as RequestCredentials,
      body: JSON.stringify({ author, content }),
    };
    const response = await fetch(`${SERVER}/issue/${issueId}/comment`, request);

    if (!response.ok) {
      const errorMessage = ISSUE_ERROR_MESSAGE[response.status] || SERVER_ERROR_MESSAGE;
      throw new Error(errorMessage);
    }

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : SERVER_ERROR_MESSAGE;
    throw new Error(message);
  }
};

export const openIssue = async (issueId: number | string) => {
  try {
    const token = getAuthToken();
    const request = {
      method: "PATCH",
      credentials: "include" as RequestCredentials,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(`${SERVER}/issue/${issueId}/open`, request);

    if (!response.ok) {
      const errorMessage = ISSUE_ERROR_MESSAGE[response.status] || SERVER_ERROR_MESSAGE;
      throw new Error(errorMessage);
    }

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : SERVER_ERROR_MESSAGE;
    throw new Error(message);
  }
};

export const closeIssue = async (issueId: number | string) => {
  try {
    const token = getAuthToken();
    const request = {
      method: "PATCH",
      credentials: "include" as RequestCredentials,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(`${SERVER}/issue/${issueId}/close`, request);

    if (!response.ok) {
      const errorMessage = ISSUE_ERROR_MESSAGE[response.status] || SERVER_ERROR_MESSAGE;
      throw new Error(errorMessage);
    }

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : SERVER_ERROR_MESSAGE;
    throw new Error(message);
  }
};

export const updateAssigneesInIssue = async (issueId: number | string, assignees: string[]) => {
  try {
    const token = getAuthToken();
    const request = {
      method: "PATCH",
      credentials: "include" as RequestCredentials,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ assignees }),
    };
    const response = await fetch(`${SERVER}/issue/${issueId}/assignees`, request);

    if (!response.ok) throw new Error(SERVER_ERROR_MESSAGE);

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : SERVER_ERROR_MESSAGE;
    throw new Error(message);
  }
}

export const updateLabelsInIssue = async (issueId: number | string, labelIds: number[]) => {
  try {
    const token = getAuthToken();
    const request = {
      method: "PATCH",
      credentials: "include" as RequestCredentials,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ labels: labelIds }),
    };
    const response = await fetch(`${SERVER}/issue/${issueId}/labels`, request);

    if (!response.ok) throw new Error(SERVER_ERROR_MESSAGE);

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : SERVER_ERROR_MESSAGE;
    throw new Error(message);
  }
};

export const updateMilestoneInIssue = async (issueId: number | string, milestoneId: number) => {
  try {
    const token = getAuthToken();
    const request = {
      method: "PATCH",
      credentials: "include" as RequestCredentials,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ milestoneId }),
    };
    const response = await fetch(`${SERVER}/issue/${issueId}/milestone`, request);

    if (!response.ok) throw new Error(SERVER_ERROR_MESSAGE);

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : SERVER_ERROR_MESSAGE;
    throw new Error(message);
  }
}