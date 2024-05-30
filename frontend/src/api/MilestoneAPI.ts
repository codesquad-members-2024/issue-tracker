import { MilestoneType } from "../contexts/MilestoneContext";

interface MilestoneStateParams {
  milestoneType: MilestoneType;
  milestoneId: number;
}

export interface MilestoneContent {
  title: string;
  deadline: string | undefined;
  description: string | undefined;
}

interface Milestone extends MilestoneContent {
  milestoneId: number;
}

const SERVER = process.env.REACT_APP_SERVER;

const SERVER_ERROR_MESSAGE = "서버 연결에 실패하였습니다.";

const getAuthToken = () => localStorage.getItem("token");

export const sendMilestonesRequest = async (milestoneType: MilestoneType) => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${SERVER}/milestones/${milestoneType}`, {
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

export const postNewMilestone = async (milestoneContent: MilestoneContent) => {
  try {
    const token = getAuthToken();
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include" as RequestCredentials,
      body: JSON.stringify(milestoneContent),
    };
    const response = await fetch(`${SERVER}/milestone`, request);

    if (!response.ok) throw new Error(SERVER_ERROR_MESSAGE);

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : SERVER_ERROR_MESSAGE;
    throw new Error(message);
  }
};

export const toggleMilestoneState = async ({ milestoneType, milestoneId }: MilestoneStateParams) => {
  try {
    const token = getAuthToken();
    const request = {
      method: "PATCH",
      credentials: "include" as RequestCredentials,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(`${SERVER}/milestone/${milestoneId}/${milestoneType}`, request);

    if (!response.ok) throw new Error(SERVER_ERROR_MESSAGE);

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : SERVER_ERROR_MESSAGE;
    throw new Error(message);
  }
};

export const deleteMilestone = async (milestoneId: number) => {
  try {
    const token = getAuthToken();
    const request = {
      method: "DELETE",
      credentials: "include" as RequestCredentials,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(`${SERVER}/milestone/${milestoneId}`, request);

    if (!response.ok) throw new Error(SERVER_ERROR_MESSAGE);

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : SERVER_ERROR_MESSAGE;
    throw new Error(message);
  }
};

export const sendPutMilestoneRequest = async (milestone: Milestone) => {
  try {
    const { milestoneId, title, deadline, description } = milestone;
    const milestoneContent = { title, deadline, description };
    const token = getAuthToken();
    const request = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include" as RequestCredentials,
      body: JSON.stringify(milestoneContent),
    };
    const response = await fetch(`${SERVER}/milestone/${milestoneId}`, request);

    if (!response.ok) throw new Error(SERVER_ERROR_MESSAGE);

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : SERVER_ERROR_MESSAGE;
    throw new Error(message);
  }
};
