import { notification } from "antd";
import authSettingService from "../../services/authSettingService";

const getAffiliations = async (params) => {
  try {
    const response = await authSettingService.getAffiliations(params);
    return response.data;
  } catch (e) {
    notification.error({
      message: "Error",
      description: e.message,
    });
  }
};

const createAffiliation = async (body) => {
  const response = await authSettingService.createAffiliation(body);
  return response;
};

const updateAffiliation = async (body) => {
  const response = await authSettingService.updateAffiliation(body);
  return response;
};

const deleteAffiliation = async (params) => {
  const response = await authSettingService.deleteAffiliation(params);
  return response;
};

const getRoles = async (params) => {
  try {
    const response = await authSettingService.getRoles(params);
    return response.data;
  } catch (e) {
    notification.error({
      message: "Error",
      description: e.message,
    });
  }
};

const createRole = async (body) => {
  const response = await authSettingService.createRole(body);
  return response;
};

const updateRole = async (body) => {
  const response = await authSettingService.updateRole(body);
  return response;
};

const deleteRole = async (params) => {
  const response = await authSettingService.deleteRole(params);
  return response;
};

const getFeatures = async () => {
  try {
    const response = await authSettingService.getFeatures();
    return response.data;
  } catch (e) {
    notification.error({
      message: "Error",
      description: e.message,
    });
  }
};

export {
  getAffiliations,
  createAffiliation,
  updateAffiliation,
  deleteAffiliation,
  getRoles,
  createRole,
  updateRole,
  deleteRole,
  getFeatures,
};
