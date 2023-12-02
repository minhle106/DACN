import React, { useEffect, useRef, useState } from "react";
import { Checkbox, Form, notification } from "antd";
import {
  CustomPagination,
  CustomTable,
  TextInput,
} from "../../components/StyledComponent";
import {
  CloseOutlined,
  CheckOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import {
  QueryCache,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createAffiliation,
  updateAffiliation,
  getAffiliations,
  getFeatures,
  deleteAffiliation,
} from "../../stores/reducer/authSettingSlice";
import { STATUS } from "../../ultils/constant";
import ModalConfirmDelete from "../../components/ModalConfirmDelete";
import AddButton from "../../components/AddButton";

const AffiliationSetting = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [tableData, setTableData] = useState([]);
  const [isAddAffiiation, setIsAddAffiiation] = useState(false);
  const [form] = Form.useForm();
  const refAffiliation = useRef();
  const queryClient = useQueryClient();

  const { data: affiliationData, fetchStatus: affiliationFetchStatus } =
    useQuery({
      queryKey: ["affiliations", page, size],
      queryFn: () => getAffiliations({ page: page, size: size }),
      staleTime: 1 * 60 * 1000,
    });

  const { data: featureData, status: featureStatus } = useQuery({
    queryKey: ["features"],
    queryFn: () => getFeatures(),
    staleTime: Infinity,
  });

  const { mutate: createAffiliationMutation } = useMutation({
    mutationFn: (body) => createAffiliation(body),
  });
  const { mutate: updateAffiliationMutation } = useMutation({
    mutationFn: (body) => updateAffiliation(body),
  });
  const { mutate: deleteAffiliationMutation } = useMutation({
    mutationFn: (params) => deleteAffiliation(params),
  });

  const handleCheckboxChange = (record, featureId, checked) => {
    const updatedData = affiliationData?.listContent
      ?.filter((item) => item.affiliationId === record.affiliationId)
      ?.map((item) => ({
        affiliationId: item.affiliationId,
        listAuthorization: item.listAuthorization,
      }))
      .map((item) => {
        const listAuthorization = item.listAuthorization
          .filter((item) => item.featureId === featureId)
          ?.map((item) => ({ ...item, isAuthorized: checked }));
        return { ...item, listAuthorization };
      });

    updateAffiliationMutation(
      { listContent: updatedData },
      {
        onSuccess: () => {
          queryClient.refetchQueries("affiliations");
          notification.success({
            message: "Success",
            description: "Setting authorization successfully!",
          });
          setIsAddAffiiation(false);
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

  const handleCreateAffiliation = () => {
    if (!isAddAffiiation) {
      setTableData([
        ...tableData,
        {
          key: "0",
          affiliationId: "0",
          affiliationName: (
            <Form form={form} name="affiliationForm" onFinish={onFinish}>
              <div className="flex items-center gap-[5px]">
                <Form.Item
                  name="text"
                  style={{ marginBottom: 0 }}
                  className="me-7"
                >
                  <TextInput placeholder="Type your affiliation" />
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
    setIsAddAffiiation(true);
  };

  const onFinish = (values) => {
    if (values.text) {
      createAffiliationMutation(
        {
          affiliationName: values.text,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries("affiliations");
            notification.success({
              message: "Success",
              description: "Created a new affiliation successfully!",
            });
            form.resetFields();
            setIsAddAffiiation(false);
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

  const handleDeleteAffilation = (affiliationId) => {
    ModalConfirmDelete({
      onOK: () => {
        deleteAffiliationMutation(affiliationId, {
          onSuccess: () => {
            queryClient.invalidateQueries("affiliations");
            notification.success({
              message: "Success",
              description: "Delete the affiliation successfully!",
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
      content: "Do you want to delete this affiliation?",
    });
  };

  const handleClose = () => {
    setTableData(tableData?.filter((item) => item.affiliationId !== "0"));
    setIsAddAffiiation(false);
  };

  const onChangePagination = (page, pageSize) => {
    setPage(page);
    setSize(pageSize);
    setIsAddAffiiation(false);
  };

  const columns = featureData
    ? [
        {
          title: "#",
          dataIndex: "index",
          key: "index",
          fixed: "left",
          width: "50px",
          render: (id, record, index) => (page - 1) * size + index + 1,
        },
        {
          title: "Affiliation",
          dataIndex: "affiliationName",
          key: "affiliationName",
          fixed: "left",
          width: "240px",
          render: (text, record) => {
            return (
              <div className="flex justify-between">
                <div>{text}</div>
                {record.affiliationId !== "0" && (
                  <DeleteOutlined
                    onClick={() => handleDeleteAffilation(record.affiliationId)}
                    className="text-lg"
                    style={{ color: "red" }}
                  />
                )}
              </div>
            );
          },
        },

        ...featureData?.listContent?.map((item) => ({
          title: <div className="text-center">{item.nameFeature}</div>,
          dataIndex: item.featureId,
          key: item.featureId,
          render: (_, record) =>
            record.affiliationId !== "0" && (
              <div className="text-center">
                <Checkbox
                  checked={record[item.featureId]}
                  onChange={(e) => {
                    handleCheckboxChange(
                      record,
                      item.featureId,
                      e.target.checked
                    );
                  }}
                />
              </div>
            ),
          width: "200px",
        })),
      ]
    : [];

  useEffect(() => {
    if (affiliationData) {
      setTableData(
        affiliationData?.listContent?.map((item) => {
          const row = {
            key: item.affiliationId,
            affiliationId: item.affiliationId,
            affiliationName: item.affiliationName,
          };
          item.listAuthorization?.map((item) => {
            row[item.featureId] = item.isAuthorized;
          });
          return row;
        })
      );
    }
  }, [affiliationData]);

  useEffect(() => {
    if (isAddAffiiation) {
      refAffiliation.current
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
        <div className="text-2xl font-semibold mb-5">Affiliation Setting</div>
        <AddButton onClick={handleCreateAffiliation} text="New affiliation" />
      </div>
      <CustomTable
        ref={refAffiliation}
        loading={
          affiliationFetchStatus === STATUS.FETCHING ||
          featureStatus === STATUS.LOADING
        }
        columns={columns}
        dataSource={tableData}
        pagination={false}
        scroll={{ y: 250, x: 2000 }}
      />
      <CustomPagination
        total={affiliationData?.totalElement}
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

export default AffiliationSetting;
