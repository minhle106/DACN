import { useState } from "react";
import {
  CustomPagination,
  CustomTable,
} from "../../components/StyledComponent";
import moment from "moment";
import { Avatar, Tooltip } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EditOutlined,
  EyeOutlined,
  PlusCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { getCandidates } from "../../stores/reducer/candidateSlice";
import { useQuery } from "@tanstack/react-query";

const Evaluation = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  /*   const { data: candidateData, fetchStatus: candidateFetchStatus } = useQuery({
    queryKey: ["candidates"],
    queryFn: () =>
      getCandidates({ page: page, size: size, status: "Interview" }),
    staleTime: Infinity,
  });

  }; */

  const onChangePagination = (page, size) => {
    setPage(page);
    setSize(size);
  };

  const tableData = [
    {
      job: {
        jobTitle: "Java Web Developer",
        jobRelease: new Date(),
        jobExpire: new Date(),
      },
      candidate: {
        fullName: "Lee Minh",
        avatarLink: "link",
        cvLink: "link",
      },
      contact: {
        phone: "0123456789",
        email: "minh.le106@hcmut.edu.vn",
      },
      interviewDate: new Date(),
      note: "this is note text!",
    },
    {
      job: {
        jobTitle: "Java Web Developer",
        jobRelease: new Date(),
        jobExpire: new Date(),
      },
      candidate: {
        fullName: "Lee Minh",
        avatarLink: "link",
        cvLink: "link",
      },
      contact: {
        phone: "0123456789",
        email: "minh.le106@hcmut.edu.vn",
      },
      interviewDate: new Date(),
      note: "this is note text!",
    },
    {
      job: {
        jobTitle: "Java Web Developer",
        jobRelease: new Date(),
        jobExpire: new Date(),
      },
      candidate: {
        fullName: "Lee Minh",
        avatarLink: "link",
        cvLink: "link",
      },
      contact: {
        phone: "0123456789",
        email: "minh.le106@hcmut.edu.vn",
      },
      interviewDate: new Date(),
      note: "this is note text!",
    },
    {
      job: {
        jobTitle: "Java Web Developer",
        jobRelease: new Date(),
        jobExpire: new Date(),
      },
      candidate: {
        fullName: "Lee Minh",
        avatarLink: "link",
        cvLink: "link",
      },
      contact: {
        phone: "0123456789",
        email: "minh.le106@hcmut.edu.vn",
      },
      interviewDate: new Date(),
      note: "this is note text!",
    },
    {
      job: {
        jobTitle: "Java Web Developer",
        jobRelease: new Date(),
        jobExpire: new Date(),
      },
      candidate: {
        fullName: "Lee Minh",
        avatarLink: "link",
        cvLink: "link",
      },
      contact: {
        phone: "0123456789",
        email: "minh.le106@hcmut.edu.vn",
      },
      interviewDate: new Date(),
      note: "this is note text!",
    },
    {
      job: {
        jobTitle: "Java Web Developer",
        jobRelease: new Date(),
        jobExpire: new Date(),
      },
      candidate: {
        fullName: "Lee Minh",
        avatarLink: "link",
        cvLink: "link",
      },
      contact: {
        phone: "0123456789",
        email: "minh.le106@hcmut.edu.vn",
      },
      interviewDate: new Date(),
      note: "this is note text!",
    },
    {
      job: {
        jobTitle: "Java Web Developer",
        jobRelease: new Date(),
        jobExpire: new Date(),
      },
      candidate: {
        fullName: "Lee Minh",
        avatarLink: "link",
        cvLink: "link",
      },
      contact: {
        phone: "0123456789",
        email: "minh.le106@hcmut.edu.vn",
      },
      interviewDate: new Date(),
      note: "this is note text!",
    },
    {
      job: {
        jobTitle: "Java Web Developer",
        jobRelease: new Date(),
        jobExpire: new Date(),
      },
      candidate: {
        fullName: "Lee Minh",
        avatarLink: "link",
        cvLink: "link",
      },
      contact: {
        phone: "0123456789",
        email: "minh.le106@hcmut.edu.vn",
      },
      interviewDate: new Date(),
      note: "this is note text!",
    },
    {
      job: {
        jobTitle: "Java Web Developer",
        jobRelease: new Date(),
        jobExpire: new Date(),
      },
      candidate: {
        fullName: "Lee Minh",
        avatarLink: "link",
        cvLink: "link",
      },
      contact: {
        phone: "0123456789",
        email: "minh.le106@hcmut.edu.vn",
      },
      interviewDate: new Date(),
      note: "this is note text!",
    },
    {
      job: {
        jobTitle: "Java Web Developer",
        jobRelease: new Date(),
        jobExpire: new Date(),
      },
      candidate: {
        fullName: "Lee Minh",
        avatarLink: "link",
        cvLink: "link",
      },
      contact: {
        phone: "0123456789",
        email: "minh.le106@hcmut.edu.vn",
      },
      interviewDate: new Date(),
      note: "this is note text!",
    },
    {
      job: {
        jobTitle: "Java Web Developer",
        jobRelease: new Date(),
        jobExpire: new Date(),
      },
      candidate: {
        fullName: "Lee Minh",
        avatarLink: "link",
        cvLink: "link",
      },
      contact: {
        phone: "0123456789",
        email: "minh.le106@hcmut.edu.vn",
      },
      interviewDate: new Date(),
      note: "this is note text!",
    },
  ];

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
        const time = moment(new Date(text)).format("DD/MM/YYYY");
        return time;
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
          <Tooltip title="View notes">
            <EyeOutlined style={{ fontSize: 16 }} />
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
            <div className="px-4 py-1 border hover:border-blue-400 rounded bg-white">
              <div className="flex items-center">
                <CheckCircleOutlined
                  className="me-2"
                  style={{ color: "green", fontSize: 16 }}
                />
                <div>Passed</div>
              </div>
            </div>
            <div className="px-4 py-1 border hover:border-blue-400 rounded bg-white">
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
