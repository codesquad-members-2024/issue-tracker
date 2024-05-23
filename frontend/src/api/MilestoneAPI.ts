import { MilestoneType } from "../contexts/MilestoneContext";

interface MilestoneContent {
  title: string;
  description: string;
  deadline: string;
}

const SERVER = process.env.REACT_APP_SERVER;

const SERVER_ERROR_MESSAGE = "서버 연결에 실패하였습니다.";

export const sendMilestonesRequest = async (milestoneType: MilestoneType) => {
  try {
    const response = await fetch(`${SERVER}/milestones/${milestoneType}`);

    if (!response.ok) throw new Error(SERVER_ERROR_MESSAGE);

    return response.json();
  } catch (error) {
    const message = error instanceof Error ? error.message : SERVER_ERROR_MESSAGE;
    throw new Error(message);
  }
}

export const postNewMilestone = async (milestoneContent: MilestoneContent) => {
  try {
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(milestoneContent)
    };
    const response = await fetch(`${SERVER}/milestone`, request);

    if (!response.ok) throw new Error(SERVER_ERROR_MESSAGE);

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : SERVER_ERROR_MESSAGE;
    throw new Error(message);
  }
}

export const toggleMilestoneState = async (milestoneType: MilestoneType, milestoneId: number) => {
  try {
    const request = {
      method: "PATCH"
    };
    const response = await fetch(`${SERVER}/milestone/${milestoneId}/${milestoneType}`, request);

    if (!response.ok) throw new Error(SERVER_ERROR_MESSAGE);

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : SERVER_ERROR_MESSAGE;
    throw new Error(message);
  }
}

export const deleteMilestone = async (milestoneId: number) => {
  try {
    const request = {
      method: "DELETE",
    };
    const response = await fetch(`${SERVER}/milestone/${milestoneId}`, request);

    if (!response.ok) throw new Error(SERVER_ERROR_MESSAGE);

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : SERVER_ERROR_MESSAGE;
    throw new Error(message);
  }
}

export const sendPutMilestoneRequest = async (milestoneId: number, milestoneContent: MilestoneContent) => {
  try {
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(milestoneContent)
    };
    const response = await fetch(`${SERVER}/milestone/${milestoneId}`, request);

    if (!response.ok) throw new Error(SERVER_ERROR_MESSAGE);

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : SERVER_ERROR_MESSAGE;
    throw new Error(message);
  }
}