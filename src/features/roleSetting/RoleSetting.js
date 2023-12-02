import React, { useEffect, useRef, useState } from "react";
import {
  CustomPagination,
  CustomTable,
  TextInput,
} from "../../components/StyledComponent";
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import { Checkbox, Form, notification } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createRole,
  deleteRole,
  getFeatures,
  getRoles,
  updateRole,
} from "../../stores/reducer/authSettingSlice";
import { STATUS } from "../../ultils/constant";
import ModalConfirmDelete from "../../components/ModalConfirmDelete";
import AddButton from "../../components/AddButton";
const { Column, ColumnGroup } = CustomTable;

const RoleSetting = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [tableData, setTableData] = useState([]);
  const [isAddRole, setIsAddRole] = useState(false);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const refRole = useRef();

  const { data: featureData, status: featureStatus } = useQuery({
    queryKey: ["features"],
    queryFn: () => getFeatures(),
    staleTime: Infinity,
  });

  const { data: roleData, fetchStatus: roleFetchStatus } = useQuery({
    queryKey: ["roles", page, size],
    queryFn: () => getRoles({ page: page, size: size }),
    staleTime: 1 * 60 * 1000,
  });

  const { mutate: createRoleMutation } = useMutation({
    mutationFn: (body) => createRole(body),
  });

  const { mutate: updateRoleMutation } = useMutation({
    mutationFn: (body) => updateRole(body),
  });

  const { mutate: deleteRoleMutation } = useMutation({
    mutationFn: (params) => deleteRole(params),
  });

  const handleCreateRole = () => {
    if (!isAddRole) {
      setTableData([
        ...tableData,
        {
          key: "0",
          roleId: "0",
          roleName: (
            <Form form={form} name="roleForm" onFinish={onFinish}>
              <div className="flex items-center gap-[5px]">
                <Form.Item
                  name="text"
                  style={{ marginBottom: 0 }}
                  className="me-4"
                >
                  <TextInput placeholder="Type your role" />
                </Form.Item>
                <button type="submit">
                  <CheckOutlined
                    className="text-2xl cursor-pointer"
                    style={{ color: "green" }}
                  />
                </button>
                <Form.Item style={{ marginBottom: 0 }}>
                  <CloseOutlined
                    onClick={handleClose}
                    className="text-2xl cursor-pointer"
                    style={{ color: "red" }}
                  />
                </Form.Item>
              </div>
            </Form>
          ),
        },
      ]);
    }
    setIsAddRole(true);
  };

  const onFinish = (values) => {
    if (values.text) {
      createRoleMutation(
        {
          roleName: values.text,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries("roles");
            notification.success({
              message: "Success",
              description: "Created a new role successfully!",
            });
            form.resetFields();
            setIsAddRole(false);
          },
          onError: (error) => {
            notification.error({
              message: "Error",
              description: error.message,
            });
          },
        }
      );
    }
  };

  const handleCheckboxChange = (record, featureId, action, checked) => {
    const updatedData = roleData?.listContent
      ?.filter((item) => item.roleId === record.roleId)
      ?.map((item) => ({
        roleId: item.roleId,
        listAuthorization: item.listAuthorization,
      }))
      .map((item) => {
        const listAuthorization = item.listAuthorization
          .filter((item) => item.featureId === featureId)
          ?.map((item) => ({ ...item, [action]: checked }));
        return { ...item, listAuthorization };
      });

    updateRoleMutation(
      { listContent: updatedData },
      {
        onSuccess: () => {
          queryClient.refetchQueries("roles");
          notification.success({
            message: "Success",
            description: "Setting authorization successfully!",
          });
          setIsAddRole(false);
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

  const handleDeleteRole = (roleId) => {
    ModalConfirmDelete({
      onOK: () => {
        deleteRoleMutation(roleId, {
          onSuccess: () => {
            queryClient.invalidateQueries("affiliations");
            notification.success({
              message: "Success",
              description: "Delete the role successfully!",
            });
          },
          onError: (error) => {
            notification.error({
              message: "Error",
              description: error.message,
            });
          },
        });
      },
      content: "Do you want to delete this role?",
    });
  };

  const onChangePagination = (page, pageSize) => {
    setPage(page);
    setSize(pageSize);
  };

  const handleClose = () => {
    setTableData(tableData?.filter((item) => item.roleId !== "0"));
    setIsAddRole(false);
  };

  useEffect(() => {
    if (roleData) {
      setTableData(
        roleData?.listContent?.map((item) => {
          const row = {
            key: item.roleId,
            roleId: item.roleId,
            roleName: item.roleName,
          };

          item.listAuthorization?.map((item) => {
            row[item.featureId] = {
              createFeature: item.createFeature,
              readFeature: item.readFeature,
              updateFeature: item.updateFeature,
              deleteFeature: item.deleteFeature,
            };
          });

          return row;
        })
      );
    }
  }, [roleData]);

  useEffect(() => {
    if (isAddRole) {
      refRole.current
        ?.querySelector(`.ant-table-row:last-child`)
        .scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
    }
  }, [tableData]);

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="text-2xl font-semibold mb-5">Role Setting</div>
        <AddButton onClick={handleCreateRole} text="New role" />
      </div>

      <CustomTable
        ref={refRole}
        loading={
          featureStatus === STATUS.LOADING ||
          roleFetchStatus === STATUS.FETCHING
        }
        dataSource={tableData}
        pagination={false}
        scroll={{ y: 250, x: 3000 }}
      >
        <Column
          title="#"
          dataIndex="id"
          key="id"
          fixed="left"
          width="50px"
          render={(id, record, index) => (page - 1) * size + index + 1}
        />

        <Column
          title="Role"
          dataIndex="roleName"
          key="roleName"
          fixed="left"
          width="250px"
          render={(text, record) => {
            return (
              <div className="flex justify-between">
                <div>{text}</div>
                {record.roleId !== "0" && (
                  <DeleteOutlined
                    onClick={() => handleDeleteRole(record.roleId)}
                    className="text-lg"
                    style={{ color: "red" }}
                  />
                )}
              </div>
            );
          }}
        />

        {featureData?.listContent?.map((item, index) => (
          <ColumnGroup
            key={index}
            title={<div className="text-center">{item.nameFeature}</div>}
          >
            <Column
              title={<div className="text-center">Create</div>}
              dataIndex="createFeature"
              key="createFeature"
              render={(_, record) => (
                <div className="text-center">
                  <Checkbox
                    checked={record[item.featureId]?.createFeature}
                    onChange={(e) => {
                      handleCheckboxChange(
                        record,
                        item.featureId,
                        "createFeature",
                        e.target.checked
                      );
                    }}
                  />
                </div>
              )}
            />

            <Column
              title={<div className="text-center">Read</div>}
              dataIndex="readFeature"
              key="readFeature"
              render={(_, record) => (
                <div className="text-center">
                  <Checkbox
                    checked={record[item.featureId]?.readFeature}
                    onChange={(e) => {
                      handleCheckboxChange(
                        record,
                        item.featureId,
                        "readFeature",
                        e.target.checked
                      );
                    }}
                  />
                </div>
              )}
            />
            <Column
              title={<div className="text-center">Update</div>}
              dataIndex="updateFeature"
              key="updateFeature"
              render={(_, record) => (
                <div className="text-center">
                  <Checkbox
                    checked={record[item.featureId]?.updateFeature}
                    onChange={(e) => {
                      handleCheckboxChange(
                        record,
                        item.featureId,
                        "updateFeature",
                        e.target.checked
                      );
                    }}
                  />
                </div>
              )}
            />
            <Column
              title={<div className="text-center">Delete</div>}
              dataIndex="deleteFeature"
              key="deleteFeature"
              render={(_, record) => (
                <div className="text-center">
                  <Checkbox
                    checked={record[item.featureId]?.deleteFeature}
                    onChange={(e) => {
                      handleCheckboxChange(
                        record,
                        item.featureId,
                        "deleteFeature",
                        e.target.checked
                      );
                    }}
                  />
                </div>
              )}
            />
          </ColumnGroup>
        ))}
      </CustomTable>
      <CustomPagination
        total={roleData?.totalElement}
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} items`
        }
        pageSize={size}
        current={page}
        onChange={onChangePagination}
        pageSizeOptions={[5, 10, 20, 50]}
        showSizeChanger
      />
    </>
  );
};

export default RoleSetting;
