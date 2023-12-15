import { useState } from "react";
import {
  CustomPagination,
  CustomTable,
} from "../../components/StyledComponent";
import moment from "moment";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { getCandidates } from "../../stores/reducer/candidateSlice";
import { useQuery } from "@tanstack/react-query";
import { STATUS } from "../../ultils/constant";

const StoredCV = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  const { data: candidateData, fetchStatus: candidateFetchStatus } = useQuery({
    queryKey: ["Stored", page, size],
    queryFn: () => getCandidates({ page: page, size: size, status: "Stored" }),
    staleTime: Infinity,
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
    status: item.status,
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
            <div
              onClick={() => {
                window.open(`http://${candidate.linkCV}`, "_blank");
              }}
              className="text-blue-600 hover:text-blue-800 underline"
            >
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status) => {
        if (status === "Passed")
          return (
            <span className="text-sm font-semibold text-green-500">
              {status}
            </span>
          );

        return (
          <span className="text-sm font-semibold text-red-500">{status}</span>
        );
      },
      width: "10%",
    },
  ];

  return (
    <>
      <CustomTable
        loading={candidateFetchStatus === STATUS.FETCHING}
        columns={columns}
        dataSource={tableData}
        pagination={false}
        scroll={{ y: `calc(100vh - 365px)` }}
        onRow={() => {}}
      />

      <CustomPagination
        total={candidateData?.totalElement}
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

export default StoredCV;
