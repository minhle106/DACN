import React, { useState } from "react";
import {
  CustomButton,
  CustomPagination,
  CustomTable,
} from "../../components/StyledComponent";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createEmployee,
  getEmployees,
} from "../../stores/reducer/employeeSlice";
import { STATUS } from "../../ultils/constant";
import { Drawer, Form, Tag, notification } from "antd";
import moment from "moment";
import AddButton from "../../components/AddButton";
import EmployeeForm from "./EmployeeForm";

const EmployeeManagement = () => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const { data: employeeData, fetchStatus: employeeFetchStatus } = useQuery({
    queryKey: ["employees", page, size],
    queryFn: () => getEmployees({ page: page, size: size }),
    staleTime: 1 * 60 * 1000,
  });

  const { mutate: createEmployeeMutation } = useMutation({
    mutationFn: (body) => createEmployee(body),
  });

  const tableData = employeeData?.listContent?.map((item) => ({
    ...item,
    key: item.code,
  }));

  const onFinish = (values) => {
    createEmployeeMutation(
      {
        ...values,
        birthDate: moment(new Date(values.birthDate)).format("YYYY-MM-DD"),
        joinAt: moment(new Date(values.joinAt)).format("YYYY-MM-DDTHH:mm:ss"),
      },
      {
        onSuccess: () => {
          form.resetFields();
          queryClient.refetchQueries("employees");
          notification.success({
            message: "Success",
            description: "Create employee successfully!",
          });
        },
        onError: (error) => {
          notification.error({
            message: "Error",
            description: error.message,
          });
        },
      }
    );
  };

  const onChangePagination = (page, pageSize) => {
    setPage(page);
    setSize(pageSize);
  };

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1 + (page - 1) * size,
      fixed: "left",
      width: "5%",
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      fixed: "left",
      width: "8%",
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      fixed: "left",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Role",
      dataIndex: "roleName",
      key: "roleName",
      render: (text) => {
        return (
          <>
            {text?.map((item, index) => (
              <Tag color="purple" className="mb-[2px]" key={index}>
                {item}
              </Tag>
            ))}
          </>
        );
      },
    },
    {
      title: "Affiliation",
      dataIndex: "affiliation",
      key: "affiliation",
      render: (text) => {
        return (
          <>
            {text?.map((item, index) => (
              <Tag color="purple" className="mb-[2px]" key={index}>
                {item}
              </Tag>
            ))}
          </>
        );
      },
    },
    {
      title: "Join At",
      dataIndex: "joinAt",
      key: "joinAt",
      render: (text) => {
        const time = moment(new Date(text)).format("DD/MM/YYYY");
        return time;
      },
    },
    {
      title: "Quit At",
      dataIndex: "quitAt",
      key: "quitAt",
      render: (text) => {
        const time = moment(new Date(text)).format("DD/MM/YYYY");
        return time;
      },
    },
  ];

  return (
    <>
      <Drawer
        title={
          <div className="text-xl font-semibold">Create a new employee</div>
        }
        width={720}
        onClose={() => setOpen(false)}
        open={open}
        footer={[
          <div className="flex gap-[10px]">
            <CustomButton
              onClick={() => setOpen(false)}
              className="w-6/12 hover:text-[#8f83ae] hover:border-[#8f83ae] text-lg"
            >
              Cancel
            </CustomButton>
            <CustomButton
              onClick={() => setOpen(false)}
              type="submit"
              form="employeeForm"
              className="w-6/12 bg-[#8f83ae] hover:bg-[#8f83aeb3] text-lg text-white"
            >
              Create
            </CustomButton>
          </div>,
        ]}
      >
        <EmployeeForm form={form} onFinish={onFinish} />
      </Drawer>

      <div className="flex justify-between items-center mb-4">
        <div className="text-2xl font-semibold mb-5">Employees Information</div>
        <AddButton onClick={() => setOpen(true)} text="New employee" />
      </div>

      <CustomTable
        loading={employeeFetchStatus === STATUS.FETCHING}
        columns={columns}
        dataSource={tableData}
        pagination={false}
        scroll={{ y: `calc(100vh - 315px)`, x: 1400 }}
      />

      <CustomPagination
        total={employeeData?.totalElement}
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} items`
        }
        pageSize={size}
        current={page}
        onChange={onChangePagination}
        showSizeChanger
      />
    </>
  );
};

export default EmployeeManagement;
