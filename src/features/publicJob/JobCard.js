import React, { useState } from "react";
import {
  DollarOutlined,
  EnvironmentOutlined,
  StarOutlined,
  StarFilled,
  SolutionOutlined,
  CarryOutOutlined,
} from "@ant-design/icons";
import { Divider, Form, Modal, Space, Tag, notification } from "antd";
import CompanyLogoDefault from "../../assets/images/CompanyLogoDefault.png";
import moment from "moment/moment";
import ApplyJobForm from "./ApplyJobForm";
import { useSelector } from "react-redux";
import { selectAuth } from "../../stores/reducer/authSlice";
import { PATH } from "../../route/paths";
import { useNavigate, useParams } from "react-router-dom";
import { applyJob } from "../../stores/reducer/userSlice";
import linkifyHtml from "linkify-html";

const JobCard = (props) => {
  const { job, moreInfo } = props;
  const [mark, setMark] = useState(false);
  const [form] = Form.useForm();
  const [option, setOption] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();
  const { isLoggedIn } = useSelector(selectAuth);
  const navigate = useNavigate();

  const handleClick = () => {
    setMark(!mark);
  };

  const onFinish = (values) => {
    const formData = new FormData();
    formData.append("file", values.fileCV.file);
    formData.append("jobId", id);
    applyJob(formData, setIsOpen);
  };

  return (
    <>
      <Modal
        title={
          <>
            <div className="font-medium text-2xl">Submit Job Application</div>
            <Divider style={{ margin: 0, marginTop: 10 }} />
          </>
        }
        open={isOpen}
        onOk={() => {
          form.submit();
        }}
        onCancel={() => {
          setIsOpen(false);
        }}
        width={700}
        cancelButtonProps={{
          style: {
            background: "black",
            color: "white",
          },
          className: "hover:!bg-[#242424] hover:!border-black border-black",
        }}
        okText="Apply"
        okButtonProps={{
          style: {
            background: "#fa6639",
            color: "white",
          },
          className:
            "hover:!bg-[#fa744b] hover:!border-[#fa744b] border-[#fa6639]",
        }}
      >
        <ApplyJobForm
          form={form}
          onFinish={onFinish}
          onFinishFailed={() => {
            console.log("vl");
          }}
          option={option}
          setOption={setOption}
        />
      </Modal>
      <div
        style={{
          minHeight: moreInfo ? window.innerHeight - 135 : "",
          marginTop: moreInfo ? "" : "20px",
        }}
        className="bg-white rounded-lg border shadow px-5 py-5"
      >
        <div className="flex gap-[20px]">
          <div className="w-3/12 flex justify-center">
            <img
              className="h-[200px]"
              src={job?.logoLink ?? CompanyLogoDefault}
              alt="Logo"
            />
          </div>
          <div className="w-9/12 leading-8">
            <div className="flex justify-between">
              <div className="font-semibold text-lg w-9/12">
                {job?.jobTitle}
              </div>
              <div className="flex items-center gap-[15px]">
                <div className="text-gray-500 font-medium">
                  {moment(new Date(job?.dateRelease)).fromNow()}
                </div>
                {mark ? (
                  <StarFilled
                    style={{ color: "#fa6639" }}
                    onClick={handleClick}
                    className="text-2xl"
                  />
                ) : (
                  <StarOutlined onClick={handleClick} className="text-2xl" />
                )}
              </div>
            </div>
            <div
              className="font-semibold text-gray-500 hover:underline"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {job?.companyName ?? "Company Name"}
            </div>
            <div className="flex items-center">
              <DollarOutlined className="text-lg me-2 text-blue-900 font-bold" />
              <div>{job?.salary}</div>
            </div>
            <div className="flex items-center">
              <EnvironmentOutlined className="text-lg me-2 text-blue-900 font-bold" />
              <div>{job?.companyAddress ?? "Company Address"}</div>
            </div>
            <Divider style={{ marginTop: 5, marginBottom: 15 }} />
            <div className="md:flex gap-2 items-center">
              {job?.keyTechnical?.map((item, index) => (
                <Tag key={index} color="purple">
                  {item}
                </Tag>
              ))}
            </div>
          </div>
        </div>
        {moreInfo && (
          <div className="mt-5">
            <div
              onClick={() => {
                if (isLoggedIn) {
                  setIsOpen(true);
                } else {
                  notification.info({
                    message: "Notification",
                    description:
                      "You need to log in to your account to be able to apply for jobs!",
                  });
                  navigate(PATH.LOGIN);
                }
              }}
              className="cursor-pointer flex border mb-5 py-3 justify-center bg-[#fa6639] text-white font-semibold rounded-lg hover:bg-[#fa744b]"
            >
              Apply Now!
            </div>
            <Space
              direction="vertical"
              size="large"
              style={{ display: "flex" }}
            >
              <div>
                <span className="text-lg font-semibold">Job title: </span>
                {job?.jobTitle}
              </div>
              <div>
                <span className="text-lg font-semibold">Job information: </span>
                <div className="mt-2">
                  <SolutionOutlined className="text-lg me-2 text-blue-900 font-bold" />
                  {job?.jobContract}/{job?.jobType}
                </div>
                <div>
                  <DollarOutlined className="text-lg me-2 text-blue-900 font-bold" />
                  {job?.salary}
                </div>
                <div>
                  <CarryOutOutlined className="text-lg me-2 text-blue-900 font-bold" />
                  {moment(new Date(job?.dateRelease)).format("DD/MM/YYYY")} -{" "}
                  {moment(new Date(job?.dateExpire)).format("DD/MM/YYYY")}
                </div>
                <div>
                  <span className="me-3">Level:</span>
                  {job?.jobLevel?.map((item, index) => (
                    <Tag key={index} color="purple">
                      {item}
                    </Tag>
                  ))}
                </div>
              </div>

              {job?.jobDescription && (
                <div>
                  <span className="text-lg font-semibold">Description: </span>
                  <br />
                  <div
                    dangerouslySetInnerHTML={{
                      __html: linkifyHtml(job?.jobDescription, {
                        target: "_blank",
                      }),
                    }}
                  ></div>
                </div>
              )}

              {job?.qualification && (
                <div>
                  <span className="text-lg font-semibold">
                    Qualifications:{" "}
                  </span>
                  <br />
                  <div
                    dangerouslySetInnerHTML={{
                      __html: linkifyHtml(job?.qualification, {
                        target: "_blank",
                      }),
                    }}
                  ></div>
                </div>
              )}

              {job?.keyResponsibility && (
                <div>
                  <span className="text-lg font-semibold">
                    Key responsibilities:{" "}
                  </span>
                  <br />
                  <div
                    dangerouslySetInnerHTML={{
                      __html: linkifyHtml(job?.keyResponsibility, {
                        target: "_blank",
                      }),
                    }}
                  ></div>
                </div>
              )}

              {job?.benefit && (
                <div>
                  <span className="text-lg font-semibold">Benefits: </span>
                  <br />
                  <div
                    dangerouslySetInnerHTML={{
                      __html: linkifyHtml(job?.benefit, {
                        target: "_blank",
                      }),
                    }}
                  ></div>
                </div>
              )}
            </Space>
          </div>
        )}
      </div>
    </>
  );
};

export default JobCard;
