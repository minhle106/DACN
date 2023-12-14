import { useState } from "react";
import {
  BigLabel,
  CustomPagination,
  CustomTable,
} from "../../components/StyledComponent";
import moment from "moment";
import { Avatar, Divider, Form, Input, Modal, Tooltip } from "antd";
import {
  CheckCircleOutlined,
  EditOutlined,
  PlusCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  getCandidates,
  toEvaluationCandidate,
} from "../../stores/reducer/candidateSlice";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const Interview = () => {
  const [form] = Form.useForm();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data: candidateData, fetchStatus: candidateFetchStatus } = useQuery({
    queryKey: ["Interview", page, size],
    queryFn: () =>
      getCandidates({ page: page, size: size, status: "Interview" }),
    staleTime: Infinity,
  });

  const { mutate: toInterviewCandidateMutation } = useMutation({
    mutationFn: (params) => toEvaluationCandidate(params),
  });

  const onChangePagination = (page, size) => {
    setPage(page);
    setSize(size);
  };

  const tableData = candidateData?.listContent?.map((item) => ({
    key: item.idCVApply,
    job: {
      jobTitle: item.jobName,
      jobRelease: item.dateRelease,
      jobExpire: item.dateExpire,
    },
    candidate: {
      fullName: item.candidateName,
      linkAvatar: item.linkAvatar,
      linkCV: item.linkCV,
    },
    contact: {
      email: item.email,
      phone: item.phone,
    },
    interviewDate: item.dateInterview === null ? undefined : item.dateInterview,
    note: item.note,
    action: {
      isMeeting: item.dateInterview === null ? false : true,
    },
  }));

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
      title: "Job Title",
      dataIndex: "job",
      key: "job",
      fixed: "left",
      render: (job) => {
        const release = moment(new Date(job.jobRelease)).format("DD-MM-YY");
        const expire = moment(new Date(job.jobExpire)).format("DD-MM-YY");

        return (
          <>
            <div className="font-medium">{job.jobTitle}</div>
            <div className=" text-sm">
              {release}/{expire}
            </div>
          </>
        );
      },
    },
    {
      title: "Candidate",
      dataIndex: "candidate",
      key: "candidate",
      fixed: "left",
      render: (candidate) => (
        <div className="flex items-center gap-[10px]">
          <Avatar icon={<UserOutlined />} />
          <div>
            <div>{candidate.fullName}</div>
            <div className="text-blue-600 hover:text-blue-800 underline">
              Link CV
            </div>
          </div>
        </div>
      ),
    },

    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
      render: (contact) => (
        <>
          <div>{contact.email}</div>
          <div>{contact.phone}</div>
        </>
      ),
    },
    {
      title: "Interview",
      dataIndex: "interviewDate",
      key: "interviewDate",
      render: (text) => {
        if (text) {
          const time = moment(new Date(text)).format("DD/MM/YYYY");
          return time;
        }
      },
      width: "10%",
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
      align: "center",
      render: (text) => {
        return (
          <Tooltip title="Add notes">
            <EditOutlined
              onClick={() => setIsOpen(true)}
              style={{ fontSize: 16 }}
            />
          </Tooltip>
        );
      },
      width: "7%",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (action) => {
        return (
          <div className="flex gap-[10px] justify-center">
            {!action.isMeeting ? (
              <div className="px-4 py-1 border hover:border-blue-400 rounded bg-white">
                <div className="flex items-center">
                  <PlusCircleOutlined
                    className="me-2"
                    style={{ color: "green", fontSize: 16 }}
                  />
                  <div>Create meeting</div>
                </div>
              </div>
            ) : (
              <div className="px-4 py-1 border hover:border-blue-400 rounded bg-white">
                <div className="flex items-center">
                  <CheckCircleOutlined
                    className="me-2"
                    style={{ color: "green", fontSize: 16 }}
                  />
                  <div>To evaluation</div>
                </div>
              </div>
            )}
          </div>
        );
      },
      width: "17%",
    },
  ];

  return (
    <>
      <Modal
        title={
          <div className="font-medium text-xl mb-[10px]">
            Add notes to the interview
          </div>
        }
        open={isOpen}
        onOk={() => {
          form.submit();
        }}
        onCancel={() => {
          setIsOpen(false);
        }}
        width={500}
        cancelButtonProps={{
          style: {
            background: "black",
            color: "white",
          },
          className: "hover:!bg-[#242424] hover:!border-black border-black",
        }}
        okText="Add note"
        okButtonProps={{
          style: {
            color: "white",
          },
          className: "bg-blue-600 hover:!bg-blue-800 border-blue-700",
        }}
      >
        <Form
          form={form}
          name="noteForm"
          onFinish={(values) => console.log(values)}
          autoComplete="off"
        >
          <Form.Item name="note">
            <Input.TextArea
              rows={8}
              placeholder="Type your notes..."
              maxLength={400}
            />
          </Form.Item>
        </Form>
      </Modal>
      <CustomTable
        // loading={jobFetchStatus === STATUS.FETCHING}
        columns={columns}
        dataSource={tableData}
        pagination={false}
        scroll={{ y: `calc(100vh - 365px)` }}
        onRow={() => {}}
      />

      <CustomPagination
        //  total={jobData?.totalElement}
        total={tableData?.length}
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

export default Interview;
