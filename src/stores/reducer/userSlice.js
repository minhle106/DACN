import { notification } from "antd";
import userService from "../../services/userService";

const getAuthorized = async () => {
  try {
    const response = await userService.getAuthorized();
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

const getUserInfo = async () => {
  try {
    const response = await userService.getUserInfo();
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

const updateUserInfo = async (body) => {
  const response = await userService.updateUserInfo(body);
  return response;
};

const applyJob = async (body, setIsOpen) => {
  try {
    await userService.applyJob(body);
    notification.success({
      message: "Success",
      description: "Apply job successfully!",
    });
    setIsOpen(false);
  } catch (e) {
    notification.error({
      message: "Error",
      description: e.message,
    });
  }
};

export { getAuthorized, updateUserInfo, applyJob, getUserInfo };
