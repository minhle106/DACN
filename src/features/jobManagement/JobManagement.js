import React, { useEffect, useState } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import JobCardManager from "../../components/JobCardManager";
import {
  CustomButton,
  CustomPaginationNoneBorder,
} from "../../components/StyledComponent";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Form } from "antd";
import CreateJobForm from "../../components/CreateJobForm";
import { selectAuth } from "../../stores/reducer/authSlice";

const JobManagement = () => {
  const [jobData, setJobData] = useState();
  const [form] = Form.useForm();

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userInfo } = useSelector(selectAuth);

  const dispatch = useDispatch();

  const onChangePagination = (page, size) => {
    setPage(page);
    setSize(size);
  };

  const handleCreate = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    /*  if (userInfo) {
      getCompanyJobs(
        {
          page: page,
          size: size,
          userId: userInfo?.userId,
        },
        setJobData
      );
    } */
  }, [userInfo]);

  return (
    <div>
      <Modal
        title={<div className="text-xl">Create new job</div>}
        open={isModalOpen}
        onOk={handleCreate}
        onCancel={() => setIsModalOpen(false)}
        closable={false}
        width={1000}
        footer={[
          <div className="flex gap-[10px] justify-end">
            <CustomButton
              className="bg-black text-white"
              key="back"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </CustomButton>
            <CustomButton
              className="bg-[#8f83ae] text-white"
              key="submit"
              type="primary"
              onClick={handleCreate}
            >
              Create
            </CustomButton>
          </div>,
        ]}
      >
        <CreateJobForm form={form} />
      </Modal>
      <div className="flex justify-between items-center mb-4">
        <div className="text-2xl font-semibold">Posted Job</div>
        <CustomButton
          onClick={() => {
            setIsModalOpen(true);
          }}
          className="flex items-center text-white font-semibold bg-[#8f83ae] 
        hover:bg-white hover:text-[#8f83ae] border-[#8f83ae] "
        >
          <PlusCircleOutlined className="text-lg me-2" />
          <div> New job</div>
        </CustomButton>
      </div>
      <div className="flex gap-[20px] flex-wrap">
        {jobData?.listContent?.map((item) => (
          <JobCardManager key={item.jobId} JD={item} />
        ))}
      </div>

      <CustomPaginationNoneBorder
        total={jobData?.totalElement}
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} items`
        }
        defaultPageSize={10}
        defaultCurrent={page}
        current={page}
        onChange={onChangePagination}
        showSizeChanger
      />
    </div>
  );
};

export default JobManagement;
