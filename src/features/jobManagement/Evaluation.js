import { useState } from "react";
import {
  CustomPagination,
  CustomTable,
} from "../../components/StyledComponent";
import moment from "moment";
import { Avatar, Modal, Tooltip, notification } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EyeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  acceptCandidate,
  getCandidates,
  rejectCandidate,
} from "../../stores/reducer/candidateSlice";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ModalNotification from "../../components/ModalNotification";

const Evaluation = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [isOpen, setIsOpen] = useState(false);
  const [record, setRecord] = useState();
  const queryClient = useQueryClient();

  const { data: candidateData, fetchStatus: candidateFetchStatus } = useQuery({
    queryKey: ["Evaluation", page, size],
    queryFn: () =>
      getCandidates({ page: page, size: size, status: "Evaluation" }),
    staleTime: Infinity,
  });

  const { mutate: acceptCandidateMutation } = useMutation({
    mutationFn: (params) => acceptCandidate(params),
  });

  const { mutate: rejectCandidateMutation } = useMutation({
    mutationFn: (params) => rejectCandidate(params),
  });

  const handleAccept = (id) => {
    ModalNotification({
      onOK: () => {
        acceptCandidateMutation(id, {
          onSuccess: () => {
            queryClient.invalidateQueries("Evaluation");
            notification.success({
              message: "Success",
              description: "Evaluating candidate successfully!",
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
      content: "Do you want to evaluate this candidate as passed?",
      okText: "Passed",
      title: "Confirm",
      width: 500,
    });
  };

  const handleReject = (id) => {
    ModalNotification({
      onOK: () => {
        rejectCandidateMutation(id, {
          onSuccess: () => {
            queryClient.invalidateQueries("Evaluation");
            notification.success({
              message: "Success",
              description: "Reject candidate successfully!",
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
      content: "Do you want to evaluate this candidate as failed?",
      okText: "Failed",
      title: "Confirm",
      width: 500,
    });
  };

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
    interview: {
      candidateName: item.candidateName,
      linkMeeting: item.linkMeeting,
      interviewDate:
        item.dateInterview === null ? undefined : item.dateInterview,
      note: item.note,
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
      dataIndex: "interview",
      key: "interview",
      align: "center",
      render: (interview) => {
        return (
          <Tooltip title="Interview information">
            <EyeOutlined
              onClick={() => {
                setRecord(interview);
                setIsOpen(true);
              }}
              style={{ fontSize: 16 }}
            />
          </Tooltip>
        );
      },
      width: "10%",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (_, record) => {
        return (
          <div className="flex gap-[10px] justify-center">
            <div
              onClick={() => {
                handleAccept(record.key);
              }}
              className="px-4 py-1 border hover:border-blue-400 rounded bg-white"
            >
              <div className="flex items-center">
                <CheckCircleOutlined
                  className="me-2"
                  style={{ color: "green", fontSize: 16 }}
                />
                <div>Passed</div>
              </div>
            </div>
            <div
              onClick={() => {
                handleReject(record.key);
              }}
              className="px-4 py-1 border hover:border-blue-400 rounded bg-white"
            >
              <div className="flex items-center">
                <CloseCircleOutlined
                  className="me-2"
                  style={{ color: "red", fontSize: 16 }}
                />
                <div>Failed</div>
              </div>
            </div>
          </div>
        );
      },
      width: "20%",
    },
  ];

  return (
    <>
      <Modal
        title={
          <div className="font-medium text-xl mb-[20px]">
            Meeting room information
          </div>
        }
        open={isOpen}
        onOk={() => {
          setIsOpen(false);
        }}
        onCancel={() => {
          setIsOpen(false);
        }}
        width={500}
        cancelButtonProps={{
          style: {
            background: "black",
            color: "white",
            display: "none",
          },
          className: "hover:!bg-[#242424] hover:!border-black border-black",
        }}
        okText="Close"
        okButtonProps={{
          style: {
            color: "white",
          },
          className: "bg-blue-600 hover:!bg-blue-800 border-blue-700",
        }}
      >
        <div>
          Candidate:{" "}
          <span className="font-semibold">{record?.candidateName}</span>
        </div>
        <div>
          Link meeting room:{" "}
          <span className="font-semibold">{record?.linkMeeting}</span>
        </div>
        <div>
          Interview date:{" "}
          <span className="font-semibold">
            {moment(new Date(record?.interviewDate)).format("HH:mm DD/MM/YYYY")}
          </span>
        </div>
        <div>
          Notes: <span className="font-semibold">{record?.note}</span>
        </div>
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

export default Evaluation;
