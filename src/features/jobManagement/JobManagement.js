import React, { useEffect, useState } from "react";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import {
  CustomButton,
  CustomPagination,
  CustomTable,
} from "../../components/StyledComponent";
import { useSelector } from "react-redux";
import { Drawer, Form, Tag, Tooltip, notification } from "antd";
import JobForm from "./JobForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createJob,
  deleteJob,
  getJob,
  getJobs,
  updateJob,
} from "../../stores/reducer/jobSlice";
import { STATUS } from "../../ultils/constant";
import moment from "moment";
import ModalConfirmDelete from "../../components/ModalConfirmDelete";

const JobManagement = () => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [action, setAction] = useState("");
  const [selectedJob, setSelectedJob] = useState("");
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const { data: jobData, fetchStatus: jobFetchStatus } = useQuery({
    queryKey: ["jobs", page, size],
    queryFn: () => getJobs({ page: page, size: size }),
    staleTime: 1 * 60 * 1000,
  });

  const { data: job } = useQuery({
    queryKey: ["job", selectedJob],
    queryFn: () => getJob(selectedJob),
    enabled: !!selectedJob,
    staleTime: Infinity,
  });

  const { mutate: createJobMutation } = useMutation({
    mutationFn: (body) => createJob(body),
  });

  const { mutate: updateJobMutation } = useMutation({
    mutationFn: ({ params, body }) => updateJob(params, body),
  });

  const { mutate: deleteJobMutation } = useMutation({
    mutationFn: (params) => deleteJob(params),
  });

  const tableData = jobData?.listContent?.map((item) => ({
    ...item,
    key: item.jobId,
  }));

  const onFinish = (values) => {
    if (action === "Create") {
      createJobMutation(
        {
          ...values,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries("jobs");
            notification.success({
              message: "Success",
              description: "Updated a new job successfully!",
            });
            form.resetFields();
          },
          onError: (error) => {
            notification.error({
              message: "Error",
              description: error.message,
            });
          },
        }
      );
    } else if (action === "Update") {
      updateJobMutation(
        {
          params: selectedJob,
          body: {
            ...values,
          },
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries("jobs");
            notification.success({
              message: "Success",
              description: "Created a new job successfully!",
            });
            form.resetFields();
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

  const handleDeleteJob = (jobId) => {
    ModalConfirmDelete({
      onOK: () => {
        deleteJobMutation(jobId, {
          onSuccess: () => {
            queryClient.invalidateQueries("jobs");
            notification.success({
              message: "Success",
              description: "Deleted job successfully!",
            });
            form.resetFields();
            setSelectedJob("");
          },
          onError: (error) => {
            notification.error({
              message: "Error",
              description: error.message,
            });
          },
        });
      },
      content: "Do you want to delete this job?",
    });
  };

  const onChangePagination = (page, size) => {
    setPage(page);
    setSize(size);
  };

  useEffect(() => {
    if (job) {
      form.setFieldsValue({
        jobTittle: job.jobTitle,
        jobDescription: job.jobDescription,
        jobType: job.jobType,
        jobContract: job.jobContract,
        salary: job.salary,
        jobLevel: job.jobLevel,
        keyTechnical: job.keyTechnical,
        dateRelease: moment(job.dateRelease),
        dateExpire: moment(job.dateExpire),
        logoLink: job.logoLink,
        benefit: job.benefit,
        keyResponsibility: job.keyResponsibility,
        qualification: job.qualification,
      });
    }
  }, [job]);

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
      title: "Job title",
      dataIndex: "jobTitle",
      key: "jobTitle",
      fixed: "left",
    },
    {
      title: "Job level",
      dataIndex: "jobLevel",
      key: "jobLevel",
      render: (text, record) => {
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
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: "Creation date",
      dataIndex: "dateRelease",
      key: "dateRelease",
      render: (text) => {
        const time = moment(new Date(text)).format("DD/MM/YYYY");
        return time;
      },
    },
    {
      title: "Closing date",
      dataIndex: "dateExpire",
      key: "qudateExpire",
      render: (text) => {
        if (text) {
          const time = moment(new Date(text)).format("DD/MM/YYYY");
          return time;
        }
      },
    },
    {
      title: "Action",
      align: "center",
      render: (record) => {
        return (
          <div className="flex gap-[35px] justify-center">
            <Tooltip title="Edit job">
              <EditOutlined
                onClick={() => {
                  setOpen(true);
                  setAction("Update");
                  setSelectedJob(record.jobId);
                }}
                className="text-lg"
                style={{ color: "#1677ff" }}
              />
            </Tooltip>
            <Tooltip title="Close job">
              <CheckCircleOutlined
                className="text-lg"
                style={{ color: "green" }}
              />
            </Tooltip>
            <Tooltip title="Delete job">
              <DeleteOutlined
                onClick={() => handleDeleteJob(record.jobId)}
                className="text-lg"
                style={{ color: "red" }}
              />
            </Tooltip>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Drawer
        title={<div className="text-xl font-semibold">{action} Job</div>}
        width={720}
        onClose={() => {
          setOpen(false);
          setSelectedJob("");
          setTimeout(() => {
            form.resetFields();
          }, 1000);
        }}
        open={open}
        footer={[
          <div className="flex gap-[10px]">
            <CustomButton
              onClick={() => {
                setOpen(false);
                setSelectedJob("");
                setTimeout(() => {
                  form.resetFields();
                }, 1000);
              }}
              className="w-6/12 hover:text-[#8f83ae] hover:border-[#8f83ae] text-lg"
            >
              Cancel
            </CustomButton>
            <CustomButton
              type="submit"
              form="jobForm"
              className="w-6/12 bg-[#8f83ae] hover:bg-[#8f83aeb3] text-lg text-white"
            >
              {action}
            </CustomButton>
          </div>,
        ]}
      >
        <JobForm
          form={form}
          onFinish={onFinish}
          open={open}
          setOpen={setOpen}
        />
      </Drawer>
      <div className="flex justify-between items-center mb-4">
        <div className="text-2xl font-semibold">Posted Job</div>
        <CustomButton
          onClick={() => {
            setOpen(true);
            setAction("Create");
          }}
          className="flex items-center text-white font-semibold bg-[#8f83ae] 
          hover:bg-white hover:text-[#8f83ae] border-[#8f83ae] "
        >
          <PlusCircleOutlined className="text-lg me-2" />
          <div>New job</div>
        </CustomButton>
      </div>
      <CustomTable
        loading={jobFetchStatus === STATUS.FETCHING}
        columns={columns}
        dataSource={tableData}
        pagination={false}
        scroll={{ y: `calc(100vh - 315px)` }}
        onRow={() => {}}
      />

      <CustomPagination
        total={jobData?.totalElement}
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} items`
        }
        pageSize={size}
        current={page}
        onChange={onChangePagination}
        showSizeChanger
      />
    </div>
  );
};

export default JobManagement;
