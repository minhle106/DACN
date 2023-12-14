import { notification } from "antd";
import userService from "../../services/userService";

const getAuthorized = async () => {
  try {
    const response = await userService.getAuthorized();
    return response.data;
  } catch (e) {
    notification.error({
      message: "Error",
      description: e.message,
    });
  }
};

const updateUserInfo = async (body) => {
  const response = await userService.createJob(body);
  return response;
};

const applyJob = async (body) => {
  try {
    await userService.applyJob(body);
    notification.success({
      message: "Success",
      description: "Apply job successfully!",
    });
  } catch (e) {
    notification.error({
      message: "Error",
      description: e.message,
    });
  }
};

export { getAuthorized, updateUserInfo, applyJob };
