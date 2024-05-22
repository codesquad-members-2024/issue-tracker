import { MilestoneType } from "../contexts/MilestoneContext";

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