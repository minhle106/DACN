import { useState } from "react";
import {
  CustomPagination,
  CustomTable,
} from "../../components/StyledComponent";
import moment from "moment";
import { Avatar, notification } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  getCandidates,
  toInterviewCandidate,
} from "../../stores/reducer/candidateSlice";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ModalNotification from "../../components/ModalNotification";

const CheckingCV = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const queryClient = useQueryClient();

  const { data: candidateData, fetchStatus: candidateFetchStatus } = useQuery({
    queryKey: ["Checking", page, size],
    queryFn: () =>
      getCandidates({ page: page, size: size, status: "Checking" }),
    staleTime: Infinity,
  });

  const { mutate: toInterviewCandidateMutation } = useMutation({
    mutationFn: (params) => toInterviewCandidate(params),
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
    applyDate: item.dateApplied,
  }));

  const toInterview = (id) => {
    ModalNotification({
      onOK: () => {
        toInterviewCandidateMutation(id, {
          onSuccess: () => {
            queryClient.invalidateQueries("Checking");
            notification.success({
              message: "Success",
              description: "Checking CV successfully!",
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
      content: "Do you want to interview this candidate?",
      okText: "To interview",
      title: "Confirm",
      width: 500,
    });
    /*  toInterviewCandidateMutation(id, {
      onSuccess: () => {
        queryClient.invalidateQueries("candidates");
        notification.success({
          message: "Success",
          description: "Checking CV successfully!",
        });
      },
      onError: (error) => {
        notification.error({
          message: "Error",
          description: error.message,
        });
      },
    }); */
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
      title: "Apply date",
      dataIndex: "applyDate",
      key: "applyDate",
      render: (text) => {
        const time = moment(new Date(text)).format("DD/MM/YYYY");
        return time;
      },
      width: "10%",
    },
    {
      title: "Action",
      align: "center",
      render: (_, record) => {
        return (
          <div className="flex gap-[10px] justify-center">
            <div
              onClick={() => toInterview(record.key)}
              className="px-4 py-1 border hover:border-blue-400 rounded bg-white"
            >
              <div className="flex items-center">
                <CheckCircleOutlined
                  className="me-2"
                  style={{ color: "green", fontSize: 16 }}
                />
                <div>To interview</div>
              </div>
            </div>
            <div className="px-4 py-1 border hover:border-blue-400 rounded bg-white">
              <div className="flex items-center">
                <CloseCircleOutlined
                  className="me-2"
                  style={{ color: "red", fontSize: 16 }}
                />
                <div>Reject</div>
              </div>
            </div>
          </div>
        );
      },
      width: "25%",
    },
  ];

  return (
    <>
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

export default CheckingCV;
