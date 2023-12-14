import { notification } from "antd";
import publicService from "../../services/publicService";

const getJobs = async (params) => {
  try {
    const response = await publicService.getJobs(params);
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
      const response = await publicService.getJob(params);
      return response.data;
    }
  } catch (e) {
    notification.error({
      message: "Error",
      description: e.message,
    });
  }
};

export { getJobs, getJob };
