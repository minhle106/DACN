import { notification } from "antd";
import employeeService from "../../services/employeeService";

const getEmployees = async (params) => {
  try {
    const response = await employeeService.getEmployees(params);
    return response.data;
  } catch (e) {
    notification.error({
      message: "Error",
      description: e.message,
    });
  }
};

const createEmployee = async (body) => {
  const response = await employeeService.createEmployee(body);
  return response;
};

const updateEmployee = async (body) => {
  const response = await employeeService.updateEmployee(body);
  return response;
};

const deleteEmployee = async (params) => {
  const response = await employeeService.deleteEmployee(params);
  return response;
};

export { getEmployees, createEmployee, updateEmployee, deleteEmployee };
