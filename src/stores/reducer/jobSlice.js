import { notification } from "antd";
import jobService from "../../services/jobService";

const getJobs = async (params) => {
  try {
    const response = await jobService.getJobs(params);
    return response.data;
  } catch (e) {
    notification.error({
      message: "Error",
      description: e.message,
    });
  }
};

const getJob = async (params) => {
  try {
    if (params) {
      const response = await jobService.getJob(params);
      return response.data;
    }
  } catch (e) {
    notification.error({
      message: "Error",
      description: e.message,
    });
  }
};

const createJob = async (body) => {
  const response = await jobService.createJob(body);
  return response;
};

const updateJob = async (params, body) => {
  const response = await jobService.updateJob(params, body);
  return response;
};

const deleteJob = async (params) => {
  const response = await jobService.deleteJob(params);
  return response;
};

export { getJobs, getJob, createJob, updateJob, deleteJob };
