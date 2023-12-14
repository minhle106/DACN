import { notification } from "antd";
import candidateService from "../../services/candidateService";

const getCandidates = async (params) => {
  try {
    const response = await candidateService.getCandidates(params);
    return response.data;
  } catch (e) {
    notification.error({
      message: "Error",
      description: e.message,
    });
  }
};

const rejectCandidate = async (params) => {
  const response = await candidateService.reject(params);
  return response;
};

const acceptCandidate = async (params) => {
  const response = await candidateService.accept(params);
  return response;
};

const toInterviewCandidate = async (params) => {
  const response = await candidateService.toInterview(params);
  return response;
};

const toEvaluationCandidate = async (params) => {
  const response = await candidateService.toEvaluation(params);
  return response;
};

export {
  getCandidates,
  rejectCandidate,
  acceptCandidate,
  toInterviewCandidate,
  toEvaluationCandidate,
};
