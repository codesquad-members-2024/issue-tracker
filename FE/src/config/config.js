const API_BASE_URL = "/api";

const API_ENDPOINTS = {
  issues: `${API_BASE_URL}/issues`,
  openIssues: `${API_BASE_URL}/issues/open`,
  cloesiIsues: `${API_BASE_URL}/issues/close`,
  labels: `${API_BASE_URL}/labels`,
  milestones: `${API_BASE_URL}/milestones`,
  openMilestones: `${API_BASE_URL}/milestones/open`,
  closeMilestones: `${API_BASE_URL}/milestones/close`,
};

export default API_ENDPOINTS;
